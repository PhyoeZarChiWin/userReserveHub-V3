/* ReserveHub — U11 · Member Registration & VIP Onboarding */
(function (RH) {
  'use strict';

  var CUISINES_PREFS = [
    { id: 'fine-dining', label: 'Fine Dining' },
    { id: 'myanmar', label: 'Authentic Myanmar' },
    { id: 'french', label: 'French & European' },
    { id: 'japanese', label: 'Japanese & Omakase' },
    { id: 'italian', label: 'Italian & Wine Bar' },
    { id: 'rooftop', label: 'Rooftop & Sunset' },
    { id: 'lakeview', label: 'Lakeview & Waterfront' }
  ];

  var DIETARY_PREFS = [
    'None / All', 'Vegetarian', 'Gluten-Free', 'Halal', 'No Pork', 'No Beef', 'Pescatarian'
  ];

  RH.registerScreen('U11', {
    title: 'Member Registration',
    render: function (root) {
      var store = RH.store;
      var selectedCuisines = ['fine-dining', 'myanmar'];
      var selectedDiets = ['None / All'];

      function render() {
        root.innerHTML =
          '<div class="page auth-page anim-up" style="max-width:540px;margin:24px auto 60px;padding:0 16px;">' +
            '<div class="auth-card" style="padding:28px 24px;">' +

              /* Header */
              '<div class="auth-header" style="margin-bottom:18px;">' +
                '<div class="auth-logo-badge">' +
                  '<span class="auth-logo-mark">R</span>' +
                '</div>' +
                '<span class="badge" style="margin-bottom:6px;display:inline-flex;align-items:center;gap:4px;">' +
                  RH.icon('sparkles', 'icon-sm') + 'VIP Member Access' +
                '</span>' +
                '<h1 class="auth-title" style="font-size:24px;">Join ReserveHub</h1>' +
                '<p class="auth-subtitle">' +
                  'Create your complimentary dining profile for guaranteed seating, priority access, and personalized table service across Myanmar.' +
                '</p>' +
              '</div>' +

              /* Social Signup */
              '<div class="auth-social-buttons">' +
                '<button type="button" class="auth-social-btn" id="reg-google">' +
                  '<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.3l3.7 2.9C6.2 7.2 8.9 5 12 5z"/><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/><path fill="#FBBC05" d="M5.3 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.6 7.3C.6 9.3 0 11.6 0 14s.6 4.7 1.6 6.7l3.7-2.9z"/><path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.2-6.7-5.2L1.6 16c1.9 3.7 5.8 7 10.4 7z"/></svg>' +
                  '<span>Sign up with Google</span>' +
                '</button>' +
                '<button type="button" class="auth-social-btn" id="reg-apple">' +
                  '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.87c.66-.82 1.1-1.95.98-3.08-1.02.04-2.24.68-2.97 1.53-.63.73-1.17 1.89-1.03 3 .12.01.24.02.37.02 1 0 2.01-.64 2.65-1.47z"/></svg>' +
                  '<span>Sign up with Apple</span>' +
                '</button>' +
              '</div>' +

              '<div class="auth-divider">' +
                '<span>or register with email</span>' +
              '</div>' +

              /* Main Registration Form */
              '<form class="auth-form" id="reg-form" style="gap:16px;">' +
                
                /* Full Name & Phone */
                '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;" class="reg-grid-row">' +
                  '<div class="field">' +
                    '<label for="reg-name">Full Name *</label>' +
                    '<div class="input-wrap">' +
                      RH.icon('user', 'icon-sm') +
                      '<input type="text" id="reg-name" class="input" placeholder="e.g. Phyo Win" value="Phyo Win" required>' +
                    '</div>' +
                  '</div>' +
                  '<div class="field">' +
                    '<label for="reg-phone">Mobile Phone *</label>' +
                    '<div class="input-wrap">' +
                      RH.icon('phone', 'icon-sm') +
                      '<input type="tel" id="reg-phone" class="input" placeholder="+95 9 798 123 456" value="+95 9 798 123 456" required>' +
                    '</div>' +
                  '</div>' +
                '</div>' +

                /* Email */
                '<div class="field">' +
                  '<label for="reg-email">Email Address *</label>' +
                  '<div class="input-wrap">' +
                    RH.icon('mail', 'icon-sm') +
                    '<input type="email" id="reg-email" class="input" placeholder="name@example.com" value="phyo.win@example.com" required>' +
                  '</div>' +
                '</div>' +

                /* Password & Confirm */
                '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;" class="reg-grid-row">' +
                  '<div class="field">' +
                    '<label for="reg-pass">Password *</label>' +
                    '<div class="input-wrap has-pwd-toggle">' +
                      RH.icon('lock', 'icon-sm') +
                      '<input type="password" id="reg-pass" class="input" placeholder="Minimum 6 chars" value="reserve12345" required minlength="6">' +
                      '<button type="button" class="pwd-toggle-btn" data-pwd-toggle="reg-pass" aria-label="Show password" title="Show password">' +
                        RH.icon('eye', 'icon-sm') +
                      '</button>' +
                    '</div>' +
                  '</div>' +
                  '<div class="field">' +
                    '<label for="reg-pass2">Confirm Password *</label>' +
                    '<div class="input-wrap has-pwd-toggle">' +
                      RH.icon('lock', 'icon-sm') +
                      '<input type="password" id="reg-pass2" class="input" placeholder="Repeat password" value="reserve12345" required minlength="6">' +
                      '<button type="button" class="pwd-toggle-btn" data-pwd-toggle="reg-pass2" aria-label="Show password" title="Show password">' +
                        RH.icon('eye', 'icon-sm') +
                      '</button>' +
                    '</div>' +
                  '</div>' +
                '</div>' +

                /* City Location */
                '<div class="field">' +
                  '<label for="reg-city">Primary Dining City</label>' +
                  '<div class="input-wrap">' +
                    RH.icon('map-pin', 'icon-sm') +
                    '<select id="reg-city" class="select">' +
                      '<option value="Yangon" selected>Yangon, Myanmar (Bahan, Dagon, Inya Lake, Downtown)</option>' +
                      '<option value="Mandalay">Mandalay, Myanmar</option>' +
                      '<option value="Bagan">Bagan & Inle Lake</option>' +
                      '<option value="Naypyidaw">Naypyidaw</option>' +
                    '</select>' +
                  '</div>' +
                '</div>' +

                /* Dining Preferences */
                '<div class="field" style="margin-top:2px;">' +
                  '<label style="display:flex;justify-content:space-between;align-items:center;">' +
                    '<span>Favorite Dining Styles (Optional)</span>' +
                    '<span class="micro t-muted">Select all that apply</span>' +
                  '</label>' +
                  '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;" id="cuisine-chips">' +
                    CUISINES_PREFS.map(function (c) {
                      var active = selectedCuisines.indexOf(c.id) !== -1;
                      return '<button type="button" class="diet-chip' + (active ? ' is-active' : '') + '" data-cuisine="' + c.id + '">' +
                        (active ? '✓ ' : '+ ') + c.label +
                      '</button>';
                    }).join('') +
                  '</div>' +
                '</div>' +

                /* Dietary Restrictions */
                '<div class="field">' +
                  '<label>Default Dietary Preferences</label>' +
                  '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;" id="diet-chips">' +
                    DIETARY_PREFS.map(function (d) {
                      var active = selectedDiets.indexOf(d) !== -1;
                      return '<button type="button" class="diet-chip' + (active ? ' is-active' : '') + '" data-diet="' + d + '">' +
                        (active ? '✓ ' : '+ ') + d +
                      '</button>';
                    }).join('') +
                  '</div>' +
                '</div>' +

                /* Terms Agreement */
                '<div class="auth-terms" style="margin-top:4px;">' +
                  '<label style="display:flex;align-items:flex-start;gap:8px;font-size:12px;color:var(--text-muted);cursor:pointer;">' +
                    '<input type="checkbox" id="reg-terms" checked required style="margin-top:2px;">' +
                    '<span>I accept the <a href="#" class="t-burgundy bold" id="link-terms">ReserveHub Terms of Service</a> and acknowledge the dining reservation policies.</span>' +
                  '</label>' +
                '</div>' +

                /* Submit Button */
                '<button type="submit" class="btn btn-primary auth-submit-btn" style="margin-top:6px;">' +
                  'Complete VIP Registration ' + RH.icon('arrow-right', 'icon-sm') +
                '</button>' +

              '</form>' +

              /* Sign in link */
              '<div class="auth-card-foot">' +
                '<span>Already have a member account? </span>' +
                '<button type="button" class="auth-switch-link" id="link-signin">Sign in here</button>' +
              '</div>' +

            '</div>' +

            /* Perks Highlights */
            '<div class="auth-benefits" style="margin-top:20px;">' +
              '<div class="auth-benefit-item">' +
                RH.icon('shield-check', 'icon-sm') +
                '<span>Instant Table Guarantee</span>' +
              '</div>' +
              '<div class="auth-benefit-item">' +
                RH.icon('gift', 'icon-sm') +
                '<span>Welcome Dining Pass</span>' +
              '</div>' +
              '<div class="auth-benefit-item">' +
                RH.icon('heart', 'icon-sm') +
                '<span>Unlimited Wishlists</span>' +
              '</div>' +
            '</div>' +

          '</div>';

        bindEvents();
      }

      function bindEvents() {
        var form = document.getElementById('reg-form');
        var linkSignin = document.getElementById('link-signin');
        var googleBtn = document.getElementById('reg-google');
        var appleBtn = document.getElementById('reg-apple');
        var termsLink = document.getElementById('link-terms');

        if (linkSignin) {
          linkSignin.addEventListener('click', function () {
            RH.router.navigate('U10');
          });
        }

        if (termsLink) {
          termsLink.addEventListener('click', function (e) {
            e.preventDefault();
            RH.openModal(
              '<div class="modal-head">' +
                '<div>' +
                  '<span class="badge">' + RH.icon('shield-check', 'icon-sm') + 'Policies</span>' +
                  '<h3 style="margin-top:6px;">ReserveHub Member Terms</h3>' +
                '</div>' +
                '<button class="modal-close" data-modal-close aria-label="Close">' + RH.icon('x') + '</button>' +
              '</div>' +
              '<div class="modal-body" style="font-size:13px;line-height:1.6;color:#475569;display:grid;gap:12px;">' +
                '<p><strong>1. Guaranteed Seating:</strong> All bookings confirmed through ReserveHub provide direct table allocation at our partner restaurants in Yangon and throughout Myanmar.</p>' +
                '<p><strong>2. Cancellations & Rescheduling:</strong> Free table reschedule and cancellation are supported up to 2 hours prior to scheduled dining time.</p>' +
                '<p><strong>3. Concierge & Privacy:</strong> Your contact information is only transmitted to the Maître d\' of the booked restaurant for greeting and kitchen preparations.</p>' +
              '</div>' +
              '<div class="modal-foot">' +
                '<button class="btn btn-primary" data-modal-close>Understood</button>' +
              '</div>'
            );
          });
        }

        /* Toggle cuisine tags */
        var cWrap = document.getElementById('cuisine-chips');
        if (cWrap) {
          cWrap.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-cuisine]');
            if (!btn) return;
            var cid = btn.getAttribute('data-cuisine');
            var idx = selectedCuisines.indexOf(cid);
            if (idx === -1) {
              selectedCuisines.push(cid);
              btn.classList.add('is-active');
              btn.textContent = '✓ ' + btn.textContent.replace(/^(\+ |✓ )/, '');
            } else {
              selectedCuisines.splice(idx, 1);
              btn.classList.remove('is-active');
              btn.textContent = '+ ' + btn.textContent.replace(/^(\+ |✓ )/, '');
            }
          });
        }

        /* Toggle diet tags */
        var dWrap = document.getElementById('diet-chips');
        if (dWrap) {
          dWrap.addEventListener('click', function (e) {
            var btn2 = e.target.closest('[data-diet]');
            if (!btn2) return;
            var did = btn2.getAttribute('data-diet');
            if (did === 'None / All') {
              selectedDiets = ['None / All'];
              dWrap.querySelectorAll('[data-diet]').forEach(function (el) {
                el.classList.remove('is-active');
                el.textContent = '+ ' + el.textContent.replace(/^(\+ |✓ )/, '');
              });
              btn2.classList.add('is-active');
              btn2.textContent = '✓ None / All';
              return;
            }
            var noneBtn = dWrap.querySelector('[data-diet="None / All"]');
            if (noneBtn) {
              noneBtn.classList.remove('is-active');
              noneBtn.textContent = '+ None / All';
            }
            var noneIdx = selectedDiets.indexOf('None / All');
            if (noneIdx !== -1) selectedDiets.splice(noneIdx, 1);

            var idx2 = selectedDiets.indexOf(did);
            if (idx2 === -1) {
              selectedDiets.push(did);
              btn2.classList.add('is-active');
              btn2.textContent = '✓ ' + btn2.textContent.replace(/^(\+ |✓ )/, '');
            } else {
              selectedDiets.splice(idx2, 1);
              btn2.classList.remove('is-active');
              btn2.textContent = '+ ' + btn2.textContent.replace(/^(\+ |✓ )/, '');
            }
          });
        }

        if (googleBtn) {
          googleBtn.addEventListener('click', function () {
            RH.toast('Welcome to ReserveHub, Phyo Win! (Connected via Google)');
            RH.router.navigate('U08');
          });
        }

        if (appleBtn) {
          appleBtn.addEventListener('click', function () {
            RH.toast('Welcome to ReserveHub, Phyo Win! (Connected via Apple)');
            RH.router.navigate('U08');
          });
        }

        if (form) {
          form.addEventListener('submit', function (e) {
            e.preventDefault();
            var pass = document.getElementById('reg-pass').value;
            var pass2 = document.getElementById('reg-pass2').value;
            if (pass !== pass2) {
              RH.toast('Passwords do not match. Please verify.', 'error');
              return;
            }
            var name = document.getElementById('reg-name').value;
            var email = document.getElementById('reg-email').value;

            RH.toast('VIP Account created for ' + name + ' (' + email + ')! Welcome to ReserveHub.');
            RH.router.navigate('U08');
          });
        }
      }

      render();
    }
  });
})(window.RH = window.RH || {});
