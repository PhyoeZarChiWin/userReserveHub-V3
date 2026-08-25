/* ReserveHub — U04 · Calendar / Slot Picker */
(function (RH) {
  'use strict';

  RH.registerScreen('U04', {
    title: 'Select Date & Time',
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

      var sel = {
        date: draft.date || '2026-08-25',
        time: draft.time || (venue.slots[0] || '07:00 PM'),
        guests: draft.guests || 2,
        packageId: venue.packages.some(function (p) { return p.id === draft.packageId; })
          ? draft.packageId : (venue.packages[0] ? venue.packages[0].id : 'pkg-standard')
      };

      function currentPkg() {
        return venue.packages.filter(function (p) { return p.id === sel.packageId; })[0] ||
          venue.packages[0] ||
          { id: 'pkg-standard', name: 'Standard Package', price: venue.basePrice, perText: '/ guest', includes: ['Standard Seating'] };
      }
      function subtotal() { return currentPkg().price * sel.guests; }

      function paintSummary() {
        var pkg = currentPkg();
        document.getElementById('sum-date').textContent = sel.date;
        document.getElementById('sum-time').textContent = sel.time;
        document.getElementById('sum-guests').textContent = sel.guests + ' guests';
        document.getElementById('sum-line').innerHTML =
          pkg.name + ' ($' + pkg.price + '/guest)<span>$' + subtotal() + '</span>';
        document.getElementById('sum-subtotal').textContent = '$' + subtotal();
        document.querySelectorAll('.u04-continue').forEach(function (b) { b.disabled = !sel.time; });
      }

      root.innerHTML =
      '<div style="padding-bottom:90px;" class="page">' +
        '<div class="flow-back">' +
          '<button class="back-btn" data-nav-back="U03" aria-label="Back to shop details">' + RH.icon('arrow-left') + '</button>' +
          '<div><h1 class="black" style="font-size:22px;">Select date, time &amp; party size</h1>' +
          '<p class="tiny t-muted" style="margin-top:2px;">' + venue.name + ' · ' + venue.address + '</p></div>' +
        '</div>' +

        '<div class="flow-layout">' +
          '<div class="stack" style="gap:22px;">' +

            /* Step 1 */
            '<section class="step-panel stack" style="gap:14px;">' +
              '<h2><span class="step-num">1</span>Date &amp; Party Size</h2>' +
              '<div class="filter-grid" style="gap:14px;">' +
                '<div class="field"><label>' + RH.icon('calendar', 'icon-sm') + ' Reservation Date</label>' +
                  '<input type="date" id="pk-date" class="input" value="' + sel.date + '" min="' + new Date().toISOString().split('T')[0] + '"></div>' +
                '<div class="field"><label>' + RH.icon('users', 'icon-sm') + ' Number of Guests</label>' +
                  '<select id="pk-guests" class="select">' +
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (n) {
                      return '<option value="' + n + '"' + (n === sel.guests ? ' selected' : '') + '>' + n + (n === 1 ? ' Guest' : ' Guests') + '</option>';
                    }).join('') + '</select></div>' +
              '</div>' +
            '</section>' +

            /* Step 2 */
            '<section class="step-panel stack" style="gap:14px;">' +
              '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">' +
                '<h2><span class="step-num">2</span>Available Time Slots</h2>' +
                '<span class="badge">' + venue.slots.length + ' slots available</span>' +
              '</div>' +
              (venue.slots.length
                ? '<div class="slot-grid" id="slot-grid">' +
                    venue.slots.map(function (s) {
                      return '<button type="button" class="slot' + (s === sel.time ? ' is-active' : '') + '" data-slot="' + s + '">' + RH.icon('clock', 'icon-sm') + s + '</button>';
                    }).join('') + '</div>'
                : '<p class="small t-muted">No open slots for this venue right now — please check back later.</p>') +
            '</section>' +

            /* Step 3 */
            '<section class="step-panel stack" style="gap:14px;">' +
              '<h2><span class="step-num">3</span>Choose a Package</h2>' +
              '<div class="stack" style="gap:12px;" id="pkg-list">' +
                venue.packages.map(function (p) {
                  return (
                    '<label class="pkg-card' + (p.id === sel.packageId ? ' is-active' : '') + '" data-pkg="' + p.id + '">' +
                      '<span style="display:flex;align-items:flex-start;gap:12px;">' +
                        '<input type="radio" name="u04-pkg"' + (p.id === sel.packageId ? ' checked' : '') + '>' +
                        '<span><strong class="bold small" style="display:block;">' + p.name + '</strong>' +
                        '<span style="display:block;margin-top:6px;">' + p.includes.map(function (i) { return '<span class="pkg-inc">✓ ' + i + '</span>'; }).join('') + '</span></span>' +
                      '</span>' +
                      '<span class="t-burgundy bold small">$' + p.price + ' <small class="t-muted" style="font-weight:400;">' + p.perText + '</small></span>' +
                    '</label>'
                  );
                }).join('') +
              '</div>' +
            '</section>' +
          '</div>' +

          /* Summary aside */
          '<aside class="sticky-side"><div class="summary-side stack" style="gap:18px;">' +
            '<div style="border-bottom:1px solid rgba(212,163,115,.25);padding-bottom:12px;">' +
              '<h2 style="font-size:17px;font-weight:800;">Your Selection</h2>' +
              '<p class="tiny t-muted truncate bold">' + venue.name + '</p></div>' +
            '<div class="summary-box stack" style="gap:4px;">' +
              '<div class="sum-row"><span style="display:inline-flex;align-items:center;gap:5px;">' + RH.icon('calendar', 'icon-sm') + 'Date</span><strong id="sum-date"></strong></div>' +
              '<div class="sum-row"><span style="display:inline-flex;align-items:center;gap:5px;">' + RH.icon('clock', 'icon-sm') + 'Time</span><strong id="sum-time"></strong></div>' +
              '<div class="sum-row"><span style="display:inline-flex;align-items:center;gap:5px;">' + RH.icon('users', 'icon-sm') + 'Guests</span><strong id="sum-guests"></strong></div>' +
            '</div>' +
            '<div>' +
              '<div class="sum-row" id="sum-line"></div>' +
              '<div class="sum-total"><span>Subtotal</span><span class="amount" id="sum-subtotal"></span></div>' +
              '<p class="micro t-faint" style="margin-top:6px;">Promotions can be applied on the next step.</p>' +
            '</div>' +
            '<button class="btn btn-primary btn-lg btn-block u04-continue" id="continue-desktop">' +
              RH.icon('shield-check', 'icon-sm') + 'Continue to Guest Details ' + RH.icon('chevron-right', 'icon-sm') + '</button>' +
            '<p class="micro t-faint t-center">Free cancellation up to 24 hours before your reservation.</p>' +
          '</div></aside>' +
        '</div>' +

        /* Mobile action bar */
        '<div class="actionbar">' +
          '<div><span class="tiny t-muted" style="display:flex;align-items:center;gap:4px;">' + RH.icon('check-circle', 'icon-sm') +
            '<span id="bar-meta"></span></span>' +
          '<strong style="color:var(--burgundy);font-size:16px;" id="bar-total"></strong></div>' +
          '<button class="btn btn-primary u04-continue" id="continue-mobile">Continue ' + RH.icon('chevron-right', 'icon-sm') + '</button>' +
        '</div>' +
      '</div>';

      function paintBar() {
        document.getElementById('bar-meta').textContent = sel.date + ' · ' + sel.time + ' · ' + sel.guests + ' guests';
        document.getElementById('bar-total').textContent = '$' + subtotal();
      }
      paintSummary(); paintBar();

      /* ---------------- bindings ---------------- */
      document.getElementById('pk-date').addEventListener('change', function (e) { sel.date = e.target.value; paintSummary(); paintBar(); });
      document.getElementById('pk-guests').addEventListener('change', function (e) { sel.guests = Number(e.target.value); paintSummary(); paintBar(); });

      var slotGrid = document.getElementById('slot-grid');
      if (slotGrid) {
        slotGrid.addEventListener('click', function (e) {
          var b = e.target.closest('[data-slot]');
          if (!b) return;
          sel.time = b.getAttribute('data-slot');
          slotGrid.querySelectorAll('.slot').forEach(function (s) { s.classList.remove('is-active'); });
          b.classList.add('is-active');
          paintSummary(); paintBar();
        });
      }

      document.getElementById('pkg-list').addEventListener('change', function (e) {
        var card = e.target.closest('[data-pkg]');
        if (!card) return;
        sel.packageId = card.getAttribute('data-pkg');
        this.querySelectorAll('.pkg-card').forEach(function (c) {
          c.classList.toggle('is-active', c.getAttribute('data-pkg') === sel.packageId);
          var radio = c.querySelector('input[type=radio]');
          radio.checked = c.classList.contains('is-active');
        });
        paintSummary(); paintBar();
      });

      function goNext() {
        RH.store.patch({ draft: Object.assign({}, RH.store.get('draft'), {
          venueId: venue.id, date: sel.date, time: sel.time,
          guests: sel.guests, packageId: sel.packageId
        }) });
        RH.router.navigate('U05');
      }
      document.getElementById('continue-desktop').addEventListener('click', goNext);
      document.getElementById('continue-mobile').addEventListener('click', goNext);
    }
  });
})(window.RH = window.RH || {});
