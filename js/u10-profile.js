/* ReserveHub — U10 · Member Profile & Account */
(function (RH) {
  'use strict';

  RH.registerScreen('U10', {
    title: 'Member Profile',
    render: function (root) {
      var store = RH.store;
      var allVenues = store.get('venues');
      var favIds = store.get('favorites') || [];
      var favVenues = allVenues.filter(function (v) {
        return favIds.indexOf(v.id) !== -1;
      });

      // Default fallback favorites if list is empty to match initial state
      if (favVenues.length === 0 && allVenues.length >= 2) {
        favVenues = [allVenues[0], allVenues[1]];
      }

      root.innerHTML =
        '<div class="page profile-page anim-up">' +
          /* Top Profile Hero Card */
          '<div class="profile-hero-card">' +
            '<div class="profile-big-avatar">P</div>' +
            '<h1 class="profile-name">Phyo Win</h1>' +
            '<p class="profile-email">phyo.win@example.com</p>' +
            '<p class="profile-sub">Member since 2025 · Yangon, Myanmar</p>' +
          '</div>' +

          /* Saved Favorites Card */
          '<div class="profile-card-section">' +
            '<div class="profile-favs-head">' +
              '<span style="font-weight:700;font-size:14px;display:inline-flex;align-items:center;gap:6px;color:var(--ink);">' +
                '<span style="color:#E11D48;">❤️</span> Saved Favorites (' + favIds.length + ')' +
              '</span>' +
              '<button class="link-arrow" style="font-size:12px;font-weight:700;" data-nav="U02">See all</button>' +
            '</div>' +
            '<div class="favs-mini-grid">' +
              favVenues.slice(0, 2).map(function (v) {
                return (
                  '<div class="fav-mini-item" data-open-venue="' + v.id + '" role="button" tabindex="0">' +
                    '<img class="fav-mini-img" src="' + v.image + '" alt="' + v.name + '" loading="lazy">' +
                    '<div style="min-width:0;flex:1;">' +
                      '<h4 class="clamp1" style="font-size:13px;font-weight:800;color:var(--ink);line-height:1.2;">' + v.name + '</h4>' +
                      '<p class="micro t-muted" style="margin-top:2px;">' + v.category + ' · $' + v.basePrice + '</p>' +
                    '</div>' +
                  '</div>'
                );
              }).join('') +
            '</div>' +
          '</div>' +

          /* Menu Actions Card */
          '<div class="profile-menu-card">' +
            /* My Bookings */
            '<button class="profile-menu-item" data-nav="U08">' +
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
                  '<span class="pmi-sub">' + favIds.length + ' saved venues</span>' +
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

            /* Install PWA App */
            '<button class="profile-menu-item" data-pwa-install>' +
              '<div class="pmi-left">' +
                '<div class="pmi-icon-wrap" style="color:var(--gold);background:var(--burgundy-deep);border-color:rgba(212,163,115,0.4);">' + RH.icon('sparkles', 'icon-md') + '</div>' +
                '<div class="pmi-texts">' +
                  '<span class="pmi-title" style="color:var(--burgundy);">Install ReserveHub App</span>' +
                  '<span class="pmi-sub">Add to home screen for instant offline booking</span>' +
                '</div>' +
              '</div>' +
              '<div class="pmi-arrow" style="color:var(--burgundy);">' + RH.icon('chevron-right', 'icon-md') + '</div>' +
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

      /* Personal Information Modal */
      var infoBtn = document.getElementById('p-personal');
      if (infoBtn) {
        infoBtn.addEventListener('click', function () {
          RH.openModal(
            '<div class="modal-head">' +
              '<div>' +
                '<span class="badge">' + RH.icon('user', 'icon-sm') + 'Account Details</span>' +
                '<h3 style="margin-top:6px;">Personal Information</h3>' +
              '</div>' +
              '<button class="modal-close" data-modal-close aria-label="Close">' + RH.icon('x') + '</button>' +
            '</div>' +
            '<div class="modal-body" style="display:grid;gap:14px;">' +
              '<div><label class="label">Full Name</label><input class="input" value="Phyo Win"></div>' +
              '<div><label class="label">Email Address</label><input class="input" type="email" value="phyo.win@example.com"></div>' +
              '<div><label class="label">Phone Number</label><input class="input" type="tel" value="+959 799 123 456"></div>' +
              '<div><label class="label">Preferred Seating Preference</label><select class="select"><option selected>Waterfront &amp; Outdoor Terrace</option><option>Private Room / Tatami</option><option>Chef Counter / Omakase</option></select></div>' +
            '</div>' +
            '<div class="modal-foot">' +
              '<button class="btn btn-ghost" data-modal-close>Cancel</button>' +
              '<button class="btn btn-primary btn-sm" id="save-info-btn">Save Changes</button>' +
            '</div>'
          );
          var saveBtn = document.getElementById('save-info-btn');
          if (saveBtn) {
            saveBtn.addEventListener('click', function () {
              RH.toast('Profile preferences updated successfully');
              if (RH._activeModalClose) RH._activeModalClose();
            });
          }
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
