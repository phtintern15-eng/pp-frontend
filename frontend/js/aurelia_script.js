/**
 * Aurelia Private Estates - Self-Contained JavaScript Data & Logic
 * Comprehensive Luxury Real Estate Directory across 11 Countries
 */

// 1. International Properties Database (66+ Hand-Curated Luxury Estates)
let AURELIA_PROPERTIES = [
  // --- INDIA (6 Properties) ---
  {
    id: 'in-1',
    country: 'in',
    title: 'The Worli Ocean Penthouse',
    location: 'Worli Mumbai',
    city: 'Worli Mumbai',
    category: 'Penthouse',
    priceValue: 28, // Cr / Equivalent Tier
    priceDisplay: '₹28.5 Cr',
    priceTier: 'tier3',
    beds: '5 BHK',
    sqft: '8,200 sq.ft',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    description: 'Triple-height duplex overlooking the Arabian Sea with private infinity pool and dedicated high-speed elevators.'
  },
  {
    id: 'in-2',
    country: 'in',
    title: 'Pali Hill Portuguese Haven',
    location: 'Bandra',
    city: 'Bandra',
    category: 'Heritage Estate',
    priceValue: 18,
    priceDisplay: '₹18.0 Cr',
    priceTier: 'tier3',
    beds: '4 BHK',
    sqft: '5,500 sq.ft',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Colonial heritage bungalow nestled inside prestigious leafy Pali Hill with manicured courtyards.'
  },
  {
    id: 'in-3',
    country: 'in',
    title: 'Sanctuary of Palms Villa',
    location: 'Assagao Goa',
    city: 'Assagao Goa',
    category: 'Luxury Villa',
    priceValue: 12.5,
    priceDisplay: '₹12.5 Cr',
    priceTier: 'tier2',
    beds: '4 BHK',
    sqft: '6,400 sq.ft',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    description: 'Bespoke Balinese-Portuguese luxury villa surrounded by dense Goan greenery with private basalt pool.'
  },
  {
    id: 'in-4',
    country: 'in',
    title: 'The Glade Mansions',
    location: 'Whitefield Bengaluru',
    city: 'Whitefield Bengaluru',
    category: 'Luxury Villa',
    priceValue: 8.9,
    priceDisplay: '₹8.9 Cr',
    priceTier: 'tier1',
    beds: '5 BHK',
    sqft: '7,100 sq.ft',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    description: 'Contemporary smart villa within a golf reserve featuring double-height glass facades and water features.'
  },
  {
    id: 'in-5',
    country: 'in',
    title: 'Magnolia Sky Residence',
    location: 'Gurgaon NCR',
    city: 'Gurgaon NCR',
    category: 'Apartment',
    priceValue: 14.2,
    priceDisplay: '₹14.2 Cr',
    priceTier: 'tier2',
    beds: '4 BHK',
    sqft: '6,200 sq.ft',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    description: 'Ultra-luxury golf course condominium with direct elevator access and concierge service.'
  },
  {
    id: 'in-6',
    country: 'in',
    title: 'Lutyens Imperial Pavilion',
    location: 'Delhi NCR',
    city: 'Delhi NCR',
    category: 'Heritage Estate',
    priceValue: 45,
    priceDisplay: '₹45.0 Cr',
    priceTier: 'tier3',
    beds: '6 BHK',
    sqft: '11,500 sq.ft',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    description: 'Exclusive sovereign estate in Delhi with sprawling private botanical lawns and diplomatic security.'
  },

  // --- UAE (6 Properties) ---
  {
    id: 'ae-1',
    country: 'ae',
    title: 'The Billionaire Frond Villa',
    location: 'Palm Jumeirah',
    city: 'Palm Jumeirah',
    category: 'Luxury Villa',
    priceValue: 22,
    priceDisplay: 'AED 22.5M',
    priceTier: 'tier3',
    beds: '6 Beds',
    sqft: '10,800 sq.ft',
    image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80',
    description: 'Direct private beach access on Palm Jumeirah with panoramic views of the Dubai Marina skyline.'
  },
  {
    id: 'ae-2',
    country: 'ae',
    title: 'Burj Crown Panoramic Sky Palace',
    location: 'Downtown Dubai',
    city: 'Downtown Dubai',
    category: 'Penthouse',
    priceValue: 14.5,
    priceDisplay: 'AED 14.5M',
    priceTier: 'tier2',
    beds: '4 Beds',
    sqft: '6,400 sq.ft',
    image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80',
    description: 'Soaring penthouse directly facing Burj Khalifa with 360-degree wrapped terrace and spa salon.'
  },
  {
    id: 'ae-3',
    country: 'ae',
    title: 'Emirates Hills Golf Manor',
    location: 'Emirates Hills',
    city: 'Emirates Hills',
    category: 'Luxury Villa',
    priceValue: 26,
    priceDisplay: 'AED 26.0M',
    priceTier: 'tier3',
    beds: '7 Beds',
    sqft: '14,000 sq.ft',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    description: 'The Beverly Hills of Dubai. Bespoke neoclassical architecture overlooking the Montgomerie golf greens.'
  },
  {
    id: 'ae-4',
    country: 'ae',
    title: 'Saadiyat Island Coral Pavilion',
    location: 'Saadiyat Island',
    city: 'Saadiyat Island',
    category: 'Luxury Villa',
    priceValue: 9.8,
    priceDisplay: 'AED 9.8M',
    priceTier: 'tier1',
    beds: '5 Beds',
    sqft: '7,500 sq.ft',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    description: 'Eco-conscious beachfront sanctuary located adjacent to Louvre Abu Dhabi and cultural district.'
  },
  {
    id: 'ae-5',
    country: 'ae',
    title: 'Marina Gate Skyline Suite',
    location: 'Dubai Marina',
    city: 'Dubai Marina',
    category: 'Apartment',
    priceValue: 7.2,
    priceDisplay: 'AED 7.2M',
    priceTier: 'tier1',
    beds: '3 Beds',
    sqft: '3,800 sq.ft',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    description: 'Full marina view designer apartment with private yacht mooring berth and health club.'
  },
  {
    id: 'ae-6',
    country: 'ae',
    title: 'Al Barari Royal Lagoon Retreat',
    location: 'Al Barari',
    city: 'Al Barari',
    category: 'Luxury Villa',
    priceValue: 13.9,
    priceDisplay: 'AED 13.9M',
    priceTier: 'tier2',
    beds: '5 Beds',
    sqft: '8,900 sq.ft',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
    description: 'Botanical oasis with botanical streams, private organic farm, and subterranean cinema.'
  },

  // --- USA (6 Properties) ---
  {
    id: 'us-1',
    country: 'us',
    title: 'Bel Air Contemporary Atelier',
    location: 'California',
    city: 'California',
    category: 'Luxury Villa',
    priceValue: 24,
    priceDisplay: '$24.5M',
    priceTier: 'tier3',
    beds: '6 Beds',
    sqft: '11,200 sq.ft',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    description: 'Striking cantilevered glass architecture overlooking Los Angeles basin out to the Pacific Ocean.'
  },
  {
    id: 'us-2',
    country: 'us',
    title: 'Tribeca Cast Iron Triplex',
    location: 'New York',
    city: 'New York',
    category: 'Penthouse',
    priceValue: 19.5,
    priceDisplay: '$19.5M',
    priceTier: 'tier3',
    beds: '4 Beds',
    sqft: '6,800 sq.ft',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    description: 'Iconic cobblestone Tribeca loft with private rooftop heated pool, original beams, and wine cellar.'
  },
  {
    id: 'us-3',
    country: 'us',
    title: 'Star Island Waterfront Sanctuary',
    location: 'Florida',
    city: 'Florida',
    category: 'Luxury Villa',
    priceValue: 29,
    priceDisplay: '$29.0M',
    priceTier: 'tier3',
    beds: '7 Beds',
    sqft: '12,500 sq.ft',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    description: 'Miami ultra-prime deep-water frontage equipped for mega-yachts with resort-grade pool pavilion.'
  },
  {
    id: 'us-4',
    country: 'us',
    title: 'Lake Austin Modern Pavilion',
    location: 'Texas',
    city: 'Texas',
    category: 'Luxury Villa',
    priceValue: 11.8,
    priceDisplay: '$11.8M',
    priceTier: 'tier2',
    beds: '5 Beds',
    sqft: '8,400 sq.ft',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
    description: 'Limestone and cedar lakefront sanctuary with private motorized boat dock and infinity pool.'
  },
  {
    id: 'us-5',
    country: 'us',
    title: 'Central Park West Classical Suite',
    location: 'New York',
    city: 'New York',
    category: 'Apartment',
    priceValue: 8.5,
    priceDisplay: '$8.5M',
    priceTier: 'tier1',
    beds: '3 Beds',
    sqft: '3,600 sq.ft',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
    description: 'Full park views from pre-war white-glove building with wood-burning fireplaces and library.'
  },
  {
    id: 'us-6',
    country: 'us',
    title: 'Montecito Mediterranean Compound',
    location: 'California',
    city: 'California',
    category: 'Heritage Estate',
    priceValue: 13.5,
    priceDisplay: '$13.5M',
    priceTier: 'tier2',
    beds: '5 Beds',
    sqft: '7,900 sq.ft',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    description: 'Spanish colonial revival manor shaded by centenary olive trees and mountain views.'
  },

  // --- UNITED KINGDOM (6 Properties) ---
  {
    id: 'uk-1',
    country: 'uk',
    title: 'One Hyde Park Parkside Suite',
    location: 'London',
    city: 'London',
    category: 'Apartment',
    priceValue: 18.5,
    priceDisplay: '£18.5M',
    priceTier: 'tier3',
    beds: '4 Beds',
    sqft: '4,800 sq.ft',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    description: 'Knightsbridge icon with Mandarin Oriental 24-hour room service, wine cellar, and private cinema.'
  },
  {
    id: 'uk-2',
    country: 'uk',
    title: 'Cotswolds Manor & Equestrian Stud',
    location: 'Cotswolds',
    city: 'Cotswolds',
    category: 'Heritage Estate',
    priceValue: 12.0,
    priceDisplay: '£12.0M',
    priceTier: 'tier2',
    beds: '7 Beds',
    sqft: '10,500 sq.ft',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    description: 'Grade-II listed honey-stone manor set on 45 rolling private acres with equestrian facilities.'
  },
  {
    id: 'uk-3',
    country: 'uk',
    title: 'Cheyne Walk Riverside Mansion',
    location: 'Chelsea',
    city: 'Chelsea',
    category: 'Heritage Estate',
    priceValue: 21.0,
    priceDisplay: '£21.0M',
    priceTier: 'tier3',
    beds: '6 Beds',
    sqft: '8,200 sq.ft',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Historic Georgian townhome facing River Thames with landscaped walled garden and private garage.'
  },
  {
    id: 'uk-4',
    country: 'uk',
    title: 'Mayfair Mews House',
    location: 'London',
    city: 'London',
    category: 'Luxury Villa',
    priceValue: 7.9,
    priceDisplay: '£7.9M',
    priceTier: 'tier1',
    beds: '3 Beds',
    sqft: '3,200 sq.ft',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
    description: 'Discreet cobblestone mews home renovated to museum-quality standards in heart of Mayfair.'
  },
  {
    id: 'uk-5',
    country: 'uk',
    title: 'The Battersea Sky Penthouse',
    location: 'London',
    city: 'London',
    category: 'Penthouse',
    priceValue: 14.8,
    priceDisplay: '£14.8M',
    priceTier: 'tier2',
    beds: '4 Beds',
    sqft: '5,100 sq.ft',
    image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80',
    description: 'Direct Thames views perched atop iconic Battersea development with wrap-around glass terrace.'
  },
  {
    id: 'uk-6',
    country: 'uk',
    title: 'Surrey Hills Wentworth Estate',
    location: 'London',
    city: 'London',
    category: 'Luxury Villa',
    priceValue: 9.5,
    priceDisplay: '£9.5M',
    priceTier: 'tier1',
    beds: '5 Beds',
    sqft: '8,000 sq.ft',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    description: 'Private gated golf compound with indoor pool, steam room, and direct access to fairway.'
  },

  // --- CANADA (6 Properties) ---
  {
    id: 'ca-1',
    country: 'ca',
    title: 'The Bridle Path French Chateau',
    location: 'Toronto',
    city: 'Toronto',
    category: 'Heritage Estate',
    priceValue: 17.5,
    priceDisplay: '$17.5M CAD',
    priceTier: 'tier3',
    beds: '6 Beds',
    sqft: '14,500 sq.ft',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    description: 'Limestone estate in Toronto Millionaires Row with indoor ballroom, indoor pool, and wine vault.'
  },
  {
    id: 'ca-2',
    country: 'ca',
    title: 'West Vancouver Oceanfront Cliffhouse',
    location: 'Vancouver',
    city: 'Vancouver',
    category: 'Luxury Villa',
    priceValue: 13.8,
    priceDisplay: '$13.8M CAD',
    priceTier: 'tier2',
    beds: '5 Beds',
    sqft: '7,800 sq.ft',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    description: 'Cantilevered architectural glass residence offering unobstructed views of English Bay.'
  },
  {
    id: 'ca-3',
    country: 'ca',
    title: 'Yorkville Four Seasons Penthouse',
    location: 'Toronto',
    city: 'Toronto',
    category: 'Penthouse',
    priceValue: 8.9,
    priceDisplay: '$8.9M CAD',
    priceTier: 'tier1',
    beds: '3 Beds',
    sqft: '4,200 sq.ft',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    description: 'Hotel-serviced penthouse in prime Yorkville with bespoke marble baths and 11-foot ceilings.'
  },
  {
    id: 'ca-4',
    country: 'ca',
    title: 'Golden Square Mile Heritage Manor',
    location: 'Montreal',
    city: 'Montreal',
    category: 'Heritage Estate',
    priceValue: 7.5,
    priceDisplay: '$7.5M CAD',
    priceTier: 'tier1',
    beds: '6 Beds',
    sqft: '8,200 sq.ft',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Historic Mont-Royal stone mansion featuring hand-carved millwork and modern glass extension.'
  },
  {
    id: 'ca-5',
    country: 'ca',
    title: 'Shaughnessy Classical Residence',
    location: 'Vancouver',
    city: 'Vancouver',
    category: 'Luxury Villa',
    priceValue: 11.2,
    priceDisplay: '$11.2M CAD',
    priceTier: 'tier2',
    beds: '5 Beds',
    sqft: '6,900 sq.ft',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
    description: 'First Shaughnessy estate set on expansive manicured grounds with heated stone driveway.'
  },
  {
    id: 'ca-6',
    country: 'ca',
    title: 'Outremont Forest Villa',
    location: 'Montreal',
    city: 'Montreal',
    category: 'Luxury Villa',
    priceValue: 6.8,
    priceDisplay: '$6.8M CAD',
    priceTier: 'tier1',
    beds: '4 Beds',
    sqft: '5,500 sq.ft',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    description: 'Serene contemporary estate integrated seamlessly into Mount Royal natural forestry.'
  },

  // --- AUSTRALIA (6 Properties) ---
  {
    id: 'au-1',
    country: 'au',
    title: 'Point Piper Harbourfront Pavilion',
    location: 'Sydney',
    city: 'Sydney',
    category: 'Luxury Villa',
    priceValue: 31,
    priceDisplay: '$31.0M AUD',
    priceTier: 'tier3',
    beds: '5 Beds',
    sqft: '9,200 sq.ft',
    image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80',
    description: 'Direct deep-water harbour frontage overlooking Sydney Harbour Bridge and Opera House.'
  },
  {
    id: 'au-2',
    country: 'au',
    title: 'Toorak Georgian Botanical Manor',
    location: 'Melbourne',
    city: 'Melbourne',
    category: 'Heritage Estate',
    priceValue: 14.5,
    priceDisplay: '$14.5M AUD',
    priceTier: 'tier2',
    beds: '6 Beds',
    sqft: '10,000 sq.ft',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Prestigious Toorak cul-de-sac residence with tennis court, pavilion, and temperature cellar.'
  },
  {
    id: 'au-3',
    country: 'au',
    title: 'Main Beach Oceanfront Penthouse',
    location: 'Gold Coast',
    city: 'Gold Coast',
    category: 'Penthouse',
    priceValue: 8.8,
    priceDisplay: '$8.8M AUD',
    priceTier: 'tier1',
    beds: '4 Beds',
    sqft: '6,200 sq.ft',
    image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80',
    description: 'Uninterrupted Pacific Ocean panorama with private sky-deck pool and private boat berth.'
  },
  {
    id: 'au-4',
    country: 'au',
    title: 'Darling Point Sky Residence',
    location: 'Sydney',
    city: 'Sydney',
    category: 'Apartment',
    priceValue: 12.2,
    priceDisplay: '$12.2M AUD',
    priceTier: 'tier2',
    beds: '3 Beds',
    sqft: '4,100 sq.ft',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    description: 'Bespoke European renovation overlooking yacht marina with private double garage.'
  },
  {
    id: 'au-5',
    country: 'au',
    title: 'South Yarra Minimalist Masterpiece',
    location: 'Melbourne',
    city: 'Melbourne',
    category: 'Luxury Villa',
    priceValue: 9.1,
    priceDisplay: '$9.1M AUD',
    priceTier: 'tier1',
    beds: '4 Beds',
    sqft: '5,800 sq.ft',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    description: 'Architect-designed concrete and glass sculpture walking distance to Royal Botanic Gardens.'
  },
  {
    id: 'au-6',
    country: 'au',
    title: 'Sovereign Islands Waterfront Haven',
    location: 'Gold Coast',
    city: 'Gold Coast',
    category: 'Luxury Villa',
    priceValue: 16.5,
    priceDisplay: '$16.5M AUD',
    priceTier: 'tier3',
    beds: '6 Beds',
    sqft: '11,000 sq.ft',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    description: 'Guard-gated island estate engineered for superyacht mooring with 25-meter lap pool.'
  },

  // --- SINGAPORE (6 Properties) ---
  {
    id: 'sg-1',
    country: 'sg',
    title: 'Nassim Road Good Class Bungalow (GCB)',
    location: 'Nassim',
    city: 'Nassim',
    category: 'Luxury Villa',
    priceValue: 35,
    priceDisplay: 'S$35.0M',
    priceTier: 'tier3',
    beds: '6 Beds',
    sqft: '14,000 sq.ft',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    description: 'Singapores most prestigious embassy address set amidst dense private jungle and koi streams.'
  },
  {
    id: 'sg-2',
    country: 'sg',
    title: 'Sentosa Cove Oceanfront Berth Villa',
    location: 'Sentosa Cove',
    city: 'Sentosa Cove',
    category: 'Luxury Villa',
    priceValue: 18.2,
    priceDisplay: 'S$18.2M',
    priceTier: 'tier3',
    beds: '5 Beds',
    sqft: '8,500 sq.ft',
    image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80',
    description: 'Only location in Singapore where foreign nationals can acquire titled luxury waterfront land.'
  },
  {
    id: 'sg-3',
    country: 'sg',
    title: 'The Marq on Paterson Hill',
    location: 'Orchard',
    city: 'Orchard',
    category: 'Apartment',
    priceValue: 13.5,
    priceDisplay: 'S$13.5M',
    priceTier: 'tier2',
    beds: '4 Beds',
    sqft: '6,300 sq.ft',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    description: 'Private 15-meter cantilevered lap pool built directly into the living room balcony.'
  },
  {
    id: 'sg-4',
    country: 'sg',
    title: 'Sculptura Ardmore Super Penthouse',
    location: 'Orchard',
    city: 'Orchard',
    category: 'Penthouse',
    priceValue: 24.0,
    priceDisplay: 'S$24.0M',
    priceTier: 'tier3',
    beds: '5 Beds',
    sqft: '9,200 sq.ft',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    description: 'Commanding top 3 floors of Ardmore Park with private sky gym, private garage elevator.'
  },
  {
    id: 'sg-5',
    country: 'sg',
    title: 'Seven Palms Coral Villa',
    location: 'Sentosa Cove',
    city: 'Sentosa Cove',
    category: 'Apartment',
    priceValue: 9.5,
    priceDisplay: 'S$9.5M',
    priceTier: 'tier1',
    beds: '3 Beds',
    sqft: '4,100 sq.ft',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    description: 'Low-rise beachfront condominium designed by Kerry Hill directly fronting South China Sea.'
  },
  {
    id: 'sg-6',
    country: 'sg',
    title: 'Cluny Hill Architectural Bungalow',
    location: 'Nassim',
    city: 'Nassim',
    category: 'Luxury Villa',
    priceValue: 28.0,
    priceDisplay: 'S$28.0M',
    priceTier: 'tier3',
    beds: '5 Beds',
    sqft: '11,000 sq.ft',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    description: 'Adjacent to Singapore Botanic Gardens (UNESCO Heritage) with geothermal cooling.'
  },

  // --- FRANCE (6 Properties) ---
  {
    id: 'fr-1',
    country: 'fr',
    title: 'Villa Bel Horizon Cap d\'Antibes',
    location: 'French Riviera',
    city: 'French Riviera',
    category: 'Luxury Villa',
    priceValue: 22.5,
    priceDisplay: '€22.5M',
    priceTier: 'tier3',
    beds: '7 Beds',
    sqft: '9,800 sq.ft',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    description: 'Legendary Belle Époque mansion with private Mediterranean sea access, helipad, and guest cottages.'
  },
  {
    id: 'fr-2',
    country: 'fr',
    title: 'Avenue Montaigne Haussmannian Jewel',
    location: 'Paris',
    city: 'Paris',
    category: 'Apartment',
    priceValue: 12.8,
    priceDisplay: '€12.8M',
    priceTier: 'tier2',
    beds: '4 Beds',
    sqft: '4,900 sq.ft',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    description: 'Direct Eiffel Tower views in Golden Triangle featuring 19th-century gilt ceilings and parquet floors.'
  },
  {
    id: 'fr-3',
    country: 'fr',
    title: 'Les Parcs de Saint-Tropez Waterfront',
    location: 'Saint-Tropez',
    city: 'Saint-Tropez',
    category: 'Luxury Villa',
    priceValue: 26.0,
    priceDisplay: '€26.0M',
    priceTier: 'tier3',
    beds: '6 Beds',
    sqft: '8,500 sq.ft',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    description: 'Ultra-exclusive private domain in Saint-Tropez with 24/7 armed security and private mooring.'
  },
  {
    id: 'fr-4',
    country: 'fr',
    title: 'Place des Vosges Heritage Hôtel Particulier',
    location: 'Paris',
    city: 'Paris',
    category: 'Heritage Estate',
    priceValue: 16.5,
    priceDisplay: '€16.5M',
    priceTier: 'tier3',
    beds: '5 Beds',
    sqft: '6,200 sq.ft',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    description: '17th-century private mansion in Paris oldest planned square with private courtyard.'
  },
  {
    id: 'fr-5',
    country: 'fr',
    title: 'Cannes Croisette Sky Terrace',
    location: 'French Riviera',
    city: 'French Riviera',
    category: 'Penthouse',
    priceValue: 8.5,
    priceDisplay: '€8.5M',
    priceTier: 'tier1',
    beds: '3 Beds',
    sqft: '3,800 sq.ft',
    image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80',
    description: 'Frontline panoramic sea views overlooking the Palais des Festivals with private rooftop jacuzzi.'
  },
  {
    id: 'fr-6',
    country: 'fr',
    title: 'Ramatuelle Pine Forest Bastide',
    location: 'Saint-Tropez',
    city: 'Saint-Tropez',
    category: 'Luxury Villa',
    priceValue: 9.8,
    priceDisplay: '€9.8M',
    priceTier: 'tier1',
    beds: '5 Beds',
    sqft: '5,900 sq.ft',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
    description: 'Authentic stone country estate overlooking Pampelonne Beach with olive groves.'
  },

  // --- GERMANY (6 Properties) ---
  {
    id: 'de-1',
    country: 'de',
    title: 'Lake Starnberg Grand Shore Estate',
    location: 'Lake Starnberg',
    city: 'Lake Starnberg',
    category: 'Heritage Estate',
    priceValue: 18.0,
    priceDisplay: '€18.0M',
    priceTier: 'tier3',
    beds: '7 Beds',
    sqft: '12,000 sq.ft',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    description: 'Rare private lakefront access on Lake Starnberg with private boathouse and Alpine vistas.'
  },
  {
    id: 'de-2',
    country: 'de',
    title: 'Bogenhausen Bauhaus Villa',
    location: 'Munich',
    city: 'Munich',
    category: 'Luxury Villa',
    priceValue: 12.5,
    priceDisplay: '€12.5M',
    priceTier: 'tier2',
    beds: '5 Beds',
    sqft: '7,500 sq.ft',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    description: 'Munich premier diplomatic quarter. Architectural villa with geothermal energy and indoor pool.'
  },
  {
    id: 'de-3',
    country: 'de',
    title: 'Grunewald Forest Diplomatic Residence',
    location: 'Berlin',
    city: 'Berlin',
    category: 'Luxury Villa',
    priceValue: 9.2,
    priceDisplay: '€9.2M',
    priceTier: 'tier1',
    beds: '6 Beds',
    sqft: '8,400 sq.ft',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    description: 'Peaceful villa in Berlins historic billionaire forest with secure gated motor court.'
  },
  {
    id: 'de-4',
    country: 'de',
    title: 'Mitte Industrial Rooftop Penthouse',
    location: 'Berlin',
    city: 'Berlin',
    category: 'Penthouse',
    priceValue: 6.8,
    priceDisplay: '€6.8M',
    priceTier: 'tier1',
    beds: '3 Beds',
    sqft: '4,600 sq.ft',
    image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80',
    description: 'Dramatic loft penthouse with 360-degree Berlin TV Tower views and private elevator.'
  },
  {
    id: 'de-5',
    country: 'de',
    title: 'Nymphenburg Canal Palace Residence',
    location: 'Munich',
    city: 'Munich',
    category: 'Heritage Estate',
    priceValue: 14.8,
    priceDisplay: '€14.8M',
    priceTier: 'tier2',
    beds: '5 Beds',
    sqft: '9,100 sq.ft',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Historic villa directly overlooking the royal palace canal with protected private parklands.'
  },
  {
    id: 'de-6',
    country: 'de',
    title: 'Tutzing Alpine Panorama Villa',
    location: 'Lake Starnberg',
    city: 'Lake Starnberg',
    category: 'Luxury Villa',
    priceValue: 11.5,
    priceDisplay: '€11.5M',
    priceTier: 'tier2',
    beds: '5 Beds',
    sqft: '6,800 sq.ft',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    description: 'Contemporary eco-mansion with floor-to-ceiling glass capturing both lake and Zugspitze peak.'
  },

  // --- SWITZERLAND (6 Properties) ---
  {
    id: 'ch-1',
    country: 'ch',
    title: 'Cologny Waterfront Estate',
    location: 'Geneva',
    city: 'Geneva',
    category: 'Luxury Villa',
    priceValue: 28.0,
    priceDisplay: 'CHF 28.0M',
    priceTier: 'tier3',
    beds: '6 Beds',
    sqft: '11,000 sq.ft',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    description: 'Prestigious Cologny hillside overlooking Lake Geneva and the Jet d\'Eau with private dock.'
  },
  {
    id: 'ch-2',
    country: 'ch',
    title: 'Badrutt\'s Way Alpine Chalet',
    location: 'St. Moritz',
    city: 'St. Moritz',
    category: 'Heritage Estate',
    priceValue: 24.5,
    priceDisplay: 'CHF 24.5M',
    priceTier: 'tier3',
    beds: '7 Beds',
    sqft: '9,500 sq.ft',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    description: 'Exclusive ski-in ski-out timber and stone chalet with wellness spa, heated indoor pool, and ski lounge.'
  },
  {
    id: 'ch-3',
    country: 'ch',
    title: 'Zürichberg Gold Coast Pavilion',
    location: 'Zurich',
    city: 'Zurich',
    category: 'Luxury Villa',
    priceValue: 15.8,
    priceDisplay: 'CHF 15.8M',
    priceTier: 'tier3',
    beds: '5 Beds',
    sqft: '7,800 sq.ft',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    description: 'High above Zurich city with panorama of Lake Zurich, infinity pool, and underground 6-car gallery.'
  },
  {
    id: 'ch-4',
    country: 'ch',
    title: 'Old Town Geneva Duplex Penthouse',
    location: 'Geneva',
    city: 'Geneva',
    category: 'Penthouse',
    priceValue: 9.8,
    priceDisplay: 'CHF 9.8M',
    priceTier: 'tier1',
    beds: '4 Beds',
    sqft: '4,800 sq.ft',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    description: 'Exquisitely preserved historic beamed residence minutes from banking district and luxury boutiques.'
  },
  {
    id: 'ch-5',
    country: 'ch',
    title: 'Suvretta Hill Top Residence',
    location: 'St. Moritz',
    city: 'St. Moritz',
    category: 'Luxury Villa',
    priceValue: 14.0,
    priceDisplay: 'CHF 14.0M',
    priceTier: 'tier2',
    beds: '5 Beds',
    sqft: '6,900 sq.ft',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    description: 'Situated on the Suvretta corridor with direct ski access and private pine forest.'
  },
  {
    id: 'ch-6',
    country: 'ch',
    title: 'Küsnacht Lakefront Villa',
    location: 'Zurich',
    city: 'Zurich',
    category: 'Luxury Villa',
    priceValue: 11.2,
    priceDisplay: 'CHF 11.2M',
    priceTier: 'tier2',
    beds: '4 Beds',
    sqft: '5,500 sq.ft',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
    description: 'Prime Zurich Gold Coast address with private stone pier, sauna, and sun terrace.'
  },

  // --- JAPAN (6 Properties) ---
  {
    id: 'jp-1',
    country: 'jp',
    title: 'Minami-Aoyama Glass Sanctuary',
    location: 'Tokyo',
    city: 'Tokyo',
    category: 'Luxury Villa',
    priceValue: 16.5,
    priceDisplay: '¥2.4 Billion',
    priceTier: 'tier3',
    beds: '4 Beds',
    sqft: '6,200 sq.ft',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    description: 'Custom contemporary freestanding residence in Tokyo fashion capital with private bamboo courtyard.'
  },
  {
    id: 'jp-2',
    country: 'jp',
    title: 'Niseko Hanazono Ski Chalet',
    location: 'Niseko',
    city: 'Niseko',
    category: 'Luxury Villa',
    priceValue: 12.0,
    priceDisplay: '¥1.8 Billion',
    priceTier: 'tier2',
    beds: '5 Beds',
    sqft: '7,400 sq.ft',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    description: 'Ski-in ski-out modern timber masterpiece with natural onsen hot spring bath and Mount Yotei views.'
  },
  {
    id: 'jp-3',
    country: 'jp',
    title: 'Higashiyama Heritage Sukiya Estate',
    location: 'Kyoto',
    city: 'Kyoto',
    category: 'Heritage Estate',
    priceValue: 14.5,
    priceDisplay: '¥2.1 Billion',
    priceTier: 'tier2',
    beds: '5 Beds',
    sqft: '8,000 sq.ft',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    description: 'Century-old restored master estate adjacent to Nanzen-ji temple with cascading stream garden.'
  },
  {
    id: 'jp-4',
    country: 'jp',
    title: 'Toranomon Hills Tower Penthouse',
    location: 'Tokyo',
    city: 'Tokyo',
    category: 'Penthouse',
    priceValue: 22.0,
    priceDisplay: '¥3.2 Billion',
    priceTier: 'tier3',
    beds: '4 Beds',
    sqft: '5,500 sq.ft',
    image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80',
    description: 'Soaring over Tokyo Tower with Hyatt Andaz luxury hotel services and private sky lounge.'
  },
  {
    id: 'jp-5',
    country: 'jp',
    title: 'Kamo River View Kyoto Residence',
    location: 'Kyoto',
    city: 'Kyoto',
    category: 'Apartment',
    priceValue: 7.8,
    priceDisplay: '¥1.1 Billion',
    priceTier: 'tier1',
    beds: '3 Beds',
    sqft: '3,400 sq.ft',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    description: 'Rare frontline view of Kamo River and Higashiyama mountains with Hinoki wood baths.'
  },
  {
    id: 'jp-6',
    country: 'jp',
    title: 'Hirafu Grand Lodge',
    location: 'Niseko',
    city: 'Niseko',
    category: 'Luxury Villa',
    priceValue: 8.9,
    priceDisplay: '¥1.3 Billion',
    priceTier: 'tier1',
    beds: '4 Beds',
    sqft: '5,000 sq.ft',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    description: 'Expansive private ski lodge walking distance to Hirafu gondola with outdoor stone onsen.'
  }
];

// Country Meta Mapping (Flags, Display Names, Locations)
const COUNTRY_META = {
  all: {
    name: 'All Registered Portfolios',
    flag: '🌍',
    currency: 'Multi-Currency',
    priceLabels: {
      tier1: 'Under ₹10 Cr / $10M',
      tier2: '₹10 - ₹15 Cr / $10M - $15M',
      tier3: 'Above ₹15 Cr / $15M+'
    },
    locations: ['Bangalore', 'Mumbai', 'Delhi NCR', 'Dubai', 'London', 'New York', 'Paris', 'California', 'Sydney', 'Tokyo', 'Zurich']
  },
  in: {
    name: 'India',
    flag: '🇮🇳',
    currency: '₹ INR (Cr)',
    priceLabels: {
      tier1: 'Under ₹10 Cr',
      tier2: '₹10 - ₹15 Cr',
      tier3: 'Above ₹15 Cr'
    },
    locations: ['Worli Mumbai', 'Bandra', 'Assagao Goa', 'Whitefield Bengaluru', 'Gurgaon NCR', 'Delhi NCR']
  },
  ae: {
    name: 'UAE',
    flag: '🇦🇪',
    currency: 'AED',
    priceLabels: {
      tier1: 'Under AED 10M',
      tier2: 'AED 10M - 15M',
      tier3: 'Above AED 15M+'
    },
    locations: ['Palm Jumeirah', 'Downtown Dubai', 'Emirates Hills', 'Saadiyat Island', 'Dubai Marina', 'Al Barari']
  },
  us: {
    name: 'USA',
    flag: '🇺🇸',
    currency: '$ USD',
    priceLabels: {
      tier1: 'Under $10M',
      tier2: '$10M - $15M',
      tier3: 'Above $15M+'
    },
    locations: ['California', 'New York', 'Texas', 'Florida']
  },
  uk: {
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: '£ GBP',
    priceLabels: {
      tier1: 'Under £10M',
      tier2: '£10M - £15M',
      tier3: 'Above £15M+'
    },
    locations: ['London', 'Cotswolds', 'Chelsea']
  },
  ca: {
    name: 'Canada',
    flag: '🇨🇦',
    currency: '$ CAD',
    priceLabels: {
      tier1: 'Under $10M CAD',
      tier2: '$10M - $15M CAD',
      tier3: 'Above $15M CAD+'
    },
    locations: ['Toronto', 'Vancouver', 'Montreal']
  },
  au: {
    name: 'Australia',
    flag: '🇦🇺',
    currency: '$ AUD',
    priceLabels: {
      tier1: 'Under $10M AUD',
      tier2: '$10M - $15M AUD',
      tier3: 'Above $15M AUD+'
    },
    locations: ['Sydney', 'Melbourne', 'Gold Coast']
  },
  sg: {
    name: 'Singapore',
    flag: '🇸🇬',
    currency: 'S$ SGD',
    priceLabels: {
      tier1: 'Under S$10M',
      tier2: 'S$10M - S$15M',
      tier3: 'Above S$15M+'
    },
    locations: ['Nassim', 'Sentosa Cove', 'Orchard']
  },
  fr: {
    name: 'France',
    flag: '🇫🇷',
    currency: '€ EUR',
    priceLabels: {
      tier1: 'Under €10M',
      tier2: '€10M - €15M',
      tier3: 'Above €15M+'
    },
    locations: ['Paris', 'French Riviera', 'Saint-Tropez']
  },
  de: {
    name: 'Germany',
    flag: '🇩🇪',
    currency: '€ EUR',
    priceLabels: {
      tier1: 'Under €10M',
      tier2: '€10M - €15M',
      tier3: 'Above €15M+'
    },
    locations: ['Munich', 'Berlin', 'Lake Starnberg']
  },
  ch: {
    name: 'Switzerland',
    flag: '🇨🇭',
    currency: 'CHF',
    priceLabels: {
      tier1: 'Under CHF 10M',
      tier2: 'CHF 10M - 15M',
      tier3: 'Above CHF 15M+'
    },
    locations: ['Geneva', 'Zurich', 'St. Moritz']
  },
  jp: {
    name: 'Japan',
    flag: '🇯🇵',
    currency: '¥ JPY',
    priceLabels: {
      tier1: 'Under ¥1.5B',
      tier2: '¥1.5B - ¥2.0B',
      tier3: 'Above ¥2.0B+'
    },
    locations: ['Tokyo', 'Kyoto', 'Niseko']
  }
};

// 2. Favorites Persistence using LocalStorage & Saved Drawer Handlers
function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem('prime_saved_properties') || '[]');
  } catch (e) {
    return [];
  }
}

function updateSavedCountBadge() {
  const favs = getFavorites();
  const badges = document.querySelectorAll('#savedCountBadge, .saved-badge, #savedDrawerCount');
  badges.forEach(b => {
    b.textContent = favs.length;
  });
}

function toggleFavorite(id, e) {
  if (e) e.stopPropagation();
  let favs = getFavorites();
  const strId = String(id);
  const idx = favs.findIndex(item => String(item) === strId);
  if (idx > -1) {
    favs.splice(idx, 1);
  } else {
    favs.push(strId);
  }
  localStorage.setItem('prime_saved_properties', JSON.stringify(favs));
  
  // Update button visual
  const btns = document.querySelectorAll(`[data-fav-id="${id}"]`);
  btns.forEach(btn => {
    const isNowFav = favs.some(item => String(item) === strId);
    btn.classList.toggle('active', isNowFav);
    const icon = btn.querySelector('i');
    if (icon) {
      icon.style.color = isNowFav ? '#FFDF73' : '';
    }
  });
  updateSavedCountBadge();
  if (typeof renderSavedDrawerItems === 'function') {
    renderSavedDrawerItems();
  }
}

function openSavedDrawer() {
  const drawer = document.getElementById('savedDrawerOverlay');
  if (drawer) {
    renderSavedDrawerItems();
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeSavedDrawer(e) {
  if (e && e.target && e.target.id !== 'savedDrawerOverlay' && !e.target.closest('.saved-drawer-close')) return;
  const drawer = document.getElementById('savedDrawerOverlay');
  if (drawer) {
    drawer.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function clearAllSavedProperties() {
  localStorage.setItem('prime_saved_properties', JSON.stringify([]));
  const btns = document.querySelectorAll('.property-fav-btn');
  btns.forEach(btn => {
    btn.classList.remove('active');
    const icon = btn.querySelector('i');
    if (icon) icon.style.color = '';
  });
  updateSavedCountBadge();
  renderSavedDrawerItems();
}

function renderSavedDrawerItems() {
  const container = document.getElementById('savedDrawerList');
  if (!container) return;
  
  const favs = getFavorites();
  const countBadge = document.getElementById('savedDrawerCount');
  if (countBadge) countBadge.textContent = favs.length;

  if (favs.length === 0) {
    container.innerHTML = `
      <div class="saved-drawer-empty">
        <i class="fas fa-bookmark"></i>
        <h4>No Saved Properties Yet</h4>
        <p>Click the bookmark icon on any property card to save it to your private collection.</p>
        <button type="button" class="btn-outline" style="margin-top: 1.5rem; padding: 0.65rem 1.4rem; border-radius: 999px;" onclick="closeSavedDrawer()">
          <i class="fas fa-compass"></i> Explore Properties
        </button>
      </div>
    `;
    return;
  }

  // Find saved property objects from AURELIA_PROPERTIES or fallback
  const savedList = [];
  favs.forEach(favId => {
    const strFavId = String(favId);
    let prop = AURELIA_PROPERTIES.find(p => String(p.id) === strFavId || String(p.rawDbId) === strFavId);
    if (!prop && typeof propertiesData !== 'undefined' && Array.isArray(propertiesData)) {
      const pData = propertiesData.find(p => String(p.id) === strFavId);
      if (pData) {
        prop = {
          id: String(pData.id),
          title: pData.title,
          location: pData.location,
          priceDisplay: pData.price,
          image: pData.image
        };
      }
    }
    if (prop) {
      savedList.push(prop);
    }
  });

  if (savedList.length === 0) {
    container.innerHTML = `
      <div class="saved-drawer-empty">
        <i class="fas fa-bookmark"></i>
        <h4>${favs.length} Saved Collection Item${favs.length > 1 ? 's' : ''}</h4>
        <p>Your saved estates are stored. Browse our catalog to add or view more residences.</p>
        <button type="button" class="btn-outline" style="margin-top: 1.5rem; padding: 0.65rem 1.4rem; border-radius: 999px;" onclick="closeSavedDrawer()">
          <i class="fas fa-compass"></i> Explore Properties
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = savedList.map(p => `
    <div class="saved-drawer-item" onclick="openPropertyInquiryModal('${p.id}'); closeSavedDrawer();" style="cursor: pointer;" title="Click to view details">
      <img src="${p.image}" alt="${p.title}">
      <div class="saved-drawer-item-info">
        <div class="saved-drawer-item-title">${p.title}</div>
        <div class="saved-drawer-item-loc"><i class="fas fa-location-dot"></i> ${p.location}</div>
        <div class="saved-drawer-item-price">${p.priceDisplay || p.price || ''}</div>
      </div>
      <button class="saved-drawer-item-remove" onclick="event.stopPropagation(); toggleFavorite('${p.id}', event);" title="Remove from collection">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  `).join('');
}

// 3. Welcome Page Logic (index.html)
function initWelcomePage() {
  const ctaBtn = document.getElementById('viewPropertiesCta');
  const countrySelect = document.getElementById('targetCountrySelect');

  if (ctaBtn && countrySelect) {
    ctaBtn.addEventListener('click', () => {
      const selected = countrySelect.value;
      if (selected) {
        window.location.href = `properties.html?country=${selected}`;
      }
    });

    countrySelect.addEventListener('change', (e) => {
      if (e.target.value) {
        // Optional smooth trigger
      }
    });
  }

  // Mobile menu toggle
  initMobileMenu();
}

// Helper to transform database properties from MySQL into Aurelia card models
function mapDbPropertyToAurelia(p) {
  const city = (p.city || '').trim();
  const state = (p.state || '').trim();
  const addr = (p.address || '').trim();
  const stateUpper = state.toUpperCase();
  const cityLower = city.toLowerCase();
  const fullLoc = (cityLower + ' ' + stateUpper + ' ' + addr.toLowerCase()).toLowerCase();

  let country = 'in';
  if (stateUpper === 'IN' || stateUpper === 'KARNATAKA' || cityLower.includes('mumbai') || cityLower.includes('bangalore') || cityLower.includes('bengaluru') || cityLower.includes('goa') || cityLower.includes('delhi') || cityLower.includes('gurgaon') || cityLower.includes('bandra') || cityLower.includes('assagao') || cityLower.includes('whitefield')) {
    country = 'in';
  } else if (stateUpper === 'AE' || fullLoc.includes('dubai') || fullLoc.includes('palm jumeirah') || fullLoc.includes('emirates') || fullLoc.includes('abu dhabi') || fullLoc.includes('saadiyat') || fullLoc.includes('barari')) {
    country = 'ae';
  } else if (stateUpper === 'UK' || fullLoc.includes('london') || fullLoc.includes('cotswolds') || fullLoc.includes('chelsea') || fullLoc.includes('mayfair') || fullLoc.includes('surrey') || fullLoc.includes('wentworth')) {
    country = 'uk';
  } else if (cityLower.includes('toronto') || cityLower.includes('vancouver') || cityLower.includes('montreal') || cityLower.includes('outremont') || (stateUpper === 'CA' && (cityLower.includes('toronto') || cityLower.includes('vancouver') || cityLower.includes('montreal')))) {
    country = 'ca';
  } else if (stateUpper === 'AU' || fullLoc.includes('sydney') || fullLoc.includes('melbourne') || fullLoc.includes('gold coast') || fullLoc.includes('toorak')) {
    country = 'au';
  } else if (stateUpper === 'SG' || fullLoc.includes('singapore') || fullLoc.includes('nassim') || fullLoc.includes('sentosa') || fullLoc.includes('orchard')) {
    country = 'sg';
  } else if (stateUpper === 'FR' || fullLoc.includes('paris') || fullLoc.includes('riviera') || fullLoc.includes('saint-tropez') || fullLoc.includes('cannes') || fullLoc.includes('cap d') || fullLoc.includes('antibes')) {
    country = 'fr';
  } else if (stateUpper === 'DE' || fullLoc.includes('berlin') || fullLoc.includes('munich') || fullLoc.includes('starnberg') || fullLoc.includes('tutzing')) {
    country = 'de';
  } else if (stateUpper === 'CH' || stateUpper === 'GRAUBÜNDEN' || fullLoc.includes('zurich') || fullLoc.includes('geneva') || fullLoc.includes('st. moritz') || fullLoc.includes('switzerland') || fullLoc.includes('cologny') || fullLoc.includes('suvretta')) {
    country = 'ch';
  } else if (stateUpper === 'JP' || fullLoc.includes('tokyo') || fullLoc.includes('kyoto') || fullLoc.includes('niseko') || fullLoc.includes('japan')) {
    country = 'jp';
  } else if (stateUpper === 'US' || stateUpper === 'FL' || stateUpper === 'COLORADO' || stateUpper === 'TEXAS' || stateUpper === 'NEW YORK' || stateUpper === 'CA' || fullLoc.includes('beverly hills') || fullLoc.includes('manhattan') || fullLoc.includes('tribeca') || fullLoc.includes('aspen') || fullLoc.includes('miami') || fullLoc.includes('los angeles') || fullLoc.includes('california') || fullLoc.includes('austin')) {
    country = 'us';
  } else {
    country = 'in'; // Default to India
  }

  // Price formatting
  const numPrice = Number(p.price) || 0;
  let priceDisplay = '';
  let priceTier = 'tier1';

  if (country === 'in') {
    if (numPrice >= 10000000) {
      priceDisplay = '₹' + (numPrice / 10000000).toFixed(2).replace(/\.00$/, '') + ' Cr';
      priceTier = numPrice >= 20000000 ? 'tier3' : (numPrice >= 10000000 ? 'tier2' : 'tier1');
    } else if (numPrice >= 100000) {
      priceDisplay = '₹' + (numPrice / 100000).toFixed(2).replace(/\.00$/, '') + ' Lakh';
      priceTier = 'tier1';
    } else {
      priceDisplay = '₹' + numPrice.toLocaleString('en-IN');
      if (p.listing_type === 'rent') priceDisplay += '/mo';
      priceTier = 'tier1';
    }
  } else if (country === 'us') {
    priceDisplay = '$' + numPrice.toLocaleString();
    priceTier = numPrice >= 15000000 ? 'tier3' : (numPrice >= 10000000 ? 'tier2' : 'tier1');
  } else if (country === 'ae') {
    priceDisplay = 'AED ' + numPrice.toLocaleString();
    priceTier = numPrice >= 15000000 ? 'tier3' : (numPrice >= 10000000 ? 'tier2' : 'tier1');
  } else if (country === 'uk') {
    priceDisplay = '£' + numPrice.toLocaleString();
    priceTier = numPrice >= 15000000 ? 'tier3' : (numPrice >= 10000000 ? 'tier2' : 'tier1');
  } else if (country === 'fr' || country === 'de') {
    priceDisplay = '€' + numPrice.toLocaleString();
    priceTier = numPrice >= 15000000 ? 'tier3' : (numPrice >= 10000000 ? 'tier2' : 'tier1');
  } else if (country === 'ch') {
    priceDisplay = 'CHF ' + numPrice.toLocaleString();
    priceTier = numPrice >= 15000000 ? 'tier3' : (numPrice >= 10000000 ? 'tier2' : 'tier1');
  } else if (country === 'jp') {
    priceDisplay = '¥' + numPrice.toLocaleString();
    priceTier = numPrice >= 1500000 ? 'tier3' : (numPrice >= 1000000 ? 'tier2' : 'tier1');
  } else {
    priceDisplay = '$' + numPrice.toLocaleString();
    priceTier = 'tier1';
  }

  // Image handling
  const luxuryFallbacks = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80'
  ];
  let image = luxuryFallbacks[((p.id || 1) % luxuryFallbacks.length)];
  if (p.images && p.images.length > 0) {
    const primary = p.images.find(function(i) { return i.is_primary; }) || p.images[0];
    if (primary && primary.image_url) {
      image = primary.image_url;
    }
  }

  // Category
  let category = 'Luxury Villa';
  const rawType = (p.property_type || '').toUpperCase();
  const rawListing = (p.listing_type || '').toLowerCase();
  const titleLower = (p.title || '').toLowerCase();
  if (titleLower.includes('penthouse') || rawListing.includes('penthouse')) {
    category = 'Penthouse';
  } else if (titleLower.includes('haven') || titleLower.includes('estate') || titleLower.includes('chateau') || titleLower.includes('manor') || rawListing.includes('estate')) {
    category = 'Heritage Estate';
  } else if (titleLower.includes('apartment') || titleLower.includes('loft') || titleLower.includes('suite') || rawListing.includes('apartment')) {
    category = 'Apartment';
  } else if (titleLower.includes('villa') || titleLower.includes('mansion') || titleLower.includes('pavilion')) {
    category = 'Luxury Villa';
  }

  // Location display
  const locDisplay = addr ? (city ? city + ', ' + addr : addr) : (city || 'Prime Location');

  // Owner extraction
  const ownerName = p.owner_name || (p.owner ? (p.owner.name || p.owner.first_name) : '') || 'Admin Prime';
  const ownerEmail = p.owner_email || (p.owner ? p.owner.email : '') || '';

  return {
    id: 'db-' + p.id,
    rawDbId: p.id,
    country: country,
    title: p.title || 'Prime Property',
    location: locDisplay,
    city: city || 'Prime City',
    category: category,
    priceValue: numPrice,
    priceDisplay: priceDisplay,
    priceTier: priceTier,
    beds: p.bedrooms ? p.bedrooms + ' BHK' : '4 BHK',
    sqft: p.area_sqft ? Number(p.area_sqft).toLocaleString() + ' sq.ft' : '4,200 sq.ft',
    image: image,
    description: p.description || '',
    owner_name: ownerName,
    owner_email: ownerEmail,
    owner_phone: p.owner_phone || '',
    foreignBuyerEligible: p.foreign_buyer_eligible !== false,
    isDbProperty: true
  };
}

// 4. Properties Page Logic (properties.html)
function initPropertiesPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const activeCountryKey = urlParams.get('country') || 'all';
  const countryMeta = COUNTRY_META[activeCountryKey] || COUNTRY_META['all'] || COUNTRY_META['in'];

  // DOM elements
  const activeTag = document.getElementById('activeCountryTag');
  const resultCounter = document.getElementById('resultCountDisplay');
  const locationInput = document.getElementById('searchLocation') || document.getElementById('filterLocation');
  const locationDatalist = document.getElementById('locationSuggestions');
  const clearLocationBtn = document.getElementById('btnClearLocationSearch');
  const priceSelect = document.getElementById('filterPrice');
  const categorySelect = document.getElementById('filterCategory');
  const resetBtn = document.getElementById('btnResetFilters');
  const gridContainer = document.getElementById('propertiesGrid');

  if (!gridContainer) return;

  // Set country badge in command bar
  if (activeTag) {
    activeTag.innerHTML = `<span>${countryMeta.flag}</span> ${countryMeta.name}`;
  }

  // Highlight active country pill in portfolioCountryStrip
  document.querySelectorAll('#portfolioCountryStrip .country-pill-btn').forEach(btn => {
    if (btn.getAttribute('data-country') === activeCountryKey) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Collect unique locations and owners
  const uniqueLocations = new Set(countryMeta.locations || []);
  const relevantProps = activeCountryKey === 'all' 
    ? AURELIA_PROPERTIES 
    : AURELIA_PROPERTIES.filter(p => p.country === activeCountryKey);

  relevantProps.forEach(p => {
    if (p.city) uniqueLocations.add(p.city);
    if (p.location && p.location !== p.city) uniqueLocations.add(p.location);
    if (p.owner_name) uniqueLocations.add(p.owner_name);
  });

  // Populate dynamic suggestions for location search
  if (locationDatalist) {
    locationDatalist.innerHTML = '';
    uniqueLocations.forEach(loc => {
      const opt = document.createElement('option');
      opt.value = loc;
      locationDatalist.appendChild(opt);
    });
  }

  // Fallback if element is select dropdown
  if (locationInput && locationInput.tagName === 'SELECT') {
    locationInput.innerHTML = '<option value="all">All Locations</option>';
    uniqueLocations.forEach(loc => {
      const opt = document.createElement('option');
      opt.value = loc;
      opt.textContent = loc;
      locationInput.appendChild(opt);
    });
  }

  // URL location pre-fill if specified in query string
  const queryLoc = urlParams.get('location') || urlParams.get('search') || urlParams.get('q');
  if (queryLoc && locationInput) {
    locationInput.value = queryLoc;
    if (clearLocationBtn) clearLocationBtn.style.display = 'flex';
  }

  // Update dynamic price tier labels for local currency
  if (priceSelect && countryMeta.priceLabels) {
    priceSelect.innerHTML = `
      <option value="all">All Price Ranges</option>
      <option value="tier1">${countryMeta.priceLabels.tier1}</option>
      <option value="tier2">${countryMeta.priceLabels.tier2}</option>
      <option value="tier3">${countryMeta.priceLabels.tier3}</option>
    `;
  }

  // Filter and Render function
  function applyFiltersAndRender() {
    const rawQuery = locationInput ? locationInput.value.trim() : '';
    const searchVal = rawQuery.toLowerCase();
    const priceVal = priceSelect ? priceSelect.value : 'all';
    const catVal = categorySelect ? categorySelect.value : 'all';

    // Show/hide clear search button
    if (clearLocationBtn && locationInput) {
      clearLocationBtn.style.display = rawQuery ? 'flex' : 'none';
    }

    // Filter properties
    const filtered = AURELIA_PROPERTIES.filter(item => {
      // Must match country (unless 'all')
      if (activeCountryKey !== 'all' && item.country !== activeCountryKey) return false;

      // Filter by location & owner search query
      if (searchVal && searchVal !== 'all') {
        const city = (item.city || '').toLowerCase();
        const loc = (item.location || '').toLowerCase();
        const title = (item.title || '').toLowerCase();
        const desc = (item.description || '').toLowerCase();
        const owner = (item.owner_name || '').toLowerCase();
        const matches = city.includes(searchVal) ||
                        loc.includes(searchVal) ||
                        title.includes(searchVal) ||
                        desc.includes(searchVal) ||
                        owner.includes(searchVal);
        if (!matches) {
          return false;
        }
      }

      // Filter by price tier
      if (priceVal !== 'all' && item.priceTier !== priceVal) {
        return false;
      }

      // Filter by category
      if (catVal !== 'all' && item.category !== catVal) {
        return false;
      }

      return true;
    });

    // Update result counter
    const totalInScope = activeCountryKey === 'all'
      ? AURELIA_PROPERTIES.length
      : AURELIA_PROPERTIES.filter(p => p.country === activeCountryKey).length;
    if (resultCounter) {
      resultCounter.innerHTML = `Showing <span>${filtered.length}</span> of <span>${totalInScope}</span> registered properties`;
    }

    // Render cards
    renderPropertyGrid(filtered, gridContainer);
  }

  // Attach filter event listeners
  if (locationInput) {
    locationInput.addEventListener('input', applyFiltersAndRender);
    locationInput.addEventListener('change', applyFiltersAndRender);
  }
  if (clearLocationBtn && locationInput) {
    clearLocationBtn.addEventListener('click', () => {
      locationInput.value = '';
      clearLocationBtn.style.display = 'none';
      locationInput.focus();
      applyFiltersAndRender();
    });
  }
  if (priceSelect) priceSelect.addEventListener('change', applyFiltersAndRender);
  if (categorySelect) categorySelect.addEventListener('change', applyFiltersAndRender);

  // Reset button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (locationInput) {
        locationInput.value = (locationInput.tagName === 'SELECT') ? 'all' : '';
      }
      if (clearLocationBtn) clearLocationBtn.style.display = 'none';
      if (priceSelect) priceSelect.value = 'all';
      if (categorySelect) categorySelect.value = 'all';
      applyFiltersAndRender();
    });
  }

  // Initial render with current array
  applyFiltersAndRender();

  // Dynamically load latest live properties from MySQL backend
  async function loadLivePropertiesFromDatabase() {
    try {
      const resp = await fetch('/api/properties?limit=250');
      if (!resp.ok) return;
      const dbProps = await resp.json();
      if (!Array.isArray(dbProps) || dbProps.length === 0) return;

      // Map all database properties
      const mappedDbProps = dbProps.map(mapDbPropertyToAurelia);

      // Create lookup maps by normalized title
      const dbTitleMap = new Map();
      mappedDbProps.forEach(function(p) {
        dbTitleMap.set((p.title || '').trim().toLowerCase(), p);
      });

      // Update existing static items that match DB properties with real DB data and owner
      AURELIA_PROPERTIES = AURELIA_PROPERTIES.map(function(existing) {
        const titleKey = (existing.title || '').trim().toLowerCase();
        if (dbTitleMap.has(titleKey)) {
          const dbItem = dbTitleMap.get(titleKey);
          dbTitleMap.delete(titleKey); // mark as consumed
          return Object.assign({}, existing, dbItem, { id: existing.id, rawDbId: dbItem.rawDbId });
        }
        return Object.assign({}, existing, { owner_name: existing.owner_name || 'Admin Prime' });
      });

      // Collect all remaining DB properties that were not in static AURELIA_PROPERTIES (e.g. sukoon, ayush, chinmayi, etc.)
      const remainingDbProps = [];
      dbTitleMap.forEach(function(dbItem) {
        remainingDbProps.push(dbItem);
      });

      if (remainingDbProps.length > 0) {
        // Prepend user registered properties so newest appear first
        AURELIA_PROPERTIES.unshift(...remainingDbProps);
      }

      // Update location list for search bar
      AURELIA_PROPERTIES.forEach(function(p) {
        if (activeCountryKey === 'all' || p.country === activeCountryKey) {
          if (p.city) uniqueLocations.add(p.city);
          if (p.location && p.location !== p.city) uniqueLocations.add(p.location);
          if (p.owner_name) uniqueLocations.add(p.owner_name);
        }
      });

      if (locationDatalist) {
        locationDatalist.innerHTML = '';
        uniqueLocations.forEach(function(loc) {
          const opt = document.createElement('option');
          opt.value = loc;
          locationDatalist.appendChild(opt);
        });
      }

      // Re-render grid with the live registered properties
      applyFiltersAndRender();
    } catch (err) {
      console.warn('Could not load live properties from database API:', err);
    }
  }

  loadLivePropertiesFromDatabase();
  initMobileMenu();
}

// 5. Render Bento Grid Cards
function renderPropertyGrid(properties, container) {
  const favs = getFavorites();

  if (properties.length === 0) {
    container.innerHTML = `
      <div class="no-properties-found">
        <i class="fas fa-building-circle-exclamation"></i>
        <h3>No Properties Match Your Filter Criteria</h3>
        <p>Adjust your location, price, category, or country filters to discover luxury estates.</p>
        <button class="btn-pill-dark" onclick="document.getElementById('btnResetFilters').click()">
          <i class="fas fa-rotate-left"></i> Reset All Filters
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = properties.map(p => {
    const isFav = favs.includes(p.id);
    const ownerName = p.owner_name || (p.owner ? (p.owner.name || p.owner.first_name) : '') || 'Admin Prime';
    return `
      <div class="property-card" onclick="openPropertyInquiryModal('${p.id}')">
        <img src="${p.image}" alt="${p.title}" class="property-card-bg" loading="lazy">
        
        <!-- Top Floating Pills -->
        <div class="property-top-pills">
          <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
            <div class="property-price-pill">${p.priceDisplay}</div>
            <!-- Foreign Buyer Badge -->
            <span class="badge-foreign-eligible" style="background: rgba(36, 48, 35, 0.88); backdrop-filter: blur(8px); border: 1px solid rgba(52, 211, 153, 0.55); color: #34D399; font-size: 0.7rem; font-weight: 700; padding: 0.35rem 0.75rem; border-radius: 9999px; display: inline-flex; align-items: center; gap: 0.35rem;">
              <i class="fas fa-passport" style="font-size: 0.75rem;"></i> Foreign / NRI Eligible
            </span>
          </div>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <span class="property-category-tag">${p.category}</span>
            <button class="btn-favorite-toggle ${isFav ? 'active' : ''}" 
                    data-fav-id="${p.id}" 
                    onclick="toggleFavorite('${p.id}', event)" 
                    aria-label="Save property"
                    title="${isFav ? 'Saved in collection' : 'Save Property'}">
              <i class="fas fa-bookmark" style="${isFav ? 'color: #C28B52;' : ''}"></i>
            </button>
          </div>
        </div>

        <!-- Bottom Gradient Overlay -->
        <div class="property-overlay">
          <!-- Property Owner Tag -->
          <div class="property-owner-tag">
            <i class="fas fa-user-tie"></i>
            <span>Property Owner: <strong>${ownerName}</strong></span>
          </div>

          <h3 class="property-title">${p.title}</h3>
          <div class="property-location">
            <i class="fas fa-location-dot"></i>
            <span>${p.location}</span>
          </div>
          <div class="property-specs">
            <div class="spec-item">
              <i class="fas fa-bed"></i>
              <span>${p.beds}</span>
            </div>
            <div class="spec-item">
              <i class="fas fa-ruler-combined"></i>
              <span>${p.sqft}</span>
            </div>
            <div class="spec-item">
              <i class="fas fa-eye"></i>
              <span>View Details</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 6. Interactive Property Inquiry Modal
function openPropertyInquiryModal(propId) {
  const prop = AURELIA_PROPERTIES.find(p => p.id === propId || String(p.rawDbId) === String(propId) || String(p.id) === ('db-' + propId));
  if (!prop) return;

  const modal = document.getElementById('inquiryModal');
  const title = document.getElementById('modalPropTitle');
  const loc = document.getElementById('modalPropLocation');
  const price = document.getElementById('modalPropPrice');
  const img = document.getElementById('modalPropImg');
  const ownerEl = document.getElementById('modalPropOwner');
  const hiddenInput = document.getElementById('modalPropIdInput');

  if (modal && title && loc && img) {
    title.textContent = prop.title;
    loc.textContent = prop.location;
    if (price) price.textContent = prop.priceDisplay;
    img.src = prop.image;
    const ownerName = prop.owner_name || 'Admin Prime';
    if (ownerEl) {
      ownerEl.innerHTML = `<strong>${ownerName}</strong>` + (prop.owner_email ? ` <span style="font-size: 0.78rem; opacity: 0.85;">(${prop.owner_email})</span>` : '');
    }
    if (hiddenInput) hiddenInput.value = `${prop.title} (Owner: ${ownerName})`;
    
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closePropertyInquiryModal() {
  const modal = document.getElementById('inquiryModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// 7. Mobile Navigation Toggle Handler
function initMobileMenu() {
  const toggle = document.getElementById('mobileMenuToggle');
  const menu = document.getElementById('navLinks') || document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('mobile-open');
      menu.classList.toggle('open');
      const icon = toggle.querySelector('i');
      if (icon) {
        if (menu.classList.contains('mobile-open') || menu.classList.contains('open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });

    const closeBtn = document.getElementById('mobileDrawerClose') || menu.querySelector('.mobile-drawer-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.remove('mobile-open');
        menu.classList.remove('open');
        const icon = toggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    }

    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('mobile-open');
        menu.classList.remove('open');
        const icon = toggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  }
}

// 8. Contact & Auth Feedback Handlers
function runAureliaInit() {
  // Check page context
  if (document.getElementById('viewPropertiesCta')) {
    initWelcomePage();
  }
  if (document.getElementById('propertiesGrid')) {
    initPropertiesPage();
  }
}

// Global exports for inline HTML event handlers
window.openSavedDrawer = openSavedDrawer;
window.closeSavedDrawer = closeSavedDrawer;
window.clearAllSavedProperties = clearAllSavedProperties;
window.updateSavedCountBadge = updateSavedCountBadge;
window.renderSavedDrawerItems = renderSavedDrawerItems;
window.toggleFavorite = toggleFavorite;
window.initPropertiesPage = initPropertiesPage;

// Setup Saved Drawer navigation buttons and badges
function initSavedDrawerNavigation() {
  const savedBtns = document.querySelectorAll('#savedPropertiesBtn, .saved-btn');
  savedBtns.forEach(btn => {
    // Avoid double-binding
    if (!btn.dataset.drawerBound) {
      btn.dataset.drawerBound = 'true';
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openSavedDrawer();
      });
    }
  });
  updateSavedCountBadge();
}

// Ensure execution even if DOMContentLoaded already fired
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    runAureliaInit();
    initSavedDrawerNavigation();
  });
} else {
  runAureliaInit();
  initSavedDrawerNavigation();
}

document.addEventListener('DOMContentLoaded', () => {
  initSavedDrawerNavigation();

  // Handle contact form submission
  const contactForm = document.getElementById('luxuryContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for contacting Aurelia Private Estates. A Senior Private Advisor will review your inquiry within 4 hours under strict discretion.');
      contactForm.reset();
    });
  }

  // Handle modal inquiry form
  const modalForm = document.getElementById('modalInquiryForm');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! Your viewing request has been received. Our team will contact you shortly.');
      modalForm.reset();
      closePropertyInquiryModal();
    });
  }
});

