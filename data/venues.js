/* ReserveHub — venue mock data (ported 1:1 from the React app) */
(function (RH) {
  'use strict';
  var IMG = RH.IMAGES;

  RH.VENUES = [
    {
      id: 'lakeview-terrace',
      name: 'Lakeview Terrace Restaurant',
      category: 'Restaurants',
      tag: 'Prime Waterfront',
      description: 'Breathtaking panoramic waterfront dining overlooking serene Inya Lake. Features outdoor terrace seating, contemporary European and Burmese fusion cuisine, and an award-winning sunset cocktail lounge.',
      rating: 4.9, reviewsCount: 348,
      location: 'Inya Lake View, Yangon', city: 'Yangon',
      address: 'No. 42 Inya Road, Kamayut Township, Yangon',
      distanceKm: 1.8, basePrice: 45,
      openingHours: '11:00 AM – 11:00 PM',
      image: IMG.rooftop,
      gallery: [IMG.rooftop, IMG.seeds, IMG.gildedFork, IMG.bistro],
      slots: ['12:00 PM', '01:30 PM', '06:00 PM', '07:30 PM', '08:30 PM', '09:30 PM'],
      packages: [
        { id: 'pkg-standard', name: 'Standard Waterfront Table', price: 45, perText: '/ guest', includes: ['Priority Lake View Seating', 'Welcome Mocktail', 'Full A La Carte Access'] },
        { id: 'pkg-degustation', name: 'Chef 5-Course Tasting Experience', price: 85, perText: '/ guest', includes: ['5-Course Tasting Menu', 'Sommelier Wine Pairing', 'Windowfront Guaranteed Table', 'Chef Table Visit'] },
        { id: 'pkg-vip-lounge', name: 'Private Romantic Pavilion', price: 130, perText: '/ guest', includes: ['Private Lake Gazebo', 'Champagne on Arrival', 'Custom Floral Setup', 'Dedicated Butler'] }
      ],
      reviews: [
        { id: 'r1', userName: 'Khin Myat Noe', userAvatar: 'K', rating: 5, date: 'Aug 14, 2026', comment: 'Outstanding sunset view and prompt service. The smoked salmon dish and the wine pairing were exceptional.' },
        { id: 'r2', userName: 'David Miller', userAvatar: 'D', rating: 5, date: 'Aug 08, 2026', comment: 'We booked the private pavilion for our anniversary and it was perfection from start to finish.' },
        { id: 'r3', userName: 'Thura Soe', userAvatar: 'T', rating: 4, date: 'Jul 29, 2026', comment: 'Great ambience, lively crowd, and great desserts. Recommended to reserve early on weekends!' }
      ]
    },
    {
      id: 'sakura-garden',
      name: 'Sakura Japanese Garden & Sushi',
      category: 'Restaurants',
      tag: 'Omakase Deal',
      description: 'An authentic Japanese dining sanctuary set in a Zen stone garden. Specializing in daily air-flown Tsukiji seafood, Edomae sushi omakase counters, and private tatami rooms.',
      rating: 4.8, reviewsCount: 290,
      location: 'Golden Valley, Yangon', city: 'Yangon',
      address: 'No. 18 Shin Saw Pu Road, Sanchaung, Yangon',
      distanceKm: 2.4, basePrice: 38,
      openingHours: '11:30 AM – 10:00 PM',
      image: IMG.gekko,
      gallery: [IMG.gekko, IMG.privateDining, IMG.gildedFork],
      slots: ['12:30 PM', '02:00 PM', '06:30 PM', '07:30 PM', '08:45 PM'],
      packages: [
        { id: 'pkg-sakura-lunch', name: 'Executive Bento & Nigiri Lunch', price: 38, perText: '/ guest', includes: ['8-Piece Nigiri Selection', 'Miso Soup & Chawanmushi', 'Green Tea Ice Cream'] },
        { id: 'pkg-omakase', name: 'Grand Master Omakase (14 Courses)', price: 95, perText: '/ guest', includes: ['Direct Chef Counter Seating', 'Otoro & Uni Tasting', 'Seasonal Sashimi & Wagyu', 'Junmai Sake Pairing'] }
      ],
      reviews: [
        { id: 'r4', userName: 'Su Su Hlaing', userAvatar: 'S', rating: 5, date: 'Aug 10, 2026', comment: 'The freshest sushi in Yangon! Chef explained every single piece. The ReserveHub discount applied seamlessly.' }
      ]
    },
    {
      id: 'golden-mandalay',
      name: 'Golden Mandalay Palace Dining',
      category: 'Restaurants',
      tag: 'Royal Heritage',
      description: 'Immerse in royal Burmese gastronomy with time-honored recipes, golden teakwood decor, and live classical harp performances in an upscale historic mansion.',
      rating: 4.9, reviewsCount: 412,
      location: 'Bahan Heritage Quarter, Yangon', city: 'Yangon',
      address: 'No. 77 Kaba Aye Pagoda Road, Bahan, Yangon',
      distanceKm: 3.1, basePrice: 32,
      openingHours: '10:30 AM – 10:30 PM',
      image: IMG.padonmar,
      gallery: [IMG.padonmar, IMG.rangoon, IMG.bistro],
      slots: ['11:30 AM', '01:00 PM', '05:30 PM', '07:00 PM', '08:30 PM'],
      packages: [
        { id: 'pkg-royal-set', name: 'Royal Heritage Set Menu', price: 32, perText: '/ guest', includes: ['Laphet Thoke Royal Salad', 'Prawn & Lemongrass Curry', 'Fragrant Coconut Scented Rice', 'Sanwin Makin Dessert'] },
        { id: 'pkg-grand-buffet', name: 'Imperial Feast Buffet', price: 55, perText: '/ guest', includes: ['All 25 Royal Specialties', 'Live Saung Harp Performance', 'Traditional Tea Service'] }
      ],
      reviews: [
        { id: 'r5', userName: 'Zayar Min', userAvatar: 'Z', rating: 5, date: 'Aug 02, 2026', comment: 'A true cultural celebration. The laphet thoke and prawn curry are without a doubt the best in town.' }
      ]
    },
    {
      id: 'glass-pavilion',
      name: 'The Glass Pavilion Luxury Hall',
      category: 'Event Venues',
      tag: 'Weddings & Galas',
      description: 'An architectural marvel encased in floor-to-ceiling glass and surrounded by lush botanical gardens. The premier destination for weddings, high-profile galas, and corporate celebrations.',
      rating: 5.0, reviewsCount: 185,
      location: 'Pyay Road, Mayangone, Yangon', city: 'Yangon',
      address: 'Lot 104 Pyay Road, Mayangone Township, Yangon',
      distanceKm: 4.8, basePrice: 120,
      openingHours: '08:00 AM – 11:30 PM',
      image: IMG.bistro,
      gallery: [IMG.bistro, IMG.rooftop, IMG.seeds],
      slots: ['09:00 AM', '02:00 PM', '06:00 PM'],
      packages: [
        { id: 'pkg-gala-banquet', name: 'Full Hall Banquet Package', price: 120, perText: '/ guest', includes: ['Full Day Exclusive Venue Access', '5-Star Custom Catering', 'Acoustic Sound & Stage System', 'Bridal Suite Access'] }
      ],
      reviews: [
        { id: 'r6', userName: 'Aung Kyaw Moe', userAvatar: 'A', rating: 5, date: 'Jul 28, 2026', comment: 'Hosted our annual corporate summit here. Seamless organization and breathtaking venue lighting.' }
      ]
    },
    {
      id: 'rooftop-yangon',
      name: 'Skyline 360 Lounge & Rooftop',
      category: 'Restaurants',
      tag: 'Nightlife & Drinks',
      description: 'Perched 35 floors above downtown Yangon with 360-degree views of the illuminated Shwedagon Pagoda and Yangon River. Features craft cocktail mixology, international tapas, and live DJ sets.',
      rating: 4.7, reviewsCount: 520,
      location: 'Downtown Riverside, Yangon', city: 'Yangon',
      address: 'Tower 1, Strand Road, Botahtaung, Yangon',
      distanceKm: 1.2, basePrice: 35,
      openingHours: '04:00 PM – 02:00 AM',
      image: IMG.rooftop,
      gallery: [IMG.rooftop, IMG.seeds, IMG.alchimiste],
      slots: ['05:00 PM', '06:30 PM', '08:00 PM', '09:30 PM', '11:00 PM'],
      packages: [
        { id: 'pkg-sunset-drinks', name: 'Sunset Cocktails & Tapas Platter', price: 35, perText: '/ guest', includes: ['2 Signature Cocktails', 'Artisanal Tapas Platter', 'Guaranteed Edge Sunset Table'] },
        { id: 'pkg-vip-booth', name: 'VIP Sky Lounge Booth', price: 70, perText: '/ guest', includes: ['Bottle Service & Mixers', 'Chef Special Canapes', 'Dedicated Server', 'Pagoda Viewfront'] }
      ],
      reviews: [
        { id: 'r7', userName: 'Jessica Taylor', userAvatar: 'J', rating: 5, date: 'Aug 12, 2026', comment: 'Best view of Shwedagon at night! The cocktails are world-class.' }
      ]
    },
    {
      id: 'executive-boardroom',
      name: 'The Pinnacle Executive Suites & Boardrooms',
      category: 'Meeting Rooms',
      tag: 'Corporate Special',
      description: 'High-tech conference facilities equipped with 4K telepresence video conferencing, smart boards, ergonomic Herman Miller seating, and executive barista coffee service.',
      rating: 4.9, reviewsCount: 140,
      location: 'Junction City Tower, Yangon', city: 'Yangon',
      address: 'Level 18, Junction City Office Tower, Bogyoke Aung San Road, Yangon',
      distanceKm: 0.9, basePrice: 28,
      openingHours: '07:30 AM – 09:00 PM',
      image: IMG.privateDining,
      gallery: [IMG.privateDining, IMG.bistro],
      slots: ['08:30 AM', '10:30 AM', '01:30 PM', '03:30 PM', '05:30 PM'],
      packages: [
        { id: 'pkg-half-day', name: 'Half-Day Meeting Package', price: 28, perText: '/ hour', includes: ['High-speed 1Gbps WiFi', 'Video Conference Hardware', 'Continuous Coffee & Tea Station', 'Dedicated Tech Support'] }
      ],
      reviews: [
        { id: 'r8', userName: 'Kyaw Zin Lat', userAvatar: 'K', rating: 5, date: 'Aug 05, 2026', comment: 'Spotless boardroom with rock-solid video conferencing. Booking takes literally 30 seconds.' }
      ]
    },
    {
      id: 'lotus-wellness',
      name: 'Lotus Sanctuary Spa & Wellness Suites',
      category: 'Beauty & Wellness',
      tag: 'Relaxation Deal',
      description: 'A serene urban oasis featuring traditional herbal steam rooms, aromatherapy massage suites, and holistic wellness therapies in private landscaped courtyard suites.',
      rating: 4.9, reviewsCount: 215,
      location: 'Kandawgyi Lake Garden, Yangon', city: 'Yangon',
      address: 'No. 5 Natmauk Road, Bahan, Yangon',
      distanceKm: 2.1, basePrice: 40,
      openingHours: '09:00 AM – 09:00 PM',
      image: IMG.seeds,
      gallery: [IMG.seeds, IMG.privateDining],
      slots: ['10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM', '06:00 PM'],
      packages: [
        { id: 'pkg-spa-retreat', name: 'Aromatherapy & Herbal Steam (90 Mins)', price: 40, perText: '/ guest', includes: ['90-Minute Signature Massage', 'Herbal Steam Room Access', 'Organic Lemongrass Tea Service'] }
      ],
      reviews: [
        { id: 'r9', userName: 'May Thwe', userAvatar: 'M', rating: 5, date: 'Aug 11, 2026', comment: 'Total bliss and deeply rejuvenating. The courtyard garden is so peaceful.' }
      ]
    }
  ];
})(window.RH = window.RH || {});
