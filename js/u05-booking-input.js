/* ReserveHub — U05 · Booking Input (guest details) */
(function (RH) {
  'use strict';

  RH.registerScreen('U05', {
    title: 'Your Details',
    render: function (root) {
      var store = RH.store;
      var draft = store.get('draft');
      var venue = RH.utils.findVenue(draft.venueId) || store.get('venues')[0];

      if (!venue) {
        root.innerHTML =
          '<div class="empty-state"><h3>Please select a venue first.</h3>' +
          '<button class="btn btn-primary btn-sm" data-nav="U02">Explore Venues</button></div>';
        return;
      }

      var form = {
        name: draft.userName != null ? draft.userName : 'Phyo Win',
        phone: draft.userPhone != null ? draft.userPhone : '+959 123 456 789',
        email: draft.userEmail != null ? draft.userEmail : 'phyo.win@example.com',
        request: draft.specialRequest || '',
        promo: draft.applyPromo !== false
      };

      var pkg = venue.packages.filter(function (p) { return p.id === draft.packageId; })[0] ||
        venue.packages[0] ||
        { id: 'pkg-standard', name: 'Standard Reservation', price: venue.basePrice, perText: '/ guest', includes: ['Priority Seating'] };

      function subtotal() { return pkg.price * draft.guests; }
      function totals() {
        var sub = subtotal();
        var disc = form.promo ? Math.round(sub * 0.15) : 0;
        return { sub: sub, disc: disc, total: Math.max(0, sub - disc) };
      }

      root.innerHTML =
      '<div style="padding-bottom:90px;" class="page">' +
        '<div class="flow-back">' +
          '<button class="back-btn" data-nav-back="U04" aria-label="Back to slot picker">' + RH.icon('arrow-left') + '</button>' +
          '<div><h1 class="black" style="font-size:22px;">Complete your reservation</h1>' +
          '<p class="tiny t-muted" style="margin-top:2px;">' + venue.name + ' · ' + venue.address + '</p></div>' +
        '</div>' +

        '<div class="flow-layout">' +

          /* Form column */
          '<div class="stack" style="gap:22px;">' +

            /* Step 1 — details */
            '<section class="step-panel stack" style="gap:14px;">' +
              '<h2><span class="step-num">1</span>Your Details</h2>' +
              '<div class="filter-grid" style="gap:14px;">' +
                '<div class="field"><label>' + RH.icon('user', 'icon-sm') + ' Full Name</label>' +
                  '<input id="bk-name" class="input" type="text" value="' + form.name.replace(/"/g, '&quot;') + '" required></div>' +
                '<div class="field"><label>' + RH.icon('phone', 'icon-sm') + ' Phone Number</label>' +
                  '<input id="bk-phone" class="input" type="tel" value="' + form.phone.replace(/"/g, '&quot;') + '" required></div>' +
              '</div>' +
              '<div class="field"><label>' + RH.icon('mail', 'icon-sm') + ' Email Address</label>' +
                '<input id="bk-email" class="input" type="email" value="' + form.email.replace(/"/g, '&quot;') + '" required></div>' +
            '</section>' +

            /* Step 2 — special requests */
            '<section class="step-panel stack" style="gap:14px;">' +
              '<h2><span class="step-num">2</span>Special Requests &amp; Notes</h2>' +
              '<div class="field"><label>' + RH.icon('message-plus', 'icon-sm') + ' Special Request (Optional)</label>' +
                '<textarea id="bk-request" class="textarea" rows="3" placeholder="e.g. Quiet corner table, birthday candle on dessert, wheelchair access...">' + form.request + '</textarea>' +
                '<p class="micro t-faint">Dietary restrictions and seating preferences can also be added later from My Bookings.</p></div>' +
            '</section>' +

            /* Step 3 — promotions */
            '<section class="step-panel stack" style="gap:14px;">' +
              '<h2><span class="step-num">3</span>Promotions</h2>' +
              '<label class="checkbox-row"><input type="checkbox" id="bk-promo"' + (form.promo ? ' checked' : '') + '>' +
                '<span><strong class="small t-burgundy" style="display:inline-flex;align-items:center;gap:5px;">' + RH.icon('tag', 'icon-sm') + ' Weekday Special · 15% off</strong>' +
                '<p class="tiny" style="color:var(--ink-60);margin-top:3px;">Enjoy 15% off your reservation subtotal.</p></span></label>' +
            '</section>' +
          '</div>' +

          /* Summary sidebar */
          '<aside class="sticky-side"><div class="summary-side stack" style="gap:18px;">' +
            '<div style="border-bottom:1px solid rgba(212,163,115,.25);padding-bottom:12px;">' +
              '<h2 style="font-size:17px;font-weight:800;">Booking Summary</h2>' +
              '<p class="tiny t-muted truncate bold">' + venue.name + '</p></div>' +

            '<div class="summary-box stack" style="gap:4px;">' +
              '<div class="sum-row"><span style="display:inline-flex;align-items:center;gap:5px;">' + RH.icon('calendar', 'icon-sm') + 'Date</span><strong>' + draft.date + '</strong></div>' +
              '<div class="sum-row"><span style="display:inline-flex;align-items:center;gap:5px;">' + RH.icon('clock', 'icon-sm') + 'Time</span><strong>' + draft.time + '</strong></div>' +
              '<div class="sum-row"><span style="display:inline-flex;align-items:center;gap:5px;">' + RH.icon('users', 'icon-sm') + 'Guests</span><strong>' + draft.guests + ' guests</strong></div>' +
              '<button class="edit-link" id="change-slot" style="border-top:1px solid rgba(212,163,115,.25);padding-top:8px;margin-top:4px;justify-content:center;display:flex;">' +
                RH.icon('pencil', 'icon-sm') + 'Change date / time / guests</button>' +
            '</div>' +

            '<div>' +
              '<div class="sum-row"><span>' + pkg.name + ' ($' + pkg.price + '/guest)</span><span>$' + subtotal() + '</span></div>' +
              '<div class="sum-row" id="promo-line" style="' + (form.promo ? '' : 'display:none;') + 'color:var(--burgundy);font-weight:700;"><span>Promo discount (15%)</span><span>-$<span id="promo-amt"></span></span></div>' +
              '<div class="sum-total"><span>Total</span><span class="amount" id="total-amt"></span></div>' +
            '</div>' +

            '<button class="btn btn-primary btn-lg btn-block" id="review-booking">Review &amp; Confirm Booking</button>' +
            '<p class="micro t-faint t-center">Free cancellation up to 24 hours before your reservation.</p>' +
          '</div></aside>' +
        '</div>' +

        /* Mobile bar */
        '<div class="actionbar">' +
          '<div><span class="micro t-muted" style="display:block;" id="bar-meta"></span>' +
          '<strong style="color:var(--burgundy);font-size:16px;" id="bar-total-m"></strong></div>' +
          '<button class="btn btn-primary" id="review-booking-mobile">Review Booking</button>' +
        '</div>' +
      '</div>';

      function paintTotals() {
        var t = totals();
        document.getElementById('promo-line').style.display = form.promo ? '' : 'none';
        document.getElementById('promo-amt').textContent = t.disc;
        document.getElementById('total-amt').textContent = '$' + t.total;
        document.getElementById('bar-total-m').textContent = '$' + t.total;
        document.getElementById('bar-meta').textContent = draft.date + ' · ' + draft.guests + ' guests';
      }
      paintTotals();

      /* ---------------- bindings ---------------- */
      document.getElementById('bk-promo').addEventListener('change', function (e) {
        form.promo = e.target.checked; paintTotals();
      });
      document.getElementById('change-slot').addEventListener('click', function () { RH.router.navigate('U04'); });

      function goNext() {
        form.name = document.getElementById('bk-name').value.trim();
        form.phone = document.getElementById('bk-phone').value.trim();
        form.email = document.getElementById('bk-email').value.trim();
        form.request = document.getElementById('bk-request').value.trim();

        if (!form.name || !form.phone || !form.email) {
          RH.toast('Please fill in your name, phone, and email.');
          return;
        }

        RH.store.patch({ draft: Object.assign({}, RH.store.get('draft'), {
          userName: form.name,
          userPhone: form.phone,
          userEmail: form.email,
          specialRequest: form.request || undefined,
          applyPromo: form.promo
        }) });
        RH.router.navigate('U06');
      }
      document.getElementById('review-booking').addEventListener('click', goNext);
      document.getElementById('review-booking-mobile').addEventListener('click', goNext);
    }
  });
})(window.RH = window.RH || {});
