import { createClient } from 'npm:@supabase/supabase-js@2.58.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const fiatResponse = await fetch('https://api.exchangerate-api.com/v4/latest/USD');

    if (!fiatResponse.ok) {
      throw new Error('Failed to fetch fiat exchange rates');
    }

    const fiatData = await fiatResponse.json();

    const cryptoResponse = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=USD');
    const cryptoData = await cryptoResponse.json();

    const btcRate = cryptoData?.data?.rates?.BTC ? parseFloat(cryptoData.data.rates.BTC) : 0.000025;

    const allRates = {
      ...fiatData.rates,
      BTC: btcRate,
    };

    const { error } = await supabase
      .from('exchange_rates')
      .insert({
        base_currency: 'USD',
        rates: allRates,
        last_updated: new Date().toISOString(),
      });

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          base: fiatData.base,
          rates: allRates,
          timestamp: fiatData.time_last_updated,
        },
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});