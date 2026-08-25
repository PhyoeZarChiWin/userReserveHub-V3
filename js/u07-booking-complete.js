/* ReserveHub — U07 · Booking Complete */
(function (RH) {
  'use strict';

  RH.registerScreen('U07', {
    title: 'Booking Confirmed',
    render: function (root) {
      var store = RH.store;
      var booking = store.get('bookings').filter(function (b) {
        return b.id === store.get('latestBookingId');
      })[0] || null;

      if (!booking) {
        root.innerHTML =
          '<div class="empty-state"><h3>No recent booking found.</h3>' +
          '<button class="btn btn-primary btn-sm" data-nav="U01">Return Home</button></div>';
        return;
      }

      root.innerHTML =
      '<div style="max-width:672px;margin-inline:auto;" class="page">' +

        '<section class="success-hero">' +
          '<div class="success-check">' + RH.icon('check-circle', '', { filled: false }) + '</div>' +
          '<h1 class="black" style="font-size:27px;color:#fff;">Reservation Confirmed!</h1>' +
          '<p class="small" style="color:rgba(250,247,242,.85);max-width:420px;margin:8px auto 0;">Your booking has been received. A confirmation with the details below is ready for your visit.</p>' +
          '<div class="ref-card"><span>Reference Number</span><strong>' + booking.refNumber + '</strong></div>' +
        '</section>' +

        '<section class="card pad stack" style="gap:14px;">' +
          '<h2 class="bold" style="font-size:16px;border-bottom:1px solid rgba(212,163,115,.22);padding-bottom:12px;">Booking Details</h2>' +
          '<div class="metrics-grid" style="grid-template-columns:repeat(auto-fit,minmax(140px,1fr));">' +
            '<div class="kv"><span>Venue</span><strong style="font-size:14px;">' + booking.venueName + '</strong></div>' +
            '<div class="kv"><span>Package</span><strong>' + booking.packageName + '</strong></div>' +
            '<div class="kv"><span>Date &amp; Time</span><strong>' + booking.date + ' at ' + booking.time + '</strong></div>' +
            '<div class="kv"><span>Guests</span><strong>' + booking.guests + ' guests</strong></div>' +
            '<div class="kv"><span>Booked By</span><strong>' + booking.userName + '</strong></div>' +
            '<div class="kv"><span>Total Paid</span><strong style="color:var(--burgundy);font-size:17px;">$' + booking.totalPaid + '</strong></div>' +
          '</div>' +
          '<div class="divider"></div>' +
          '<div class="actions-grid">' +
            '<button class="btn btn-primary" data-nav="U08">View My Bookings ' + RH.icon('arrow-right', 'icon-sm') + '</button>' +
            '<button class="btn btn-ghost" data-nav="U01">' + RH.icon('home', 'icon-sm') + ' Back to Home</button>' +
          '</div>' +
        '</section>' +

        '<section class="card pad stack" style="gap:10px;">' +
          '<h2 class="bold small" style="display:flex;align-items:center;gap:6px;">' + RH.icon('clock', 'icon-sm') + 'What happens next</h2>' +
          '<div class="next-step"><b>Instant venue notification</b>The venue manager has been notified of your reservation.</div>' +
          '<div class="next-step"><b>Check-in at the venue</b>Present your reference number (' + booking.refNumber + ') upon arrival.</div>' +
        '</section>' +
      '</div>';
    }
  });
})(window.RH = window.RH || {});
