/* ReserveHub — U03 · Shop Profile */
(function (RH) {
  'use strict';

  RH.registerScreen('U03', {
    title: 'Shop Profile',
    render: function (root) {
      var store = RH.store;
      var venue = RH.utils.findVenue(store.get('selectedVenueId')) || store.get('venues')[0];
      var favorites = store.get('favorites') || [];

      if (!venue) {
        root.innerHTML =
          '<div class="empty-state"><h3>Venue not found.</h3>' +
          '<button class="btn btn-primary btn-sm" data-nav="U02">Return to Explore</button></div>';
        return;
      }

      var isFav = favorites.indexOf(venue.id) !== -1;
      var startingPrice = venue.basePrice || (venue.packages && venue.packages[0] ? venue.packages[0].price : 38);

      root.innerHTML =
      '<div style="padding-bottom:90px;" class="page anim-up">' +

        /* Breadcrumb navigation */
        '<div style="display:flex;align-items:center;gap:8px;font-size:12.5px;color:#64748B;margin-bottom:14px;flex-wrap:wrap;">' +
          '<button class="btn btn-ghost btn-sm" data-nav="U02" style="padding:4px 8px;font-size:12px;display:inline-flex;align-items:center;gap:4px;">' +
            RH.icon('arrow-left', 'icon-sm') + ' Explore Venues' +
          '</button>' +
          '<span>/</span>' +
          '<span style="font-weight:600;color:var(--burgundy);">' + venue.category + '</span>' +
          '<span>/</span>' +
          '<span style="color:var(--ink);font-weight:700;">' + venue.name + '</span>' +
        '</div>' +

        '<div class="detail-layout">' +

          /* Left Column — Full Shop Profile */
          '<div class="stack" style="gap:24px;">' +

            /* 1. Photo Gallery */
            '<section class="stack" style="gap:12px;">' +
              '<div class="gallery-main">' +
                '<img id="gal-main" src="' + venue.gallery[0] + '" alt="' + venue.name + '">' +
                '<div class="gallery-actions">' +
                  '<button class="img-icon-btn" id="share-venue" aria-label="Share venue" title="Share Venue" style="color:#334155;">' +
                    RH.icon('share-2', 'icon-lg') +
                  '</button>' +
                  '<button class="img-icon-btn" id="fav-venue" aria-label="Favorite venue" title="Save to favorites" style="' + (isFav ? 'color:var(--danger);' : '') + '">' +
                    RH.icon('heart', '', { filled: isFav }) +
                  '</button>' +
                '</div>' +
                '<span class="gallery-count" id="gal-count">1 / ' + venue.gallery.length + ' photos</span>' +
              '</div>' +
              '<div class="gallery-thumbs" id="gal-thumbs">' +
                venue.gallery.map(function (g, i) {
                  return '<button class="gthumb' + (i === 0 ? ' is-active' : '') + '" data-thumb="' + i + '"><img src="' + g + '" alt="Photo ' + (i + 1) + '"></button>';
                }).join('') +
              '</div>' +
            '</section>' +

            /* 2. Shop Header / Verified Profile */
            '<section class="card pad stack" style="gap:12px;">' +
              '<div class="shop-header-tags">' +
                '<span class="badge" style="background:#FFF1F2;color:#9F1239;border:1px solid #FECDD3;font-weight:700;">' + venue.category + '</span>' +
                '<span class="badge badge-gold badge-live">● Open Now for Dine-in</span>' +
                '<span class="vc-meta">' + RH.icon('clock', 'icon-sm') + venue.openingHours + '</span>' +
              '</div>' +
              '<h1 class="black" style="font-size:28px;line-height:1.2;color:var(--ink);">' + venue.name + '</h1>' +
              '<div class="shop-header-tags">' +
                '<span class="rating-pill">' + RH.icon('star', '', { filled: true }) + ' ' + venue.rating + '</span>' +
                '<a href="#reviews-anchor" class="bold underline" style="color:var(--burgundy);text-decoration:underline;">' + venue.reviewsCount + ' verified reviews</a> ·' +
                '<span class="vc-meta" style="color:#64748B;">' + RH.icon('map-pin', 'icon-sm') + venue.location + '</span>' +
              '</div>' +
            '</section>' +

            /* 3. About the Shop / Venue */
            '<section class="card pad stack" style="gap:14px;">' +
              '<div style="display:flex;align-items:center;justify-content:space-between;">' +
                '<h2 style="font-size:18px;font-weight:800;color:var(--ink);display:flex;align-items:center;gap:8px;">' +
                  RH.icon('coffee', 'icon-sm') + ' About Venue &amp; Concept' +
                '</h2>' +
                '<span class="badge" style="background:#F0FDF4;color:#15803D;border:1px solid #DCFCE7;">✓ Verified Kitchen</span>' +
              '</div>' +
              '<p class="small" style="color:var(--ink-60);line-height:1.75;">' + venue.description + '</p>' +
              '<div class="features-grid">' +
                ['Instant confirmation', 'Free cancellation up to 24h', 'VIP table allocation', 'No booking fee'].map(function (f) {
                  return '<div class="feature-cell">' + RH.icon('check-circle', 'icon-sm') + '<span>' + f + '</span></div>';
                }).join('') +
              '</div>' +
            '</section>' +

            /* 4. Experience & Atmosphere Details */
            '<section class="card pad stack" style="gap:14px;">' +
              '<h2 style="font-size:18px;font-weight:800;color:var(--ink);display:flex;align-items:center;gap:8px;">' +
                RH.icon('sparkles', 'icon-sm') + ' Atmosphere &amp; Dining Experience' +
              '</h2>' +
              '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;">' +
                '<div style="background:#FAF8F5;border:1px solid var(--border-card);border-radius:10px;padding:12px;">' +
                  '<span class="micro t-muted uppercase bold" style="display:block;margin-bottom:4px;">Dining Style</span>' +
                  '<strong style="font-size:14px;color:var(--ink);">Fine Dining &amp; Lounge</strong>' +
                '</div>' +
                '<div style="background:#FAF8F5;border:1px solid var(--border-card);border-radius:10px;padding:12px;">' +
                  '<span class="micro t-muted uppercase bold" style="display:block;margin-bottom:4px;">Dress Code</span>' +
                  '<strong style="font-size:14px;color:var(--ink);">Smart Casual / Elegant</strong>' +
                '</div>' +
                '<div style="background:#FAF8F5;border:1px solid var(--border-card);border-radius:10px;padding:12px;">' +
                  '<span class="micro t-muted uppercase bold" style="display:block;margin-bottom:4px;">Seating Areas</span>' +
                  '<strong style="font-size:14px;color:var(--ink);">Main Deck, Terrace &amp; VIP Rooms</strong>' +
                '</div>' +
                '<div style="background:#FAF8F5;border:1px solid var(--border-card);border-radius:10px;padding:12px;">' +
                  '<span class="micro t-muted uppercase bold" style="display:block;margin-bottom:4px;">Payment Accepted</span>' +
                  '<strong style="font-size:14px;color:var(--ink);">KBZPay, CBPay, WavePay, Cards</strong>' +
                '</div>' +
              '</div>' +
            '</section>' +

            /* 5. Venue Amenities */
            '<section class="card pad stack" style="gap:14px;">' +
              '<div>' +
                '<h2 style="font-size:18px;font-weight:800;color:var(--ink);display:flex;align-items:center;gap:8px;">' +
                  RH.icon('check-circle', 'icon-sm') + ' Amenities &amp; Services' +
                '</h2>' +
                '<p class="tiny t-muted" style="margin-top:2px;">Special accommodations and facilities provided on-site</p>' +
              '</div>' +
              '<div class="amenities-grid">' +
                '<div class="amenity">' + RH.icon('wifi') + '<span>High-speed Guest WiFi</span></div>' +
                '<div class="amenity">' + RH.icon('car') + '<span>Valet &amp; On-site Parking</span></div>' +
                '<div class="amenity">' + RH.icon('snowflake') + '<span>Climate-Controlled AC</span></div>' +
                '<div class="amenity">' + RH.icon('utensils') + '<span>Full Multi-Course Catering</span></div>' +
                '<div class="amenity">' + RH.icon('shield') + '<span>24/7 Security &amp; Concierge</span></div>' +
                '<div class="amenity">' + RH.icon('wine') + '<span>Sommelier Curated Cellar</span></div>' +
              '</div>' +
            '</section>' +

            /* 6. Reservation Policies */
            '<section class="card pad stack" style="gap:12px;">' +
              '<h2 style="font-size:18px;font-weight:800;color:var(--ink);display:flex;align-items:center;gap:8px;">' +
                RH.icon('info', 'icon-sm') + ' Reservation Policies' +
              '</h2>' +
              '<div class="summary-box stack" style="gap:10px;margin-top:2px;">' +
                '<div>' +
                  '<p class="tiny bold" style="color:var(--burgundy);">Cancellation &amp; Refunds</p>' +
                  '<p class="tiny t-muted" style="line-height:1.5;">Free cancellation up to 24 hours before your reservation time with 100% instant refund back to your original payment method.</p>' +
                '</div>' +
                '<div>' +
                  '<p class="tiny bold" style="color:var(--burgundy);">Arrival &amp; Table Hold Grace Period</p>' +
                  '<p class="tiny t-muted" style="line-height:1.5;">Please arrive 10–15 minutes prior to your seating slot. Tables are guaranteed and held for up to 20 minutes past reservation time.</p>' +
                '</div>' +
                '<div>' +
                  '<p class="tiny bold" style="color:var(--burgundy);">Dietary &amp; Special Requests</p>' +
                  '<p class="tiny t-muted" style="line-height:1.5;">Halal-certified, vegetarian, and allergen-safe preparations available upon booking request.</p>' +
                '</div>' +
              '</div>' +
            '</section>' +

            /* 7. Location & Directions */
            '<section class="card pad stack" style="gap:14px;">' +
              '<div>' +
                '<h2 style="font-size:18px;font-weight:800;color:var(--ink);display:flex;align-items:center;gap:8px;">' +
                  RH.icon('map-pin', 'icon-sm') + ' Location &amp; Contact' +
                '</h2>' +
                '<p class="tiny t-muted">' + venue.address + '</p>' +
              '</div>' +
              '<div class="map-visual">' +
                '<span class="map-pin">' + RH.icon('map-pin', 'icon-lg') + '</span>' +
                '<h3 class="small bold" style="color:var(--ink);">' + venue.name + '</h3>' +
                '<p class="tiny t-muted" style="max-width:320px;margin-top:2px;">' + venue.address + '</p>' +
              '</div>' +
              '<div class="filter-grid" style="grid-template-columns:1fr 1fr;gap:10px;">' +
                '<a class="btn btn-primary" target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(venue.address) + '" style="background:var(--burgundy);display:inline-flex;align-items:center;justify-content:center;gap:6px;">' +
                  RH.icon('navigation', 'icon-sm') + ' Get Directions' +
                '</a>' +
                '<a class="btn btn-ghost" href="tel:+959123456789" style="display:inline-flex;align-items:center;justify-content:center;gap:6px;">' +
                  RH.icon('phone', 'icon-sm') + ' Call Venue' +
                '</a>' +
              '</div>' +
            '</section>' +

            /* 8. Verified Guest Reviews */
            '<section class="card pad stack" style="gap:18px;" id="reviews-anchor">' +
              '<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">' +
                '<div>' +
                  '<h2 style="font-size:18px;font-weight:800;color:var(--ink);display:flex;align-items:center;gap:8px;">' +
                    RH.icon('star', 'icon-sm') + ' Verified Guest Reviews' +
                  '</h2>' +
                  '<p class="tiny t-muted">Authenticated feedback from verified diners</p>' +
                '</div>' +
                '<span class="badge" style="background:#FEF3C7;color:#92400E;font-weight:700;">' + venue.rating + ' / 5.0 Rating</span>' +
              '</div>' +

              '<div class="rating-summary">' +
                '<div class="rating-score">' +
                  '<span class="big">' + venue.rating + '</span>' +
                  '<div style="display:flex;gap:2px;justify-content:center;margin:6px 0;">' +
                    [0, 1, 2, 3, 4].map(function () {
                      return RH.icon('star', '', { filled: true }).replace('class="icon"', 'class="icon" style="color:#D4A373;width:15px;height:15px;"');
                    }).join('') +
                  '</div>' +
                  '<p class="tiny t-muted">' + venue.reviewsCount + ' reviews</p>' +
                '</div>' +
                '<div class="rating-bars">' +
                  [['5 ★', '78%'], ['4 ★', '16%'], ['3 ★', '4%'], ['2 ★', '1%'], ['1 ★', '1%']].map(function (b) {
                    return '<div class="rating-bar-row"><span style="width:26px;">' + b[0] + '</span>' +
                      '<div class="rating-bar-track"><div class="rating-bar-fill" style="width:' + b[1] + ';"></div></div>' +
                      '<span style="width:32px;text-align:right;color:#94A3B8;">' + b[1] + '</span></div>';
                  }).join('') +
                '</div>' +
              '</div>' +

              '<div class="stack" style="gap:12px;">' +
                venue.reviews.map(function (r) {
                  var stars = '';
                  for (var i = 0; i < r.rating; i++) stars += RH.icon('star', 'icon-sm', { filled: true });
                  return (
                    '<div class="summary-box stack" style="gap:8px;">' +
                      '<div style="display:flex;justify-content:space-between;align-items:center;">' +
                        '<div style="display:flex;align-items:center;gap:10px;">' +
                          '<span class="avatar-circle" style="background:var(--burgundy);">' + r.userAvatar + '</span>' +
                          '<div><strong class="tiny" style="color:var(--ink);">' + r.userName + '</strong><p class="micro t-faint">' + r.date + '</p></div>' +
                        '</div>' +
                        '<div style="display:flex;gap:2px;color:var(--gold);">' + stars + '</div>' +
                      '</div>' +
                      '<p class="tiny" style="color:var(--ink-60);line-height:1.6;">' + r.comment + '</p>' +
                    '</div>'
                  );
                }).join('') +
              '</div>' +
            '</section>' +

          '</div>' +

          /* Right Sidebar — Shop Profile Booking Action Card (Directs to U04 Check Availability) */
          '<aside class="sticky-side">' +
            '<div class="u03-cta-card">' +

              '<div>' +
                '<span class="badge" style="background:#FFF1F2;color:#9F1239;border:1px solid #FECDD3;font-size:11px;font-weight:700;margin-bottom:8px;display:inline-block;">' +
                  '● Live Table Reservations' +
                '</span>' +
                '<div class="u03-price-badge">' +
                  '<span style="font-size:12px;color:#64748B;font-weight:600;">Starting from</span>' +
                  '<strong style="font-size:26px;font-weight:900;color:var(--burgundy);margin-left:4px;">$' + startingPrice + '</strong>' +
                  '<span style="font-size:12px;color:#64748B;font-weight:500;">/ guest</span>' +
                '</div>' +
                '<p class="tiny t-muted" style="margin-top:4px;">Reserve ahead with instant confirmation &amp; guaranteed seating.</p>' +
              '</div>' +

              '<div class="u03-perks-list">' +
                '<div class="u03-perk-item">' + RH.icon('check', 'icon-sm') + '<span>Real-time table slot availability</span></div>' +
                '<div class="u03-perk-item">' + RH.icon('check', 'icon-sm') + '<span>100% Free cancellation up to 24h</span></div>' +
                '<div class="u03-perk-item">' + RH.icon('check', 'icon-sm') + '<span>Zero service or platform fees</span></div>' +
                '<div class="u03-perk-item">' + RH.icon('check', 'icon-sm') + '<span>Digital dining pass &amp; QR check-in</span></div>' +
              '</div>' +

              '<button class="btn btn-primary btn-block btn-lg" id="u03-btn-check-avail" style="background:var(--burgundy);color:#FFF;font-weight:800;font-size:15px;padding:14px;border-radius:12px;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 4px 14px rgba(122,31,43,0.3);">' +
                RH.icon('calendar', 'icon-sm') + ' Check Availability &amp; Reserve ' + RH.icon('arrow-right', 'icon-sm') +
              '</button>' +

              '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:4px;">' +
                '<a href="tel:+959123456789" class="btn btn-ghost btn-sm" style="font-size:12px;display:flex;align-items:center;justify-content:center;gap:4px;">' +
                  RH.icon('phone', 'icon-sm') + ' Call Host' +
                '</a>' +
                '<button type="button" class="btn btn-ghost btn-sm" id="u03-btn-share-side" style="font-size:12px;display:flex;align-items:center;justify-content:center;gap:4px;">' +
                  RH.icon('share-2', 'icon-sm') + ' Share' +
                '</button>' +
              '</div>' +

            '</div>' +
          '</aside>' +

        '</div>' +

        /* Mobile Sticky Action Bar */
        '<div class="actionbar">' +
          '<div>' +
            '<span class="micro t-faint" style="display:block;">From <strong style="color:var(--burgundy);font-size:15px;">$' + startingPrice + '</strong> / guest</span>' +
            '<span style="font-size:11px;color:#059669;font-weight:700;">● Open for booking today</span>' +
          '</div>' +
          '<button class="btn btn-primary" id="u03-mobile-check-avail" style="background:var(--burgundy);font-weight:700;display:flex;align-items:center;gap:6px;padding:10px 18px;">' +
            RH.icon('calendar', 'icon-sm') + ' Check Availability ' + RH.icon('chevron-right', 'icon-sm') +
          '</button>' +
        '</div>' +

      '</div>';

      /* ---------------- Bindings & Event Handlers ---------------- */

      /* 1. Navigate to U04 (Check Availability) */
      function goCheckAvailability() {
        var draft = store.get('draft') || {};
        store.patch({
          selectedVenueId: venue.id,
          draft: Object.assign({}, draft, {
            venueId: venue.id,
            date: draft.date || '2026-08-25',
            time: draft.time || (venue.slots[0] || '07:00 PM'),
            guests: draft.guests || 2,
            packageId: (venue.packages && venue.packages[0]) ? venue.packages[0].id : 'pkg-standard'
          })
        });
        RH.router.navigate('U04');
      }

      var checkAvailBtn = document.getElementById('u03-btn-check-avail');
      if (checkAvailBtn) checkAvailBtn.addEventListener('click', goCheckAvailability);

      var mobileCheckAvailBtn = document.getElementById('u03-mobile-check-avail');
      if (mobileCheckAvailBtn) mobileCheckAvailBtn.addEventListener('click', goCheckAvailability);

      /* 2. Gallery thumbnails */
      var thumbsWrap = document.getElementById('gal-thumbs');
      if (thumbsWrap) {
        thumbsWrap.addEventListener('click', function (e) {
          var t = e.target.closest('[data-thumb]');
          if (!t) return;
          var idx = Number(t.getAttribute('data-thumb'));
          var mainImg = document.getElementById('gal-main');
          var countSpan = document.getElementById('gal-count');
          if (mainImg) mainImg.src = venue.gallery[idx];
          if (countSpan) countSpan.textContent = (idx + 1) + ' / ' + venue.gallery.length + ' photos';
          thumbsWrap.querySelectorAll('.gthumb').forEach(function (b) { b.classList.remove('is-active'); });
          t.classList.add('is-active');
        });
      }

      /* 3. Favorite toggle */
      var favBtn = document.getElementById('fav-venue');
      if (favBtn) {
        favBtn.addEventListener('click', function () {
          RH.toggleFavorite(venue.id);
          var nowFav = (RH.store.get('favorites') || []).indexOf(venue.id) !== -1;
          this.style.color = nowFav ? 'var(--danger)' : '#334155';
          this.innerHTML = RH.icon('heart', '', { filled: nowFav });
        });
      }

      /* 4. Share Venue */
      function shareVenueHandler() {
        if (navigator.share) {
          navigator.share({ title: venue.name, text: 'Check out ' + venue.name + ' on ReserveHub!', url: location.href }).catch(function () {});
        } else if (navigator.clipboard) {
          navigator.clipboard.writeText(location.href).catch(function () {});
          RH.toast('Venue link copied to clipboard!');
        } else {
          RH.toast('Venue link ready to share!');
        }
      }

      var shareBtn = document.getElementById('share-venue');
      if (shareBtn) shareBtn.addEventListener('click', shareVenueHandler);

      var shareSideBtn = document.getElementById('u03-btn-share-side');
      if (shareSideBtn) shareSideBtn.addEventListener('click', shareVenueHandler);
    }
  });
})(window.RH = window.RH || {});
