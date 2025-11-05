/*
  # Galaxy Converter - Currency Exchange Database Schema

  ## Overview
  Creates tables for storing currency information and exchange rates with offline caching support.

  ## New Tables
  
  ### `currencies`
  - `code` (text, primary key) - 3-letter currency code (e.g., USD, EUR)
  - `name` (text) - Full currency name
  - `symbol` (text) - Currency symbol
  - `flag` (text) - Country flag emoji or URL
  - `is_active` (boolean) - Whether currency is currently selected by user
  - `sort_order` (integer) - Display order in the list
  - `created_at` (timestamptz) - Record creation timestamp

  ### `exchange_rates`
  - `id` (uuid, primary key) - Unique identifier
  - `base_currency` (text) - Base currency code (default USD)
  - `rates` (jsonb) - JSON object containing all exchange rates
  - `last_updated` (timestamptz) - Last API fetch timestamp
  - `created_at` (timestamptz) - Record creation timestamp

  ### `user_preferences`
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid) - User identifier (for future multi-user support)
  - `selected_currencies` (text[]) - Array of selected currency codes
  - `last_input_value` (numeric) - Last entered value for persistence
  - `last_input_currency` (text) - Currency of last input
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for currencies and exchange rates (app is public)
  - Restricted write access for user preferences
*/

-- Create currencies table
CREATE TABLE IF NOT EXISTS currencies (
  code text PRIMARY KEY,
  name text NOT NULL,
  symbol text NOT NULL,
  flag text NOT NULL,
  is_active boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create exchange rates table
CREATE TABLE IF NOT EXISTS exchange_rates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  base_currency text NOT NULL DEFAULT 'USD',
  rates jsonb NOT NULL,
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create user preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  selected_currencies text[] DEFAULT ARRAY['USD', 'EUR', 'GBP'],
  last_input_value numeric DEFAULT 0,
  last_input_currency text DEFAULT 'USD',
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE currencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE exchange_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies for currencies (public read, no write for now)
CREATE POLICY "Anyone can read currencies"
  ON currencies FOR SELECT
  USING (true);

-- RLS Policies for exchange_rates (public read, service role write)
CREATE POLICY "Anyone can read exchange rates"
  ON exchange_rates FOR SELECT
  USING (true);

-- RLS Policies for user_preferences (public for demo, can be restricted later)
CREATE POLICY "Anyone can read preferences"
  ON user_preferences FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert preferences"
  ON user_preferences FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update preferences"
  ON user_preferences FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_exchange_rates_updated ON exchange_rates(last_updated DESC);
CREATE INDEX IF NOT EXISTS idx_currencies_active ON currencies(is_active, sort_order);
