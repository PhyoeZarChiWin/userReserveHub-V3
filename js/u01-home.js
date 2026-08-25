/* ReserveHub — U01 · Top Page (Home)
   Polished, Elegant, Sophisticated, High-End Hospitality Design
*/
(function (RH) {
  'use strict';

  function countdownPaint(el) {
    if (!el) return;
    var now = new Date();
    var end = new Date(); end.setHours(23, 59, 59, 999);
    var diff = Math.max(0, end - now);
    var h = Math.floor(diff / 3600000), m = Math.floor(diff / 60000) % 60, s = Math.floor(diff / 1000) % 60;
    el.textContent =
      String(h).padStart(2, '0') + 'h : ' +
      String(m).padStart(2, '0') + 'm : ' +
      String(s).padStart(2, '0') + 's left';
  }

  RH.registerScreen('U01', {
    title: 'Discover & Reserve Fine Dining',
    render: function (root) {
      var store = RH.store;
      var venues = store.get('venues');
      var bookings = store.get('bookings');

      /* ---------------- markup ---------------- */
      root.innerHTML =
      '<div class="page">' +

        /* ===== HERO BILLBOARD ===== */
        '<section class="hero" id="u01-hero">' +
          '<div class="hero-inner">' +
            '<div class="hero-topbar">' +
              '<div class="hero-pill">' +
                '<span class="flame-ico">' + RH.icon('flame', 'icon-sm', { filled: true }) + '</span>' +
                '<b class="hp-label">Featured Privilege</b><span class="hp-sep">·</span>' +
                '<span id="spot-deal" class="truncate">20% Off Chef’s Sunset Tasting Menu</span>' +
              '</div>' +
              '<div class="hero-topbar-stats">' +
                '<span class="trust-pill">' + RH.icon('star', 'star') + '<b>4.9 / 5.0</b><span class="trust-sub">(8,600+ Reviews)</span></span>' +
                '<span class="trust-pill">' + RH.icon('trending-up', 'trend') + '<b>340+ Reserved Today</b></span>' +
              '</div>' +
            '</div>' +

            '<div class="hero-grid">' +
              '<div class="hero-intro">' +
                '<div class="hero-eyebrow">' +
                  RH.icon('sparkles', 'icon-sm') +
                  '<span>Michelin &amp; Heritage Selection</span>' +
                  '<i class="eyebrow-dot"></i>' +
                  '<span id="spot-tag">Romantic Waterfront</span>' +
                '</div>' +
                '<h1 class="hero-title">Reserve Myanmar’s <span class="grad">Finest Dining Experiences</span></h1>' +
                '<p class="hero-desc" id="spot-desc">Yangon’s premier culinary sanctuaries. Experience romantic sunset waterfront dining, master chef omakase counters, and authentic royal heritage feasts.</p>' +

                /* Quick Concierge Search Bar inside Hero */
                '<div class="hero-concierge-bar" id="hero-quick-search">' +
                  '<div class="hcb-col">' +
                    '<label class="hcb-label">' + RH.icon('calendar', 'icon-sm') + '<span>Date</span></label>' +
                    '<select class="hcb-select" id="hcb-date">' +
                      '<option value="today">Today (Dinner)</option>' +
                      '<option value="tomorrow">Tomorrow (Aug 26)</option>' +
                      '<option value="friday">This Friday</option>' +
                      '<option value="saturday">This Saturday</option>' +
                    '</select>' +
                  '</div>' +
                  '<div class="hcb-divider"></div>' +
                  '<div class="hcb-col">' +
                    '<label class="hcb-label">' + RH.icon('clock', 'icon-sm') + '<span>Time</span></label>' +
                    '<select class="hcb-select" id="hcb-time">' +
                      '<option value="07:00 PM">07:00 PM (Prime)</option>' +
                      '<option value="07:30 PM" selected>07:30 PM (Sunset)</option>' +
                      '<option value="08:00 PM">08:00 PM (Evening)</option>' +
                      '<option value="12:30 PM">12:30 PM (Lunch)</option>' +
                    '</select>' +
                  '</div>' +
                  '<div class="hcb-divider"></div>' +
                  '<div class="hcb-col">' +
                    '<label class="hcb-label">' + RH.icon('users', 'icon-sm') + '<span>Guests</span></label>' +
                    '<select class="hcb-select" id="hcb-guests">' +
                      '<option value="2" selected>2 Guests (Table)</option>' +
                      '<option value="4">4 Guests (Group)</option>' +
                      '<option value="6">6 Guests (Private)</option>' +
                      '<option value="1">1 Guest (Counter)</option>' +
                    '</select>' +
                  '</div>' +
                  '<div class="hcb-divider"></div>' +
                  '<div class="hcb-col">' +
                    '<label class="hcb-label">' + RH.icon('compass', 'icon-sm') + '<span>Experience</span></label>' +
                    '<select class="hcb-select" id="hcb-cat">' +
                      '<option value="All">All Fine Dining</option>' +
                      '<option value="French">Haute French</option>' +
                      '<option value="Japanese">Omakase &amp; Robata</option>' +
                      '<option value="Myanmar">Royal Myanmar</option>' +
                      '<option value="Italian">Italian Trattoria</option>' +
                      '<option value="Rooftop">Rooftop 360°</option>' +
                    '</select>' +
                  '</div>' +
                  '<button class="hcb-btn" id="hcb-submit-btn" aria-label="Find tables">' +
                    RH.icon('search', 'icon-sm') + '<span>Find Table</span>' +
                  '</button>' +
                '</div>' +

                '<div class="hero-actions">' +
                  '<button class="hero-btn-primary" id="hero-cta-explore">' + RH.icon('compass', 'icon-sm') + '<span>Explore All Venues</span></button>' +
                  '<button class="hero-btn-secondary" id="hero-cta-book">' + RH.icon('calendar', 'icon-sm') + '<span>Reserve Spotlight</span></button>' +
                '</div>' +
                '<div class="hero-social-proof">' +
                  '<span class="hsp-star">' + RH.icon('star', 'star') + ' 4.9</span>' +
                  '<span class="hsp-dot">·</span>' +
                  '<span>8,600+ Verified Diners</span>' +
                  '<span class="hsp-dot">·</span>' +
                  '<span class="hsp-booked">340+ Booked Today</span>' +
                '</div>' +
              '</div>' +

              '<aside class="spot-card">' +
                '<div class="spot-head">' +
                  '<span class="spot-label">' + RH.icon('sparkles', 'icon-sm') + '<span>Curated Spotlight (<span id="spot-idx">1</span>/<span>' + RH.SPOTLIGHT.length + '</span>)</span></span>' +
                  '<div class="spot-nav">' +
                    '<button class="scroll-arrow dark" id="spot-prev" aria-label="Previous featured venue">' + RH.icon('chevron-left', 'icon-sm') + '</button>' +
                    '<button class="scroll-arrow dark" id="spot-next" aria-label="Next featured venue">' + RH.icon('chevron-right', 'icon-sm') + '</button>' +
                  '</div>' +
                '</div>' +
                '<div class="spot-media" id="spot-card" role="button" tabindex="0" aria-label="View featured venue">' +
                  '<div class="spot-thumb-wrap">' +
                    '<img id="spot-img" src="" alt="Featured Venue">' +
                    '<span class="spot-badge" id="spot-badgechip">HOT DEAL</span>' +
                  '</div>' +
                  '<div class="spot-caption">' +
                    '<div class="spot-caption-main">' +
                      '<h3 id="spot-name"></h3>' +
                      '<p class="truncate" id="spot-cuisine"></p>' +
                    '</div>' +
                    '<span class="spot-rating">' + RH.icon('star', 'icon-sm') + '<span id="spot-rating">4.9</span></span>' +
                  '</div>' +
                '</div>' +
                '<div class="dots" id="spot-dots"></div>' +
              '</aside>' +
            '</div>' +

          '</div>' +
        '</section>' +

        /* ===== CURATED EXPERIENCES DISCOVERY PILLS ===== */
        '<section class="curated-pills-section">' +
          '<div class="hscroll curated-pills-row" id="curated-pills">' +
            '<button class="curated-pill is-active" data-curated-cat="All"><span>✨</span><b>All Fine Dining</b></button>' +
            '<button class="curated-pill" data-curated-cat="Romantic"><span>🌅</span><b>Romantic Waterfront</b></button>' +
            '<button class="curated-pill" data-curated-cat="Japanese"><span>🍣</span><b>Omakase Counter</b></button>' +
            '<button class="curated-pill" data-curated-cat="Myanmar"><span>🍲</span><b>Royal Myanmar Heritage</b></button>' +
            '<button class="curated-pill" data-curated-cat="French"><span>🍷</span><b>Haute Gastronomy</b></button>' +
            '<button class="curated-pill" data-curated-cat="Italian"><span>🍝</span><b>Artisanal Pasta</b></button>' +
            '<button class="curated-pill" data-curated-cat="Rooftop"><span>🍸</span><b>Skyline 360°</b></button>' +
            '<button class="curated-pill" data-curated-cat="Steakhouse"><span>🥩</span><b>Prime Steakhouses</b></button>' +
          '</div>' +
        '</section>' +

        /* ===== CHEF SIGNATURE DISHES ===== */
        '<section class="chef-dishes-section">' +
          '<div class="chef-dishes-head">' +
            '<div>' +
              '<h2 class="chef-dishes-title">' +
                RH.icon('chef-hat', 'icon-md') +
                '<span>Chef Signature Dishes</span>' +
              '</h2>' +
              '<p class="section-subtitle">Master culinary creations curated by Myanmar’s top executive chefs</p>' +
            '</div>' +
            '<div class="chef-dishes-arrows">' +
              '<button class="scroll-arrow" data-scroll-left="#dish-row" aria-label="Scroll dishes left">' + RH.icon('chevron-left', 'icon-sm') + '</button>' +
              '<button class="scroll-arrow" data-scroll-right="#dish-row" aria-label="Scroll dishes right">' + RH.icon('chevron-right', 'icon-sm') + '</button>' +
            '</div>' +
          '</div>' +
          '<div class="hscroll" id="dish-row" style="gap:14px;padding-bottom:6px;"></div>' +
        '</section>' +

        /* ===== MYANMAR SPECIALTIES ===== */
        '<section class="mm-section">' +
          '<div class="section-head u-wrap" style="align-items:flex-start;">' +
            '<div>' +
              '<h2 class="section-title black" style="display:flex;align-items:center;gap:10px;"><span style="font-size:26px;">🍲</span>Authentic Myanmar Royal Cuisines</h2>' +
              '<p class="section-subtitle">Centuries of heirloom recipes, artisanal salads, and slow-braised curries</p>' +
            '</div>' +
            '<button class="link-arrow" id="mm-see-all" style="white-space:nowrap;">See all Myanmar venues ' + RH.icon('chevron-right') + '</button>' +
          '</div>' +
          '<div class="hscroll" id="mm-tabs" style="padding:10px 0 14px;"></div>' +
          '<div class="mm-menu-grid" id="mm-list"></div>' +
        '</section>' +

        /* ===== POPULAR RESERVATIONS ===== */
        '<section class="stack" style="gap:16px;">' +
          '<div class="section-head">' +
            '<div>' +
              '<h2 class="section-title black">Most Reserved Tables</h2>' +
              '<p class="section-subtitle">Top-rated dining sanctuaries with guaranteed instant seat confirmation</p>' +
            '</div>' +
            '<button class="link-arrow" data-nav="U02">Explore all venues ' + RH.icon('chevron-right') + '</button>' +
          '</div>' +
          '<div class="grid-auto" id="popular-grid"></div>' +
        '</section>' +

        /* ===== HOT DEALS ===== */
        '<section class="stack" style="gap:14px;">' +
          '<div class="section-head u-wrap">' +
            '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">' +
              '<div>' +
                '<h2 class="section-title black" style="display:inline-flex;align-items:center;gap:8px;"><span style="font-size:22px;">🔥</span> Exclusive Dining Privileges</h2>' +
                '<p class="section-subtitle">Time-limited chef tasting discounts and sommelier complimentary pairings</p>' +
              '</div>' +
            '</div>' +
            '<div style="display:flex;align-items:center;gap:10px;">' +
              '<span class="badge countdown-badge">' +
                RH.icon('timer', 'icon-sm') + '<strong id="deal-countdown" style="font-variant-numeric:tabular-nums;margin-left:4px;">09h : 14m : 35s left</strong>' +
              '</span>' +
              '<button class="link-arrow" data-nav="U02">Explore all ' + RH.icon('chevron-right', 'icon-sm') + '</button>' +
            '</div>' +
          '</div>' +
          '<div id="deals-wrap">' +
            '<div>' +
              '<div class="card card-hover deal-feature" id="featured-deal">' +
                '<div class="deal-banner">' +
                  '<img src="' + RH.IMAGES.lopera + '" alt="La Bella Vista Lunch Special">' +
                  '<span class="deal-hot">' + RH.icon('flame', 'icon-sm', { filled: true }) + 'HOT PRIVILEGE • 20% OFF</span>' +
                  '<span class="deal-rating">★ 4.8</span>' +
                  '<div class="deal-banner-content">' +
                    '<small class="deal-banner-sub">Italian Fine Dining • Downtown Yangon</small>' +
                    '<h3 class="deal-banner-title">La Bella Vista Italian Trattoria</h3>' +
                  '</div>' +
                '</div>' +
                '<div class="deal-body">' +
                  '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">' +
                    '<h4 style="font-size:16px;font-weight:800;color:var(--ink);margin:0;">20% Off Weekday Lunch Reservations</h4>' +
                    '<span class="warn-chip">Weekdays 11:30 AM – 02:30 PM</span>' +
                  '</div>' +
                  '<p class="tiny t-muted clamp1" style="font-size:12.5px;color:var(--text-muted);margin:0;">Includes complimentary artisanal rosemary focaccia, truffle dipping oil &amp; Italian espresso.</p>' +
                  '<div class="deal-action-row">' +
                    '<button class="promo-code-btn" id="copy-lunch20" title="Click to copy voucher code">Code: <strong>LUNCH20</strong>' + RH.icon('copy', 'icon-sm') + '</button>' +
                    '<button class="btn btn-primary btn-sm deal-claim-btn" id="claim-lunch20">Claim Privilege ' + RH.icon('arrow-right', 'icon-sm') + '</button>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="stack" style="gap:12px;" id="mini-deals"></div>' +
          '</div>' +
        '</section>' +

        /* ===== UPCOMING EVENTS ===== */
        '<section class="stack" style="gap:12px;">' +
          '<div class="section-head u-wrap">' +
            '<div>' +
              '<h2 class="section-title black" style="display:inline-flex;align-items:center;gap:8px;">' +
                RH.icon('sparkles', 'icon-sm') + 'Special Dining Events &amp; Tastings' +
              '</h2>' +
              '<p class="section-subtitle">Sommelier wine dinners, master omakase counters, and sunset jazz galas</p>' +
            '</div>' +
            '<div style="display:flex;align-items:center;gap:6px;">' +
              '<button class="scroll-arrow" id="event-prev" aria-label="Previous event">' + RH.icon('chevron-left', 'icon-sm') + '</button>' +
              '<button class="scroll-arrow" id="event-next" aria-label="Next event">' + RH.icon('chevron-right', 'icon-sm') + '</button>' +
              '<button class="link-arrow" data-nav="U02">Explore all ' + RH.icon('chevron-right', 'icon-sm') + '</button>' +
            '</div>' +
          '</div>' +
          '<div class="event-banner" id="event-banner"></div>' +
        '</section>' +

        /* ===== VERIFIED REVIEWS ===== */
        '<section class="card pad verified-reviews-card">' +
          '<div class="section-head u-wrap" style="border-bottom:1px solid rgba(212,163,115,.22);padding-bottom:12px;margin-bottom:14px;">' +
            '<div>' +
              '<h2 class="section-title black" style="display:flex;align-items:center;gap:10px;">Verified Diner Reviews' +
                '<span class="rating-pill">' + RH.icon('star') + '4.9 / 5.0</span></h2>' +
              '<p class="section-subtitle">Real experiences verified by ReserveHub concierge check-ins</p>' +
            '</div>' +
            '<div style="display:flex;align-items:center;gap:8px;align-self:flex-start;">' +
              '<button class="btn btn-primary btn-sm" id="write-review">' + RH.icon('sparkles', 'icon-sm') + 'Write Review</button>' +
              '<button class="scroll-arrow" data-scroll-left="#review-row" style="background:#fff;" aria-label="Scroll reviews left">' + RH.icon('chevron-left', 'icon-sm') + '</button>' +
              '<button class="scroll-arrow" data-scroll-right="#review-row" style="background:#fff;" aria-label="Scroll reviews right">' + RH.icon('chevron-right', 'icon-sm') + '</button>' +
            '</div>' +
          '</div>' +
          '<div class="hscroll" id="review-row" style="gap:14px;padding-bottom:4px;"></div>' +
        '</section>' +

        /* ===== UPCOMING BOOKINGS PREVIEW ===== */
        '<section class="stack" style="gap:16px;' + (bookings.some(function (b) { return b.status === 'Confirmed' || b.status === 'Pending'; }) ? '' : 'display:none;') + '" id="upcoming-section">' +
          '<div class="section-head">' +
            '<div><h2 class="section-title black">Your Upcoming Reservations</h2>' +
              '<p class="section-subtitle">Show your digital pass upon arrival for seamless VIP table seating</p>' +
            '</div>' +
            '<button class="link-arrow" data-nav="U08">View all bookings ' + RH.icon('chevron-right') + '</button>' +
          '</div>' +
          '<div class="stack" style="gap:10px;" id="upcoming-list"></div>' +
        '</section>' +

      '</div>';

      /* ---------------- dynamic fragments ---------------- */
      var spotIdx = 0;
      var SPOTS = RH.SPOTLIGHT;
      var fadeTimer = null;

      function paintSpot(animate) {
        var s = SPOTS[spotIdx];
        var img = document.getElementById('spot-img');
        var apply = function () {
          if (img) img.src = s.image;
          var elDeal = document.getElementById('spot-deal');
          if (elDeal) elDeal.textContent = s.hotDeal;
          var elTag = document.getElementById('spot-tag');
          if (elTag) elTag.textContent = s.tag;
          var elDesc = document.getElementById('spot-desc');
          if (elDesc) elDesc.textContent = s.description;
          var elIdx = document.getElementById('spot-idx');
          if (elIdx) elIdx.textContent = spotIdx + 1;
          var elBadge = document.getElementById('spot-badgechip');
          if (elBadge) elBadge.textContent = s.dealBadge;
          var elRating = document.getElementById('spot-rating');
          if (elRating) elRating.textContent = s.rating;
          var elName = document.getElementById('spot-name');
          if (elName) elName.textContent = s.name;
          var elCuisine = document.getElementById('spot-cuisine');
          if (elCuisine) elCuisine.textContent = s.cuisine + ' · ' + s.location;
          var dots = '';
          SPOTS.forEach(function (_, i) {
            dots += '<button class="dot' + (i === spotIdx ? ' is-active' : '') + '" data-spot="' + i + '" aria-label="Go to slide ' + (i + 1) + '"></button>';
          });
          var elDots = document.getElementById('spot-dots');
          if (elDots) elDots.innerHTML = dots;
          requestAnimationFrame(function () {
            if (img) img.classList.remove('is-fading');
          });
        };
        if (fadeTimer) { clearTimeout(fadeTimer); fadeTimer = null; }
        if (animate && img && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
          img.classList.add('is-fading');
          fadeTimer = setTimeout(apply, 220);
        } else {
          apply();
        }
      }
      paintSpot(false);

      function nextSpot(delta) {
        spotIdx = (spotIdx + delta + SPOTS.length) % SPOTS.length;
        paintSpot(true);
      }

      var spotPaused = false;
      var spotTimer = setInterval(function () { if (!spotPaused) nextSpot(1); }, 5200);
      RH.router.onCleanup(function () { clearInterval(spotTimer); });
      var heroEl = document.getElementById('u01-hero');
      if (heroEl) {
        heroEl.addEventListener('mouseenter', function () { spotPaused = true; });
        heroEl.addEventListener('mouseleave', function () { spotPaused = false; });
      }

      /* Curated Experience Pills interactions */
      var curatedPillsEl = document.getElementById('curated-pills');
      if (curatedPillsEl) {
        curatedPillsEl.addEventListener('click', function (e) {
          var btn = e.target.closest('[data-curated-cat]');
          if (!btn) return;
          var cat = btn.getAttribute('data-curated-cat');
          if (cat === 'All') {
            RH.router.navigate('U02');
          } else {
            RH.goExplore('Restaurants', cat);
          }
        });
      }

      /* Hero Concierge Search Bar Action */
      var hcbBtn = document.getElementById('hcb-submit-btn');
      if (hcbBtn) {
        hcbBtn.addEventListener('click', function () {
          var catVal = document.getElementById('hcb-cat').value;
          var timeVal = document.getElementById('hcb-time').value;
          var guestsVal = Number(document.getElementById('hcb-guests').value) || 2;
          
          var draft = RH.store.get('draft');
          RH.store.patch({
            draft: Object.assign({}, draft, {
              time: timeVal,
              guests: guestsVal
            })
          });

          if (catVal === 'All') {
            RH.router.navigate('U02');
          } else {
            RH.goExplore('Restaurants', catVal);
          }
        });
      }

      /* Dishes ribbon */
      document.getElementById('dish-row').innerHTML = RH.DISHES.map(function (d) {
        var vendorName = d.restaurant.split(' ')[0];
        return (
          '<div class="dish-card" data-dish="' + d.cuisineFilter + '">' +
            '<div class="dish-thumb">' +
              '<img src="' + d.image + '" alt="' + d.name + '" loading="lazy">' +
              '<span class="dish-badge">' + d.badge + '</span>' +
              '<span class="dish-rating">★ ' + d.rating + '</span>' +
            '</div>' +
            '<h4 class="dish-name clamp1">' + d.name + '</h4>' +
            '<div class="dish-meta">' +
              '<span class="dish-vendor truncate">' + vendorName + '</span>' +
              '<span class="dish-price">' + d.price + '</span>' +
            '</div>' +
          '</div>'
        );
      }).join('');

      /* Myanmar specialties */
      var mmCat = 'salads';
      function paintMmTabs() {
        document.getElementById('mm-tabs').innerHTML = RH.MM_CATEGORIES.map(function (c) {
          return '<button class="chip' + (mmCat === c.id ? ' is-active' : '') + '" data-mm-tab="' + c.id + '"><span>' + c.icon + '</span>' + c.name + '</button>';
        }).join('');
      }
      function paintMmList() {
        var items = RH.MM_MENU[mmCat] || [];
        document.getElementById('mm-list').innerHTML = items.map(function (item) {
          var v = RH.utils.findVenue(item.venueId);
          return (
            '<article class="mm-item">' +
              '<div class="mm-thumb"><img src="' + item.image + '" alt="' + item.name + '" loading="lazy">' +
                (item.popular ? '<span class="mm-popular">Chef Pick</span>' : '') + '</div>' +
              '<div class="mm-body">' +
                '<h4 class="mm-title">' + item.name + '</h4>' +
                '<p class="mm-desc">' + item.description + '</p>' +
                '<div class="mm-foot">' +
                  '<strong class="mm-price">' + item.price + '</strong>' +
                  '<button class="mm-view-btn" data-open-venue="' + (v ? v.id : '') + '"' + (v ? '' : ' disabled') + '><span>View</span><span class="mm-btn-word">&nbsp;Restaurant</span> ' + RH.icon('chevron-right', 'icon-sm') + '</button>' +
                '</div>' +
              '</div>' +
            '</article>'
          );
        }).join('');
      }
      paintMmTabs(); paintMmList();

      /* Popular reservations */
      document.getElementById('popular-grid').innerHTML = venues.slice(0, 4).map(function (v) {
        return RH.venueCard(v, { priceLabel: 'Starting from' });
      }).join('');

      /* Mini deals */
      var MINI_DEALS = [
        {
          tagText: 'Happy Hour Privileges',
          tagIcon: '🍸',
          tagBg: '#F0FDF4',
          tagColor: '#15803D',
          tagBorder: '#DCFCE7',
          restaurant: 'Thai Bistro & Lounge',
          cuisine: 'Thai & Cocktails',
          location: 'Kandawgyi Lake',
          rating: '4.7',
          timeBadge: 'Daily 4 - 7 PM',
          offer: '1-for-1 Signature Cocktails & Botanic Tapas',
          image: RH.IMAGES.rangoon,
          match: 'golden-mandalay'
        },
        {
          tagText: 'Birthday Privilege',
          tagIcon: '🎂',
          tagBg: '#FFF1F2',
          tagColor: '#BE123C',
          tagBorder: '#FFE4E6',
          restaurant: 'Sky Lounge 360',
          cuisine: 'Rooftop & Bar',
          location: 'Skyline Tower',
          rating: '4.9',
          timeBadge: 'All Week',
          offer: 'Complimentary Moët Champagne & Dessert Card',
          image: RH.IMAGES.rooftop,
          match: 'rooftop-yangon'
        },
        {
          tagText: 'Weekend BBQ Tasting',
          tagIcon: '🔥',
          tagBg: '#FFF7ED',
          tagColor: '#C2410C',
          tagBorder: '#FFEDD5',
          restaurant: 'BBQ Nights Smokehouse',
          cuisine: 'Grill & Smoke',
          location: 'Inya Lake',
          rating: '4.8',
          timeBadge: 'Fri - Sun',
          offer: 'Family Wagyu Combo Discount & Craft Pitcher',
          image: RH.IMAGES.padonmar,
          match: 'lakeview-terrace'
        }
      ];
      document.getElementById('mini-deals').innerHTML = MINI_DEALS.map(function (d, i) {
        return (
          '<div class="mini-deal" data-mini-deal="' + i + '">' +
            '<div class="thumb">' +
              '<img src="' + d.image + '" alt="' + d.restaurant + '">' +
              '<span class="rating">★ ' + d.rating + '</span>' +
            '</div>' +
            '<div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:3px;">' +
              '<div style="display:flex;justify-content:space-between;gap:6px;align-items:center;">' +
                '<span class="mini-deal-tag" style="background:' + d.tagBg + ';color:' + d.tagColor + ';border:1px solid ' + d.tagBorder + ';">' +
                  '<span>' + d.tagIcon + '</span> ' + d.tagText +
                '</span>' +
                '<span class="micro" style="color:#94A3B8;white-space:nowrap;font-weight:600;">' + d.timeBadge + '</span>' +
              '</div>' +
              '<h4 class="bold truncate" style="font-size:15px;font-weight:800;color:var(--ink);margin-top:1px;">' + d.restaurant + '</h4>' +
              '<p class="tiny truncate" style="color:#334155;font-weight:500;font-size:12px;">' + d.offer + '</p>' +
              '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:2px;">' +
                '<span class="micro truncate" style="color:#94A3B8;font-size:11px;">' + d.cuisine + ' • ' + d.location + '</span>' +
                '<span class="claim-chip">Claim ' + RH.icon('chevron-right', 'icon-sm') + '</span>' +
              '</div>' +
            '</div>' +
          '</div>'
        );
      }).join('');
      root._miniDeals = MINI_DEALS;

      /* Events slideshow */
      var evtIdx = 0;
      var EVENTS = RH.EVENTS;
      function paintEvent() {
        var e = EVENTS[evtIdx];
        var v = RH.utils.findVenue(e.venueId);
        document.getElementById('event-banner').innerHTML =
          '<div class="event-bg"><img src="' + e.image + '" alt="' + e.title + '" loading="lazy"></div>' +
          '<div class="event-overlay"></div>' +
          '<div class="event-shell">' +
            '<div class="event-content">' +
              '<div class="event-header-row">' +
                '<div class="event-eyebrows">' +
                  '<span class="eb-white">' + e.badge + '</span>' +
                  '<span class="eb-dark">' + RH.icon('sparkles', 'icon-sm') + e.category + '</span>' +
                  '<span class="eb-gold">' + e.spotsLeft + ' seats left</span>' +
                '</div>' +
                '<div class="event-dots-inline">' +
                  EVENTS.map(function (_, i) {
                    return '<button class="dot' + (i === evtIdx ? ' is-active' : '') + '" data-event-dot="' + i + '" aria-label="Go to event ' + (i + 1) + '"></button>';
                  }).join('') +
                '</div>' +
              '</div>' +
              '<div class="event-copy">' +
                '<h3 class="event-title">' + e.title + '</h3>' +
                '<p class="event-description truncate">' + e.description + '</p>' +
              '</div>' +
              '<div class="event-footer">' +
                '<div class="event-details">' +
                  '<span class="event-meta">' + RH.icon('calendar', 'icon-sm') + '<span>' + e.date + ' · ' + e.time + '</span></span>' +
                  '<span class="event-meta event-host" data-event-photo="' + (v ? v.id : '') + '" role="button" tabindex="0">' + RH.icon('map-pin', 'icon-sm') + '<span class="truncate">' + e.venueName + '</span></span>' +
                '</div>' +
                '<div class="event-action">' +
                  '<span class="event-price"><span>' + e.pricePerPerson + '</span></span>' +
                  '<button class="btn btn-gold btn-sm event-reserve-btn" data-event-reserve="' + e.venueId + '"><span>Reserve Spot</span> ' + RH.icon('arrow-right', 'icon-sm') + '</button>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>';
      }
      paintEvent();
      var evtTimer = setInterval(function () { evtIdx = (evtIdx + 1) % EVENTS.length; paintEvent(); }, 5000);
      RH.router.onCleanup(function () { clearInterval(evtTimer); });

      /* Reviews */
      var reviews = RH.FEATURED_REVIEWS.slice();
      var liked = {};
      function paintReviews() {
        document.getElementById('review-row').innerHTML = reviews.map(function (r) {
          var isLiked = !!liked[r.id];
          var count = r.helpfulCount + (isLiked ? 1 : 0);
          return (
            '<article class="review-card">' +
              '<div class="review-head">' +
                '<div class="review-user">' +
                  '<img class="review-avatar" src="' + r.avatar + '" alt="' + r.customerName + '">' +
                  '<div style="min-width:0;"><strong class="tiny clamp1" style="display:block;">' + r.customerName + '</strong>' +
                  '<small class="micro t-faint clamp1" style="display:block;">' + r.occasion + ' · ' + r.visitedDate + '</small></div>' +
                '</div>' +
                '<span class="rating-pill">' + RH.icon('star') + r.rating + '.0</span>' +
              '</div>' +
              '<p class="tiny clamp3" style="color:var(--ink-60);line-height:1.6;">“' + r.reviewText + '”</p>' +
              (r.recommendedDish ? '<span class="musttry clamp1">★ Must-try: ' + r.recommendedDish + '</span>' : '') +
              '<div style="border-top:1px solid #F1F5F9;padding-top:9px;margin-top:auto;display:flex;align-items:center;justify-content:space-between;gap:8px;">' +
                '<button class="edit-link clamp1" data-review-venue="' + (r.venueId || '') + '" style="text-align:left;">' + r.restaurantName + '</button>' +
                '<button class="helpful-btn' + (isLiked ? ' is-liked' : '') + '" data-like="' + r.id + '">' +
                  RH.icon('thumbs-up', 'icon-sm') + '<span>' + count + '</span></button>' +
              '</div>' +
            '</article>'
          );
        }).join('');
      }
      paintReviews();

      /* Upcoming bookings preview */
      var upcoming = bookings.filter(function (b) { return b.status === 'Confirmed' || b.status === 'Pending'; }).slice(0, 3);
      document.getElementById('upcoming-list').innerHTML = upcoming.map(function (b) {
        return (
          '<div class="upcoming-row" data-nav="U08">' +
            '<div style="display:flex;align-items:center;gap:14px;min-width:0;">' +
              '<span class="upcoming-ico">' + RH.icon('calendar', 'icon-lg') + '</span>' +
              '<div style="min-width:0;"><strong class="small clamp1" style="display:block;">' + b.venueName + '</strong>' +
              '<p class="tiny t-muted truncate" style="margin-top:2px;">' + b.date + ' · ' + b.time + ' · ' + b.guests + ' guests</p></div>' +
            '</div>' +
            '<span class="status-pill ' + (b.status === 'Confirmed' ? 'st-confirmed' : 'st-pending') + '">' + b.status + '</span>' +
          '</div>'
        );
      }).join('');

      /* ---------------- bindings ---------------- */

      /* Spotlight controls */
      document.getElementById('spot-prev').addEventListener('click', function () { nextSpot(-1); });
      document.getElementById('spot-next').addEventListener('click', function () { nextSpot(1); });
      document.getElementById('spot-dots').addEventListener('click', function (e) {
        var dot = e.target.closest('[data-spot]');
        if (!dot) return;
        spotIdx = Number(dot.getAttribute('data-spot'));
        paintSpot(true);
      });
      var openSpot = function () { RH.openVenue(SPOTS[spotIdx].targetVenueId, 'U03'); };
      document.getElementById('spot-card').addEventListener('click', openSpot);
      var ctaExplore = document.getElementById('hero-cta-explore');
      if (ctaExplore) ctaExplore.addEventListener('click', function () { RH.router.navigate('U02'); });
      var ctaBook = document.getElementById('hero-cta-book');
      if (ctaBook) ctaBook.addEventListener('click', openSpot);

      /* Dish cards + cuisines → U02 */
      document.getElementById('dish-row').addEventListener('click', function (e) {
        var dish = e.target.closest('[data-dish]');
        if (dish) RH.goExplore('Restaurants', dish.getAttribute('data-dish'));
      });

      /* Myanmar interactions */
      document.getElementById('mm-tabs').addEventListener('click', function (e) {
        var t = e.target.closest('[data-mm-tab]');
        if (!t) return;
        mmCat = t.getAttribute('data-mm-tab');
        paintMmTabs(); paintMmList();
      });
      document.getElementById('mm-see-all').addEventListener('click', function () {
        RH.goExplore('Restaurants', 'Myanmar');
      });

      /* Deals */
      var lakeviewDeal = function () { RH.openVenue('lakeview-terrace', 'U03'); };
      document.getElementById('featured-deal').addEventListener('click', lakeviewDeal);
      document.getElementById('claim-lunch20').addEventListener('click', function (e) {
        e.stopPropagation(); lakeviewDeal();
      });
      document.getElementById('copy-lunch20').addEventListener('click', function (e) {
        e.stopPropagation();
        if (navigator.clipboard) navigator.clipboard.writeText('LUNCH20');
        this.classList.add('copied');
        this.innerHTML = RH.icon('check', 'icon-sm') + ' Copied!';
        var self = this;
        setTimeout(function () {
          self.classList.remove('copied');
          self.innerHTML = 'Code: <strong>LUNCH20</strong>' + RH.icon('copy', 'icon-sm');
        }, 2500);
      });
      document.getElementById('mini-deals').addEventListener('click', function (e) {
        var card = e.target.closest('[data-mini-deal]');
        if (!card) return;
        var deal = root._miniDeals[Number(card.getAttribute('data-mini-deal'))];
        RH.openVenue(deal.match, 'U03');
      });

      /* Events */
      document.getElementById('event-prev').addEventListener('click', function () { evtIdx = (evtIdx - 1 + EVENTS.length) % EVENTS.length; paintEvent(); });
      document.getElementById('event-next').addEventListener('click', function () { evtIdx = (evtIdx + 1) % EVENTS.length; paintEvent(); });
      document.getElementById('event-banner').addEventListener('click', function (e) {
        var dot = e.target.closest('[data-event-dot]');
        if (dot) { evtIdx = Number(dot.getAttribute('data-event-dot')); paintEvent(); return; }
        var res = e.target.closest('[data-event-reserve]');
        if (res) {
          var vid = res.getAttribute('data-event-reserve');
          if (RH.utils.findVenue(vid)) RH.openVenue(vid, 'U03'); else RH.router.navigate('U02');
          return;
        }
        if (e.target.closest('[data-event-photo]')) {
          var pid = e.target.closest('[data-event-photo]').getAttribute('data-event-photo');
          if (pid && RH.utils.findVenue(pid)) RH.openVenue(pid, 'U03'); else RH.router.navigate('U02');
        }
      });

      /* Reviews interactions */
      document.getElementById('review-row').addEventListener('click', function (e) {
        var like = e.target.closest('[data-like]');
        if (like) {
          var id = like.getAttribute('data-like');
          liked[id] = !liked[id];
          paintReviews();
          return;
        }
        var rv = e.target.closest('[data-review-venue]');
        if (rv) {
          var vid = rv.getAttribute('data-review-venue');
          if (vid && RH.utils.findVenue(vid)) RH.openVenue(vid, 'U03'); else RH.router.navigate('U02');
        }
      });

      document.getElementById('write-review').addEventListener('click', function () {
        var opts = venues.map(function (v) { return '<option>' + v.name + '</option>'; }).join('');
        var occOpts = ['Romantic Dinner', 'Anniversary Celebration', 'Executive Board Dinner', 'Chef Omakase Experience', 'Family Gathering', 'Birthday Party']
          .map(function (o) { return '<option>' + o + '</option>'; }).join('');
        RH.openModal(
          '<div class="modal-head"><div style="display:flex;align-items:center;gap:10px;">' +
            '<span class="upcoming-ico">' + RH.icon('sparkles', 'icon-lg') + '</span>' +
            '<div><h3>Share Your Dining Experience</h3><p class="tiny t-muted">Your review will be verified with your reservation</p></div></div>' +
            '<button class="modal-close" data-modal-close>' + RH.icon('x', 'icon-lg') + '</button></div>' +
          '<form class="modal-body" id="review-form">' +
            '<div class="field"><label>Your Name / Title</label><input class="input" id="rv-name" required placeholder="e.g., Daw May Thant"></div>' +
            '<div class="filter-grid" style="gap:12px;">' +
              '<div class="field"><label>Restaurant</label><select class="select" id="rv-rest">' + opts + '</select></div>' +
              '<div class="field"><label>Overall Rating</label><select class="select" id="rv-rating">' +
                '<option value="5">5.0 ★ (Exceptional)</option><option value="4">4.0 ★ (Very Good)</option><option value="3">3.0 ★ (Average)</option></select></div>' +
            '</div>' +
            '<div class="filter-grid" style="gap:12px;">' +
              '<div class="field"><label>Occasion</label><select class="select" id="rv-occ">' + occOpts + '</select></div>' +
              '<div class="field"><label>Recommended Dish (Optional)</label><input class="input" id="rv-dish" placeholder="e.g. Truffle Wagyu Nigiri"></div>' +
            '</div>' +
            '<div class="field"><label>Your Review &amp; Table Highlights</label>' +
            '<textarea class="textarea" id="rv-text" rows="3" required placeholder="Share how the table placement, atmosphere, service, or dishes made your dining experience memorable..."></textarea></div>' +
            '<div class="modal-foot"><button type="button" class="btn btn-ghost" data-modal-close>Cancel</button>' +
            '<button type="submit" class="btn btn-primary">Publish Verified Review</button></div>' +
          '</form>'
        );
        document.getElementById('review-form').addEventListener('submit', function (ev) {
          ev.preventDefault();
          var name = document.getElementById('rv-name').value.trim();
          var text = document.getElementById('rv-text').value.trim();
          if (!name || !text) return;
          reviews.unshift({
            id: 'rev-user-' + Date.now(),
            customerName: name,
            avatar: RH.avatarSvg(name.charAt(0).toUpperCase(), '#7A1F2B'),
            rating: Number(document.getElementById('rv-rating').value),
            occasion: document.getElementById('rv-occ').value,
            recommendedDish: document.getElementById('rv-dish').value.trim(),
            reviewText: text,
            restaurantName: document.getElementById('rv-rest').value,
            venueId: null,
            visitedDate: 'Verified Dine · Just now',
            helpfulCount: 0
          });
          RH.closeActiveModal();
          paintReviews();
          RH.toast('Thank you! Your verified dining review has been posted.');
        });
      });

      /* Countdown ticker */
      var cdEl = document.getElementById('deal-countdown');
      countdownPaint(cdEl);
      var cdTimer = setInterval(function () { countdownPaint(cdEl); }, 1000);
      RH.router.onCleanup(function () { clearInterval(cdTimer); });
    }
  });
})(window.RH = window.RH || {});
