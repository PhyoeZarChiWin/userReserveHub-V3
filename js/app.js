/* ReserveHub — application bootstrap, global actions & event delegation */
(function (RH) {
  'use strict';

  /* ---------------- initial state ---------------- */
  RH.store.init({
    view: 'U01',
    params: {},
    venues: RH.VENUES,
    bookings: RH.BOOKINGS,
    favorites: ['lakeview-terrace', 'sakura-garden'],
    unreadNotifications: 2,
    selectedVenueId: RH.VENUES[0].id,
    selectedBookingId: null,
    latestBookingId: RH.BOOKINGS[0].id,
    searchQuery: '',
    selectedCategory: 'All',
    draft: {
      venueId: RH.VENUES[0].id,
      date: '2026-08-25',
      time: '07:30 PM',
      guests: 2,
      packageId: 'pkg-standard',
      applyPromo: true
    }
  });

  /* ---------------- shared helpers ---------------- */
  RH.utils = {
    findVenue: function (id) {
      if (!id) return null;
      return RH.store.get('venues').filter(function (v) { return v.id === id; })[0] || null;
    }
  };

  /** Select a venue and reset the booking draft defaults (mirrors React behavior). */
  RH.openVenue = function (venueId, dest) {
    var v = RH.utils.findVenue(venueId);
    if (!v) { RH.router.navigate('U02'); return; }
    var draft = RH.store.get('draft');
    RH.store.patch({
      selectedVenueId: venueId,
      draft: Object.assign({}, draft, {
        venueId: venueId,
        time: (v.slots[0] || '07:00 PM'),
        packageId: (v.packages[0] ? v.packages[0].id : 'pkg-standard')
      })
    });
    RH.router.navigate(dest || 'U03');
  };

  /** Jump to U02 with a category + optional keyword filter. */
  RH.goExplore = function (category, query) {
    RH.store.patch({
      selectedCategory: category || 'All',
      searchQuery: query || ''
    });
    RH.router.navigate('U02');
  };

  /** Toggle favorite; preserves scroll while refreshing hearts & badges. */
  RH.toggleFavorite = function (venueId) {
    var st = RH.store;
    var venue = RH.utils.findVenue(venueId);
    var favs = st.get('favorites').slice();
    var idx = favs.indexOf(venueId);
    if (idx === -1) {
      favs.push(venueId);
      RH.toast('Saved ' + (venue ? venue.name : 'venue') + ' to favorites!');
    } else {
      favs.splice(idx, 1);
      RH.toast('Removed ' + (venue ? venue.name : 'venue') + ' from saved favorites');
    }
    st.patch({ favorites: favs });

    /* Refresh heart buttons in-place without a full re-render */
    document.querySelectorAll('[data-fav="' + venueId + '"]').forEach(function (btn) {
      var isFav = favs.indexOf(venueId) !== -1;
      btn.classList.toggle('is-fav', isFav && btn.classList.contains('vc-fav'));
      btn.innerHTML = RH.icon('heart', '', { filled: isFav });
    });
    RH.renderNavbar();
    RH.renderBottomTabs();
  };

  /* ---------------- global event delegation ---------------- */
  document.addEventListener('click', function (e) {
    var el;

    if ((el = e.target.closest('[data-nav]'))) {
      e.preventDefault();
      RH.router.navigate(el.getAttribute('data-nav'));
      return;
    }
    if ((el = e.target.closest('[data-nav-back]'))) {
      e.preventDefault();
      RH.router.navigate(el.getAttribute('data-nav-back'));
      return;
    }
    if ((el = e.target.closest('[data-fav]'))) {
      e.preventDefault();
      RH.toggleFavorite(el.getAttribute('data-fav'));
      return;
    }
    if ((el = e.target.closest('[data-open-venue]'))) {
      e.preventDefault();
      RH.openVenue(el.getAttribute('data-open-venue'), 'U03');
      return;
    }
    if ((el = e.target.closest('[data-cat-nav]'))) {
      e.preventDefault();
      RH.goExplore(el.getAttribute('data-cat-nav'));
      return;
    }
    if ((el = e.target.closest('[data-pwa-install]'))) {
      e.preventDefault();
      RH.promptPWAInstall();
      return;
    }
    if ((el = e.target.closest('[data-open-bookings-modal]'))) {
      e.preventDefault();
      RH.openBookingsModal();
      return;
    }
    if ((el = e.target.closest('[data-notifications]'))) {
      e.preventDefault();
      RH.openNotificationsModal();
      return;
    }
    if ((el = e.target.closest('[data-pwd-toggle]'))) {
      e.preventDefault();
      var targetId = el.getAttribute('data-pwd-toggle');
      var wrap = el.closest('.input-wrap');
      var input = targetId ? document.getElementById(targetId) : (wrap ? wrap.querySelector('input') : null);
      if (input) {
        var isPassword = input.getAttribute('type') === 'password';
        input.setAttribute('type', isPassword ? 'text' : 'password');
        el.classList.toggle('is-active', isPassword);
        el.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
        el.setAttribute('title', isPassword ? 'Hide password' : 'Show password');
        el.innerHTML = RH.icon(isPassword ? 'eye-off' : 'eye', 'icon-sm');
      }
      return;
    }

    /* horizontal scroller arrows */
    var leftBtn = e.target.closest('[data-scroll-left]');
    var rightBtn = e.target.closest('[data-scroll-right]');
    if (leftBtn || rightBtn) {
      var sel = leftBtn ? leftBtn.getAttribute('data-scroll-left') : rightBtn.getAttribute('data-scroll-right');
      var target = document.querySelector(sel);
      if (target) {
        target.scrollBy({ left: (leftBtn ? -320 : 320), behavior: 'smooth' });
        e.stopPropagation();
      }
      return;
    }

    /* keyboard-accessible cards rendered as <div role="button"> */
    if ((el = e.target.closest('[role="button"][tabindex="0"]'))) {
      if (e.key === undefined) return; /* mouse clicks pass through to inner handlers */
    }
  });

  /* ⌘K / Ctrl+K → jump to Explore (parity with the React app) */
  window.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && String(e.key).toLowerCase() === 'k') {
      e.preventDefault();
      RH.router.navigate('U02');
    }
  });

  /* Offline-safe image fallback: swap any broken image for a generated SVG */
  document.addEventListener('error', function (e) {
    var img = e.target;
    if (img && img.tagName === 'IMG' && !img.dataset.fallbackApplied) {
      img.dataset.fallbackApplied = '1';
      var label = img.getAttribute('data-img-fallback') || img.alt || 'ReserveHub';
      img.src = RH.foodSvg(label, 'ReserveHub Venue', '#7A1F2B', '#5C141E', '🍽️');
    }
  }, true);

  /* ---------------- PWA Service Worker & Install Prompt ---------------- */
  RH.deferredInstallPrompt = null;
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js')
        .then(function (reg) {
          console.log('ReserveHub PWA: Service Worker registered successfully', reg.scope);
        })
        .catch(function (err) {
          console.warn('ReserveHub PWA: Service Worker registration failed', err);
        });
    });
  }

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    RH.deferredInstallPrompt = e;
    var installBtns = document.querySelectorAll('[data-pwa-install]');
    installBtns.forEach(function (btn) { btn.style.display = 'inline-flex'; });
  });

  RH.promptPWAInstall = function () {
    if (RH.deferredInstallPrompt) {
      RH.deferredInstallPrompt.prompt();
      RH.deferredInstallPrompt.userChoice.then(function (choice) {
        if (choice.outcome === 'accepted') {
          RH.toast('Thank you for installing ReserveHub!');
        }
        RH.deferredInstallPrompt = null;
      });
    } else {
      RH.toast('To install, tap the Share or Menu button in your browser and select "Add to Home Screen".');
    }
  };

  /* ---------------- boot ---------------- */
  document.addEventListener('DOMContentLoaded', function () {
    RH.renderFooter();
    RH.router.start();
  });
})(window.RH = window.RH || {});
