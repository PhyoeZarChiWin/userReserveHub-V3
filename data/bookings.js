/* ReserveHub — booking mock data (ported 1:1 from the React app) */
(function (RH) {
  'use strict';
  var IMG = RH.IMAGES;

  RH.BOOKINGS = [
    {
      id: 'b-101',
      refNumber: 'RH-LK7842-2026',
      venueId: 'lakeview-terrace',
      venueName: 'Lakeview Terrace Restaurant',
      venueImage: IMG.rooftop,
      location: 'Kamayut, Yangon',
      date: '2026-08-25', time: '07:30 PM', guests: 2,
      packageName: 'Standard Waterfront Table', packagePrice: 45, totalPaid: 76,
      userName: 'Phyo Win', userEmail: 'phyo.win@example.com', userPhone: '+959 123 456 789',
      status: 'Confirmed', createdAt: '2026-08-18',
      tableNumber: 'Table #14 (Lakefront Deck)',
      seatingArea: 'Terrace / Waterfront',
      occasion: 'Anniversary Dinner',
      specialRequests: 'Window lakefront seating requested. Romantic candle lighting.',
      dietaryRestrictions: ['No Shellfish'],
      dressCode: 'Smart Casual',
      cancellationPolicy: 'Free cancellation up to 2 hours before dining',
      preOrderedAddons: [
        { id: 'add-1', name: 'Veuve Clicquot Champagne Bottle on Arrival', price: 85, quantity: 1 },
        { id: 'add-2', name: 'Chef Anniversary Dessert Platter', price: 18, quantity: 1 }
      ]
    },
    {
      id: 'b-102',
      refNumber: 'RH-SK9921-2026',
      venueId: 'sakura-garden',
      venueName: 'Sakura Japanese Garden & Sushi',
      venueImage: IMG.gekko,
      location: 'Sanchaung, Yangon',
      date: '2026-08-28', time: '06:30 PM', guests: 4,
      packageName: 'Executive Bento & Nigiri Lunch', packagePrice: 38, totalPaid: 129,
      userName: 'Phyo Win', userEmail: 'phyo.win@example.com', userPhone: '+959 123 456 789',
      status: 'Confirmed', createdAt: '2026-08-19',
      tableNumber: 'Tatami Room #B2',
      seatingArea: 'Private Tatami Room',
      occasion: 'Business Dinner',
      specialRequests: 'Quiet area with garden view for client meeting.',
      dietaryRestrictions: ['1 Guest Gluten-Free'],
      dressCode: 'Business Casual',
      cancellationPolicy: 'Free cancellation up to 4 hours before dining',
      preOrderedAddons: [
        { id: 'add-3', name: 'Hokkaido Scallop & Truffle Nigiri Set', price: 42, quantity: 1 }
      ]
    },
    {
      id: 'b-100',
      refNumber: 'RH-GM1104-2026',
      venueId: 'golden-mandalay',
      venueName: 'Golden Mandalay Palace Dining',
      venueImage: IMG.padonmar,
      location: 'Bahan, Yangon',
      date: '2026-07-20', time: '07:00 PM', guests: 3,
      packageName: 'Royal Heritage Set Menu', packagePrice: 32, totalPaid: 81,
      userName: 'Phyo Win', userEmail: 'phyo.win@example.com', userPhone: '+959 123 456 789',
      status: 'Completed', createdAt: '2026-07-15',
      tableNumber: 'Royal Salon Table #4',
      seatingArea: 'Indoor Heritage Hall',
      occasion: 'Family Celebration',
      specialRequests: 'Near stage for cultural puppet performance.',
      dietaryRestrictions: [],
      dressCode: 'Smart Casual',
      cancellationPolicy: 'Completed Dining'
    }
  ];
})(window.RH = window.RH || {});
