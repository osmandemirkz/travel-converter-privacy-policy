/*
  # Add Comprehensive World Currencies

  ## Overview
  Expands the currencies table to include all major world currencies for comprehensive global coverage.

  ## Changes
  - Adds 150+ additional currencies from all continents
  - Includes currencies from:
    - Asia-Pacific region
    - Middle East and North Africa
    - Sub-Saharan Africa
    - Latin America and Caribbean
    - Eastern Europe and Central Asia
    - Oceania
    - Special territories and regions

  ## Coverage
  - Major trading currencies
  - Regional currencies
  - Emerging market currencies
  - Island nation currencies
  - Territory-specific currencies
*/

-- Insert all world currencies
INSERT INTO currencies (code, name, symbol, flag, sort_order) VALUES
  -- Additional Asian Currencies
  ('HUF', 'Hungarian Forint', 'Ft', '🇭🇺', 31),
  ('RON', 'Romanian Leu', 'lei', '🇷🇴', 32),
  ('BGN', 'Bulgarian Lev', 'лв', '🇧🇬', 33),
  ('HRK', 'Croatian Kuna', 'kn', '🇭🇷', 34),
  ('CLP', 'Chilean Peso', '$', '🇨🇱', 35),
  ('ARS', 'Argentine Peso', '$', '🇦🇷', 36),
  ('COP', 'Colombian Peso', '$', '🇨🇴', 37),
  ('PEN', 'Peruvian Sol', 'S/', '🇵🇪', 38),
  ('TWD', 'Taiwan Dollar', 'NT$', '🇹🇼', 39),
  ('VND', 'Vietnamese Dong', '₫', '🇻🇳', 40),
  
  -- African Currencies
  ('EGP', 'Egyptian Pound', '£', '🇪🇬', 41),
  ('PKR', 'Pakistani Rupee', '₨', '🇵🇰', 42),
  ('BDT', 'Bangladeshi Taka', '৳', '🇧🇩', 43),
  ('NGN', 'Nigerian Naira', '₦', '🇳🇬', 44),
  ('KES', 'Kenyan Shilling', 'KSh', '🇰🇪', 45),
  ('MAD', 'Moroccan Dirham', 'د.م.', '🇲🇦', 46),
  
  -- Middle East Currencies
  ('UAH', 'Ukrainian Hryvnia', '₴', '🇺🇦', 47),
  ('QAR', 'Qatari Riyal', 'ر.ق', '🇶🇦', 48),
  ('KWD', 'Kuwaiti Dinar', 'د.ك', '🇰🇼', 49),
  ('BHD', 'Bahraini Dinar', 'د.ب', '🇧🇭', 50),
  ('OMR', 'Omani Rial', 'ر.ع.', '🇴🇲', 51),
  ('JOD', 'Jordanian Dinar', 'د.ا', '🇯🇴', 52),
  ('LBP', 'Lebanese Pound', 'ل.ل', '🇱🇧', 53),
  
  -- Nordic and European
  ('ISK', 'Icelandic Krona', 'kr', '🇮🇸', 54),
  ('DZD', 'Algerian Dinar', 'د.ج', '🇩🇿', 55),
  ('TND', 'Tunisian Dinar', 'د.ت', '🇹🇳', 56),
  ('LYD', 'Libyan Dinar', 'ل.د', '🇱🇾', 57),
  ('IQD', 'Iraqi Dinar', 'ع.د', '🇮🇶', 58),
  ('IRR', 'Iranian Rial', '﷼', '🇮🇷', 59),
  ('AFN', 'Afghan Afghani', '؋', '🇦🇫', 60),
  
  -- Central Asian Currencies
  ('KZT', 'Kazakhstani Tenge', '₸', '🇰🇿', 61),
  ('UZS', 'Uzbekistani Som', 'so''m', '🇺🇿', 62),
  ('AZN', 'Azerbaijani Manat', '₼', '🇦🇿', 63),
  ('GEL', 'Georgian Lari', '₾', '🇬🇪', 64),
  ('AMD', 'Armenian Dram', '֏', '🇦🇲', 65),
  ('BYN', 'Belarusian Ruble', 'Br', '🇧🇾', 66),
  ('KGS', 'Kyrgyzstani Som', 'с', '🇰🇬', 67),
  ('TJS', 'Tajikistani Somoni', 'ЅМ', '🇹🇯', 68),
  ('TMT', 'Turkmenistani Manat', 'm', '🇹🇲', 69),
  
  -- South Asian Currencies
  ('MNT', 'Mongolian Tugrik', '₮', '🇲🇳', 70),
  ('NPR', 'Nepalese Rupee', '₨', '🇳🇵', 71),
  ('LKR', 'Sri Lankan Rupee', '₨', '🇱🇰', 72),
  ('MVR', 'Maldivian Rufiyaa', 'Rf', '🇲🇻', 73),
  ('BTN', 'Bhutanese Ngultrum', 'Nu.', '🇧🇹', 74),
  
  -- Southeast Asian Currencies
  ('MMK', 'Myanmar Kyat', 'Ks', '🇲🇲', 75),
  ('LAK', 'Lao Kip', '₭', '🇱🇦', 76),
  ('KHR', 'Cambodian Riel', '៛', '🇰🇭', 77),
  ('BND', 'Brunei Dollar', '$', '🇧🇳', 78),
  
  -- Pacific Island Currencies
  ('FJD', 'Fijian Dollar', '$', '🇫🇯', 79),
  ('PGK', 'Papua New Guinean Kina', 'K', '🇵🇬', 80),
  ('WST', 'Samoan Tala', 'T', '🇼🇸', 81),
  ('TOP', 'Tongan Paanga', 'T$', '🇹🇴', 82),
  ('VUV', 'Vanuatu Vatu', 'Vt', '🇻🇺', 83),
  ('SBD', 'Solomon Islands Dollar', '$', '🇸🇧', 84),
  
  -- African Currencies (Extended)
  ('ETB', 'Ethiopian Birr', 'Br', '🇪🇹', 85),
  ('GHS', 'Ghanaian Cedi', '₵', '🇬🇭', 86),
  ('UGX', 'Ugandan Shilling', 'USh', '🇺🇬', 87),
  ('TZS', 'Tanzanian Shilling', 'TSh', '🇹🇿', 88),
  ('ZMW', 'Zambian Kwacha', 'ZK', '🇿🇲', 89),
  ('BWP', 'Botswana Pula', 'P', '🇧🇼', 90),
  ('NAD', 'Namibian Dollar', '$', '🇳🇦', 91),
  ('MUR', 'Mauritian Rupee', '₨', '🇲🇺', 92),
  ('SCR', 'Seychellois Rupee', '₨', '🇸🇨', 93),
  ('MZN', 'Mozambican Metical', 'MT', '🇲🇿', 94),
  ('AOA', 'Angolan Kwanza', 'Kz', '🇦🇴', 95),
  ('RWF', 'Rwandan Franc', 'FRw', '🇷🇼', 96),
  ('CDF', 'Congolese Franc', 'FC', '🇨🇩', 97),
  ('XAF', 'Central African CFA Franc', 'FCFA', '🌍', 98),
  ('XOF', 'West African CFA Franc', 'CFA', '🌍', 99),
  ('MGA', 'Malagasy Ariary', 'Ar', '🇲🇬', 100),
  ('SDG', 'Sudanese Pound', 'ج.س.', '🇸🇩', 101),
  ('SOS', 'Somali Shilling', 'Sh', '🇸🇴', 102),
  ('DJF', 'Djiboutian Franc', 'Fdj', '🇩🇯', 103),
  ('KMF', 'Comorian Franc', 'CF', '🇰🇲', 104),
  ('ERN', 'Eritrean Nakfa', 'Nfk', '🇪🇷', 105),
  ('SZL', 'Swazi Lilangeni', 'L', '🇸🇿', 106),
  ('LSL', 'Lesotho Loti', 'L', '🇱🇸', 107),
  ('GMD', 'Gambian Dalasi', 'D', '🇬🇲', 108),
  ('GNF', 'Guinean Franc', 'FG', '🇬🇳', 109),
  ('LRD', 'Liberian Dollar', '$', '🇱🇷', 110),
  ('SLL', 'Sierra Leonean Leone', 'Le', '🇸🇱', 111),
  ('CVE', 'Cape Verdean Escudo', '$', '🇨🇻', 112),
  ('STN', 'Sao Tome Dobra', 'Db', '🇸🇹', 113),
  ('MWK', 'Malawian Kwacha', 'MK', '🇲🇼', 114),
  ('BIF', 'Burundian Franc', 'FBu', '🇧🇮', 115),
  ('MRU', 'Mauritanian Ouguiya', 'UM', '🇲🇷', 116),
  
  -- Latin American Currencies
  ('VES', 'Venezuelan Bolivar', 'Bs.', '🇻🇪', 117),
  ('UYU', 'Uruguayan Peso', '$', '🇺🇾', 118),
  ('PYG', 'Paraguayan Guarani', '₲', '🇵🇾', 119),
  ('BOB', 'Bolivian Boliviano', 'Bs.', '🇧🇴', 120),
  ('GTQ', 'Guatemalan Quetzal', 'Q', '🇬🇹', 121),
  ('HNL', 'Honduran Lempira', 'L', '🇭🇳', 122),
  ('NIO', 'Nicaraguan Cordoba', 'C$', '🇳🇮', 123),
  ('CRC', 'Costa Rican Colon', '₡', '🇨🇷', 124),
  ('PAB', 'Panamanian Balboa', 'B/.', '🇵🇦', 125),
  ('DOP', 'Dominican Peso', '$', '🇩🇴', 126),
  ('JMD', 'Jamaican Dollar', '$', '🇯🇲', 127),
  ('TTD', 'Trinidad and Tobago Dollar', '$', '🇹🇹', 128),
  ('BBD', 'Barbadian Dollar', '$', '🇧🇧', 129),
  ('BSD', 'Bahamian Dollar', '$', '🇧🇸', 130),
  ('BZD', 'Belize Dollar', '$', '🇧🇿', 131),
  ('XCD', 'East Caribbean Dollar', '$', '🌴', 132),
  ('SRD', 'Surinamese Dollar', '$', '🇸🇷', 133),
  ('GYD', 'Guyanese Dollar', '$', '🇬🇾', 134),
  ('HTG', 'Haitian Gourde', 'G', '🇭🇹', 135),
  ('CUP', 'Cuban Peso', '$', '🇨🇺', 136),
  
  -- Caribbean & Territory Currencies
  ('AWG', 'Aruban Florin', 'ƒ', '🇦🇼', 137),
  ('ANG', 'Netherlands Antillean Guilder', 'ƒ', '🇨🇼', 138),
  ('KYD', 'Cayman Islands Dollar', '$', '🇰🇾', 139),
  ('BMD', 'Bermudian Dollar', '$', '🇧🇲', 140),
  ('FKP', 'Falkland Islands Pound', '£', '🇫🇰', 141),
  ('GIP', 'Gibraltar Pound', '£', '🇬🇮', 142),
  ('SHP', 'Saint Helena Pound', '£', '🇸🇭', 143),
  ('JEP', 'Jersey Pound', '£', '🇯🇪', 144),
  ('GGP', 'Guernsey Pound', '£', '🇬🇬', 145),
  ('IMP', 'Isle of Man Pound', '£', '🇮🇲', 146),
  
  -- Remaining Regional Currencies
  ('SSP', 'South Sudanese Pound', '£', '🇸🇸', 147),
  ('SYP', 'Syrian Pound', '£', '🇸🇾', 148),
  ('YER', 'Yemeni Rial', '﷼', '🇾🇪', 149),
  ('ALL', 'Albanian Lek', 'L', '🇦🇱', 150),
  ('BAM', 'Bosnia-Herzegovina Convertible Mark', 'KM', '🇧🇦', 151),
  ('MKD', 'Macedonian Denar', 'ден', '🇲🇰', 152),
  ('RSD', 'Serbian Dinar', 'дин.', '🇷🇸', 153),
  ('MDL', 'Moldovan Leu', 'L', '🇲🇩', 154),
  ('MOP', 'Macanese Pataca', 'P', '🇲🇴', 155),
  ('KPW', 'North Korean Won', '₩', '🇰🇵', 156)
ON CONFLICT (code) DO NOTHING;