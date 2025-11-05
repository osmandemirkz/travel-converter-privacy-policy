/*
  # Add Bitcoin to currencies

  1. Changes
    - Insert Bitcoin (BTC) currency with flag and details
    - Set as active currency
  
  2. Notes
    - Using Bitcoin symbol ₿ and flag 🟠
*/

INSERT INTO currencies (code, name, symbol, flag, is_active, sort_order)
VALUES ('BTC', 'Bitcoin', '₿', '₿', true, 999)
ON CONFLICT (code) DO NOTHING;
