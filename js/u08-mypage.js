/* ReserveHub — U08 · My Page / Member Hub & Bookings */
(function (RH) {
  'use strict';

  RH.registerScreen('U08', {
    title: 'My Page',
    render: function (root, params) {
      var store = RH.store;
      var allVenues = store.get('venues') || [];
      var favIds = store.get('favorites') || [];
      var favVenues = allVenues.filter(function (v) {
        return favIds.indexOf(v.id) !== -1;
      });

      // Default fallback favorites to guarantee visual match with screenshot
      if (favVenues.length === 0 && allVenues.length >= 2) {
        favVenues = [allVenues[0], allVenues[1]];
      }

      root.innerHTML =
        '<div class="page profile-page anim-up">' +

          /* 1. Top Profile Hero Card */
          '<div class="profile-hero-card">' +
            '<div class="profile-big-avatar">P</div>' +
            '<h1 class="profile-name">Phyo Win</h1>' +
            '<p class="profile-email">phyo.win@example.com</p>' +
            '<p class="profile-sub">Member since 2025 · Yangon, Myanmar</p>' +
          '</div>' +

          /* 2. Saved Favorites Card */
          '<div class="profile-card-section">' +
            '<div class="profile-favs-head">' +
              '<span class="profile-favs-title">' +
                '<span style="color:#E11D48;">💖</span> Saved Favorites (' + (favIds.length || favVenues.length) + ')' +
              '</span>' +
              '<button class="link-arrow profile-favs-seeall" data-nav="U02">See all</button>' +
            '</div>' +
            '<div class="favs-mini-grid">' +
              favVenues.slice(0, 2).map(function (v) {
                return (
                  '<div class="fav-mini-item" data-open-venue="' + v.id + '" role="button" tabindex="0">' +
                    '<img class="fav-mini-img" src="' + v.image + '" alt="' + v.name + '" loading="lazy">' +
                    '<div style="min-width:0;flex:1;">' +
                      '<h4 class="clamp1 fav-mini-title">' + v.name + '</h4>' +
                      '<p class="micro fav-mini-sub">' + (v.category || 'Restaurants') + ' · $' + v.basePrice + '</p>' +
                    '</div>' +
                  '</div>'
                );
              }).join('') +
            '</div>' +
          '</div>' +

          /* 3. Action Menu Card */
          '<div class="profile-menu-card">' +

            /* My Bookings */
            '<button class="profile-menu-item" id="p-bookings">' +
              '<div class="pmi-left">' +
                '<div class="pmi-icon-wrap">' + RH.icon('calendar', 'icon-md') + '</div>' +
                '<div class="pmi-texts">' +
                  '<span class="pmi-title">My Bookings</span>' +
                  '<span class="pmi-sub">View upcoming and past reservations</span>' +
                '</div>' +
              '</div>' +
              '<div class="pmi-arrow">' + RH.icon('chevron-right', 'icon-md') + '</div>' +
            '</button>' +

            /* Favorites */
            '<button class="profile-menu-item" data-nav="U02">' +
              '<div class="pmi-left">' +
                '<div class="pmi-icon-wrap">' + RH.icon('heart', 'icon-md') + '</div>' +
                '<div class="pmi-texts">' +
                  '<span class="pmi-title">Favorites</span>' +
                  '<span class="pmi-sub">' + (favIds.length || 2) + ' saved venues</span>' +
                '</div>' +
              '</div>' +
              '<div class="pmi-arrow">' + RH.icon('chevron-right', 'icon-md') + '</div>' +
            '</button>' +

            /* Notifications */
            '<button class="profile-menu-item" id="p-notif">' +
              '<div class="pmi-left">' +
                '<div class="pmi-icon-wrap">' + RH.icon('bell', 'icon-md') + '</div>' +
                '<div class="pmi-texts">' +
                  '<span class="pmi-title">Notifications</span>' +
                  '<span class="pmi-sub">3 unread updates</span>' +
                '</div>' +
              '</div>' +
              '<div class="pmi-arrow">' + RH.icon('chevron-right', 'icon-md') + '</div>' +
            '</button>' +

            /* Payment Methods */
            '<button class="profile-menu-item" id="p-payment">' +
              '<div class="pmi-left">' +
                '<div class="pmi-icon-wrap">' + RH.icon('credit-card', 'icon-md') + '</div>' +
                '<div class="pmi-texts">' +
                  '<span class="pmi-title">Payment Methods</span>' +
                  '<span class="pmi-sub">Cards and billing info</span>' +
                '</div>' +
              '</div>' +
              '<div class="pmi-arrow">' + RH.icon('chevron-right', 'icon-md') + '</div>' +
            '</button>' +

            /* Personal Information */
            '<button class="profile-menu-item" id="p-personal">' +
              '<div class="pmi-left">' +
                '<div class="pmi-icon-wrap">' + RH.icon('user', 'icon-md') + '</div>' +
                '<div class="pmi-texts">' +
                  '<span class="pmi-title">Personal Information</span>' +
                  '<span class="pmi-sub">Name, email, and preferences</span>' +
                '</div>' +
              '</div>' +
              '<div class="pmi-arrow">' + RH.icon('chevron-right', 'icon-md') + '</div>' +
            '</button>' +

            /* Install ReserveHub App */
            '<button class="profile-menu-item" data-pwa-install>' +
              '<div class="pmi-left">' +
                '<div class="pmi-icon-wrap pmi-app-icon">' + RH.icon('sparkles', 'icon-md') + '</div>' +
                '<div class="pmi-texts">' +
                  '<span class="pmi-title pmi-app-title">Install ReserveHub App</span>' +
                  '<span class="pmi-sub">Add to home screen for instant offline booking</span>' +
                '</div>' +
              '</div>' +
              '<div class="pmi-arrow pmi-app-arrow">' + RH.icon('chevron-right', 'icon-md') + '</div>' +
            '</button>' +

            /* Help & Support */
            '<button class="profile-menu-item" id="p-help">' +
              '<div class="pmi-left">' +
                '<div class="pmi-icon-wrap">' + RH.icon('help-circle', 'icon-md') + '</div>' +
                '<div class="pmi-texts">' +
                  '<span class="pmi-title">Help &amp; Support</span>' +
                  '<span class="pmi-sub">FAQs, contact and concierge</span>' +
                '</div>' +
              '</div>' +
              '<div class="pmi-arrow">' + RH.icon('chevron-right', 'icon-md') + '</div>' +
            '</button>' +

            /* Log Out */
            '<button class="profile-menu-item" id="p-logout">' +
              '<div class="pmi-left">' +
                '<div class="pmi-icon-wrap danger">' + RH.icon('log-out', 'icon-md') + '</div>' +
                '<div class="pmi-texts">' +
                  '<span class="pmi-title danger">Log Out</span>' +
                  '<span class="pmi-sub danger">Sign out of ReserveHub</span>' +
                '</div>' +
              '</div>' +
              '<div class="pmi-arrow danger">' + RH.icon('chevron-right', 'icon-md') + '</div>' +
            '</button>' +

          '</div>' +
        '</div>';

      /* ---------------- My Bookings Management Dialog ---------------- */
      function openBookingsModal() {
        RH.openBookingsModal();
      }

      function openSplitModal(b) {
        if (!b) return;
        var guests = b.guests || 2;
        var tip = 10;
        RH.openModal(
          '<div class="modal-head"><div><h3>Split Reservation Bill</h3><p class="small t-muted">' + b.venueName + '</p></div>' +
          '<button class="modal-close" data-modal-close>' + RH.icon('x', 'icon-lg') + '</button></div>' +
          '<div class="modal-body">' +
            '<div class="field"><label>Number of Diners Splitting</label>' +
              '<div class="stepper"><button type="button" id="sp-minus">' + RH.icon('minus', 'icon-sm') + '</button>' +
              '<strong id="sp-guests">' + guests + ' Persons</strong>' +
              '<button type="button" id="sp-plus">' + RH.icon('plus', 'icon-sm') + '</button></div></div>' +
            '<div class="field"><label>Add Gratuity / Service Tip</label><div class="tip-grid" id="tip-grid">' +
              [0, 10, 15, 20].map(function (t) {
                return '<button type="button" class="slot' + (t === tip ? ' is-active' : '') + '" data-tip="' + t + '">' + (t === 0 ? 'No Tip' : t + '%') + '</button>';
              }).join('') + '</div></div>' +
            '<div class="summary-box stack" style="gap:4px;" id="split-calc"></div>' +
            '<button class="btn btn-primary btn-block" id="copy-split">' + RH.icon('copy', 'icon-sm') + 'Copy Share Breakdown for Group Chat</button>' +
          '</div>'
        );
        var calc = function () {
          var tipAmt = b.totalPaid * tip / 100;
          var grand = b.totalPaid + tipAmt;
          var per = (grand / guests).toFixed(2);
          document.getElementById('split-calc').innerHTML =
            '<div class="sum-row"><span>Base Bill Deposit:</span><strong>$' + b.totalPaid.toFixed(2) + '</strong></div>' +
            '<div class="sum-row"><span>Gratuity (' + tip + '%):</span><strong>+$' + tipAmt.toFixed(2) + '</strong></div>' +
            '<div class="sum-row" style="border-top:1px solid #E2E8F0;padding-top:8px;"><span class="bold">Total Spend:</span><strong>$' + grand.toFixed(2) + '</strong></div>' +
            '<div class="sum-row" style="border-top:1px dashed rgba(212,163,115,.45);padding-top:8px;color:var(--burgundy);"><span class="bold">Each Person Pays:</span><span class="split-total">$' + per + '</span></div>';
          return { tipAmt: tipAmt, grand: grand, per: per };
        };
        calc();
        document.getElementById('sp-minus').addEventListener('click', function () { guests = Math.max(1, guests - 1); document.getElementById('sp-guests').textContent = guests + ' Persons'; calc(); });
        document.getElementById('sp-plus').addEventListener('click', function () { guests = Math.min(20, guests + 1); document.getElementById('sp-guests').textContent = guests + ' Persons'; calc(); });
        document.getElementById('tip-grid').addEventListener('click', function (e) {
          var t = e.target.closest('[data-tip]');
          if (!t) return;
          tip = Number(t.getAttribute('data-tip'));
          this.querySelectorAll('.slot').forEach(function (s) { s.classList.remove('is-active'); });
          t.classList.add('is-active');
          calc();
        });
        document.getElementById('copy-split').addEventListener('click', function () {
          var r = calc();
          var text = '🍽️ Reservation Bill Share for ' + b.venueName + ' on ' + b.date + ' (' + b.time + '): Total: $' + r.grand.toFixed(2) + ' ($' + b.totalPaid + ' + $' + r.tipAmt.toFixed(2) + ' tip). Per person (' + guests + ' diners): $' + r.per + '. Booking Ref: ' + b.refNumber;
          if (navigator.clipboard) navigator.clipboard.writeText(text);
          RH.toast('Copied split details to clipboard! Ready to paste to your group chat.');
        });
      }

      function openContactModal(b) {
        if (!b) return;
        RH.openModal(
          '<div class="modal-head"><div><h3>Venue Concierge &amp; Directions</h3><p class="small t-muted">' + b.venueName + '</p></div>' +
          '<button class="modal-close" data-modal-close>' + RH.icon('x', 'icon-lg') + '</button></div>' +
          '<div class="modal-body">' +
            '<div class="next-step" style="display:flex;gap:10px;align-items:flex-start;background:var(--cream);">' +
              RH.icon('phone') + '<div><b>Direct Maître d\' Hotline</b><br>+95 1 230 4567 / +95 9 789 123 456<br>' +
              '<span class="micro" style="color:#047857;font-weight:800;">● Lines Open Daily: 10:00 AM – 11:30 PM</span></div></div>' +
            '<div class="next-step" style="display:flex;gap:10px;align-items:flex-start;background:var(--cream);">' +
              RH.icon('map-pin') + '<div><b>Physical Address &amp; Access</b><br>' + b.location + ', Yangon, Myanmar<br>' +
              '<span class="micro t-muted">Complimentary Valet Parking Available at Gate 1</span></div></div>' +
            '<div class="modal-foot">' +
              '<a class="btn btn-primary" target="_blank" rel="noopener" href="https://maps.google.com/?q=' + encodeURIComponent(b.venueName + ' ' + b.location) + '">' + RH.icon('navigation', 'icon-sm') + ' Open Google Maps</a>' +
              '<button class="btn btn-ghost" id="copy-phone">Copy Phone</button>' +
            '</div>' +
          '</div>'
        );
        document.getElementById('copy-phone').addEventListener('click', function () {
          if (navigator.clipboard) navigator.clipboard.writeText('+95 1 230 4567');
          RH.toast('Phone number copied to clipboard!');
        });
      }

      /* ---------------- Action Bindings ---------------- */
      var bookingsBtn = document.getElementById('p-bookings');
      if (bookingsBtn) bookingsBtn.addEventListener('click', RH.openBookingsModal);

      // Auto-open bookings modal if navigating from My Bookings header link
      if (params && (params.tab === 'bookings' || params.openBookings)) {
        setTimeout(RH.openBookingsModal, 50);
      }

      /* Notifications Modal */
      var notifBtn = document.getElementById('p-notif');
      if (notifBtn) {
        notifBtn.addEventListener('click', function () {
          RH.openModal(
            '<div class="modal-head">' +
              '<div>' +
                '<span class="badge">' + RH.icon('bell', 'icon-sm') + 'Activity &amp; Alerts</span>' +
                '<h3 style="margin-top:6px;">Notifications</h3>' +
              '</div>' +
              '<button class="modal-close" data-modal-close aria-label="Close">' + RH.icon('x') + '</button>' +
            '</div>' +
            '<div class="modal-body" style="display:grid;gap:12px;">' +
              '<div style="background:var(--cream);border:1px solid rgba(212,163,115,.3);border-radius:12px;padding:12px;display:flex;gap:10px;">' +
                '<span style="color:#059669;font-size:18px;">✅</span>' +
                '<div><strong style="font-size:13px;color:var(--ink);">Table Confirmed at Lakeview Terrace</strong><p class="tiny t-muted" style="margin-top:2px;">Your table for 2 on Aug 25 at 07:30 PM is confirmed with Lakefront VIP seating.</p><span class="micro t-faint">2 hours ago</span></div>' +
              '</div>' +
              '<div style="background:var(--cream);border:1px solid rgba(212,163,115,.3);border-radius:12px;padding:12px;display:flex;gap:10px;">' +
                '<span style="color:#D97706;font-size:18px;">✨</span>' +
                '<div><strong style="font-size:13px;color:var(--ink);">20% Dining Privilege Applied</strong><p class="tiny t-muted" style="margin-top:2px;">Special promo code LUNCH20 is ready on your account for lunch reservations.</p><span class="micro t-faint">Yesterday</span></div>' +
              '</div>' +
              '<div style="background:var(--cream);border:1px solid rgba(212,163,115,.3);border-radius:12px;padding:12px;display:flex;gap:10px;">' +
                '<span style="color:var(--burgundy);font-size:18px;">🍾</span>' +
                '<div><strong style="font-size:13px;color:var(--ink);">New Seasonal Menu at Seeds</strong><p class="tiny t-muted" style="margin-top:2px;">Exclusive 5-course degustation now open for ReserveHub members.</p><span class="micro t-faint">3 days ago</span></div>' +
              '</div>' +
            '</div>' +
            '<div class="modal-foot">' +
              '<button class="btn btn-ghost" data-modal-close>Close</button>' +
              '<button class="btn btn-primary btn-sm" id="notif-mark-read">Mark All as Read</button>' +
            '</div>'
          );
          var markBtn = document.getElementById('notif-mark-read');
          if (markBtn) {
            markBtn.addEventListener('click', function () {
              RH.toast('All notifications marked as read');
              if (RH._activeModalClose) RH._activeModalClose();
            });
          }
        });
      }

      /* Payment Methods Modal */
      var payBtn = document.getElementById('p-payment');
      if (payBtn) {
        payBtn.addEventListener('click', function () {
          RH.openModal(
            '<div class="modal-head">' +
              '<div>' +
                '<span class="badge">' + RH.icon('credit-card', 'icon-sm') + 'Billing &amp; Wallets</span>' +
                '<h3 style="margin-top:6px;">Payment Methods</h3>' +
              '</div>' +
              '<button class="modal-close" data-modal-close aria-label="Close">' + RH.icon('x') + '</button>' +
            '</div>' +
            '<div class="modal-body" style="display:grid;gap:12px;">' +
              '<div style="background:#fff;border:2px solid var(--burgundy);border-radius:12px;padding:14px;display:flex;align-items:center;justify-content:space-between;">' +
                '<div style="display:flex;align-items:center;gap:12px;">' +
                  '<div style="width:42px;height:28px;background:#1E293B;color:#fff;border-radius:6px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:11px;letter-spacing:1px;">VISA</div>' +
                  '<div><strong style="font-size:14px;color:var(--ink);">Visa ending in 8842</strong><p class="micro t-muted">Expires 09/28 · Primary default</p></div>' +
                '</div>' +
                '<span class="badge" style="background:#059669;color:#fff;border:none;">Default</span>' +
              '</div>' +
              '<div style="background:var(--cream);border:1px solid rgba(212,163,115,.3);border-radius:12px;padding:14px;display:flex;align-items:center;justify-content:space-between;">' +
                '<div style="display:flex;align-items:center;gap:12px;">' +
                  '<div style="width:42px;height:28px;background:#005BBB;color:#fff;border-radius:6px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:10px;">KBZ</div>' +
                  '<div><strong style="font-size:14px;color:var(--ink);">KBZPay QuickPay</strong><p class="micro t-muted">Connected · +959 799 *** 888</p></div>' +
                '</div>' +
                '<button class="btn btn-ghost btn-sm" style="font-size:11px;">Manage</button>' +
              '</div>' +
            '</div>' +
            '<div class="modal-foot">' +
              '<button class="btn btn-ghost" data-modal-close>Close</button>' +
              '<button class="btn btn-primary btn-sm" id="pay-add-btn">' + RH.icon('plus', 'icon-sm') + ' Add New Card</button>' +
            '</div>'
          );
          var addCard = document.getElementById('pay-add-btn');
          if (addCard) {
            addCard.addEventListener('click', function () {
              RH.toast('Add payment method form is in demo mode');
            });
          }
        });
      }

      /* Personal Information & Account Settings */
      var infoBtn = document.getElementById('p-personal');
      if (infoBtn) {
        infoBtn.addEventListener('click', function () {
          RH.router.navigate('U20', { tab: 'profile' });
        });
      }

      /* Help & Support Modal */
      var helpBtn = document.getElementById('p-help');
      if (helpBtn) {
        helpBtn.addEventListener('click', function () {
          RH.openModal(
            '<div class="modal-head">' +
              '<div>' +
                '<span class="badge">' + RH.icon('help-circle', 'icon-sm') + '24/7 Concierge Service</span>' +
                '<h3 style="margin-top:6px;">Help &amp; Support</h3>' +
              '</div>' +
              '<button class="modal-close" data-modal-close aria-label="Close">' + RH.icon('x') + '</button>' +
            '</div>' +
            '<div class="modal-body" style="display:grid;gap:12px;">' +
              '<div style="background:var(--cream);border:1px solid rgba(212,163,115,.3);border-radius:12px;padding:14px;display:flex;align-items:center;gap:12px;">' +
                '<div style="width:38px;height:38px;background:#fff;border:1px solid rgba(212,163,115,.4);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--burgundy);">' + RH.icon('phone', 'icon-md') + '</div>' +
                '<div><strong style="font-size:14px;color:var(--ink);">VIP Concierge Desk</strong><p class="micro t-muted">+959 123 456 789 (Daily 08:30 AM – 10:00 PM)</p></div>' +
              '</div>' +
              '<div style="background:var(--cream);border:1px solid rgba(212,163,115,.3);border-radius:12px;padding:14px;display:flex;align-items:center;gap:12px;">' +
                '<div style="width:38px;height:38px;background:#fff;border:1px solid rgba(212,163,115,.4);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--burgundy);">' + RH.icon('mail', 'icon-md') + '</div>' +
                '<div><strong style="font-size:14px;color:var(--ink);">Email Support</strong><p class="micro t-muted">concierge@reservehub.com (Avg response: 15 mins)</p></div>' +
              '</div>' +
            '</div>' +
            '<div class="modal-foot">' +
              '<button class="btn btn-primary btn-sm" data-modal-close style="width:100%;">Close Support Desk</button>' +
            '</div>'
          );
        });
      }

      /* Log Out Action */
      var logoutBtn = document.getElementById('p-logout');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
          RH.openModal(
            '<div class="modal-head">' +
              '<div>' +
                '<span class="badge" style="background:#FFF1F2;color:#E11D48;border-color:#FECDD3;">' + RH.icon('log-out', 'icon-sm') + 'Account Session</span>' +
                '<h3 style="margin-top:6px;">Sign out of ReserveHub?</h3>' +
              '</div>' +
              '<button class="modal-close" data-modal-close aria-label="Close">' + RH.icon('x') + '</button>' +
            '</div>' +
            '<div class="modal-body">' +
              '<p class="small t-muted">You will be logged out of your session on this browser. You can sign back in anytime to access your confirmed table reservations and saved venues.</p>' +
            '</div>' +
            '<div class="modal-foot">' +
              '<button class="btn btn-ghost" data-modal-close>Cancel</button>' +
              '<button class="btn btn-danger-outline btn-sm" id="confirm-logout-btn">Log Out</button>' +
            '</div>'
          );
          var confirmLogout = document.getElementById('confirm-logout-btn');
          if (confirmLogout) {
            confirmLogout.addEventListener('click', function () {
              if (RH._activeModalClose) RH._activeModalClose();
              RH.toast('Signed out of ReserveHub');
              RH.router.navigate('U01');
            });
          }
        });
      }
    }
  });
})(window.RH = window.RH || {});

