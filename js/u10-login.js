/* ReserveHub — U10 · Member Login & Access */
(function (RH) {
  'use strict';

  RH.registerScreen('U10', {
    title: 'Member Login',
    render: function (root, params) {
      var isSignUp = params && params.mode === 'signup';
      var authMode = isSignUp ? 'signup' : 'login';

      function renderContent() {
        root.innerHTML =
          '<div class="page auth-page anim-up" style="max-width:480px;margin:30px auto 60px;padding:0 16px;">' +
            '<div class="auth-card">' +
              
              /* Brand Badge & Header */
              '<div class="auth-header">' +
                '<div class="auth-logo-badge">' +
                  '<span class="auth-logo-mark">R</span>' +
                '</div>' +
                '<h1 class="auth-title">' + (authMode === 'login' ? 'Welcome Back' : 'Create an Account') + '</h1>' +
                '<p class="auth-subtitle">' + 
                  (authMode === 'login' 
                    ? 'Access your saved reservations, VIP concierge tables, and curated culinary experiences.' 
                    : 'Join ReserveHub to unlock exclusive table allocations, chef tables, and special pricing.') + 
                '</p>' +
              '</div>' +

              /* Mode Switcher Tabs */
              '<div class="auth-tabs">' +
                '<button type="button" class="auth-tab' + (authMode === 'login' ? ' is-active' : '') + '" id="tab-login">' +
                  'Sign In' +
                '</button>' +
                '<button type="button" class="auth-tab' + (authMode === 'signup' ? ' is-active' : '') + '" id="tab-signup">' +
                  'New Member' +
                '</button>' +
              '</div>' +

              /* Quick Social Sign-In Buttons */
              '<div class="auth-social-buttons">' +
                '<button type="button" class="auth-social-btn" id="btn-google">' +
                  '<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.3l3.7 2.9C6.2 7.2 8.9 5 12 5z"/><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/><path fill="#FBBC05" d="M5.3 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.6 7.3C.6 9.3 0 11.6 0 14s.6 4.7 1.6 6.7l3.7-2.9z"/><path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.2-6.7-5.2L1.6 16c1.9 3.7 5.8 7 10.4 7z"/></svg>' +
                  '<span>Continue with Google</span>' +
                '</button>' +
                '<button type="button" class="auth-social-btn" id="btn-apple">' +
                  '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.87c.66-.82 1.1-1.95.98-3.08-1.02.04-2.24.68-2.97 1.53-.63.73-1.17 1.89-1.03 3 .12.01.24.02.37.02 1 0 2.01-.64 2.65-1.47z"/></svg>' +
                  '<span>Continue with Apple</span>' +
                '</button>' +
              '</div>' +

              /* Divider */
              '<div class="auth-divider">' +
                '<span>or with email</span>' +
              '</div>' +

              /* Form */
              '<form class="auth-form" id="auth-form">' +
                (authMode === 'signup'
                  ? '<div class="field">' +
                      '<label for="auth-name">Full Name</label>' +
                      '<div class="input-wrap">' +
                        RH.icon('user', 'icon-sm') +
                        '<input type="text" id="auth-name" class="input" placeholder="e.g. Phyo Win" value="Phyo Win" required>' +
                      '</div>' +
                    '</div>'
                  : '') +

                '<div class="field">' +
                  '<label for="auth-email">Email Address</label>' +
                  '<div class="input-wrap">' +
                    RH.icon('mail', 'icon-sm') +
                    '<input type="email" id="auth-email" class="input" placeholder="name@example.com" value="phyo.win@example.com" required>' +
                  '</div>' +
                '</div>' +

                '<div class="field">' +
                  '<div style="display:flex;justify-content:space-between;align-items:center;">' +
                    '<label for="auth-pass" style="margin-bottom:0;">Password</label>' +
                    (authMode === 'login'
                      ? '<button type="button" class="auth-forgot-link" id="btn-forgot">Forgot password?</button>'
                      : '') +
                  '</div>' +
                  '<div class="input-wrap has-pwd-toggle" style="margin-top:6px;">' +
                    RH.icon('lock', 'icon-sm') +
                    '<input type="password" id="auth-pass" class="input" placeholder="••••••••••••" value="reserve12345" required>' +
                    '<button type="button" class="pwd-toggle-btn" data-pwd-toggle="auth-pass" aria-label="Show password" title="Show password">' +
                      RH.icon('eye', 'icon-sm') +
                    '</button>' +
                  '</div>' +
                '</div>' +

                (authMode === 'signup'
                  ? '<div class="auth-terms">' +
                      '<label style="display:flex;align-items:flex-start;gap:8px;font-size:12px;color:var(--text-muted);cursor:pointer;">' +
                        '<input type="checkbox" checked style="margin-top:2px;" required>' +
                        '<span>I agree to ReserveHub\'s <a href="#" class="t-burgundy" data-terms>Terms of Concierge</a> and <a href="#" class="t-burgundy" data-privacy>Privacy Policy</a>.</span>' +
                      '</label>' +
                    '</div>'
                  : '<div class="auth-remember">' +
                      '<label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--text-muted);cursor:pointer;">' +
                        '<input type="checkbox" checked>' +
                        '<span>Keep me signed in on this device</span>' +
                      '</label>' +
                    '</div>') +

                '<button type="submit" class="btn btn-primary auth-submit-btn">' +
                  (authMode === 'login' ? 'Sign In to ReserveHub' : 'Create Member Account') +
                  ' ' + RH.icon('arrow-right', 'icon-sm') +
                '</button>' +
              '</form>' +

              /* Switch mode footer */
              '<div class="auth-card-foot">' +
                (authMode === 'login'
                  ? '<span>Don\'t have an account yet? </span><button type="button" class="auth-switch-link" id="switch-signup">Sign up for free</button>'
                  : '<span>Already have an account? </span><button type="button" class="auth-switch-link" id="switch-login">Sign in</button>') +
              '</div>' +

            '</div>' +

            /* Benefits Footer */
            '<div class="auth-benefits">' +
              '<div class="auth-benefit-item">' +
                RH.icon('shield-check', 'icon-sm') +
                '<span>100% Guaranteed Seating</span>' +
              '</div>' +
              '<div class="auth-benefit-item">' +
                RH.icon('sparkles', 'icon-sm') +
                '<span>Exclusive VIP Allocation</span>' +
              '</div>' +
              '<div class="auth-benefit-item">' +
                RH.icon('clock', 'icon-sm') +
                '<span>Instant Table Confirmation</span>' +
              '</div>' +
            '</div>' +
          '</div>';

        bindEvents();
      }

      function bindEvents() {
        var tabLogin = document.getElementById('tab-login');
        var tabSignup = document.getElementById('tab-signup');
        var switchSignup = document.getElementById('switch-signup');
        var switchLogin = document.getElementById('switch-login');
        var forgotBtn = document.getElementById('btn-forgot');
        var form = document.getElementById('auth-form');
        var googleBtn = document.getElementById('btn-google');
        var appleBtn = document.getElementById('btn-apple');

        if (tabLogin) tabLogin.addEventListener('click', function () { authMode = 'login'; renderContent(); });
        if (tabSignup) tabSignup.addEventListener('click', function () { RH.router.navigate('U11'); });
        if (switchSignup) switchSignup.addEventListener('click', function () { RH.router.navigate('U11'); });
        if (switchLogin) switchLogin.addEventListener('click', function () { authMode = 'login'; renderContent(); });

        if (forgotBtn) {
          forgotBtn.addEventListener('click', function () {
            RH.openModal(
              '<div class="modal-head">' +
                '<div>' +
                  '<span class="badge">' + RH.icon('lock', 'icon-sm') + 'Account Recovery</span>' +
                  '<h3 style="margin-top:6px;">Reset Your Password</h3>' +
                '</div>' +
                '<button class="modal-close" data-modal-close aria-label="Close">' + RH.icon('x') + '</button>' +
              '</div>' +
              '<form class="modal-body" id="forgot-form" style="display:grid;gap:12px;">' +
                '<p class="small t-muted">Enter your registered email address and we\'ll send you instructions to reset your password.</p>' +
                '<div class="field">' +
                  '<label>Email Address</label>' +
                  '<input type="email" class="input" id="forgot-email" value="phyo.win@example.com" required>' +
                '</div>' +
                '<div class="modal-foot" style="padding-inline:0;margin-top:8px;">' +
                  '<button type="button" class="btn btn-ghost" data-modal-close>Cancel</button>' +
                  '<button type="submit" class="btn btn-primary">Send Reset Link</button>' +
                '</div>' +
              '</form>'
            );
            var fForm = document.getElementById('forgot-form');
            if (fForm) {
              fForm.addEventListener('submit', function (ev) {
                ev.preventDefault();
                var email = document.getElementById('forgot-email').value;
                if (RH._activeModalClose) RH._activeModalClose();
                RH.toast('Password reset link dispatched to ' + email);
              });
            }
          });
        }

        if (googleBtn) {
          googleBtn.addEventListener('click', function () {
            RH.toast('Welcome back, Phyo Win! (Signed in with Google)');
            RH.router.navigate('U08');
          });
        }

        if (appleBtn) {
          appleBtn.addEventListener('click', function () {
            RH.toast('Welcome back, Phyo Win! (Signed in with Apple)');
            RH.router.navigate('U08');
          });
        }

        if (form) {
          form.addEventListener('submit', function (e) {
            e.preventDefault();
            var email = document.getElementById('auth-email').value;
            if (authMode === 'login') {
              RH.toast('Welcome back! Signed in as ' + email);
            } else {
              var name = document.getElementById('auth-name') ? document.getElementById('auth-name').value : 'Member';
              RH.toast('Welcome to ReserveHub, ' + name + '! Account created successfully.');
            }
            RH.router.navigate('U08');
          });
        }
      }

      renderContent();
    }
  });
})(window.RH = window.RH || {});
