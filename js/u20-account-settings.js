/* ReserveHub — U20 · Account Settings & Member Profile */
(function (RH) {
  'use strict';

  var CUISINE_OPTIONS = [
    'Fine Dining & Tasting Menus',
    'Authentic Myanmar & Traditional',
    'French & European Bistros',
    'Japanese, Sushi & Omakase',
    'Italian & Woodfired Pizza',
    'Rooftop Lounge & Sunset Cocktails',
    'Lakefront & Waterfront Dining'
  ];

  var DIETARY_OPTIONS = [
    'No Restrictions',
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Halal Friendly',
    'No Pork',
    'No Beef',
    'Pescatarian',
    'Nut Allergy Alert'
  ];

  RH.registerScreen('U20', {
    title: 'Account Settings',
    render: function (root, params) {
      var store = RH.store;
      var activeTab = (params && params.tab) || 'profile';

      // Load user profile from store or defaults
      var user = store.get('currentUser') || {
        name: 'Phyo Win',
        email: 'phyo.win@example.com',
        phone: '+95 9 798 123 456',
        city: 'Yangon',
        avatarInitials: 'P',
        membershipTier: 'VIP Concierge Member',
        memberSince: '2025',
        seatingPref: 'Waterfront & Outdoor Terrace',
        specialNotes: 'Anniversary table preference, quiet corner if available.',
        cuisines: ['Fine Dining & Tasting Menus', 'Authentic Myanmar & Traditional', 'Japanese, Sushi & Omakase'],
        dietary: ['No Restrictions'],
        emailNotifs: true,
        smsReminders: true,
        vipDeals: true,
        twoFactor: false
      };

      function render() {
        root.innerHTML =
          '<div class="page profile-page anim-up" style="max-width:640px;margin-inline:auto;padding-bottom:60px;">' +

            /* Header breadcrumb / back bar */
            '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">' +
              '<button type="button" class="btn btn-ghost btn-sm" id="u20-back" style="display:inline-flex;align-items:center;gap:6px;padding-inline:0;color:var(--burgundy);font-weight:700;">' +
                RH.icon('arrow-left', 'icon-sm') + 'Back to My Page' +
              '</button>' +
              '<span class="badge" style="background:#FFF1F2;color:#9F1239;border:1px solid #FECDD3;padding:4px 10px;border-radius:999px;font-size:11.5px;font-weight:700;">' +
                RH.icon('shield-check', 'icon-sm') + 'Verified Account' +
              '</span>' +
            '</div>' +

            /* Profile Hero Summary Card */
            '<div class="profile-hero-card" style="margin-bottom:16px;">' +
              '<div class="profile-big-avatar">' + (user.avatarInitials || 'P') + '</div>' +
              '<h1 class="profile-name">' + user.name + '</h1>' +
              '<p class="profile-email">' + user.email + '</p>' +
              '<p class="profile-sub">' + user.membershipTier + ' · ' + user.city + ', Myanmar</p>' +
            '</div>' +

            /* Settings Navigation Tabs */
            '<div class="auth-tabs" style="margin-bottom:18px;grid-template-columns:repeat(3,1fr);">' +
              '<button type="button" class="auth-tab' + (activeTab === 'profile' ? ' is-active' : '') + '" data-tab="profile">' +
                RH.icon('user', 'icon-sm') + ' Profile' +
              '</button>' +
              '<button type="button" class="auth-tab' + (activeTab === 'preferences' ? ' is-active' : '') + '" data-tab="preferences">' +
                RH.icon('heart', 'icon-sm') + ' Dining Prefs' +
              '</button>' +
              '<button type="button" class="auth-tab' + (activeTab === 'security' ? ' is-active' : '') + '" data-tab="security">' +
                RH.icon('lock', 'icon-sm') + ' Security' +
              '</button>' +
            '</div>' +

            /* Tab Content */
            '<div id="u20-tab-content">' +
              renderTabContent() +
            '</div>' +

          '</div>';

        bindEvents();
      }

      function renderTabContent() {
        if (activeTab === 'profile') {
          return (
            '<div class="profile-menu-card" style="padding:22px;border-radius:var(--r-xl);">' +
              '<div style="margin-bottom:18px;">' +
                '<h3 style="font-size:17px;font-weight:800;color:var(--ink);margin-bottom:4px;">Personal Information</h3>' +
                '<p class="small t-muted">Update your contact details for booking communications and table greetings.</p>' +
              '</div>' +

              '<form id="form-profile" style="display:grid;gap:14px;">' +
                '<div class="field">' +
                  '<label for="u20-name">Full Name *</label>' +
                  '<div class="input-wrap">' +
                    RH.icon('user', 'icon-sm') +
                    '<input type="text" id="u20-name" class="input" value="' + user.name + '" required>' +
                  '</div>' +
                '</div>' +

                '<div class="field">' +
                  '<label for="u20-email">Email Address *</label>' +
                  '<div class="input-wrap">' +
                    RH.icon('mail', 'icon-sm') +
                    '<input type="email" id="u20-email" class="input" value="' + user.email + '" required>' +
                  '</div>' +
                '</div>' +

                '<div class="field">' +
                  '<label for="u20-phone">Mobile Phone Number *</label>' +
                  '<div class="input-wrap">' +
                    RH.icon('phone', 'icon-sm') +
                    '<input type="tel" id="u20-phone" class="input" value="' + user.phone + '" required>' +
                  '</div>' +
                '</div>' +

                '<div class="field">' +
                  '<label for="u20-city">Home City</label>' +
                  '<div class="input-wrap">' +
                    RH.icon('map-pin', 'icon-sm') +
                    '<select id="u20-city" class="select">' +
                      '<option value="Yangon"' + (user.city === 'Yangon' ? ' selected' : '') + '>Yangon, Myanmar</option>' +
                      '<option value="Mandalay"' + (user.city === 'Mandalay' ? ' selected' : '') + '>Mandalay, Myanmar</option>' +
                      '<option value="Bagan"' + (user.city === 'Bagan' ? ' selected' : '') + '>Bagan, Myanmar</option>' +
                      '<option value="Naypyidaw"' + (user.city === 'Naypyidaw' ? ' selected' : '') + '>Naypyidaw, Myanmar</option>' +
                    '</select>' +
                  '</div>' +
                '</div>' +

                '<div style="display:flex;justify-content:flex-end;gap:10px;margin-top:8px;padding-top:14px;border-top:1px solid var(--border-card);">' +
                  '<button type="button" class="btn btn-ghost btn-sm" id="btn-cancel-profile">Reset</button>' +
                  '<button type="submit" class="btn btn-primary btn-sm" style="background:var(--burgundy);color:#fff;font-weight:700;">' +
                    RH.icon('check', 'icon-sm') + ' Save Changes' +
                  '</button>' +
                '</div>' +
              '</form>' +
            '</div>'
          );
        }

        if (activeTab === 'preferences') {
          return (
            '<div class="profile-menu-card" style="padding:22px;border-radius:var(--r-xl);">' +
              '<div style="margin-bottom:18px;">' +
                '<h3 style="font-size:17px;font-weight:800;color:var(--ink);margin-bottom:4px;">Dining &amp; Seating Preferences</h3>' +
                '<p class="small t-muted">Customize your table placement preferences and culinary tastes for fine dining hosts.</p>' +
              '</div>' +

              '<form id="form-prefs" style="display:grid;gap:16px;">' +
                '<div class="field">' +
                  '<label for="u20-seating">Default Seating Preference</label>' +
                  '<div class="input-wrap">' +
                    RH.icon('coffee', 'icon-sm') +
                    '<select id="u20-seating" class="select">' +
                      '<option' + (user.seatingPref === 'Waterfront & Outdoor Terrace' ? ' selected' : '') + '>Waterfront &amp; Outdoor Terrace</option>' +
                      '<option' + (user.seatingPref === 'Private Dining Room / VIP Tatami' ? ' selected' : '') + '>Private Dining Room / VIP Tatami</option>' +
                      '<option' + (user.seatingPref === 'Chef Counter / Omakase Bar' ? ' selected' : '') + '>Chef Counter / Omakase Bar</option>' +
                      '<option' + (user.seatingPref === 'Quiet Romantic Corner' ? ' selected' : '') + '>Quiet Romantic Corner</option>' +
                      '<option' + (user.seatingPref === 'High-Top Lounge / Sunset Bar' ? ' selected' : '') + '>High-Top Lounge / Sunset Bar</option>' +
                    '</select>' +
                  '</div>' +
                '</div>' +

                '<div class="field">' +
                  '<label>Favorite Cuisines &amp; Experiences</label>' +
                  '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;" id="u20-cuisine-wrap">' +
                    CUISINE_OPTIONS.map(function (c) {
                      var active = (user.cuisines || []).indexOf(c) !== -1;
                      return '<button type="button" class="diet-chip' + (active ? ' is-active' : '') + '" data-c-item="' + c + '">' +
                        (active ? '✓ ' : '+ ') + c +
                      '</button>';
                    }).join('') +
                  '</div>' +
                '</div>' +

                '<div class="field">' +
                  '<label>Dietary Restrictions &amp; Allergies</label>' +
                  '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;" id="u20-diet-wrap">' +
                    DIETARY_OPTIONS.map(function (d) {
                      var active = (user.dietary || []).indexOf(d) !== -1;
                      return '<button type="button" class="diet-chip' + (active ? ' is-active' : '') + '" data-d-item="' + d + '">' +
                        (active ? '✓ ' : '+ ') + d +
                      '</button>';
                    }).join('') +
                  '</div>' +
                '</div>' +

                '<div class="field">' +
                  '<label for="u20-notes">Maître d\' Special Greeting Notes</label>' +
                  '<textarea id="u20-notes" class="input" rows="2" style="height:auto;padding:8px 12px;" placeholder="e.g. Celebrating anniversary, prefer still water, celebrate birthdays...">' + (user.specialNotes || '') + '</textarea>' +
                '</div>' +

                '<div style="display:flex;justify-content:flex-end;gap:10px;margin-top:8px;padding-top:14px;border-top:1px solid var(--border-card);">' +
                  '<button type="submit" class="btn btn-primary btn-sm" style="background:var(--burgundy);color:#fff;font-weight:700;">' +
                    RH.icon('check', 'icon-sm') + ' Update Dining Profile' +
                  '</button>' +
                '</div>' +
              '</form>' +
            '</div>'
          );
        }

        if (activeTab === 'security') {
          return (
            '<div class="profile-menu-card" style="padding:22px;border-radius:var(--r-xl);display:grid;gap:18px;">' +
              '<div>' +
                '<h3 style="font-size:17px;font-weight:800;color:var(--ink);margin-bottom:4px;">Security &amp; Notifications</h3>' +
                '<p class="small t-muted">Manage your password, login security, and concierge reservation alerts.</p>' +
              '</div>' +

              /* Password Form */
              '<form id="form-password" style="background:var(--cream);border:1px solid var(--border-card);border-radius:12px;padding:16px;display:grid;gap:12px;">' +
                '<strong style="font-size:14px;color:var(--ink);display:flex;align-items:center;gap:6px;">' +
                  RH.icon('lock', 'icon-sm') + ' Change Password' +
                '</strong>' +
                '<div class="field">' +
                  '<label for="u20-curr-pass">Current Password</label>' +
                  '<div class="input-wrap has-pwd-toggle">' +
                    RH.icon('lock', 'icon-sm') +
                    '<input type="password" id="u20-curr-pass" class="input" placeholder="••••••••" required>' +
                    '<button type="button" class="pwd-toggle-btn" data-pwd-toggle="u20-curr-pass" aria-label="Show password" title="Show password">' +
                      RH.icon('eye', 'icon-sm') +
                    '</button>' +
                  '</div>' +
                '</div>' +
                '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;" class="reg-grid-row">' +
                  '<div class="field">' +
                    '<label for="u20-new-pass">New Password</label>' +
                    '<div class="input-wrap has-pwd-toggle">' +
                      RH.icon('lock', 'icon-sm') +
                      '<input type="password" id="u20-new-pass" class="input" placeholder="Min 6 characters" required minlength="6">' +
                      '<button type="button" class="pwd-toggle-btn" data-pwd-toggle="u20-new-pass" aria-label="Show password" title="Show password">' +
                        RH.icon('eye', 'icon-sm') +
                      '</button>' +
                    '</div>' +
                  '</div>' +
                  '<div class="field">' +
                    '<label for="u20-new-pass2">Confirm New Password</label>' +
                    '<div class="input-wrap has-pwd-toggle">' +
                      RH.icon('lock', 'icon-sm') +
                      '<input type="password" id="u20-new-pass2" class="input" placeholder="Repeat new password" required minlength="6">' +
                      '<button type="button" class="pwd-toggle-btn" data-pwd-toggle="u20-new-pass2" aria-label="Show password" title="Show password">' +
                        RH.icon('eye', 'icon-sm') +
                      '</button>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
                '<div style="display:flex;justify-content:flex-end;margin-top:4px;">' +
                  '<button type="submit" class="btn btn-primary btn-sm" style="background:var(--burgundy);color:#fff;font-weight:700;">Update Password</button>' +
                '</div>' +
              '</form>' +

              /* Notification Toggles */
              '<div style="border-top:1px solid var(--border-card);padding-top:16px;display:grid;gap:14px;">' +
                '<strong style="font-size:14px;color:var(--ink);display:flex;align-items:center;gap:6px;">' +
                  RH.icon('bell', 'icon-sm') + ' Communication Preferences' +
                '</strong>' +

                '<label style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;padding:10px 12px;background:#FAFAFA;border-radius:10px;border:1px solid #EEEEEE;">' +
                  '<div>' +
                    '<strong style="font-size:13px;display:block;color:var(--ink);">Booking Confirmations via Email</strong>' +
                    '<span class="micro t-muted">Instant calendar invites and digital passes</span>' +
                  '</div>' +
                  '<input type="checkbox" id="notif-email"' + (user.emailNotifs ? ' checked' : '') + ' style="width:18px;height:18px;accent-color:var(--burgundy);">' +
                '</label>' +

                '<label style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;padding:10px 12px;background:#FAFAFA;border-radius:10px;border:1px solid #EEEEEE;">' +
                  '<div>' +
                    '<strong style="font-size:13px;display:block;color:var(--ink);">SMS Table Seating Reminders</strong>' +
                    '<span class="micro t-muted">Host table alerts 2 hours prior to reservation</span>' +
                  '</div>' +
                  '<input type="checkbox" id="notif-sms"' + (user.smsReminders ? ' checked' : '') + ' style="width:18px;height:18px;accent-color:var(--burgundy);">' +
                '</label>' +

                '<label style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;padding:10px 12px;background:#FAFAFA;border-radius:10px;border:1px solid #EEEEEE;">' +
                  '<div>' +
                    '<strong style="font-size:13px;display:block;color:var(--ink);">Exclusive VIP Tastings &amp; Offers</strong>' +
                    '<span class="micro t-muted">First access to Michelin guest chef table popups</span>' +
                  '</div>' +
                  '<input type="checkbox" id="notif-vip"' + (user.vipDeals ? ' checked' : '') + ' style="width:18px;height:18px;accent-color:var(--burgundy);">' +
                '</label>' +
              '</div>' +

              /* Danger Zone */
              '<div style="border-top:1px solid var(--border-card);padding-top:16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">' +
                '<div>' +
                  '<strong style="color:#DC2626;font-size:13px;display:block;">Deactivate ReserveHub Account</strong>' +
                  '<span class="micro t-muted">Permanently remove saved bookings, favorites, and VIP tier.</span>' +
                '</div>' +
                '<button type="button" class="btn btn-danger-outline btn-sm" id="btn-delete-acct">Deactivate Account</button>' +
              '</div>' +

            '</div>'
          );
        }

        return '';
      }

      function bindEvents() {
        var backBtn = document.getElementById('u20-back');
        if (backBtn) {
          backBtn.addEventListener('click', function () {
            RH.router.navigate('U08');
          });
        }

        // Tab buttons
        var tabBtns = root.querySelectorAll('[data-tab]');
        tabBtns.forEach(function (b) {
          b.addEventListener('click', function () {
            activeTab = b.getAttribute('data-tab');
            render();
          });
        });

        // Profile Form
        var formProf = document.getElementById('form-profile');
        if (formProf) {
          formProf.addEventListener('submit', function (e) {
            e.preventDefault();
            var updated = Object.assign({}, user, {
              name: document.getElementById('u20-name').value,
              email: document.getElementById('u20-email').value,
              phone: document.getElementById('u20-phone').value,
              city: document.getElementById('u20-city').value,
              avatarInitials: (document.getElementById('u20-name').value || 'P').trim().charAt(0).toUpperCase()
            });
            store.patch({ currentUser: updated });
            RH.toast('Personal information updated successfully!');
            render();
            RH.renderNavbar();
          });
        }

        var btnResetProf = document.getElementById('btn-cancel-profile');
        if (btnResetProf) {
          btnResetProf.addEventListener('click', function () {
            render();
          });
        }

        // Preferences cuisine chips
        var cWrap = document.getElementById('u20-cuisine-wrap');
        if (cWrap) {
          cWrap.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-c-item]');
            if (!btn) return;
            var item = btn.getAttribute('data-c-item');
            user.cuisines = user.cuisines || [];
            var idx = user.cuisines.indexOf(item);
            if (idx === -1) {
              user.cuisines.push(item);
              btn.classList.add('is-active');
              btn.textContent = '✓ ' + item;
            } else {
              user.cuisines.splice(idx, 1);
              btn.classList.remove('is-active');
              btn.textContent = '+ ' + item;
            }
          });
        }

        // Preferences dietary chips
        var dWrap = document.getElementById('u20-diet-wrap');
        if (dWrap) {
          dWrap.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-d-item]');
            if (!btn) return;
            var item = btn.getAttribute('data-d-item');
            user.dietary = user.dietary || [];
            var idx = user.dietary.indexOf(item);
            if (idx === -1) {
              user.dietary.push(item);
              btn.classList.add('is-active');
              btn.textContent = '✓ ' + item;
            } else {
              user.dietary.splice(idx, 1);
              btn.classList.remove('is-active');
              btn.textContent = '+ ' + item;
            }
          });
        }

        // Prefs Form
        var formPrefs = document.getElementById('form-prefs');
        if (formPrefs) {
          formPrefs.addEventListener('submit', function (e) {
            e.preventDefault();
            var updated = Object.assign({}, user, {
              seatingPref: document.getElementById('u20-seating').value,
              specialNotes: document.getElementById('u20-notes').value
            });
            store.patch({ currentUser: updated });
            RH.toast('Dining & seating preferences saved!');
          });
        }

        // Password Form
        var formPass = document.getElementById('form-password');
        if (formPass) {
          formPass.addEventListener('submit', function (e) {
            e.preventDefault();
            var p1 = document.getElementById('u20-new-pass').value;
            var p2 = document.getElementById('u20-new-pass2').value;
            if (p1 !== p2) {
              RH.toast('New passwords do not match. Please re-enter.', 'error');
              return;
            }
            RH.toast('Password updated successfully!');
            formPass.reset();
          });
        }

        // Notification checkboxes
        var chkEmail = document.getElementById('notif-email');
        if (chkEmail) {
          chkEmail.addEventListener('change', function () {
            user.emailNotifs = chkEmail.checked;
            store.patch({ currentUser: user });
            RH.toast('Email preferences updated.');
          });
        }
        var chkSms = document.getElementById('notif-sms');
        if (chkSms) {
          chkSms.addEventListener('change', function () {
            user.smsReminders = chkSms.checked;
            store.patch({ currentUser: user });
            RH.toast('SMS reminder preferences updated.');
          });
        }
        var chkVip = document.getElementById('notif-vip');
        if (chkVip) {
          chkVip.addEventListener('change', function () {
            user.vipDeals = chkVip.checked;
            store.patch({ currentUser: user });
            RH.toast('VIP offer alerts updated.');
          });
        }

        // Delete Account
        var delBtn = document.getElementById('btn-delete-acct');
        if (delBtn) {
          delBtn.addEventListener('click', function () {
            RH.openModal(
              '<div class="modal-head">' +
                '<div><span class="badge" style="background:#FEE2E2;color:#DC2626;">Danger Zone</span><h3 style="margin-top:6px;">Deactivate Account?</h3></div>' +
                '<button class="modal-close" data-modal-close>' + RH.icon('x') + '</button>' +
              '</div>' +
              '<div class="modal-body" style="font-size:13px;color:#475569;line-height:1.5;">' +
                'Are you sure you want to deactivate your ReserveHub member profile? Your confirmed bookings, wishlists, and loyalty tier will be archived.' +
              '</div>' +
              '<div class="modal-foot">' +
                '<button type="button" class="btn btn-ghost" data-modal-close>Cancel</button>' +
                '<button type="button" class="btn btn-primary" id="confirm-del-btn" style="background:#DC2626;border-color:#DC2626;">Yes, Deactivate</button>' +
              '</div>'
            );
            var confBtn = document.getElementById('confirm-del-btn');
            if (confBtn) {
              confBtn.addEventListener('click', function () {
                if (RH._activeModalClose) RH._activeModalClose();
                RH.toast('Account deactivated. Signing out...');
                RH.router.navigate('U10');
              });
            }
          });
        }
      }

      render();
    }
  });
})(window.RH = window.RH || {});
