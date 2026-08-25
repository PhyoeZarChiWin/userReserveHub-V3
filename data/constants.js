/* ReserveHub — shared booking domain constants & helpers */
(function (RH) {
  'use strict';

  RH.NOTIFICATIONS = [
    { id: 'ntf-1', icon: '✅', title: 'Table Confirmed at Lakeview Terrace', body: 'Your table for 2 on Aug 25 at 07:30 PM is confirmed with Lakefront VIP seating.', time: '2 hours ago' },
    { id: 'ntf-2', icon: '🎉', title: '20% Dining Privilege Applied', body: 'Special promo code LUNCH20 is ready on your account for lunch reservations.', time: 'Yesterday' },
    { id: 'ntf-3', icon: '🍾', title: 'New Seasonal Menu at Seeds', body: 'Exclusive 5-course degustation now open for ReserveHub members.', time: '3 days ago' }
  ];

  RH.SEATING_OPTIONS = [
    'Terrace / Waterfront',
    'Main Dining Room',
    'Private Tatami Room',
    'Chef Bar Counter',
    'Quiet Corner Window',
    'Rooftop Skyline Deck'
  ];

  RH.OCCASIONS = [
    'Casual Dining',
    'Anniversary Dinner',
    'Birthday Celebration',
    'Business Dinner',
    'Romantic Date Night',
    'Family Gathering',
    'Proposal / Engagement'
  ];

  RH.DIETARY_OPTIONS = [
    'No Shellfish', 'Gluten-Free', 'Nut Allergy', 'Vegetarian',
    'Vegan', 'Halal Friendly', 'Dairy-Free', 'Low Sodium'
  ];

  RH.AVAILABLE_ADDONS = [
    { id: 'add-1', name: 'Veuve Clicquot Champagne Bottle', price: 85, category: 'Beverage', icon: '🍾', desc: 'Chilled bottle ready at table upon arrival' },
    { id: 'add-2', name: 'Chef Custom Dessert & Candle', price: 18, category: 'Celebration', icon: '🎂', desc: 'Personalized chocolate message with sparkler candle' },
    { id: 'add-3', name: 'Hokkaido Scallop & Truffle Nigiri', price: 42, category: 'Appetizer', icon: '🍣', desc: 'Chef specialty starter platter (6 pcs)' },
    { id: 'add-4', name: 'Artisanal Charcuterie & Truffle Board', price: 28, category: 'Appetizer', icon: '🧀', desc: 'Aged cheeses, parma ham, organic fig jam' },
    { id: 'add-5', name: 'Sommelier Reserve Wine Pairing', price: 45, category: 'Beverage', icon: '🍷', desc: '3 premium glass pairings curated for your courses' },
    { id: 'add-6', name: 'Fresh Oyster Platter on Ice', price: 36, category: 'Appetizer', icon: '🦪', desc: 'Half-dozen Pacific oysters with mignonette' }
  ];

  /* Relative countdown label for a booking date + status */
  RH.getCountdownLabel = function (dateStr, status) {
    if (status === 'Cancelled') return { text: 'Cancelled', cls: 'cd-cancelled' };
    if (status === 'Completed') return { text: 'Dining Completed', cls: 'cd-completed' };
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var d = new Date(dateStr); d.setHours(0, 0, 0, 0);
    var days = Math.round((d.getTime() - today.getTime()) / 86400000);
    if (days === 0) return { text: 'Today!', cls: 'cd-today' };
    if (days === 1) return { text: 'Tomorrow', cls: 'cd-tomorrow' };
    if (days > 1) return { text: 'In ' + days + ' days', cls: 'cd-later' };
    return { text: 'Past Visit', cls: 'cd-completed' };
  };

  /* Download an .ics calendar invite for a booking */
  RH.downloadBookingIcs = function (b, showToast) {
    var stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    var ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0',
      'PRODID:-//FineDining Yangon//Reservation System//EN',
      'BEGIN:VEVENT',
      'UID:' + b.refNumber + '@finediningyangon.com',
      'DTSTAMP:' + stamp,
      'DTSTART:' + b.date.replace(/-/g, '') + 'T190000Z',
      'SUMMARY:Table Reservation at ' + b.venueName,
      'DESCRIPTION:Table reservation for ' + b.guests + ' guests (' + b.packageName + '). Ref: ' + b.refNumber + '. Location: ' + b.location,
      'LOCATION:' + b.venueName + ', ' + b.location,
      'STATUS:CONFIRMED',
      'END:VEVENT', 'END:VCALENDAR'
    ].join('\r\n');
    var blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Reservation-' + b.refNumber + '.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (showToast) showToast('Calendar event downloaded (.ics)!');
  };

  RH.addonsCount = function (addons) {
    return (addons || []).reduce(function (acc, a) { return acc + a.quantity; }, 0);
  };

  /* Generate a ReserveHub-style reference number */
  RH.generateRefNumber = function () {
    var rand = Math.random().toString(36).substring(2, 8).toUpperCase();
    return 'RH-' + rand + '-' + Math.floor(1000 + Math.random() * 9000);
  };
})(window.RH = window.RH || {});
