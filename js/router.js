/* ReserveHub — lightweight hash router (works over file://) */
(function (RH) {
  'use strict';

  var routes = {};
  var outlet = null;
  var suppressHash = false;
  var cleanupFns = [];

  /** Screen registration helper (used by each js/U0X_*.js file). */
  RH.registerScreen = function (id, def) { RH.router.register(id, def); };

  RH.router = {
    /** Register a screen: id -> { title, render(container, params) } */
    register: function (id, def) { routes[id] = def; },

    outletId: 'view',

    current: function () {
      var h = location.hash.replace(/^#\/?/, '');
      return routes[h] ? h : 'U01';
    },

    params: function () {
      /* per-navigation params live in store: params */
      return RH.store.get('params') || {};
    },

    /** Register a cleanup to run when the view unmounts (intervals etc.) */
    onCleanup: function (fn) { cleanupFns.push(fn); },

    runCleanups: function () {
      cleanupFns.forEach(function (fn) { try { fn(); } catch (e) { /* noop */ } });
      cleanupFns = [];
    },

    navigate: function (id, params) {
      if (!routes[id]) id = 'U01';
      RH.store.patch({ params: params || {} });
      /* Update the hash silently; rendering happens here synchronously so
         navigation never depends on the hashchange event firing. */
      if (('#/' + id) !== location.hash) {
        suppressHash = true;
        location.hash = '#/' + id;
      }
      this.render(id);
    },

    back: function () {
      if (history.length > 1) history.back();
      else RH.router.navigate('U01');
    },

    render: function (id) {
      if (!outlet) outlet = document.getElementById(this.outletId);
      if (!routes[id]) id = 'U01';
      RH.store.patch({ view: id });
      RH.router.runCleanups();
      var def = routes[id];
      outlet.innerHTML = '';
      def.render(outlet, RH.store.get('params') || {});
      document.title = 'ReserveHub — ' + def.title;
      RH.renderNavbar();
      RH.renderBottomTabs();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    start: function () {
      window.addEventListener('hashchange', function () {
        /* Back/forward navigation: render unless the hash change was ours */
        if (suppressHash) { suppressHash = false; return; }
        RH.router.render(RH.router.current());
      });
      var initial = RH.router.current();
      if (!location.hash) {
        suppressHash = true;
        location.hash = '#/' + initial;
      }
      RH.router.render(initial);
    }
  };
})(window.RH = window.RH || {});
