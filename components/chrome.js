/* ReserveHub — shared chrome: navbar, bottom tabs, footer, venue card */
(function (RH) {
  'use strict';

  /* ---------------- Venue card (U01 popular + U02 results) ---------------- */
  RH.venueCard = function (v, opts) {
    opts = opts || {};
    var fav = RH.store.get('favorites').indexOf(v.id) !== -1;
    var slots = (opts.showDistance ? '<span class="vc-dist">' + RH.icon('map-pin', 'icon-sm') + v.distanceKm + ' km away</span>' : '');
    var slotChips = v.slots.slice(0, 3).map(function (s) {
      return '<span class="slot-chip">' + RH.icon('clock', 'icon-sm') + s + '</span>';
    }).join('');
    var extraSlots = !opts.showDistance && v.slots.length > 3
      ? '<span class="badge" style="letter-spacing:0;">+' + (v.slots.length - 3) + '</span>' : '';
    return (
      '<article class="venue-card card-hover">' +
        '<div class="vc-media">' +
          '<img src="' + v.image + '" alt="' + v.name + '" loading="lazy" data-img-fallback="' + v.name + '">' +
          '<span class="vc-cat">' + v.category + '</span>' + slots +
          '<button class="vc-fav' + (fav ? ' is-fav' : '') + '" data-fav="' + v.id + '" aria-label="Toggle favorite for ' + v.name + '">' +
            RH.icon('heart', 'icon', { filled: fav }) +
          '</button>' +
        '</div>' +
        '<div class="vc-body">' +
          '<div>' +
            '<h3 class="clamp1"><a class="vc-title" href="#/U03" data-open-venue="' + v.id + '">' + v.name + '</a></h3>' +
            '<p style="display:flex;align-items:center;gap:6px;margin-top:6px;font-size:12px;color:#64748b;">' +
              '<span class="rating-pill">' + RH.icon('star') + v.rating + '</span>' +
              '<span>· ' + v.reviewsCount + ' reviews</span>' +
            '</p>' +
            (opts.showLocation !== false
              ? '<p class="vc-meta clamp1" style="margin-top:4px;">' + RH.icon('map-pin') + v.location + '</p>'
              : '') +
          '</div>' +
          '<div class="vc-slots">' + slotChips + extraSlots + '</div>' +
          '<div class="vc-foot">' +
            '<div><span class="vc-price-label">' + (opts.priceLabel || 'Base Price') + '</span>' +
            '<span class="vc-price">$' + v.basePrice + ' <small>/ visit</small></span></div>' +
            '<button class="btn btn-primary btn-sm" data-open-venue="' + v.id + '">Book Now</button>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  };

  /* ---------------- Navbar (desktop header + mobile drawer) ---------------- */
  RH.renderNavbar = function () {
    var st = RH.store;
    var view = st.get('view');
    var unreadNotifications = RH.store.get('unreadNotifications') || 0;
    var bookingsCount = st.get('bookings').filter(function (b) {
      return b.status === 'Confirmed' || b.status === 'Pending';
    }).length;

    var link = function (label, target, iconName, count) {
      var active = view === target;
      return (
        '<button class="nav-link' + (active ? ' is-active' : '') + '" data-nav="' + target + '">' +
          RH.icon(iconName, 'icon') + '<span>' + label + '</span>' +
          (count > 0 ? '<span class="nav-count">' + count + '</span>' : '') +
        '</button>'
      );
    };

    var el = document.getElementById('navbar');
    el.innerHTML =
      '<div class="announce-bar"><span style="display:inline-flex;align-items:center;gap:6px;vertical-align:middle;color:var(--gold);font-weight:700;">' + RH.icon('sparkles', 'icon-sm') + 'Special Dining Privilege:</span>&nbsp;Get 20% off lunch bookings across Yangon &amp; Mandalay with code <strong class="t-gold">LUNCH20</strong></div>' +
      '<div class="container"><div class="header-main">' +
        '<button class="brand" data-nav="U01" aria-label="ReserveHub home">' +
          '<span class="brand-logo"><span>R</span></span>' +
          '<span><span class="brand-name">Reserve<em>Hub</em></span><span class="brand-sub">CONCIERGE BOOKINGS</span></span>' +
        '</button>' +
        '<div class="header-search"><button data-nav="U02">' +
          '<span style="display:inline-flex;align-items:center;gap:8px;">' + RH.icon('search', 'icon-sm') + 'Search restaurants, cuisine, suites…</span>' +
          '<span class="kbd-hint">⌘K</span>' +
        '</button></div>' +
        '<nav class="nav-links">' +
          link('Explore', 'U02', 'compass', 0) +
          link('My Bookings', 'U08', 'calendar', bookingsCount) +
          '<button class="icon-btn" data-notifications title="Notifications" aria-label="Notifications">' +
            RH.icon('bell', 'icon-lg') + (unreadNotifications > 0 ? '<span class="nav-count">' + unreadNotifications + '</span>' : '') +
          '</button>' +
          '<button class="profile-chip' + (view === 'U10' ? ' is-active' : '') + '" data-nav="U10">' +
            '<span class="avatar-circle">P</span> Phyo Win' +
          '</button>' +
        '</nav>' +
        '<div class="mobile-actions">' +
          '<button class="icon-btn" data-nav="U02" aria-label="Search">' + RH.icon('search', 'icon-lg') + '</button>' +
          '<button class="icon-btn" data-notifications aria-label="Notifications">' +
            RH.icon('bell', 'icon-lg') + (unreadNotifications > 0 ? '<span class="nav-count">' + unreadNotifications + '</span>' : '') +
          '</button>' +
        '</div>' +
      '</div></div>';
  };

  /* ---------------- Bottom tab bar ---------------- */
  RH.renderBottomTabs = function () {
    var view = RH.store.get('view');
    var bookingsCount = RH.store.get('bookings').filter(function (b) {
      return b.status === 'Confirmed' || b.status === 'Pending';
    }).length;

    var tab = function (target, label, iconName, badge, alsoActive) {
      var active = view === target || alsoActive === true;
      return (
        '<button class="tab' + (active ? ' is-active' : '') + '" data-nav="' + target + '" aria-label="' + label + '">' +
          '<span class="' + (badge ? 'tab-badge-wrap' : '') + '">' + RH.icon(iconName, '', {}) +
          (badge ? '<span class="tab-badge">' + badge + '</span>' : '') + '</span>' +
          '<span>' + label + '</span>' +
        '</button>'
      );
    };

    document.getElementById('bottom-tabs').innerHTML =
      '<div class="tabs-inner">' +
        tab('U01', 'Home', 'home', 0) +
        tab('U02', 'Explore', 'compass', 0, view === 'U03' || view === 'U04' || view === 'U05' || view === 'U06' || view === 'U07') +
        tab('U08', 'Bookings', 'calendar', bookingsCount > 0 ? bookingsCount : null, view === 'U09') +
        tab('U10', 'Profile', 'user', 0) +
      '</div>';
  };

  /* ---------------- Footer ---------------- */
  RH.renderFooter = function () {
    var el = document.getElementById('footer');
    el.innerHTML =
      '<div class="site-footer"><div class="container">' +
        '<div class="footer-grid">' +
          '<div>' +
            '<div class="footer-brand-row"><span class="footer-mark">R</span>' +
              '<span class="brand-name" style="color:#fff;">Reserve<em style="color:var(--gold);">Hub</em></span></div>' +
            '<p style="line-height:1.6;max-width:380px;">The premier reservation and venue concierge for fine dining, luxury event halls, private boardrooms, and curated culinary experiences.</p>' +
            '<p class="footer-note">' + RH.icon('shield-check') + '<span>100% Instant Confirmation &amp; Verified Partner Venues</span></p>' +
          '</div>' +
          '<div class="footer-col"><h3>Explore</h3><ul>' +
            '<li><button data-cat-nav="Restaurants">Fine Dining &amp; Restaurants</button></li>' +
            '<li><button data-cat-nav="Event Venues">Weddings &amp; Event Halls</button></li>' +
            '<li><button data-cat-nav="Meeting Rooms">Executive Boardrooms</button></li>' +
            '<li><button data-cat-nav="Promotions">Special Deals &amp; Discounts</button></li>' +
          '</ul></div>' +
          '<div class="footer-col"><h3>Reservations</h3><ul>' +
            '<li><button data-nav="U08">My Active Bookings</button></li>' +
            '<li><button data-nav="U10">Member Profile</button></li>' +
            '<li><span style="color:#94A3B8;cursor:default;">Venue Partner Portal</span></li>' +
          '</ul></div>' +
          '<div class="footer-col"><h3>Concierge</h3><div class="footer-contact">' +
            '<p>' + RH.icon('phone') + '+959 123 456 789</p>' +
            '<p>' + RH.icon('mail') + 'concierge@reservehub.com</p>' +
            '<p>' + RH.icon('map-pin') + 'Yangon, Myanmar</p>' +
            '<p class="micro" style="color:#94A3B8;">Hours: 08:30 AM – 10:00 PM Daily</p>' +
          '</div></div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span>© 2026 ReserveHub Prototype · Offline clickable front-end demo — no real reservations are made.</span>' +
          '<span>Terms of Service · Privacy Policy</span>' +
        '</div>' +
      '</div></div>';
  };
})(window.RH = window.RH || {});
