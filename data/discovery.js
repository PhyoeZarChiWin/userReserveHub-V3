/* ReserveHub — cuisines, events, customer reviews, Myanmar food data (ported) */
(function (RH) {
  'use strict';
  var IMG = RH.IMAGES;

  /* ---------- Cuisine discovery cards ---------- */
  RH.CUISINES = [
    { id: 'c1', name: 'French Haute Cuisine', subtitle: 'Michelin Caliber & Sommelier Cellars', tag: 'Haute Gastronomy', venueCount: '6 Venues', priceRange: '$$$$', signatureSpecialty: 'Foie Gras, Pan-Seared Duck Breast & Bordeaux Pairings', searchQuery: 'French', topVenueName: "L'Alchimiste Salon", image: IMG.alchimiste },
    { id: 'c2', name: 'Japanese Omakase & Robata', subtitle: 'Air-Flown Seafood & 8-Seat Counters', tag: 'Chef Counter', venueCount: '11 Venues', priceRange: '$$$$', signatureSpecialty: '14-Course Seasonal Nigiri, Hokkaido Uni & Otoro', searchQuery: 'Japanese', topVenueName: 'Gekko Tokyo & Omakase', image: IMG.gekko },
    { id: 'c3', name: 'Italian Trattoria & Pasta', subtitle: 'Handmade Pasta & Wood-Fired Ovens', tag: 'Artisanal Pasta', venueCount: '9 Venues', priceRange: '$$$', signatureSpecialty: 'Truffle Tagliolini, Burrata Pugliese & Chianti Classico', searchQuery: 'Italian', topVenueName: "L'Opera Italian Restaurant", image: IMG.lopera },
    { id: 'c4', name: 'Contemporary European', subtitle: 'Lakefront Terraces & Modern Fusion', tag: 'Romantic Waterfront', venueCount: '8 Venues', priceRange: '$$$$', signatureSpecialty: 'Smoked Salmon Carpaccio & Sunset Lake Cocktails', searchQuery: 'European', topVenueName: 'SEEDS Restaurant & Lounge', image: IMG.seeds },
    { id: 'c5', name: 'Traditional Myanmar Heritage', subtitle: 'Royal Recipes & Colonial Mansions', tag: 'Royal Heritage', venueCount: '14 Venues', priceRange: '$$$', signatureSpecialty: 'Royal Laphet Thoke, Golden Prawn Curries & Mohinga', searchQuery: 'Myanmar', topVenueName: 'Golden Mandalay Palace', image: IMG.padonmar },
    { id: 'c6', name: 'Thai & Southeast Asian', subtitle: 'Aromatic Herbs & Vibrant Spices', tag: 'Spiced Aromatics', venueCount: '10 Venues', priceRange: '$$$', signatureSpecialty: 'River Prawn Tom Yum, Lemongrass Crab & Pad Thai', searchQuery: 'Thai', topVenueName: 'Rangoon Tea House', image: IMG.rangoon },
    { id: 'c7', name: 'Steakhouse & Prime Grill', subtitle: 'Dry-Aged Black Angus & Wagyu Cuts', tag: 'Prime Cuts', venueCount: '7 Venues', priceRange: '$$$$', signatureSpecialty: 'Charred Tomahawk, Wagyu Ribeye & Truffle Fries', searchQuery: 'Steakhouse', topVenueName: 'The Gilded Fork Grill', image: IMG.gildedFork },
    { id: 'c8', name: 'Rooftop Tapas & Cocktail Bar', subtitle: 'Panoramic 360° Views & Craft Spirits', tag: 'Sunset Skyline', venueCount: '12 Venues', priceRange: '$$$', signatureSpecialty: 'Modern Asian Tapas, Spiced Gin Fizz & DJ Nights', searchQuery: 'Rooftop', topVenueName: 'Skyline Sunset 360 Lounge', image: IMG.rooftop }
  ];

  /* ---------- Upcoming events slideshow ---------- */
  RH.EVENTS = [
    { id: 'evt-1', title: 'Sunset Jazz & Wine Tasting Night', description: 'An enchanting evening of smooth live jazz by the lake accompanied by 5-course sommelier wine pairings.', category: 'Live Music & Dining', badge: 'Popular', spotsLeft: 6, date: 'Saturday, Aug 23', time: '06:30 PM – 10:00 PM', venueName: 'Lakeview Terrace Restaurant', venueId: 'lakeview-terrace', pricePerPerson: '$65 / person', image: IMG.seeds },
    { id: 'evt-2', title: 'Master Omakase & Sake Pairing', description: 'Exclusive 12-seat live chef counter featuring seasonal bluefin tuna and premium junmai daiginjo sake.', category: 'Chef Table', badge: 'Selling Fast', spotsLeft: 4, date: 'Friday, Aug 29', time: '07:00 PM – 09:30 PM', venueName: 'Sakura Japanese Garden & Sushi', venueId: 'sakura-garden', pricePerPerson: '$95 / person', image: IMG.gekko },
    { id: 'evt-3', title: 'Royal Myanmar Heritage Feast', description: 'Grand buffet celebrating traditional royal palace recipes with live classical Saung harp performance.', category: 'Cultural Dining', badge: 'Family Special', spotsLeft: 12, date: 'Sunday, Aug 31', time: '12:00 PM – 03:30 PM', venueName: 'Golden Mandalay Palace Dining', venueId: 'golden-mandalay', pricePerPerson: '$40 / person', image: IMG.padonmar },
    { id: 'evt-4', title: 'Skyline Moonlight Cocktail Gala', description: 'Panoramic 360-degree Yangon rooftop party with signature craft cocktails, tapas, and international DJ sets.', category: 'Nightlife & Drinks', badge: 'Exclusive', spotsLeft: 8, date: 'Saturday, Sep 05', time: '08:00 PM – 01:00 AM', venueName: 'Skyline 360 Lounge & Rooftop', venueId: 'rooftop-yangon', pricePerPerson: '$50 / person', image: IMG.rooftop }
  ];

  /* ---------- Verified diner reviews carousel ---------- */
  RH.FEATURED_REVIEWS = [
    { id: 'rev-1', customerName: 'Khin Myat Noe', customerRole: 'Food & Travel Writer', avatar: RH.avatarSvg('K', '#7A1F2B'), rating: 5, occasion: 'Anniversary Celebration', recommendedDish: 'Smoked Salmon & Sturgeon Caviar', tableExperience: 'Lakeview Waterfront Deck #4', reviewText: 'Reserving via ReserveHub made our anniversary completely magical. We arrived to a reserved front-row lakefront table with personalized menu cards. The sunset over Inya Lake and the complimentary sommelier wine pairing were unforgettable.', restaurantName: 'Seeds Restaurant & Lounge', venueId: null, visitedDate: 'Verified Dine · 2 days ago', helpfulCount: 42 },
    { id: 'rev-2', customerName: 'Aung Kyaw Moe', customerRole: 'Technology Director', avatar: RH.avatarSvg('A', '#0F766E'), rating: 5, occasion: 'Executive Board Dinner', recommendedDish: 'Prime Ribeye & Truffle Potato Puree', tableExperience: 'Private VIP Salon (12 Guests)', reviewText: 'Secured the private dining suite for an international delegation. The seamless digital booking QR code made guest arrival effortless. Flawless acoustic privacy, dedicated table captain, and exquisite multi-course service.', restaurantName: 'The Glass Pavilion Luxury Hall', venueId: 'glass-pavilion', visitedDate: 'Verified Dine · 1 week ago', helpfulCount: 38 },
    { id: 'rev-3', customerName: 'Su Su Hlaing', customerRole: 'Lifestyle Creator', avatar: RH.avatarSvg('S', '#BE123C'), rating: 5, occasion: 'Chef Omakase Experience', recommendedDish: 'A5 Wagyu & Hokkaido Uni Nigiri', tableExperience: 'Sushi Master Counter Seat #3', reviewText: 'The 10-course seasonal omakase was absolute culinary poetry. Chef Gekko prepared every cut right in front of us. Getting confirmed counter seats on a Friday night without waitlist headaches was worth every penny!', restaurantName: 'Gekko Japanese Fine Dining', venueId: 'sakura-garden', visitedDate: 'Verified Dine · 2 weeks ago', helpfulCount: 56 },
    { id: 'rev-4', customerName: 'Zayar Min', customerRole: 'Architect & Designer', avatar: RH.avatarSvg('Z', '#4F46E5'), rating: 5, occasion: 'Heritage Family Gathering', recommendedDish: 'Royal Mandalay River Prawn Curry', tableExperience: 'Colonial Veranda Garden Table', reviewText: 'Brought three generations of my family for my mother’s 60th birthday. The heritage teak setting and authentic royal Myanmar recipes blew everyone away. Staff even surprised us with a complimentary dessert greeting.', restaurantName: 'Padonmar Traditional Heritage Restaurant', venueId: 'golden-mandalay', visitedDate: 'Verified Dine · 3 weeks ago', helpfulCount: 29 },
    { id: 'rev-5', customerName: 'Thiri May', customerRole: 'Culinary Consultant', avatar: RH.avatarSvg('T', '#7C3AED'), rating: 5, occasion: 'Sunset Cocktails & Tapas', recommendedDish: 'Charcuterie Board & Signature Sangria', tableExperience: 'Panoramic Sunset Edge Lounge', reviewText: 'Yangon’s best golden-hour view hands down! Our sunset reservation was held even though we ran 10 minutes late in traffic. The atmosphere with live lounge acoustics made it the highlight of our weekend.', restaurantName: 'Skyview Rooftop Lounge', venueId: 'rooftop-yangon', visitedDate: 'Verified Dine · 4 days ago', helpfulCount: 31 }
  ];

  /* ---------- Myanmar food categories & menu items ---------- */
  RH.MM_CATEGORIES = [
    { id: 'salads', name: 'Salads & A Thoke', icon: '🥗' },
    { id: 'curries', name: 'Royal Curries', icon: '🍲' },
    { id: 'noodles', name: 'Noodles & Mohinga', icon: '🍜' },
    { id: 'snacks', name: 'Fried Snacks & Street Bites', icon: '🥟' },
    { id: 'desserts', name: 'Sweets & Tea House', icon: '🧋' }
  ];

  RH.MM_MENU = {
    salads: [
      { id: 'food-s1', name: 'Royal Fermented Tea Leaf Salad (Laphet Thoke)', description: 'Organic aged tea leaves tossed with crispy double-fried beans, toasted sesame, garlic, and fresh lime.', price: '$6.50', image: IMG.padonmar, venueId: 'golden-mandalay', popular: true },
      { id: 'food-s2', name: 'Shan Chickpea Tofu Salad (Tofu Thoke)', description: 'Silky freshly made yellow chickpea tofu served with tamarind dressing, toasted peanut oil and crispy shallots.', price: '$5.50', image: IMG.gekko, venueId: 'golden-mandalay', popular: true },
      { id: 'food-s3', name: 'Pennywort Herbal Salad (Min Kwar Ywet Thoke)', description: 'Crisp fresh Asiatic pennywort greens tossed with crushed peanuts, shallot oil, and roasted chili flakes.', price: '$5.00', image: IMG.alchimiste, venueId: 'lakeview-terrace' },
      { id: 'food-s4', name: 'Ginger & Tomato Salad (Ggin Thoke)', description: 'Shredded young ginger marinated in lime, accompanied by crunchy fava beans, sesame, and ripe heirloom tomatoes.', price: '$5.50', image: IMG.lopera, venueId: 'golden-mandalay' }
    ],
    curries: [
      { id: 'food-c1', name: 'Heritage Prawn & Lemongrass Curry', description: 'Succulent river prawns cooked in a golden fragrant onion, garlic, turmeric and lemongrass reduction.', price: '$16.00', image: IMG.rangoon, venueId: 'golden-mandalay', popular: true },
      { id: 'food-c2', name: 'Slow-Braised Pork with Pickled Mango (Wet Thar Mango Curry)', description: 'Tender caramelized pork belly braised with tart sour green mango relish and ginger reduction.', price: '$14.00', image: IMG.alchimiste, venueId: 'golden-mandalay', popular: true },
      { id: 'food-c3', name: 'Mandalay Golden Beef Shank Masala', description: 'Rich slow-cooked beef shank infused with Myanmar roasted five-spice and caramelized shallots.', price: '$15.50', image: IMG.gildedFork, venueId: 'golden-mandalay' },
      { id: 'food-c4', name: 'Royal Myanmar Danbauk (Chicken Biryani)', description: 'Fragrant basmati rice slow-baked with tender spiced chicken, saffron, cashews, raisins, and mint balachaung.', price: '$12.50', image: IMG.padonmar, venueId: 'golden-mandalay', popular: true }
    ],
    noodles: [
      { id: 'food-n1', name: 'Artisan Yangon Mohinga with Duck Egg', description: 'Rich aromatic catfish and lemongrass broth poured over rice vermicelli, banana stem slices, and crispy chickpea fritters.', price: '$7.00', image: IMG.padonmar, venueId: 'golden-mandalay', popular: true },
      { id: 'food-n2', name: 'Shan Sticky Rice Noodles (Shan Khao Swe)', description: 'Rice noodles tossed in warm tomato spiced chicken reduction, pickled mustard greens, and crushed roasted peanuts.', price: '$7.50', image: IMG.rangoon, venueId: 'golden-mandalay', popular: true },
      { id: 'food-n3', name: 'Coconut Chicken Noodles (Ohn No Khao Swe)', description: 'Velvety curried chicken and coconut milk broth over egg noodles with boiled egg, red shallots, and crisp wontons.', price: '$8.00', image: IMG.lopera, venueId: 'golden-mandalay', popular: true },
      { id: 'food-n4', name: 'Rakhine Spicy Fish Soup (Rakhine Mont Di)', description: 'Fiery and tangy marine catfish clear broth with fresh rice noodles, black pepper, and green chilies.', price: '$6.50', image: IMG.alchimiste, venueId: 'lakeview-terrace' }
    ],
    snacks: [
      { id: 'food-sn1', name: 'Crispy Gourd & Samusa Platter (Akyaw Sone)', description: 'Golden crispy gourd fritters, potato samosas, and fried tofu served with tangy tamarind chili dip.', price: '$6.00', image: IMG.lopera, venueId: 'golden-mandalay', popular: true },
      { id: 'food-sn2', name: 'Deep Fried Shan Yellow Tofu (Tofu Kyaw)', description: 'Crispy golden outside, molten velvety inside chickpea tofu fritters with sweet sour garlic tamarind dip.', price: '$5.00', image: IMG.gekko, venueId: 'golden-mandalay' }
    ],
    desserts: [
      { id: 'food-d1', name: 'Golden Semolina Cake (Sanwin Makin)', description: 'Traditional baked semolina cake enriched with coconut cream, butter, and topped with toasted poppy seeds.', price: '$4.50', image: IMG.gildedFork, venueId: 'golden-mandalay', popular: true },
      { id: 'food-d2', name: 'Signature Myanmar Sweet Milk Tea (Cho Saint)', description: 'Rich strongly brewed black tea whisked with creamy condensed milk according to royal tea house tradition.', price: '$3.00', image: IMG.familyDining, venueId: 'lakeview-terrace', popular: true },
      { id: 'food-d3', name: 'Royal Shwe Yin Aye Coconut Iced Dessert', description: 'Refreshing sweet coconut milk soup with pandan agar jelly strips, sticky rice, sago pearls, and white bread.', price: '$4.00', image: IMG.padonmar, venueId: 'golden-mandalay' }
    ]
  };

  /* ---------- U01 hero spotlight slides ---------- */
  RH.SPOTLIGHT = [
    { id: 'v1', name: 'SEEDS Restaurant & Lounge', cuisine: 'Contemporary European · French', location: 'Inya Lake Waterfront, Bahan', rating: '4.9', price: '$$$$', image: IMG.seeds, tag: '🌅 Romantic Waterfront', badge: '👑 #1 Most Reserved Table', weeklyBookings: '185 tables reserved this week', hotDeal: '20% Off Chef’s Sunset Tasting Menu', dealBadge: 'HOT DEAL', description: 'Yangon’s premier glasshouse on Inya Lake. Experience romantic sunset dining, master sommelier wine cellars, and seasonal tasting menus.', targetVenueId: 'lakeview-terrace' },
    { id: 'v2', name: 'Gekko Tokyo & Omakase Counter', cuisine: 'Japanese Omakase & Robata Grill', location: 'Merchant Street, Downtown Heritage', rating: '4.9', price: '$$$$', image: IMG.gekko, tag: '🍣 Master Chef Counter', badge: '⭐ 8-Seat Intimate Counter', weeklyBookings: '142 tables reserved this week', hotDeal: 'Complimentary Daiginjo Sake with 12-Course Omakase', dealBadge: 'EXCLUSIVE PERK', description: 'Intimate Japanese dining inside a century-old heritage building. Relish air-flown Hokkaido Uni, Bluefin Otoro, and binchotan robata charcoal skewers.', targetVenueId: 'sakura-garden' },
    { id: 'v3', name: 'Padonmar Myanmar Heritage Feast', cuisine: 'Traditional Royal Myanmar & Mon', location: 'Kha-Yae-Pin Street, Dagon', rating: '4.8', price: '$$$', image: IMG.padonmar, tag: '👑 Royal Heritage Residence', badge: '🇲🇲 Colonial Teakwood Mansion', weeklyBookings: '310 tables reserved this week', hotDeal: 'Complimentary Royal Dessert & Tea Platter for Tables of 4+', dealBadge: 'WEEKLY SPECIAL', description: 'Dine in an authentic 100-year-old colonial teak mansion. Savor royal prawn curries, fermented tea leaf salads, and heirloom Burmese culinary recipes.', targetVenueId: 'golden-mandalay' },
    { id: 'v4', name: 'Skyline Sunset 360 Lounge', cuisine: 'Modern Asian Tapas & Craft Cocktails', location: 'Novotel Tower 22nd Fl, Kamayut', rating: '4.8', price: '$$$', image: IMG.rooftop, tag: '🍸 Sunset Skyline', badge: '🌆 360° Panoramic Pagoda Views', weeklyBookings: '260 tables reserved this week', hotDeal: '1-for-1 Signature Sunset Cocktails (5 PM – 7 PM)', dealBadge: 'HAPPY HOUR DEAL', description: 'Elevated 22 floors above Yangon with sweeping sunset vistas over Shwedagon Pagoda. Enjoy handcrafted botanic cocktails and Asian fusion tapas.', targetVenueId: 'rooftop-yangon' },
    { id: 'v5', name: "L'Alchimiste Salon & French Bistro", cuisine: 'French Haute Cuisine & Bordeaux Cellar', location: 'U Wisara Road, Bahan', rating: '4.9', price: '$$$$', image: IMG.alchimiste, tag: '🍷 Haute Gastronomy', badge: '🇫🇷 Michelin Caliber Dining', weeklyBookings: '115 tables reserved this week', hotDeal: 'Sommelier Private Cellar Tasting Included with VIP Salons', dealBadge: 'VIP EXCLUSIVE', description: 'A secluded French sanctuary surrounded by tropical flora. Indulge in pan-seared duck breast, artisanal foie gras, and curated Grand Cru vintages.', targetVenueId: 'lotus-wellness' }
  ];

  /* ---------- U01 signature dishes ribbon ---------- */
  RH.DISHES = [
    { id: 'd1', name: 'Royal Laphet Thoke (Tea Leaf Salad)', restaurant: 'Padonmar Heritage Feast', rating: '4.9', orderedCount: '1,420+ ordered', price: '14,000 MMK', image: IMG.padonmar, badge: 'TOP DISH', cuisineFilter: 'Myanmar' },
    { id: 'd2', name: '14-Course Seasonal Nigiri & Hokkaido Uni', restaurant: 'Gekko Tokyo & Omakase', rating: '5.0', orderedCount: '890+ ordered', price: '120,000 MMK', image: IMG.gekko, badge: 'CHEF SIGNATURE', cuisineFilter: 'Japanese' },
    { id: 'd3', name: 'Smoked Inya Salmon Carpaccio', restaurant: 'SEEDS Restaurant & Lounge', rating: '4.9', orderedCount: '1,150+ ordered', price: '38,000 MMK', image: IMG.seeds, badge: 'BEST SELLER', cuisineFilter: 'European' },
    { id: 'd4', name: 'Giant Ayeyarwady River Prawn Tom Yum', restaurant: 'Rangoon Gourmet Bistro', rating: '4.8', orderedCount: '1,620+ ordered', price: '28,000 MMK', image: IMG.rangoon, badge: 'LOCAL FAVORITE', cuisineFilter: 'Thai' },
    { id: 'd5', name: 'Dry-Aged Australian Wagyu Tomahawk', restaurant: 'The Gilded Fork Grill', rating: '4.9', orderedCount: '720+ ordered', price: '165,000 MMK', image: IMG.gildedFork, badge: 'PREMIUM GRILL', cuisineFilter: 'Steakhouse' },
    { id: 'd6', name: 'Warm Shan Tofu & Rice Vermicelli', restaurant: 'Golden Mandalay Palace', rating: '4.8', orderedCount: '950+ ordered', price: '11,000 MMK', image: IMG.familyDining, badge: 'HERITAGE', cuisineFilter: 'Shan' }
  ];

  /* ---------- U01 hero discovery categories ---------- */
  RH.DISCOVERY_CATEGORIES = [
    { id: 'breakfast', name: 'Breakfast', icon: '🥐', filter: 'Breakfast' },
    { id: 'lunch', name: 'Lunch', icon: '🥗', filter: 'Lunch' },
    { id: 'dinner', name: 'Dinner', icon: '🍷', filter: 'Dinner' },
    { id: 'mm_traditional', name: 'Myanmar Traditional', icon: '🇲🇲', filter: 'Myanmar' },
    { id: 'shan_cuisine', name: 'Shan Cuisine', icon: '🍜', filter: 'Shan' },
    { id: 'seafood', name: 'Seafood', icon: '🦞', filter: 'Seafood' },
    { id: 'bbq_grill', name: 'BBQ & Grill', icon: '🔥', filter: 'Steakhouse' },
    { id: 'salads_c', name: 'Salads', icon: '🥗', filter: 'Salad' },
    { id: 'street_food', name: 'Street Food', icon: '🥟', filter: 'Tea House' },
    { id: 'desserts_c', name: 'Desserts', icon: '🍰', filter: 'Dessert' },
    { id: 'beverages', name: 'Beverages', icon: '🍸', filter: 'Bars & Lounges' },
    { id: 'veg_vegan', name: 'Vegetarian / Vegan', icon: '🌱', filter: 'Vegetarian' }
  ];
})(window.RH = window.RH || {});
