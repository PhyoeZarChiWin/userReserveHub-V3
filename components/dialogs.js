/* ReserveHub — toast, modal shell & booking dialogs (shared U08/U09) */
(function (RH) {
  'use strict';

  /* ---------------- Toast ---------------- */
  RH.toast = function (message) {
    var root = document.getElementById('toast-root');
    if (!root || !message) return;
    root.innerHTML =
      '<div class="toast anim-up" role="status">' +
        '<span class="toast-icon">' + RH.icon('sparkles') + '</span>' +
        '<p class="toast-msg"></p>' +
        '<button class="toast-x" data-toast-close aria-label="Dismiss notification">' + RH.icon('x') + '</button>' +
      '</div>';
    root.querySelector('.toast-msg').textContent = message;
    clearTimeout(RH._toastTimer);
    RH._toastTimer = setTimeout(function () { root.innerHTML = ''; }, 3500);
  };

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-toast-close]')) {
      var root = document.getElementById('toast-root');
      if (root) root.innerHTML = '';
    }
  });

  /* ---------------- Modal shell ----------------
     open(html, opts) -> returns overlay; closes on backdrop click / [data-modal-close]
  ----------------------------------------------- */
  RH.openModal = function (innerHtml, opts) {
    opts = opts || {};
    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay' + (opts.className ? ' ' + opts.className : '');
    overlay.innerHTML =
      '<div class="modal-card' + (opts.wide ? ' wide' : '') + ' anim-scale" role="dialog" aria-modal="true">' +
        '<span class="modal-drag-pill"></span>' +
        innerHtml +
      '</div>';
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    var close = function () {
      if (!overlay.parentNode) return;
      overlay.parentNode.removeChild(overlay);
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      if (opts.onClose) opts.onClose();
    };
    var onKey = function (e) { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    overlay.addEventListener('click', function (e) {
      if (e.target.closest('[data-modal-close]')) close();
    });
    RH._activeModalClose = close;
    return { el: overlay, close: close };
  };

  /* ---------------- Dining pass modal (U08 + U09) ---------------- */
  RH.openDiningPassModal = function (booking) {
    var b = booking;
    RH.openModal(
      '<div style="background:linear-gradient(90deg,#4A121A,#7A1F2B 50%,#5C141E);color:#fff;padding:20px;position:relative;">' +
        '<button class="modal-close" data-modal-close style="position:absolute;top:14px;right:14px;color:rgba(255,255,255,.7);background:rgba(255,255,255,.1);padding:6px;border-radius:50%;">' + RH.icon('x', 'icon-sm') + '</button>' +
        '<div class="spot-label" style="display:flex;align-items:center;gap:6px;color:#D4A373;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px;">' + RH.icon('sparkles', 'icon-sm') + ' VIP Dining Boarding Pass</div>' +
        '<h2 style="font-size:20px;font-weight:900;color:#fff;">' + b.venueName + '</h2>' +
        '<p style="font-size:12px;color:rgba(255,255,255,.8);margin-top:2px;">' + b.location + '</p>' +
      '</div>' +
      '<div class="modal-body">' +
        '<div class="pass-grid">' +
          '<div class="kv"><span>Date &amp; Time</span><strong>' + b.date + ' • ' + b.time + '</strong></div>' +
          '<div class="kv"><span>Party Size</span><strong>' + b.guests + ' Guests (' + b.packageName + ')</strong></div>' +
          '<div class="kv"><span>Assigned Seating</span><strong style="color:var(--burgundy);">' + (b.tableNumber || 'Table #14 (Lakefront)') + '</strong></div>' +
          '<div class="kv"><span>Dress Code</span><strong>' + (b.dressCode || 'Smart Casual') + '</strong></div>' +
        '</div>' +
        '<div>' +
          '<div class="sum-row"><span>Lead Diner:</span><strong>' + b.userName + '</strong></div>' +
          '<div class="sum-row"><span>Booking Reference:</span><strong style="color:var(--burgundy);font-family:ui-monospace,monospace;">' + b.refNumber + '</strong></div>' +
          '<div class="sum-row"><span>Occasion:</span><strong>' + (b.occasion || 'Dining Table') + '</strong></div>' +
          '<div class="sum-row"><span>Total Settled:</span><strong style="color:var(--success);">$' + b.totalPaid + ' (Paid)</strong></div>' +
        '</div>' +
        '<div class="summary-box t-center" style="text-align:center;border-style:dashed;">' +
          '<div class="qr-mock">' +
            '<div class="qr-row"><span class="qr-cell"><i></i></span><span class="qr-cell"><i></i></span></div>' +
            '<div class="qr-label">SCAN FOR HOST CHECK-IN</div>' +
            '<div class="qr-row"><span class="qr-cell"><i></i></span><span class="qr-cell vip">VIP</span></div>' +
          '</div>' +
          '<p class="tiny t-muted" style="margin-top:10px;">Present this pass to the maître d\' upon arrival for immediate expedited seating.</p>' +
        '</div>' +
        '<div class="modal-foot">' +
          '<button class="btn btn-ghost" id="pass-print">' + RH.icon('printer', 'icon-sm') + ' Print Receipt</button>' +
          '<button class="btn btn-primary" id="pass-ics">' + RH.icon('calendar', 'icon-sm') + ' Add to Calendar</button>' +
        '</div>' +
      '</div>'
    );
    var modalPrint = document.getElementById('pass-print');
    var modalIcs = document.getElementById('pass-ics');
    if (modalPrint) modalPrint.addEventListener('click', function () { window.print(); });
    if (modalIcs) modalIcs.addEventListener('click', function () { RH.downloadBookingIcs(b, RH.toast); });
  };

  /* ---------------- Reschedule modal (U08 + U09) ---------------- */
  RH.openRescheduleModal = function (booking, onSave) {
    var b = booking;
    var slotBtns = ['06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM']
      .map(function (s) {
        return '<button type="button" class="slot' + (b.time === s ? ' is-active' : '') + '" data-slot="' + s + '">' + s + '</button>';
      }).join('');
    var seatingOpts = RH.SEATING_OPTIONS.map(function (o) {
      return '<option' + ((b.seatingArea || RH.SEATING_OPTIONS[0]) === o ? ' selected' : '') + '>' + o + '</option>';
    }).join('');

    RH.openModal(
      '<div class="modal-head">' +
        '<div><h3>Reschedule Reservation</h3><p class="small t-muted">' + b.venueName + '</p></div>' +
        '<button class="modal-close" data-modal-close>' + RH.icon('x', 'icon-lg') + '</button>' +
      '</div>' +
      '<div class="modal-body">' +
        '<div class="field"><label>Reservation Date</label>' +
          '<input type="date" id="rs-date" class="input" value="' + b.date + '" min="' + new Date().toISOString().split('T')[0] + '">' +
        '</div>' +
        '<div class="field"><label>Seating Time Slot</label><div class="slot-grid" id="rs-slots" style="grid-template-columns:repeat(3,1fr);">' + slotBtns + '</div></div>' +
        '<div class="field"><label>Party Size (Guests)</label>' +
          '<div class="stepper"><button type="button" id="rs-minus">' + RH.icon('minus', 'icon-sm') + '</button>' +
          '<strong id="rs-count">' + b.guests + ' Guests</strong>' +
          '<button type="button" id="rs-plus">' + RH.icon('plus', 'icon-sm') + '</button></div>' +
        '</div>' +
        '<div class="field"><label>Preferred Seating Section</label><select id="rs-seating" class="select">' + seatingOpts + '</select></div>' +
        '<div class="next-step" style="background:#FFFBEB;border-color:#FDE68A;color:#92400E;display:flex;gap:8px;align-items:flex-start;">' +
          RH.icon('alert-circle') + '<span>Rescheduling is free of charge up to 2 hours before your original reservation.</span></div>' +
        '<div class="modal-foot">' +
          '<button class="btn btn-ghost" data-modal-close>Cancel</button>' +
          '<button class="btn btn-primary" id="rs-save">' + RH.icon('calendar', 'icon-sm') + ' Save Reschedule</button>' +
        '</div>' +
      '</div>'
    );

    var dateEl = document.getElementById('rs-date');
    var countEl = document.getElementById('rs-count');
    var guests = b.guests;
    var time = b.time;
    document.getElementById('rs-slots').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-slot]');
      if (!btn) return;
      time = btn.getAttribute('data-slot');
      this.querySelectorAll('.slot').forEach(function (s) { s.classList.remove('is-active'); });
      btn.classList.add('is-active');
    });
    document.getElementById('rs-minus').addEventListener('click', function () {
      guests = Math.max(1, guests - 1); countEl.textContent = guests + ' Guests';
    });
    document.getElementById('rs-plus').addEventListener('click', function () {
      guests = Math.min(20, guests + 1); countEl.textContent = guests + ' Guests';
    });
    document.getElementById('rs-save').addEventListener('click', function () {
      onSave({
        date: dateEl.value,
        time: time,
        guests: guests,
        seatingArea: document.getElementById('rs-seating').value
      });
      RH.closeActiveModal();
    });
  };

  /* ---------------- Cancel confirmation modal (U08 + U09) ---------------- */
  RH.openCancelModal = function (booking, onConfirm) {
    var b = booking;
    RH.openModal(
      '<div class="modal-body" style="text-align:center;padding-top:28px;">' +
        '<div style="width:48px;height:48px;border-radius:50%;background:#FFF1F2;border:1px solid #FECDD3;color:#E11D48;display:flex;align-items:center;justify-content:center;margin:0 auto;">' + RH.icon('alert-circle', 'icon-lg') + '</div>' +
        '<h3 style="font-size:18px;font-weight:900;margin-top:10px;">Cancel Reservation?</h3>' +
        '<p class="small t-muted">Are you sure you wish to cancel your reservation at <strong>' + b.venueName + '</strong> for ' + b.date + '?</p>' +
        '<div class="next-step" style="background:#FFF1F2;border-color:#FECDD3;color:#9F1239;text-align:left;">' +
          '<b>100% Free Cancellation Policy</b>Your table will be released and your payment of $' + b.totalPaid + ' will be refunded within 24 hours.' +
        '</div>' +
        '<div class="modal-foot">' +
          '<button class="btn btn-ghost" data-modal-close>Keep Table</button>' +
          '<button class="btn btn-danger" id="cancel-confirm">Confirm Cancel</button>' +
        '</div>' +
      '</div>'
    );
    document.getElementById('cancel-confirm').addEventListener('click', function () {
      onConfirm(b.id);
      RH.closeActiveModal();
    });
  };

  /* ---------------- Notifications modal (navbar bell) ---------------- */
  RH.openNotificationsModal = function () {
    var items = RH.NOTIFICATIONS.map(function (n) {
      return (
        '<div style="display:flex;gap:12px;align-items:flex-start;background:#F8F6F2;border:1px solid rgba(212,163,115,.25);border-radius:14px;padding:14px;">' +
          '<span style="font-size:20px;line-height:1.2;">' + n.icon + '</span>' +
          '<div style="min-width:0;">' +
            '<p style="font-size:14px;font-weight:800;color:var(--ink);">' + n.title + '</p>' +
            '<p style="font-size:12.5px;color:#475569;line-height:1.5;margin-top:3px;">' + n.body + '</p>' +
            '<p style="font-size:11px;color:#94A3B8;margin-top:6px;">' + n.time + '</p>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    RH.openModal(
      '<div class="modal-head" style="display:block;">' +
        '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;">' +
          '<span class="badge" style="padding:6px 12px;">' + RH.icon('bell', 'icon-sm') + 'Activity &amp; Alerts</span>' +
          '<button class="modal-close" data-modal-close>' + RH.icon('x', 'icon-lg') + '</button>' +
        '</div>' +
        '<h3 style="font-size:20px;font-weight:900;margin-top:10px;">Notifications</h3>' +
      '</div>' +
      '<div class="modal-body">' + items + '</div>' +
      '<div class="modal-foot">' +
        '<button class="btn btn-ghost" data-modal-close>Close</button>' +
        '<button class="btn btn-primary" id="notif-mark-read">Mark All as Read</button>' +
      '</div>'
    );

    document.getElementById('notif-mark-read').addEventListener('click', function () {
      RH.store.patch({ unreadNotifications: 0 });
      RH.renderNavbar();
      RH.closeActiveModal();
      RH.toast('All notifications marked as read');
    });
  };

  /* ---------------- My Bookings Modal (Matches exact UI) ---------------- */
  RH.openBookingsModal = function () {
    var activeTab = 'Upcoming';
    var store = RH.store;

    function renderModalBody() {
      var all = store.get('bookings') || [];
      var list = all.filter(function (b) {
        if (activeTab === 'Upcoming') return b.status === 'Confirmed' || b.status === 'Pending';
        if (activeTab === 'Past') return b.status === 'Completed' || b.status === 'Cancelled';
        return true;
      });

      var tabHtml =
        '<div class="mb-top-bar">' +
          '<div class="mb-tabs-wrap">' +
            '<button type="button" class="mb-tab-btn' + (activeTab === 'Upcoming' ? ' is-active' : '') + '" data-mb-tab="Upcoming">Upcoming</button>' +
            '<button type="button" class="mb-tab-btn' + (activeTab === 'Past' ? ' is-active' : '') + '" data-mb-tab="Past">Past</button>' +
            '<button type="button" class="mb-tab-btn' + (activeTab === 'All' ? ' is-active' : '') + '" data-mb-tab="All">All</button>' +
          '</div>' +
          '<button type="button" class="btn btn-primary btn-sm" id="mb-btn-new" style="background:#7A1F2B;color:#FFF;font-weight:700;padding:7px 14px;border-radius:8px;display:inline-flex;align-items:center;gap:6px;">' +
            '+ Book New Table' +
          '</button>' +
        '</div>';

      if (list.length === 0) {
        return tabHtml +
          '<div class="empty-state" style="padding:32px 16px;text-align:center;">' +
            '<div class="empty-ico">' + RH.icon('calendar', 'icon-lg') + '</div>' +
            '<h3 style="font-size:16px;font-weight:700;margin-top:8px;">No ' + activeTab.toLowerCase() + ' reservations</h3>' +
            '<p style="color:#64748B;font-size:13px;margin-top:4px;">You have no ' + activeTab.toLowerCase() + ' dining tables scheduled.</p>' +
            '<button class="btn btn-primary btn-sm" id="mb-empty-book" style="margin-top:12px;background:#7A1F2B;">Explore Fine Dining</button>' +
          '</div>';
      }

      var cardsHtml = list.map(function (b) {
        var cd = RH.getCountdownLabel(b.date, b.status);
        var venue = RH.utils.findVenue(b.venueId);
        var tableTag = b.tableNumber ? ('Table ' + b.tableNumber + (b.seatingArea ? ' (' + b.seatingArea + ')' : '')) : (b.seatingArea ? b.seatingArea : 'Table #14 (Lakefront Deck)');

        var trackerHtml = '';
        if (b.status !== 'Cancelled') {
          var isDone = b.status === 'Confirmed' || b.status === 'Completed';
          trackerHtml =
            '<div class="concierge-tracker">' +
              '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;font-size:11px;">' +
                '<span style="color:#7A1F2B;font-weight:700;display:inline-flex;align-items:center;gap:4px;">' + RH.icon('sparkles', 'icon-sm') + 'Seating Tracker:</span>' +
                '<span style="color:#64748B;font-size:11px;">' + (b.status === 'Completed' ? 'Experience Concluded' : 'Guaranteed VIP Placement') + '</span>' +
              '</div>' +
              '<div class="concierge-tracker-grid">' +
                '<span class="concierge-tracker-pill" style="background:#0F766E;color:#FFFFFF;">✓ Booked</span>' +
                '<span class="concierge-tracker-pill" style="background:' + (isDone ? '#0F766E' : '#E2E8F0') + ';color:' + (isDone ? '#FFFFFF' : '#475569') + ';">' + (isDone ? '✓ ' : '2. ') + 'Table Assigned</span>' +
                '<span class="concierge-tracker-pill" style="background:' + (isDone ? '#0F766E' : '#E2E8F0') + ';color:' + (isDone ? '#FFFFFF' : '#475569') + ';">' + (isDone ? '✓ ' : '3. ') + 'Kitchen Notified</span>' +
                '<span class="concierge-tracker-pill" style="background:' + (b.status === 'Completed' ? '#1E293B' : '#7A1F2B') + ';color:#FFFFFF;">' + (b.status === 'Completed' ? 'Finished' : 'Ready to Dine') + '</span>' +
              '</div>' +
            '</div>';
        }

        var toolsRow =
          '<div class="concierge-tools-row">' +
            '<div class="concierge-tools-left">' +
              (b.status === 'Confirmed' ? '<button type="button" class="concierge-tool-btn" data-mb-reschedule="' + b.id + '">' + RH.icon('pencil', 'icon-sm') + 'Reschedule</button>' : '') +
              '<button type="button" class="concierge-tool-btn" data-mb-split="' + b.id + '">' + RH.icon('share-2', 'icon-sm') + 'Split Bill</button>' +
              '<button type="button" class="concierge-tool-btn" data-mb-contact="' + b.id + '">' + RH.icon('phone', 'icon-sm') + 'Host &amp; Map</button>' +
              (b.status === 'Confirmed' ? '<button type="button" class="concierge-tool-btn" data-mb-ics="' + b.id + '">' + RH.icon('calendar', 'icon-sm') + '.ICS</button>' : '') +
            '</div>' +
            '<div>' +
              (b.status === 'Confirmed' || b.status === 'Pending'
                ? '<button type="button" class="btn btn-danger-outline btn-sm" data-mb-cancel="' + b.id + '" style="font-size:11.5px;padding:5px 12px;border-radius:8px;">Cancel</button>'
                : '<button type="button" class="btn btn-primary btn-sm" data-mb-rebook="' + b.id + '" style="background:#7A1F2B;font-size:11.5px;padding:5px 12px;border-radius:8px;">Rebook Table</button>') +
            '</div>' +
          '</div>';

        return (
          '<article class="concierge-card">' +
            /* Status header bar */
            '<div class="concierge-card-head">' +
              '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">' +
                '<span style="background:#FEF3C7;color:#92400E;font-size:11.5px;font-weight:700;padding:3px 8px;border-radius:6px;">Ref: ' + b.refNumber + '</span>' +
                '<span style="background:#059669;color:#FFFFFF;font-size:11px;font-weight:700;padding:3px 8px;border-radius:6px;">' + (cd.text === 'Past' ? 'Concluded' : (cd.text || 'Today!')) + '</span>' +
              '</div>' +
              '<span class="status-pill st-' + b.status.toLowerCase() + '" style="font-size:12px;font-weight:700;">' + b.status + '</span>' +
            '</div>' +

            /* Main middle row */
            '<div class="concierge-main-row">' +
              '<div class="concierge-venue-info">' +
                '<img src="' + b.venueImage + '" alt="' + b.venueName + '" class="concierge-thumb" data-mb-venue="' + b.venueId + '">' +
                '<div style="min-width:0;flex:1;">' +
                  '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:3px;">' +
                    '<span style="background:#EFF6FF;color:#1D4ED8;border:1px solid #DBEAFE;font-size:11px;font-weight:600;padding:2px 7px;border-radius:6px;">' + (b.occasion || 'Anniversary Dinner') + '</span>' +
                    '<span style="background:#FFF1F2;color:#BE123C;border:1px solid #FFE4E6;font-size:11px;font-weight:600;padding:2px 7px;border-radius:6px;">' + tableTag + '</span>' +
                  '</div>' +
                  '<h4 style="font-size:15.5px;font-weight:800;color:#0F172A;margin:2px 0 3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer;" data-mb-venue="' + b.venueId + '">' + b.venueName + '</h4>' +
                  '<div style="font-size:11.5px;color:#334155;display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
                    '<span style="display:inline-flex;align-items:center;gap:3px;font-weight:600;">' + RH.icon('calendar', 'icon-sm') + b.date + '</span>' +
                    '<span style="display:inline-flex;align-items:center;gap:3px;font-weight:600;">' + RH.icon('clock', 'icon-sm') + b.time + '</span>' +
                  '</div>' +
                  '<p style="font-size:11.5px;color:#475569;margin:2px 0 0;display:inline-flex;align-items:center;gap:3px;">' + RH.icon('users', 'icon-sm') + b.guests + ' Guests</p>' +
                  '<p style="font-size:11px;color:#94A3B8;margin:2px 0 0;display:inline-flex;align-items:center;gap:3px;" class="truncate">' + RH.icon('map-pin', 'icon-sm') + b.location + '</p>' +
                '</div>' +
              '</div>' +

              /* Right/bottom price & pass box */
              '<div class="concierge-finance-box">' +
                '<div>' +
                  '<span style="font-size:9.5px;font-weight:800;color:#64748B;letter-spacing:0.04em;text-transform:uppercase;display:block;">TOTAL PAID / DEPOSIT</span>' +
                  '<div style="display:flex;align-items:baseline;gap:6px;">' +
                    '<span style="font-size:19px;font-weight:900;color:#7A1F2B;display:block;margin:1px 0;">$' + b.totalPaid + '</span>' +
                    '<span style="font-size:10.5px;font-weight:700;color:#047857;">✓ Paid Online</span>' +
                  '</div>' +
                '</div>' +
                '<button type="button" class="btn btn-sm" data-mb-pass="' + b.id + '" style="background:#FFFFFF;border:1px solid #CBD5E1;color:#7A1F2B;font-size:11px;font-weight:700;padding:5px 10px;border-radius:8px;display:inline-flex;align-items:center;gap:4px;">' +
                  RH.icon('qr-code', 'icon-sm') + 'Dining Pass' +
                '</button>' +
              '</div>' +
            '</div>' +

            /* Tracker */
            trackerHtml +

            /* Tool Actions Row */
            toolsRow +
          '</article>'
        );
      }).join('');

      return tabHtml + cardsHtml;
    }

    var modalObj = RH.openModal(
      '<div class="modal-head">' +
        '<div>' +
          '<span class="badge" style="background:#FFF1F2;color:#9F1239;border:1px solid #FECDD3;padding:3px 9px;border-radius:999px;font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:5px;">' +
            RH.icon('calendar', 'icon-sm') + 'Concierge Table Manager' +
          '</span>' +
          '<h3 style="font-size:19px;font-weight:800;color:#0F172A;margin-top:4px;letter-spacing:-0.01em;">My Bookings &amp; Reservations</h3>' +
        '</div>' +
        '<button class="modal-close" data-modal-close aria-label="Close">' + RH.icon('x', 'icon-lg') + '</button>' +
      '</div>' +
      '<div class="modal-body" id="mb-modal-body">' +
        renderModalBody() +
      '</div>',
      { wide: true }
    );

    function bindModalEvents() {
      var body = document.getElementById('mb-modal-body');
      if (!body) return;

      body.addEventListener('click', function (e) {
        var tabBtn = e.target.closest('[data-mb-tab]');
        if (tabBtn) {
          activeTab = tabBtn.getAttribute('data-mb-tab');
          body.innerHTML = renderModalBody();
          return;
        }

        var newBookBtn = e.target.closest('#mb-btn-new') || e.target.closest('#mb-empty-book');
        if (newBookBtn) {
          modalObj.close();
          RH.router.navigate('U02');
          return;
        }

        var passBtn = e.target.closest('[data-mb-pass]');
        if (passBtn) {
          var bid = passBtn.getAttribute('data-mb-pass');
          var b = (store.get('bookings') || []).filter(function (x) { return x.id === bid; })[0];
          if (b) RH.openDiningPassModal(b);
          return;
        }

        var venueLink = e.target.closest('[data-mb-venue]');
        if (venueLink) {
          var vid = venueLink.getAttribute('data-mb-venue');
          modalObj.close();
          RH.openVenue(vid);
          return;
        }

        var reschedBtn = e.target.closest('[data-mb-reschedule]');
        if (reschedBtn) {
          var bid2 = reschedBtn.getAttribute('data-mb-reschedule');
          var b2 = (store.get('bookings') || []).filter(function (x) { return x.id === bid2; })[0];
          if (b2) {
            RH.openRescheduleModal(b2, function (updated) {
              var allB = store.get('bookings').slice();
              var idx = allB.findIndex(function (item) { return item.id === bid2; });
              if (idx !== -1) {
                allB[idx] = Object.assign({}, allB[idx], updated);
                store.patch({ bookings: allB });
                RH.toast('Reservation rescheduled for ' + updated.date + ' at ' + updated.time);
                body.innerHTML = renderModalBody();
              }
            });
          }
          return;
        }

        var splitBtn = e.target.closest('[data-mb-split]');
        if (splitBtn) {
          var bid3 = splitBtn.getAttribute('data-mb-split');
          var b3 = (store.get('bookings') || []).filter(function (x) { return x.id === bid3; })[0];
          if (b3) {
            var perHead = (b3.totalPaid / (b3.guests || 1)).toFixed(2);
            RH.openModal(
              '<div class="modal-head">' +
                '<div><span class="badge">' + RH.icon('share-2', 'icon-sm') + 'Bill Splitter</span><h3 style="margin-top:6px;">Split Table Bill</h3></div>' +
                '<button class="modal-close" data-modal-close>' + RH.icon('x') + '</button>' +
              '</div>' +
              '<div class="modal-body" style="text-align:center;padding:24px 16px;">' +
                '<p class="small t-muted">Total Paid for <strong>' + b3.venueName + '</strong></p>' +
                '<strong style="font-size:26px;color:var(--burgundy);display:block;margin:6px 0;">$' + b3.totalPaid + '</strong>' +
                '<div style="background:var(--cream);border:1px solid var(--border-card);border-radius:10px;padding:12px;margin:12px 0;">' +
                  '<span class="small t-muted">Each person pays (' + b3.guests + ' Guests):</span>' +
                  '<h2 style="color:#047857;font-size:24px;font-weight:800;margin-top:4px;">$' + perHead + ' <small style="font-size:12px;color:#64748B;">USD</small></h2>' +
                '</div>' +
                '<button class="btn btn-primary" id="btn-copy-split" style="width:100%;">' + RH.icon('share-2', 'icon-sm') + ' Copy Payment Request Link</button>' +
              '</div>'
            );
            var copyBtn = document.getElementById('btn-copy-split');
            if (copyBtn) copyBtn.addEventListener('click', function () {
              RH.toast('Payment request ($' + perHead + '/guest) copied to clipboard!');
            });
          }
          return;
        }

        var contactBtn = e.target.closest('[data-mb-contact]');
        if (contactBtn) {
          var bid4 = contactBtn.getAttribute('data-mb-contact');
          var b4 = (store.get('bookings') || []).filter(function (x) { return x.id === bid4; })[0];
          if (b4) {
            RH.openModal(
              '<div class="modal-head">' +
                '<div><span class="badge">' + RH.icon('phone', 'icon-sm') + 'Maître d\' Concierge</span><h3 style="margin-top:6px;">' + b4.venueName + '</h3></div>' +
                '<button class="modal-close" data-modal-close>' + RH.icon('x') + '</button>' +
              '</div>' +
              '<div class="modal-body" style="display:grid;gap:12px;">' +
                '<div style="background:var(--cream);border:1px solid var(--border-card);border-radius:10px;padding:12px;">' +
                  '<strong>Address:</strong> ' + b4.location + '<br>' +
                  '<strong style="margin-top:4px;display:inline-block;">Host Phone:</strong> <a href="tel:+959798001122" class="t-burgundy">+95 9 798 001 122</a>' +
                '</div>' +
                '<div class="modal-foot" style="padding-inline:0;">' +
                  '<a href="tel:+959798001122" class="btn btn-primary">' + RH.icon('phone', 'icon-sm') + ' Call Maître d\'</a>' +
                '</div>' +
              '</div>'
            );
          }
          return;
        }

        var icsBtn = e.target.closest('[data-mb-ics]');
        if (icsBtn) {
          var bid5 = icsBtn.getAttribute('data-mb-ics');
          var b5 = (store.get('bookings') || []).filter(function (x) { return x.id === bid5; })[0];
          if (b5) RH.downloadBookingIcs(b5, RH.toast);
          return;
        }

        var cancelBtn = e.target.closest('[data-mb-cancel]');
        if (cancelBtn) {
          var bid6 = cancelBtn.getAttribute('data-mb-cancel');
          var b6 = (store.get('bookings') || []).filter(function (x) { return x.id === bid6; })[0];
          if (b6) {
            RH.openCancelModal(b6, function (cancelId) {
              var allB2 = store.get('bookings').slice();
              var idx2 = allB2.findIndex(function (item) { return item.id === cancelId; });
              if (idx2 !== -1) {
                allB2[idx2] = Object.assign({}, allB2[idx2], { status: 'Cancelled' });
                store.patch({ bookings: allB2 });
                RH.toast('Reservation cancelled and $' + b6.totalPaid + ' refund initiated.');
                body.innerHTML = renderModalBody();
                RH.renderNavbar();
                RH.renderBottomTabs();
              }
            });
          }
          return;
        }

        var rebookBtn = e.target.closest('[data-mb-rebook]');
        if (rebookBtn) {
          var bid7 = rebookBtn.getAttribute('data-mb-rebook');
          var b7 = (store.get('bookings') || []).filter(function (x) { return x.id === bid7; })[0];
          if (b7) {
            modalObj.close();
            RH.openVenue(b7.venueId);
          }
          return;
        }
      });
    }

    bindModalEvents();
  };

  RH.closeActiveModal = function () {
    if (RH._activeModalClose) RH._activeModalClose();
  };
})(window.RH = window.RH || {});

