/* ReserveHub — U07 · Booking Complete */
(function (RH) {
  'use strict';

  RH.registerScreen('U07', {
    title: 'Booking Confirmed',
    render: function (root) {
      var store = RH.store;
      var latestId = store.get('latestBookingId') || store.get('selectedBookingId');
      var bookings = store.get('bookings') || [];
      var booking = bookings.filter(function (b) {
        return b.id === latestId;
      })[0] || bookings[0] || null;

      if (!booking) {
        root.innerHTML =
          '<div class="empty-state"><h3>No recent booking found.</h3>' +
          '<button class="btn btn-primary btn-sm" data-nav="U01">Return Home</button></div>';
        return;
      }

      root.innerHTML =
      '<div style="max-width:640px;margin-inline:auto;" class="page anim-up">' +

        /* Success Header / Confirmation Banner */
        '<section class="success-hero" style="border-radius:var(--r-xl);padding:32px 20px;text-align:center;">' +
          '<div class="success-check" style="width:64px;height:64px;margin:0 auto 16px;background:#047857;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 8px 24px rgba(4,120,87,0.3);">' +
            RH.icon('check', 'icon-lg') +
          '</div>' +
          '<span class="badge" style="background:rgba(255,255,255,0.2);color:#fff;border:1px solid rgba(255,255,255,0.3);padding:4px 12px;border-radius:999px;font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;">' +
            '✓ Instant Confirmation' +
          '</span>' +
          '<h1 class="black" style="font-size:26px;color:#fff;margin-top:10px;margin-bottom:6px;">Reservation Confirmed!</h1>' +
          '<p class="small" style="color:rgba(250,247,242,.9);max-width:440px;margin:0 auto 16px;line-height:1.5;">' +
            'Your table reservation at <strong>' + booking.venueName + '</strong> is secured. We look forward to hosting you.' +
          '</p>' +
          '<div class="ref-card" style="display:inline-flex;align-items:center;gap:10px;background:rgba(0,0,0,0.25);border:1px dashed rgba(255,255,255,0.4);border-radius:12px;padding:10px 20px;">' +
            '<span style="font-size:12px;color:rgba(255,255,255,0.8);">Booking Reference:</span>' +
            '<strong style="font-size:17px;letter-spacing:1px;color:#fff;">' + booking.refNumber + '</strong>' +
          '</div>' +
        '</section>' +

        /* Action Buttons: Navigate to U09 (Booking Detail) or U08 / U01 */
        '<section class="card pad stack" style="gap:14px;border-radius:var(--r-xl);margin-top:16px;">' +
          '<div style="text-align:center;padding:6px 0;">' +
            '<h2 class="bold" style="font-size:17px;color:var(--ink);margin-bottom:4px;">Ready to view your reservation details?</h2>' +
            '<p class="small t-muted">Access your digital dining pass, table seating tracker, host directions, and bill management.</p>' +
          '</div>' +

          '<div class="actions-grid" style="grid-template-columns:1fr;gap:10px;">' +
            '<button class="btn btn-primary btn-lg btn-block" id="btn-view-u09" style="background:var(--burgundy);color:#fff;font-weight:700;display:flex;align-items:center;justify-content:center;gap:8px;padding:14px;">' +
              RH.icon('file-text', 'icon-sm') + ' View Full Booking Details (U09) ' + RH.icon('arrow-right', 'icon-sm') +
            '</button>' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">' +
              '<button class="btn btn-ghost" data-nav="U08" style="font-weight:600;">' +
                RH.icon('calendar', 'icon-sm') + ' My Bookings' +
              '</button>' +
              '<button class="btn btn-ghost" data-nav="U01" style="font-weight:600;">' +
                RH.icon('home', 'icon-sm') + ' Back to Home' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</section>' +

        /* Brief Arrival Guideline */
        '<section class="card pad stack" style="gap:10px;border-radius:var(--r-xl);margin-top:14px;">' +
          '<h2 class="bold small" style="display:flex;align-items:center;gap:6px;color:var(--ink);">' +
            RH.icon('clock', 'icon-sm') + ' What Happens Next' +
          '</h2>' +
          '<div class="next-step" style="font-size:13px;color:#475569;line-height:1.4;">' +
            '<b style="display:block;color:var(--ink);font-size:13.5px;margin-bottom:2px;">Instant Table Allocation</b>' +
            'The maître d\' at ' + booking.venueName + ' has added your party to the guest manifest.' +
          '</div>' +
          '<div class="next-step" style="font-size:13px;color:#475569;line-height:1.4;">' +
            '<b style="display:block;color:var(--ink);font-size:13.5px;margin-bottom:2px;">Digital Dining Check-in</b>' +
            'Show your digital pass or reference code (<strong>' + booking.refNumber + '</strong>) upon arrival.' +
          '</div>' +
        '</section>' +

      '</div>';

      var btnU09 = document.getElementById('btn-view-u09');
      if (btnU09) {
        btnU09.addEventListener('click', function () {
          store.patch({ selectedBookingId: booking.id });
          RH.router.navigate('U09', { id: booking.id });
        });
      }
    }
  });
})(window.RH = window.RH || {});
