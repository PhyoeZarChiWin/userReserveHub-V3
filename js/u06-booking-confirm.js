/* ReserveHub — U06 · Booking Confirm (final review) */
(function (RH) {
  'use strict';

  RH.registerScreen('U06', {
    title: 'Confirm Booking',
    render: function (root) {
      var store = RH.store;
      var draft = store.get('draft');
      var venue = RH.utils.findVenue(draft.venueId) || store.get('venues')[0];

      if (!venue) {
        root.innerHTML =
          '<div class="empty-state"><h3>No active booking to confirm.</h3>' +
          '<button class="btn btn-primary btn-sm" data-nav="U02">Explore Venues</button></div>';
        return;
      }

      var pkg = venue.packages.filter(function (p) { return p.id === draft.packageId; })[0] ||
        venue.packages[0] ||
        { id: 'pkg-standard', name: 'Standard Reservation', price: venue.basePrice, perText: '/ guest' };

      var sub = pkg.price * draft.guests;
      var disc = draft.applyPromo ? Math.round(sub * 0.15) : 0;
      var total = Math.max(0, sub - disc);

      root.innerHTML =
      '<div style="padding-bottom:90px;" class="page" >' +
        '<div class="flow-back">' +
          '<button class="back-btn" data-nav-back="U05" aria-label="Back to booking input">' + RH.icon('arrow-left') + '</button>' +
          '<div><h1 class="black" style="font-size:22px;">Confirm your booking</h1>' +
          '<p class="tiny t-muted" style="margin-top:2px;">Please review the details below before placing your reservation.</p></div>' +
        '</div>' +

        '<div class="flow-layout">' +

          '<div class="stack" style="gap:22px;">' +

            /* Restaurant */
            '<section class="rev-restaurant card-hover">' +
              '<img src="' + venue.image + '" alt="' + venue.name + '">' +
              '<div class="pad stack" style="gap:6px;">' +
                '<span class="badge uppercase">' + venue.category + '</span>' +
                '<h2 class="black" style="font-size:18px;line-height:1.25;">' + venue.name + '</h2>' +
                '<p class="vc-meta" style="flex-wrap:wrap;gap:4px 12px;">' +
                  '<span class="rating-pill">' + RH.icon('star') + venue.rating + '</span>' +
                  '<span style="display:inline-flex;align-items:center;gap:3px;">' + RH.icon('map-pin', 'icon-sm') + venue.location + '</span>' +
                  '<span style="display:inline-flex;align-items:center;gap:3px;">' + RH.icon('clock', 'icon-sm') + venue.openingHours + '</span></p>' +
              '</div>' +
            '</section>' +

            /* Reservation details */
            '<section class="step-panel stack" style="gap:14px;">' +
              '<div style="display:flex;justify-content:space-between;align-items:center;"><h2 style="font-size:16px;font-weight:800;">Reservation Details</h2>' +
              '<button class="edit-link" data-nav-back="U04">' + RH.icon('pencil', 'icon-sm') + ' Edit slot</button></div>' +
              '<div class="metrics-grid">' +
                '<div class="summary-box kv"><span>Date</span><strong>' + draft.date + '</strong></div>' +
                '<div class="summary-box kv"><span>Time</span><strong>' + draft.time + '</strong></div>' +
                '<div class="summary-box kv"><span>Guests</span><strong>' + draft.guests + ' guests</strong></div>' +
                '<div class="summary-box kv"><span>Package</span><strong class="truncate">' + pkg.name + '</strong></div>' +
              '</div>' +
            '</section>' +

            /* Guest info */
            '<section class="step-panel stack" style="gap:14px;">' +
              '<div style="display:flex;justify-content:space-between;align-items:center;"><h2 style="font-size:16px;font-weight:800;">Guest Information</h2>' +
              '<button class="edit-link" data-nav-back="U05">' + RH.icon('pencil', 'icon-sm') + ' Edit details</button></div>' +
              '<div class="metrics-grid" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr));">' +
                '<div class="summary-box kv"><span>' + RH.icon('user', 'icon-sm') + ' Name</span><strong>' + (draft.userName || '—') + '</strong></div>' +
                '<div class="summary-box kv"><span>' + RH.icon('phone', 'icon-sm') + ' Phone</span><strong>' + (draft.userPhone || '—') + '</strong></div>' +
                '<div class="summary-box kv"><span>' + RH.icon('mail', 'icon-sm') + ' Email</span><strong style="word-break:break-all;">' + (draft.userEmail || '—') + '</strong></div>' +
              '</div>' +
              (draft.specialRequest
                ? '<div style="border-top:1px solid rgba(212,163,115,.22);padding-top:12px;" class="stack gap-y-2">' +
                  '<span class="tiny bold t-muted" style="display:inline-flex;align-items:center;gap:5px;text-transform:uppercase;letter-spacing:.06em;">' + RH.icon('message-plus', 'icon-sm') + ' Special Request</span>' +
                  '<p class="request-quote">“' + draft.specialRequest + '”</p></div>'
                : '') +
            '</section>' +
          '</div>' +

          /* Price summary */
          '<aside class="sticky-side"><div class="summary-side stack" style="gap:16px;">' +
            '<h2 style="font-size:17px;font-weight:800;display:flex;align-items:center;gap:7px;">' + RH.icon('check-circle') + 'Booking Summary</h2>' +
            '<div>' +
              '<div class="sum-row"><span>' + pkg.name + ' ($' + pkg.price + '/guest)</span><span>$' + sub + '</span></div>' +
              (disc > 0 ? '<div class="sum-row" style="color:var(--burgundy);font-weight:700;"><span>Promo discount (15%)</span><span>-$' + disc + '</span></div>' : '') +
              '<div class="sum-total"><span>Total</span><span class="amount">$' + total + '</span></div>' +
            '</div>' +
            '<div class="stack" style="gap:10px;">' +
              '<button class="btn btn-primary btn-lg btn-block" id="confirm-booking">' + RH.icon('shield-check', 'icon-sm') + ' Confirm Booking</button>' +
              '<button class="btn btn-ghost btn-block" data-nav-back="U05">' + RH.icon('pencil', 'icon-sm') + ' Back &amp; Edit Booking</button>' +
            '</div>' +
            '<p class="micro t-faint t-center">Free cancellation up to 24 hours before your reservation.</p>' +
          '</div></aside>' +
        '</div>' +

        /* Mobile bar */
        '<div class="actionbar">' +
          '<div><span class="micro t-muted" style="display:block;">' + draft.date + ' · ' + draft.time + ' · ' + draft.guests + ' guests</span>' +
          '<strong style="color:var(--burgundy);font-size:16px;">$' + total + '</strong></div>' +
          '<div style="display:flex;gap:8px;">' +
            '<button class="back-btn" data-nav-back="U05" aria-label="Edit booking">' + RH.icon('pencil') + '</button>' +
            '<button class="btn btn-primary" id="confirm-booking-mobile">Confirm Booking</button>' +
          '</div>' +
        '</div>' +
      '</div>';

      function confirmBooking() {
        var booking = {
          id: 'b-' + Date.now(),
          refNumber: RH.generateRefNumber(),
          venueId: venue.id,
          venueName: venue.name,
          venueImage: venue.image,
          location: venue.address,
          date: draft.date,
          time: draft.time,
          guests: draft.guests,
          packageName: pkg.name,
          packagePrice: pkg.price,
          totalPaid: total,
          userName: draft.userName || 'Guest',
          userEmail: draft.userEmail || '',
          userPhone: draft.userPhone || '',
          status: 'Confirmed',
          createdAt: new Date().toISOString().split('T')[0],
          specialRequests: draft.specialRequest || undefined,
          seatingArea: undefined,
          dietaryRestrictions: [],
          dressCode: 'Smart Casual',
          cancellationPolicy: 'Free cancellation up to 24 hours before dining'
        };
        store.patch({
          bookings: [booking].concat(store.get('bookings')),
          latestBookingId: booking.id,
          selectedBookingId: booking.id
        });
        RH.toast('Reservation confirmed! Reference: ' + booking.refNumber);
        RH.router.navigate('U07');
      }

      document.getElementById('confirm-booking').addEventListener('click', confirmBooking);
      document.getElementById('confirm-booking-mobile').addEventListener('click', confirmBooking);
    }
  });
})(window.RH = window.RH || {});
