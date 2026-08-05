/**
 * RailPulse AI - Infrastructure Layer: Static Transit Database
 * Provides offline instant search, route caching index, and popular transit corridors.
 */

export interface TransitDbEntry {
  number: string;
  name: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  category: 'Vande Bharat' | 'Rajdhani' | 'Shatabdi' | 'Duronto' | 'Superfast' | 'Express';
  avgSpeedKmh: number;
}

export const TRANSIT_DATABASE: TransitDbEntry[] = [
  // Vande Bharat Flagship Express
  { number: '22436', name: 'Varanasi Vande Bharat Express', from: 'New Delhi', fromCode: 'NDLS', to: 'Varanasi Junction', toCode: 'BSB', category: 'Vande Bharat', avgSpeedKmh: 130 },
  { number: '22435', name: 'New Delhi Vande Bharat Express', from: 'Varanasi Junction', fromCode: 'BSB', to: 'New Delhi', toCode: 'NDLS', category: 'Vande Bharat', avgSpeedKmh: 130 },
  { number: '20901', name: 'Mumbai Vande Bharat Express', from: 'Mumbai CST', fromCode: 'CSMT', to: 'Solapur', toCode: 'SUR', category: 'Vande Bharat', avgSpeedKmh: 110 },
  { number: '20903', name: 'Chennai Vande Bharat Express', from: 'Chennai Central', fromCode: 'MAS', to: 'Coimbatore', toCode: 'CBE', category: 'Vande Bharat', avgSpeedKmh: 115 },
  { number: '20905', name: 'Patna Vande Bharat Express', from: 'Patna Junction', fromCode: 'PNBE', to: 'Howrah', toCode: 'HWH', category: 'Vande Bharat', avgSpeedKmh: 120 },
  { number: '20911', name: 'Rani Kamlapati Vande Bharat', from: 'Hazrat Nizamuddin', fromCode: 'NZM', to: 'Rani Kamlapati', toCode: 'RKMP', category: 'Vande Bharat', avgSpeedKmh: 130 },
  { number: '22223', name: 'Amritsar Vande Bharat Express', from: 'New Delhi', fromCode: 'NDLS', to: 'Amritsar', toCode: 'ASR', category: 'Vande Bharat', avgSpeedKmh: 125 },

  // Tejas & Rajdhani Express
  { number: '12951', name: 'New Delhi Tejas Rajdhani Express', from: 'Mumbai Central', fromCode: 'MMCT', to: 'New Delhi', toCode: 'NDLS', category: 'Rajdhani', avgSpeedKmh: 130 },
  { number: '12952', name: 'Mumbai Tejas Rajdhani Express', from: 'New Delhi', fromCode: 'NDLS', to: 'Mumbai Central', toCode: 'MMCT', category: 'Rajdhani', avgSpeedKmh: 130 },
  { number: '12301', name: 'Howrah Rajdhani Express', from: 'New Delhi', fromCode: 'NDLS', to: 'Howrah', toCode: 'HWH', category: 'Rajdhani', avgSpeedKmh: 125 },
  { number: '12302', name: 'New Delhi Rajdhani Express', from: 'Howrah', fromCode: 'HWH', to: 'New Delhi', toCode: 'NDLS', category: 'Rajdhani', avgSpeedKmh: 125 },
  { number: '12309', name: 'Patna Rajdhani Express', from: 'New Delhi', fromCode: 'NDLS', to: 'Patna Junction', toCode: 'PNBE', category: 'Rajdhani', avgSpeedKmh: 120 },
  { number: '12313', name: 'Sealdah Rajdhani Express', from: 'New Delhi', fromCode: 'NDLS', to: 'Sealdah', toCode: 'SDAH', category: 'Rajdhani', avgSpeedKmh: 120 },
  { number: '12431', name: 'Thiruvananthapuram Rajdhani', from: 'Hazrat Nizamuddin', fromCode: 'NZM', to: 'Thiruvananthapuram', toCode: 'TVC', category: 'Rajdhani', avgSpeedKmh: 110 },
  { number: '12433', name: 'Chennai Rajdhani Express', from: 'Hazrat Nizamuddin', fromCode: 'NZM', to: 'Chennai Central', toCode: 'MAS', category: 'Rajdhani', avgSpeedKmh: 115 },
  { number: '22691', name: 'Bengaluru Rajdhani Express', from: 'KSR Bengaluru City', fromCode: 'SBC', to: 'Hazrat Nizamuddin', toCode: 'NZM', category: 'Rajdhani', avgSpeedKmh: 115 },

  // Shatabdi Express
  { number: '12001', name: 'Bhopal Shatabdi Express', from: 'New Delhi', fromCode: 'NDLS', to: 'Rani Kamlapati', toCode: 'RKMP', category: 'Shatabdi', avgSpeedKmh: 130 },
  { number: '12003', name: 'Lucknow Swarna Shatabdi', from: 'New Delhi', fromCode: 'NDLS', to: 'Lucknow', toCode: 'LKO', category: 'Shatabdi', avgSpeedKmh: 110 },
  { number: '12007', name: 'Chennai Shatabdi Express', from: 'Mysuru', fromCode: 'MYS', to: 'Chennai Central', toCode: 'MAS', category: 'Shatabdi', avgSpeedKmh: 110 },
  { number: '12009', name: 'Mumbai Shatabdi Express', from: 'Mumbai Central', fromCode: 'MMCT', to: 'Ahmedabad', toCode: 'ADI', category: 'Shatabdi', avgSpeedKmh: 115 },

  // Express & Superfast Corridors
  { number: '12621', name: 'Tamil Nadu Express', from: 'New Delhi', fromCode: 'NDLS', to: 'Chennai Central', toCode: 'MAS', category: 'Superfast', avgSpeedKmh: 110 },
  { number: '12625', name: 'Kerala Express', from: 'New Delhi', fromCode: 'NDLS', to: 'Thiruvananthapuram', toCode: 'TVC', category: 'Superfast', avgSpeedKmh: 105 },
  { number: '12627', name: 'Karnataka Express', from: 'New Delhi', fromCode: 'NDLS', to: 'KSR Bengaluru City', toCode: 'SBC', category: 'Superfast', avgSpeedKmh: 105 },
  { number: '12259', name: 'Sealdah Duronto Express', from: 'Sealdah', fromCode: 'SDAH', to: 'New Delhi', toCode: 'NDLS', category: 'Duronto', avgSpeedKmh: 120 },
];

/**
 * Search static database with rank scoring on train number, name, and station codes.
 */
export function queryTransitDatabase(query: string): TransitDbEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return TRANSIT_DATABASE.slice(0, 10);

  return TRANSIT_DATABASE.filter(
    (t) =>
      t.number.startsWith(q) ||
      t.name.toLowerCase().includes(q) ||
      t.from.toLowerCase().includes(q) ||
      t.to.toLowerCase().includes(q) ||
      t.fromCode.toLowerCase().includes(q) ||
      t.toCode.toLowerCase().includes(q)
  ).slice(0, 15);
}
