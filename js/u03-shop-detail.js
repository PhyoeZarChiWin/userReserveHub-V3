/* ReserveHub — U03 · Shop Detail */
(function (RH) {
  'use strict';

  RH.registerScreen('U03', {
    title: 'Shop Details',
    render: function (root) {
      var store = RH.store;
      var venue = RH.utils.findVenue(store.get('selectedVenueId')) || store.get('venues')[0];
      var favorites = store.get('favorites');
      var draft = store.get('draft') || {};

      if (!venue) {
        root.innerHTML =
          '<div class="empty-state"><h3>Venue not found.</h3>' +
          '<button class="btn btn-primary btn-sm" data-nav="U02">Return to Explore</button></div>';
        return;
      }

      var isFav = favorites.indexOf(venue.id) !== -1;

      /* Initial booking values */
      var selectedDate = draft.date || '2026-08-25';
      var selectedSlot = (draft.time && venue.slots.indexOf(draft.time) !== -1)
        ? draft.time
        : (venue.slots[0] || '12:30 PM');
      var selectedGuests = draft.guests || 2;

      function calcPrices(guestsCount) {
        var base = venue.basePrice || 38;
        var subtotal = guestsCount * base;
        var discount = Math.round(guestsCount * 4);
        var total = Math.max(0, subtotal - discount);
        return { base: base, subtotal: subtotal, discount: discount, total: total };
      }

      var initialPrices = calcPrices(selectedGuests);

      root.innerHTML =
      '<div style="padding-bottom:90px;" class="page">' +
        '<div class="detail-layout">' +

          '<div class="stack" style="gap:24px;">' +

            /* Gallery */
            '<section class="stack" style="gap:12px;">' +
              '<div class="gallery-main">' +
                '<img id="gal-main" src="' + venue.gallery[0] + '" alt="' + venue.name + '">' +
                '<div class="gallery-actions">' +
                  '<button class="img-icon-btn" id="share-venue" aria-label="Share venue" style="color:#334155;">' + RH.icon('share-2', 'icon-lg') + '</button>' +
                  '<button class="img-icon-btn" id="fav-venue" aria-label="Favorite venue" style="' + (isFav ? 'color:var(--danger);' : '') + '">' +
                    RH.icon('heart', '', { filled: isFav }) + '</button>' +
                '</div>' +
                '<span class="gallery-count" id="gal-count">1 / ' + venue.gallery.length + ' photos</span>' +
              '</div>' +
              '<div class="gallery-thumbs" id="gal-thumbs">' +
                venue.gallery.map(function (g, i) {
                  return '<button class="gthumb' + (i === 0 ? ' is-active' : '') + '" data-thumb="' + i + '"><img src="' + g + '" alt="Photo ' + (i + 1) + '"></button>';
                }).join('') +
              '</div>' +
            '</section>' +

            /* Header */
            '<section class="card pad stack" style="gap:10px;">' +
              '<div class="shop-header-tags">' +
                '<span class="badge">' + venue.category + '</span>' +
                '<span class="badge badge-gold badge-live">Open now</span>' +
                '<span class="vc-meta">' + RH.icon('clock') + venue.openingHours + '</span>' +
              '</div>' +
              '<h1 class="black" style="font-size:28px;">' + venue.name + '</h1>' +
              '<div class="shop-header-tags">' +
                '<span class="rating-pill">' + RH.icon('star', '', { filled: false }) + venue.rating + '</span>' +
                '<a href="#reviews-anchor" class="bold underline" style="text-decoration:underline;">' + venue.reviewsCount + ' reviews</a> ·' +
                '<span class="vc-meta">' + RH.icon('map-pin') + venue.location + '</span>' +
              '</div>' +
            '</section>' +

            /* About */
            '<section class="card pad stack" style="gap:14px;">' +
              '<h2 style="font-size:18px;font-weight:800;color:var(--ink);">About Venue</h2>' +
              '<p class="small" style="color:var(--ink-60);line-height:1.7;">' + venue.description + '</p>' +
              '<div class="features-grid">' +
                ['Instant confirmation', 'Free cancellation up to 24h', 'Verified venue', 'No booking fees'].map(function (f) {
                  return '<div class="feature-cell">' + RH.icon('check-circle') + '<span>' + f + '</span></div>';
                }).join('') +
              '</div>' +
              '<div class="summary-box stack" style="gap:10px;margin-top:4px;">' +
                '<h3 class="uppercase micro t-burgundy bold" style="letter-spacing:.09em;">Reservation Policies</h3>' +
                '<div><p class="tiny bold">Cancellation Policy</p><p class="tiny t-muted">Free cancellation up to 24 hours before your reservation time.</p></div>' +
                '<div><p class="tiny bold">Check-in Policy</p><p class="tiny t-muted">Please arrive 15 minutes before your scheduled slot. Reservations held for 20 mins.</p></div>' +
              '</div>' +
            '</section>' +

            /* Amenities (Matching Image) */
            '<section class="card pad stack" style="gap:14px;">' +
              '<div>' +
                '<h2 style="font-size:18px;font-weight:800;color:var(--ink);">Amenities</h2>' +
                '<p class="tiny t-muted" style="margin-top:2px;">What this venue offers for guests</p>' +
              '</div>' +
              '<div class="amenities-grid">' +
                '<div class="amenity">' + RH.icon('wifi') + '<span>High-speed WiFi</span></div>' +
                '<div class="amenity">' + RH.icon('car') + '<span>On-site Parking</span></div>' +
                '<div class="amenity">' + RH.icon('snowflake') + '<span>Air Conditioning</span></div>' +
                '<div class="amenity">' + RH.icon('utensils') + '<span>Full Catering</span></div>' +
                '<div class="amenity">' + RH.icon('shield') + '<span>24/7 Security</span></div>' +
              '</div>' +
            '</section>' +

            /* Available Time Slots (Matching Image) */
            '<section class="card pad stack" style="gap:14px;">' +
              '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;">' +
                '<div>' +
                  '<h2 style="font-size:18px;font-weight:800;color:var(--ink);">Available Time Slots</h2>' +
                  '<p class="tiny t-muted" style="margin-top:2px;">Pick a time that suits your visit</p>' +
                '</div>' +
                '<span class="slots-avail-badge">' + venue.slots.length + ' slots available</span>' +
              '</div>' +
              '<div class="slots-btn-grid" id="u03-slots-grid">' +
                venue.slots.map(function (s) {
                  var active = s === selectedSlot;
                  return '<button type="button" class="slot-select-btn' + (active ? ' is-selected' : '') + '" data-slot="' + s + '">' + s + '</button>';
                }).join('') +
              '</div>' +
            '</section>' +

            /* Reviews */
            '<section class="card pad stack" style="gap:18px;" id="reviews-anchor">' +
              '<div><h2 style="font-size:18px;font-weight:800;color:var(--ink);">Guest Reviews</h2><p class="tiny t-muted">Verified feedback from real visitors</p></div>' +
              '<div class="rating-summary">' +
                '<div class="rating-score">' +
                  '<span class="big">' + venue.rating + '</span>' +
                  '<div style="display:flex;gap:2px;justify-content:center;margin:6px 0;">' +
                    [0, 1, 2, 3, 4].map(function () { return RH.icon('star', '', { filled: true }).replace('class="icon"', 'class="icon" style="color:#D4A373;width:15px;height:15px;"'); }).join('') +
                  '</div>' +
                  '<p class="tiny t-muted">' + venue.reviewsCount + ' verified reviews</p>' +
                '</div>' +
                '<div class="rating-bars">' +
                  [['5 ★', '76%'], ['4 ★', '18%'], ['3 ★', '4%'], ['2 ★', '1%'], ['1 ★', '1%']].map(function (b) {
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
                          '<div><strong class="tiny">' + r.userName + '</strong><p class="micro t-faint">' + r.date + '</p></div>' +
                        '</div>' +
                        '<div style="display:flex;gap:2px;color:var(--gold);">' + stars + '</div>' +
                      '</div>' +
                      '<p class="tiny" style="color:var(--ink-60);line-height:1.6;">' + r.comment + '</p>' +
                    '</div>'
                  );
                }).join('') +
              '</div>' +
            '</section>' +

            /* Location */
            '<section class="card pad stack" style="gap:14px;">' +
              '<div><h2 style="font-size:18px;font-weight:800;color:var(--ink);">Location</h2><p class="tiny t-muted">' + venue.address + '</p></div>' +
              '<div class="map-visual">' +
                '<span class="map-pin">' + RH.icon('map-pin', 'icon-lg') + '</span>' +
                '<h3 class="small bold">' + venue.name + '</h3>' +
                '<p class="tiny t-muted" style="max-width:300px;">' + venue.address + '</p>' +
              '</div>' +
              '<div class="filter-grid" style="grid-template-columns:1fr 1fr;">' +
                '<a class="btn btn-primary" target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(venue.address) + '">' + RH.icon('navigation', 'icon-sm') + ' Get Directions</a>' +
                '<a class="btn btn-ghost" href="tel:+959123456789">' + RH.icon('phone', 'icon-sm') + ' Call Venue</a>' +
              '</div>' +
            '</section>' +
          '</div>' +

          /* Sidebar: Book your visit (Matching Image) */
          '<aside class="sticky-side">' +
            '<div class="book-side-card">' +
              '<div>' +
                '<h2 style="font-size:20px;font-weight:900;color:var(--ink);line-height:1.2;">Book your visit</h2>' +
                '<p style="font-size:13px;font-weight:600;color:#475569;margin-top:3px;">' + venue.name + '</p>' +
              '</div>' +

              '<div class="stack" style="gap:14px;">' +
                /* Date */
                '<div>' +
                  '<label class="book-field-label" for="sb-book-date">' + RH.icon('calendar', 'icon-sm') + ' Date</label>' +
                  '<div style="margin-top:6px;">' +
                    '<input type="date" id="sb-book-date" class="book-field-input" value="' + selectedDate + '">' +
                  '</div>' +
                '</div>' +

                /* Guests */
                '<div>' +
                  '<label class="book-field-label" for="sb-book-guests">' + RH.icon('users', 'icon-sm') + ' Guests</label>' +
                  '<div style="margin-top:6px;position:relative;">' +
                    '<select id="sb-book-guests" class="book-field-input" style="padding-right:32px;appearance:none;-webkit-appearance:none;cursor:pointer;">' +
                      [1, 2, 3, 4, 5, 6, 7, 8].map(function (g) {
                        var isSel = Number(selectedGuests) === g;
                        return '<option value="' + g + '"' + (isSel ? ' selected' : '') + '>' + g + (g === 1 ? ' Guest' : (g === 8 ? '+ Guests' : ' Guests')) + '</option>';
                      }).join('') +
                    '</select>' +
                    '<span style="position:absolute;right:12px;top:50%;transform:translateY(-50%);pointer-events:none;color:var(--ink-60);">' + RH.icon('chevron-down', 'icon-sm') + '</span>' +
                  '</div>' +
                '</div>' +

                /* Selected Time */
                '<div>' +
                  '<label class="book-field-label">' + RH.icon('clock', 'icon-sm') + ' Selected Time</label>' +
                  '<div style="margin-top:6px;">' +
                    '<div id="sb-selected-time-display" class="book-time-box">' + selectedSlot + '</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +

              /* Price calculation */
              '<div class="book-price-calc">' +
                '<div class="book-price-row">' +
                  '<span id="sb-calc-label" style="color:var(--ink-60);font-weight:600;">' + selectedGuests + ' × $' + initialPrices.base + '</span>' +
                  '<span id="sb-calc-subtotal" style="font-weight:700;color:var(--ink);">$' + initialPrices.subtotal + '</span>' +
                '</div>' +
                '<div class="book-price-row" style="color:var(--burgundy);">' +
                  '<span style="font-weight:700;">Promo discount</span>' +
                  '<span id="sb-calc-discount" style="font-weight:800;">-$' + initialPrices.discount + '</span>' +
                '</div>' +
                '<div class="book-price-row" style="padding-top:4px;">' +
                  '<span style="font-size:16px;font-weight:900;color:var(--ink);">Total</span>' +
                  '<span id="sb-calc-total" style="font-size:22px;font-weight:900;color:var(--burgundy);">$' + initialPrices.total + '</span>' +
                '</div>' +
              '</div>' +

              '<button class="btn btn-primary btn-block" id="sb-btn-continue" style="background:#7A1F2B;font-weight:800;font-size:14.5px;padding:13px;border-radius:var(--r-md);">Continue to Reservation</button>' +
            '</div>' +
          '</aside>' +
        '</div>' +

        /* Mobile reserve bar */
        '<div class="actionbar">' +
          '<div><span class="micro t-faint" style="display:block;">' + selectedSlot + ' · ' + selectedGuests + ' guests</span>' +
          '<strong style="color:var(--burgundy);font-size:16px;" id="mobile-price-disp">$' + initialPrices.total + ' total</strong></div>' +
          '<button class="btn btn-primary" id="go-slots-mobile" style="background:#7A1F2B;">Continue ' + RH.icon('chevron-right', 'icon-sm') + '</button>' +
        '</div>' +
      '</div>';

      /* ---------------- bindings ---------------- */
      var dateInput = document.getElementById('sb-book-date');
      var guestsSelect = document.getElementById('sb-book-guests');
      var timeDisplay = document.getElementById('sb-selected-time-display');
      var slotsContainer = document.getElementById('u03-slots-grid');

      function updatePricing() {
        var g = Number(guestsSelect.value) || 2;
        var p = calcPrices(g);
        document.getElementById('sb-calc-label').textContent = g + ' × $' + p.base;
        document.getElementById('sb-calc-subtotal').textContent = '$' + p.subtotal;
        document.getElementById('sb-calc-discount').textContent = '-$' + p.discount;
        document.getElementById('sb-calc-total').textContent = '$' + p.total;
        var mob = document.getElementById('mobile-price-disp');
        if (mob) mob.textContent = '$' + p.total + ' total';
      }

      /* Date selection */
      if (dateInput) {
        dateInput.addEventListener('change', function () {
          selectedDate = this.value;
        });
      }

      /* Guests selection */
      if (guestsSelect) {
        guestsSelect.addEventListener('change', function () {
          selectedGuests = Number(this.value);
          updatePricing();
        });
      }

      /* Time slot buttons click */
      if (slotsContainer) {
        slotsContainer.addEventListener('click', function (e) {
          var btn = e.target.closest('[data-slot]');
          if (!btn) return;
          selectedSlot = btn.getAttribute('data-slot');
          slotsContainer.querySelectorAll('.slot-select-btn').forEach(function (b) {
            b.classList.remove('is-selected');
          });
          btn.classList.add('is-selected');
          if (timeDisplay) timeDisplay.textContent = selectedSlot;
        });
      }

      /* Gallery thumbnails */
      document.getElementById('gal-thumbs').addEventListener('click', function (e) {
        var t = e.target.closest('[data-thumb]');
        if (!t) return;
        var idx = Number(t.getAttribute('data-thumb'));
        document.getElementById('gal-main').src = venue.gallery[idx];
        document.getElementById('gal-count').textContent = (idx + 1) + ' / ' + venue.gallery.length + ' photos';
        this.querySelectorAll('.gthumb').forEach(function (b) { b.classList.remove('is-active'); });
        t.classList.add('is-active');
      });

      /* Favorite */
      document.getElementById('fav-venue').addEventListener('click', function () {
        RH.toggleFavorite(venue.id);
        var nowFav = RH.store.get('favorites').indexOf(venue.id) !== -1;
        this.style.color = nowFav ? 'var(--danger)' : '#334155';
        this.innerHTML = RH.icon('heart', '', { filled: nowFav });
      });

      /* Share */
      document.getElementById('share-venue').addEventListener('click', function () {
        if (navigator.share) {
          navigator.share({ title: venue.name, text: 'Check out ' + venue.name + ' on ReserveHub!', url: location.href }).catch(function () {});
        } else if (navigator.clipboard) {
          navigator.clipboard.writeText(location.href).catch(function () {});
          RH.toast('Link copied to clipboard!');
        }
      });

      /* Continue to Reservation */
      function proceedReservation() {
        var g = Number(guestsSelect ? guestsSelect.value : selectedGuests) || 2;
        var d = (dateInput && dateInput.value) ? dateInput.value : selectedDate;
        var t = selectedSlot || venue.slots[0] || '12:30 PM';
        var p = calcPrices(g);

        store.patch({
          selectedVenueId: venue.id,
          draft: {
            venueId: venue.id,
            date: d,
            time: t,
            guests: g,
            packageId: (venue.packages && venue.packages[0]) ? venue.packages[0].id : 'pkg-standard',
            seating: 'Main Dining Room',
            dietary: [],
            addons: [],
            specialNotes: '',
            promoCode: 'LUNCH20',
            discount: p.discount,
            baseTotal: p.subtotal,
            total: p.total
          }
        });

        RH.router.navigate('U05');
      }

      var continueBtn = document.getElementById('sb-btn-continue');
      if (continueBtn) continueBtn.addEventListener('click', proceedReservation);

      var mobileContinue = document.getElementById('go-slots-mobile');
      if (mobileContinue) mobileContinue.addEventListener('click', proceedReservation);
    }
  });
})(window.RH = window.RH || {});

