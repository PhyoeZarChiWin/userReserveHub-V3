/* ReserveHub — U09 · Booking Detail */
(function (RH) {
  'use strict';

  RH.registerScreen('U09', {
    title: 'Booking Details',
    render: function (root, params) {
      var store = RH.store;
      var targetId = (params && params.id) || store.get('selectedBookingId') || store.get('latestBookingId');
      var bookings = store.get('bookings') || [];
      var booking = bookings.filter(function (b) {
        return b.id === targetId;
      })[0] || bookings[0] || null;

      if (!booking) {
        root.innerHTML =
          '<div class="empty-state"><h3>No booking selected.</h3>' +
          '<button class="btn btn-primary btn-sm" data-nav="U08">Back to My Bookings</button></div>';
        return;
      }

      var b = booking;
      var cd = RH.getCountdownLabel(b.date, b.status);
      var isActive = b.status === 'Confirmed' || b.status === 'Pending';
      var venue = RH.utils.findVenue(b.venueId);

      var dietChips = (b.dietaryRestrictions || []).map(function (d) {
        return '<span class="warn-chip">⚠️ ' + d + '</span>';
      }).join('');

      var addonRows = (b.preOrderedAddons || []).map(function (a) {
        return (
          '<div class="sum-row" style="background:var(--cream);border:1px solid rgba(212,163,115,.28);border-radius:9px;padding:8px 12px;">' +
            '<span>' + a.name + ' × ' + a.quantity + '</span><strong style="color:var(--burgundy);">+$' + (a.price * a.quantity) + '</strong></div>'
        );
      }).join('');

      root.innerHTML =
      '<div class="page" style="max-width:760px;margin-inline:auto;">' +

        '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;">' +
          '<button class="btn btn-ghost btn-sm" data-nav="U08">' + RH.icon('arrow-left', 'icon-sm') + 'Back to My Bookings</button>' +
          '<div style="display:flex;align-items:center;gap:8px;">' +
            '<span class="countdown-chip ' + cd.cls + '">' + cd.text + '</span>' +
            '<span class="status-pill st-' + b.status.toLowerCase() + '">' + b.status + '</span>' +
          '</div>' +
        '</div>' +

        /* Hero */
        '<section class="card detail-hero card-hover">' +
          '<img src="' + b.venueImage + '" alt="' + b.venueName + '"' + (venue ? ' data-open-venue-hero="' + venue.id + '" role="button" tabindex="0" style="cursor:pointer;"' : '') + '>' +
          '<span class="ref-chip" style="position:absolute;top:14px;left:14px;z-index:2;background:#fff;">Ref: ' + b.refNumber + '</span>' +
          '<div style="position:absolute;left:18px;right:18px;bottom:12px;z-index:2;display:flex;align-items:flex-end;justify-content:space-between;gap:10px;">' +
            '<div style="min-width:0;">' +
              (venue
                ? '<h1 class="black truncate" data-open-venue-hero="' + venue.id + '" role="button" tabindex="0" style="font-size:20px;color:#fff;cursor:pointer;">' + b.venueName + '</h1>'
                : '<h1 class="black truncate" style="font-size:20px;color:#fff;">' + b.venueName + '</h1>') +
              '<p class="tiny truncate" style="color:rgba(255,255,255,.85);display:flex;gap:4px;align-items:center;margin-top:2px;">' + RH.icon('map-pin', 'icon-sm') + b.location + '</p>' +
            '</div>' +
            (venue ? '<span class="rating-pill">' + RH.icon('star') + venue.rating + '</span>' : '') +
          '</div>' +
        '</section>' +

        /* Reservation details */
        '<section class="card pad stack" style="gap:14px;">' +
          '<h2 class="bold" style="font-size:16px;">Reservation Details</h2>' +
          '<div class="metrics-grid">' +
            '<div class="summary-box kv"><span>Date</span><strong>' + b.date + '</strong></div>' +
            '<div class="summary-box kv"><span>Time</span><strong>' + b.time + '</strong></div>' +
            '<div class="summary-box kv"><span>Guests</span><strong>' + b.guests + ' guests</strong></div>' +
            '<div class="summary-box kv"><span>Package</span><strong class="truncate">' + b.packageName + '</strong></div>' +
          '</div>' +

          ((b.occasion || b.tableNumber || b.seatingArea || b.dressCode)
            ? '<div style="display:flex;flex-wrap:wrap;gap:6px;padding-top:2px;">' +
                (b.occasion ? '<span class="neutral-chip">' + b.occasion + '</span>' : '') +
                (b.tableNumber ? '<span class="badge" style="letter-spacing:0;">' + b.tableNumber + '</span>' : '') +
                (b.seatingArea ? '<span class="neutral-chip">Seating: <strong>' + b.seatingArea + '</strong></span>' : '') +
                (b.dressCode ? '<span class="neutral-chip">Dress Code: <strong>' + b.dressCode + '</strong></span>' : '') +
              '</div>'
            : '') +

          '<div class="divider"></div>' +
          '<div class="sum-row"><span style="display:inline-flex;gap:5px;align-items:center;">' + RH.icon('credit-card', 'icon-sm') + 'Package (' + b.packageName + ')</span><span>$' + b.packagePrice + ' × ' + b.guests + '</span></div>' +
          '<div class="sum-total"><span>Total Paid</span><span class="amount">$' + b.totalPaid + ' <small style="font-size:11px;color:#047857;font-weight:800;">· Paid Online</small></span></div>' +
          (b.cancellationPolicy ? '<p class="micro t-faint">' + b.cancellationPolicy + '</p>' : '') +
        '</section>' +

        /* Guest info & requests */
        '<section class="card pad stack" style="gap:14px;">' +
          '<h2 class="bold" style="font-size:16px;">Guest Information</h2>' +
          '<div class="metrics-grid" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr));">' +
            '<div class="summary-box kv"><span>' + RH.icon('user', 'icon-sm') + ' Lead Diner</span><strong>' + b.userName + '</strong></div>' +
            '<div class="summary-box kv"><span>' + RH.icon('phone', 'icon-sm') + ' Phone</span><strong>' + (b.userPhone || '—') + '</strong></div>' +
            '<div class="summary-box kv"><span>' + RH.icon('mail', 'icon-sm') + ' Email</span><strong style="word-break:break-all;">' + (b.userEmail || '—') + '</strong></div>' +
          '</div>' +

          ((b.specialRequests || dietChips)
            ? '<div style="border-top:1px solid rgba(212,163,115,.22);padding-top:12px;" class="stack gap-y-2">' +
                '<span class="tiny bold uppercase t-muted" style="display:flex;gap:5px;align-items:center;letter-spacing:.06em;">' + RH.icon('message-plus', 'icon-sm') + 'Special Requests &amp; Preferences</span>' +
                (dietChips ? '<div style="display:flex;flex-wrap:wrap;gap:6px;">' + dietChips + '</div>' : '') +
                (b.specialRequests ? '<p class="request-quote">“' + b.specialRequests + '”</p>' : '') +
              '</div>'
            : '') +

          (addonRows
            ? '<div style="border-top:1px solid rgba(212,163,115,.22);padding-top:12px;" class="stack gap-y-2">' +
                '<span class="tiny bold uppercase t-muted" style="display:flex;gap:5px;align-items:center;letter-spacing:.06em;">' + RH.icon('sparkles', 'icon-sm') + 'Pre-ordered Courses &amp; Amenities</span>' +
                addonRows + '</div>'
            : '') +
        '</section>' +

        /* Seating tracker */
        (function () {
          if (b.status === 'Cancelled') return '';
          var done = b.status === 'Confirmed' || b.status === 'Completed';
          return (
            '<div class="tracker">' +
              '<div style="display:flex;justify-content:space-between;font-size:11px;font-weight:700;color:#475569;margin-bottom:7px;">' +
                '<span style="display:inline-flex;gap:4px;align-items:center;color:var(--burgundy);">' + RH.icon('sparkles', 'icon-sm') + 'Seating Tracker:</span>' +
                '<span style="color:#64748b;font-weight:400;">' + (b.status === 'Completed' ? 'Experience Concluded' : 'Guaranteed VIP Placement') + '</span></div>' +
              '<div class="tracker-steps">' +
                '<span class="tracker-step done">' + RH.icon('check', 'icon-sm') + ' Booked</span>' +
                '<span class="tracker-step ' + (done ? 'done' : '') + '">' + (done ? RH.icon('check', 'icon-sm') : '2.') + ' Table Assigned</span>' +
                '<span class="tracker-step ' + (done ? 'done' : '') + '">' + (done ? RH.icon('check', 'icon-sm') : '3.') + ' Kitchen Notified</span>' +
                '<span class="tracker-step ' + (b.status === 'Completed' ? 'final' : 'live') + '">' + (b.status === 'Completed' ? 'Finished' : 'Ready to Dine') + '</span>' +
              '</div></div>'
          );
        })() +

        /* Manage actions */
        '<section class="card pad stack" style="gap:12px;">' +
          '<h2 class="bold" style="font-size:16px;">Manage Booking</h2>' +
          '<div class="actions-grid">' +
            '<button class="btn btn-sm" id="u09-pass" style="background:var(--cream);border:1px solid rgba(122,31,43,.32);color:var(--burgundy);">' + RH.icon('qr-code', 'icon-sm') + ' Show Dining Pass</button>' +
            (b.status === 'Confirmed'
              ? '<button class="btn btn-ghost btn-sm" id="u09-reschedule">' + RH.icon('pencil', 'icon-sm') + ' Modify Booking</button>'
              : '') +
            (isActive
              ? '<button class="btn btn-danger-outline btn-sm" id="u09-cancel">Cancel Booking</button>'
              : '<button class="btn btn-primary btn-sm" id="u09-rebook">' + (b.status === 'Completed' ? 'Write Review / Rebook' : 'Rebook Table') + ' ' + RH.icon('chevron-right', 'icon-sm') + '</button>') +
            '<button class="btn btn-ghost btn-sm" data-nav="U08">My Bookings</button>' +
          '</div>' +
        '</section>' +
      '</div>';

      /* ---------------- bindings ---------------- */
      function updateBooking(patch) {
        store.patch({
          bookings: store.get('bookings').map(function (x) {
            return x.id === b.id ? Object.assign({}, x, patch) : x;
          })
        });
        RH.toast('Booking for ' + b.venueName + ' successfully updated!');
        RH.router.render(RH.router.current());
      }

      document.getElementById('u09-pass').addEventListener('click', function () { RH.openDiningPassModal(b); });

      var resched = document.getElementById('u09-reschedule');
      if (resched) resched.addEventListener('click', function () {
        RH.openRescheduleModal(b, function (patch) { updateBooking(patch); });
      });

      var cancelBtn = document.getElementById('u09-cancel');
      if (cancelBtn) cancelBtn.addEventListener('click', function () {
        RH.openCancelModal(b, function () {
          updateBooking({ status: 'Cancelled' });
          RH.toast('Reservation cancelled. Refund initiated.');
        });
      });

      var rebook = document.getElementById('u09-rebook');
      if (rebook) rebook.addEventListener('click', function () {
        if (venue) RH.openVenue(venue.id, 'U03'); else RH.router.navigate('U02');
      });

      root.querySelectorAll('[data-open-venue-hero]').forEach(function (el) {
        el.addEventListener('click', function () { RH.openVenue(venue.id, 'U03'); });
      });
    }
  });
})(window.RH = window.RH || {});
