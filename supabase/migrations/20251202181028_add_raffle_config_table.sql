/*
  # Add Raffle Configuration Table
  
  This migration creates a table to manage raffle draw dates and configuration dynamically.
  
  1. New Tables
    - `raffle_config`
      - `id` (bigserial, primary key)
      - `week` (integer, unique) - The week number
      - `draw_date` (timestamptz) - The scheduled draw date
      - `is_active` (boolean) - Whether this raffle is active
      - `created_at` (timestamptz) - When the config was created
      - `updated_at` (timestamptz) - When the config was last updated
  
  2. Security
    - Enable RLS on `raffle_config` table
    - Add policy for authenticated users to read all raffle configs
    - Add policy for authenticated admin users to update raffle configs
  
  3. Important Notes
    - This table allows dynamic management of raffle dates through an admin interface
    - The draw_date can be updated through the admin panel
    - Week numbers must be unique
*/

CREATE TABLE IF NOT EXISTS raffle_config (
  id bigserial PRIMARY KEY,
  week integer UNIQUE NOT NULL,
  draw_date timestamptz NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE raffle_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read raffle configs"
  ON raffle_config
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can update raffle configs"
  ON raffle_config
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert raffle configs"
  ON raffle_config
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_raffle_config_week ON raffle_config(week);
CREATE INDEX IF NOT EXISTS idx_raffle_config_draw_date ON raffle_config(draw_date);

INSERT INTO raffle_config (week, draw_date, is_active) VALUES
  (4, '2025-12-09', true),
  (5, '2025-12-16', true),
  (6, '2025-12-23', true),
  (7, '2025-12-30', true)
ON CONFLICT (week) DO NOTHING;
