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
    overlay.className = 'modal-overlay';
    overlay.innerHTML =
      '<div class="modal-card' + (opts.wide ? ' wide' : '') + ' anim-scale" role="dialog" aria-modal="true">' +
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

  RH.closeActiveModal = function () {
    if (RH._activeModalClose) RH._activeModalClose();
  };
})(window.RH = window.RH || {});
