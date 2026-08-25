/* ReserveHub — lightweight observable state manager */
(function (RH) {
  'use strict';

  var state = {};
  var subscribers = [];

  RH.store = {
    /** Initialize (or merge-initialize) the state. */
    init: function (initial) {
      Object.keys(initial).forEach(function (k) { state[k] = initial[k]; });
    },
    /** Read a value. */
    get: function (key) { return state[key]; },
    /** Read the whole snapshot (read-only by convention). */
    all: function () { return state; },
    /** Merge-patch state and notify subscribers. */
    patch: function (partial) {
      Object.keys(partial).forEach(function (k) { state[k] = partial[k]; });
      subscribers.forEach(function (fn) { fn(state, partial); });
    },
    /** Subscribe to any state change; returns unsubscribe fn. */
    subscribe: function (fn) {
      subscribers.push(fn);
      return function () {
        var i = subscribers.indexOf(fn);
        if (i !== -1) subscribers.splice(i, 1);
      };
    }
  };
})(window.RH = window.RH || {});
