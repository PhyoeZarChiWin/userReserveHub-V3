/* ReserveHub — image registry & offline SVG generators */
(function (RH) {
  'use strict';

  var DIR = 'assets/images/';

  RH.IMAGES = {
    seeds: DIR + 'seeds.jpg',
    gekko: DIR + 'gekko.jpg',
    padonmar: DIR + 'padonmar.jpg',
    rooftop: DIR + 'rooftop.jpg',
    alchimiste: DIR + 'alchimiste.jpg',
    lopera: DIR + 'lopera.jpg',
    gildedFork: DIR + 'gilded-fork.jpg',
    rangoon: DIR + 'rangoon.jpg',
    familyDining: DIR + 'family-dining.jpg',
    privateDining: DIR + 'private-dining.jpg',
    bistro: DIR + 'bistro.jpg'
  };

  /* Inline data-URI avatar with initials — fully offline */
  RH.avatarSvg = function (initials, bg) {
    bg = bg || '#7A1F2B';
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">' +
      '<rect width="100" height="100" fill="' + bg + '" rx="50"/>' +
      '<text x="50" y="56" font-family="-apple-system,Segoe UI,Arial" font-size="42" font-weight="bold" fill="#fff" text-anchor="middle" dominant-baseline="middle">' +
      initials + '</text></svg>';
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  };

  /* Inline gradient food/venue placeholder used as <img> onerror fallback */
  RH.foodSvg = function (title, subtitle, c1, c2, emoji) {
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="' + (c1 || '#7A1F2B') + '"/>' +
      '<stop offset="1" stop-color="' + (c2 || '#5C141E') + '"/></linearGradient></defs>' +
      '<rect width="600" height="400" fill="url(#g)"/>' +
      '<circle cx="300" cy="160" r="70" fill="#ffffff" opacity="0.15"/>' +
      '<text x="300" y="185" font-size="72" text-anchor="middle">' + (emoji || '🍽️') + '</text>' +
      '<text x="300" y="280" font-family="Segoe UI,Arial" font-size="26" font-weight="bold" fill="#fff" text-anchor="middle">' + title + '</text>' +
      '<text x="300" y="314" font-family="Segoe UI,Arial" font-size="16" fill="rgba(255,255,255,.85)" text-anchor="middle">' + subtitle + '</text>' +
      '</svg>';
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  };
})(window.RH = window.RH || {});
