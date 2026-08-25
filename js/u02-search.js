/* ReserveHub — U02 · Search Results */
(function (RH) {
  'use strict';

  var CATEGORIES = ['All', 'Restaurants', 'Promotions', 'Upcoming Events', 'Hotels', 'Event Venues', 'Meeting Rooms', 'Services'];
  var LOCATIONS = ['All Locations', 'Yangon', 'Mandalay', 'Nay Pyi Taw', 'Inle Lake'];

  function filterVenues(venues, f) {
    return venues.filter(function (v) {
      if (f.keyword) {
        var q = f.keyword.toLowerCase();
        var hit = v.name.toLowerCase().indexOf(q) !== -1 ||
          v.description.toLowerCase().indexOf(q) !== -1 ||
          v.location.toLowerCase().indexOf(q) !== -1;
        if (!hit) return false;
      }
      if (f.category !== 'All') {
        if (f.category === 'Promotions') {
          var tag = (v.tag || '').toLowerCase();
          var isPromo = /special|deal|offer/.test(tag) || v.basePrice <= 35 ||
            v.packages.some(function (p) { return p.price <= 30; });
          if (!isPromo) return false;
        } else if (f.category === 'Upcoming Events') {
          if (v.category !== 'Event Venues' && v.tag !== 'Events') return false;
        } else if (f.category === 'Services') {
          if (['Beauty & Wellness', 'Healthcare', 'Meeting Rooms'].indexOf(v.category) === -1) return false;
        } else if (v.category !== f.category) {
          return false;
        }
      }
      if (f.location !== 'All Locations' && v.city.toLowerCase().indexOf(f.location.toLowerCase()) === -1) return false;
      if (f.rating === '4.5 & Up' && v.rating < 4.5) return false;
      if (f.rating === '4.0 & Up' && v.rating < 4.0) return false;
      if (f.price === 'Budget · Under $20' && v.basePrice >= 20) return false;
      if (f.price === 'Mid · $20 – $40' && (v.basePrice < 20 || v.basePrice > 40)) return false;
      if (f.price === 'Premium · Over $40' && v.basePrice <= 40) return false;
      return true;
    });
  }

  RH.registerScreen('U02', {
    title: 'Explore Restaurants & Venues',
    render: function (root) {
      var store = RH.store;
      var venues = store.get('venues');

      /* Seed from cross-screen navigation (U01 chips, footer links, ⌘K) */
      var f = {
        keyword: store.get('searchQuery') || '',
        category: store.get('selectedCategory') || 'All',
        location: 'All Locations',
        date: '2026-08-25',
        guests: '2 Guests',
        rating: 'Any Rating',
        price: 'Any Price'
      };
      store.patch({ searchQuery: '' });

      root.innerHTML =
      '<div class="page">' +

        '<section class="filter-panel">' +
          '<div class="filter-grid">' +
            '<div class="field"><label class="uppercase micro t-muted">Search</label>' +
              '<div class="input-wrap">' + RH.icon('search') +
              '<input id="f-keyword" class="input" placeholder="Restaurant, venue..." value="' + f.keyword + '"></div></div>' +
            '<div class="field"><label class="uppercase micro t-muted">Location</label><select id="f-location" class="select">' +
              LOCATIONS.map(function (l) { return '<option' + (l === f.location ? ' selected' : '') + '>' + l + '</option>'; }).join('') +
            '</select></div>' +
            '<div class="field"><label class="uppercase micro t-muted">Date</label><input type="date" id="f-date" class="input" value="' + f.date + '"></div>' +
            '<div class="field"><label class="uppercase micro t-muted">Guests</label><select id="f-guests" class="select">' +
              ['1 Guest', '2 Guests', '3 Guests', '4 Guests', '6 Guests', '8+ Guests'].map(function (g) { return '<option' + (g === f.guests ? ' selected' : '') + '>' + g + '</option>'; }).join('') +
            '</select></div>' +
            '<div class="filter-action-col" style="display:flex;align-items:flex-end;"><button class="btn btn-primary btn-block" id="apply-search">' + RH.icon('search', 'icon-sm') + 'Apply Search</button></div>' +
          '</div>' +
          '<div class="filter-pills-row">' +
            '<div class="filter-pills-list" id="cat-pills">' +
              CATEGORIES.map(function (c) {
                return '<button class="chip' + (c === f.category ? ' is-active' : '') + '" data-cat="' + c + '">' + c + '</button>';
              }).join('') +
            '</div>' +
            '<button class="chip more-filters-btn" id="more-filters" type="button" aria-expanded="false">' + RH.icon('sliders', 'icon-sm') +
              '<span>More Filters</span><span class="nav-count" id="active-filter-count" style="display:none;background:var(--gold);color:var(--ink);">0</span>' +
              '<span class="more-filters-chevron" id="more-filters-chevron">' + RH.icon('chevron-down', 'icon-sm') + '</span></button>' +
          '</div>' +
          '<div class="advanced-grid" id="advanced-filters" hidden>' +
            '<div class="field"><label>Rating</label><select id="f-rating" class="select">' +
              ['Any Rating', '4.5 & Up', '4.0 & Up'].map(function (r) { return '<option' + (r === f.rating ? ' selected' : '') + '>' + r + '</option>'; }).join('') + '</select></div>' +
            '<div class="field"><label>Price Range</label><select id="f-price" class="select">' +
              ['Any Price', 'Budget · Under $20', 'Mid · $20 – $40', 'Premium · Over $40'].map(function (p) { return '<option' + (p === f.price ? ' selected' : '') + '>' + p + '</option>'; }).join('') + '</select></div>' +
            '<div class="field"><label>Availability</label><select class="select"><option>Any Availability</option><option>Today</option><option>This Weekend</option></select></div>' +
            '<div class="field"><label>Distance</label><select class="select"><option>Any Distance</option><option>Within 2 km</option><option>Within 5 km</option></select></div>' +
          '</div>' +
        '</section>' +

        '<div class="results-head">' +
          '<div><h1 style="font-size:18px;font-weight:800;">Showing <span class="t-burgundy black" id="result-count">0</span> Results</h1>' +
          '<p class="tiny t-muted">Available venues and services near you</p></div>' +
          '<button class="link-arrow" id="clear-all" style="display:none;">' + RH.icon('x', 'icon-sm') + ' Clear all filters</button>' +
        '</div>' +

        '<article class="featured-pick card-hover" id="featured-pick"></article>' +
        '<div id="results-wrap"></div>' +

        '<section class="stack" style="gap:12px;padding-top:8px;">' +
          '<div class="section-head">' +
            '<h2 style="font-size:17px;font-weight:800;">Recommended For You</h2>' +
            '<button class="link-arrow" id="reco-reset"><span>View all</span>' + RH.icon('chevron-right') + '</button>' +
          '</div>' +
          '<div class="hscroll" id="reco-row" style="padding-bottom:10px;"></div>' +
        '</section>' +

      '</div>';

      function activeCount() {
        return (f.category !== 'All' ? 1 : 0) + (f.location !== 'All Locations' ? 1 : 0) +
          (f.rating !== 'Any Rating' ? 1 : 0) + (f.price !== 'Any Price' ? 1 : 0) + (f.keyword ? 1 : 0);
      }

      function paintResults() {
        var list = filterVenues(venues, f);

        document.getElementById('result-count').textContent = list.length;

        var n = activeCount();
        var clearBtn = document.getElementById('clear-all');
        clearBtn.style.display = n > 0 ? 'inline-flex' : 'none';
        var badge = document.getElementById('active-filter-count');
        badge.style.display = n > 0 ? 'inline-flex' : 'none';
        badge.textContent = n;

        /* Featured highlight only when unfiltered */
        var featuredEl = document.getElementById('featured-pick');
        if (f.category === 'All' && !f.keyword) {
          var fv = venues.filter(function (v) { return v.id === 'sakura-garden'; })[0] || venues[0];
          featuredEl.style.display = '';
          featuredEl.innerHTML =
            '<div class="fp-media"><img src="' + fv.image + '" alt="' + fv.name + '">' +
              '<span class="fp-flag">' + RH.icon('sparkles', 'icon-sm') + 'Featured Pick</span></div>' +
            '<div class="fp-body">' +
              '<div>' +
                '<span class="badge uppercase">' + fv.category + ' · Special Deal</span>' +
                '<h2 class="vc-title" style="font-size:17px;margin-top:6px;" data-open-venue="' + fv.id + '" role="button" tabindex="0">' + fv.name + '</h2>' +
                '<p class="small clamp2" style="color:var(--ink-60);line-height:1.55;margin-top:4px;">' + fv.description + '</p>' +
              '</div>' +
              '<p class="vc-meta" style="flex-wrap:wrap;">' +
                '<span class="rating-pill">' + RH.icon('star') + fv.rating + '</span>·<span>' + fv.reviewsCount + ' reviews</span>·' +
                '<span style="display:inline-flex;align-items:center;gap:3px;">' + RH.icon('map-pin', 'icon-sm') + fv.location + '</span></p>' +
              '<div class="vc-foot">' +
                '<div><span class="vc-price-label">Offer Price</span><span class="vc-price">$' + fv.basePrice + ' <small>/ visit</small></span></div>' +
                '<div style="display:flex;gap:8px;">' +
                  '<button class="btn btn-ghost btn-sm" data-fav="' + fv.id + '" aria-label="Toggle favorite">' + RH.icon('heart', '', { filled: RH.store.get('favorites').indexOf(fv.id) !== -1 }) + '</button>' +
                  '<button class="btn btn-primary btn-sm" data-open-venue="' + fv.id + '">Book Now</button>' +
                '</div>' +
              '</div>' +
            '</div>';
        } else {
          featuredEl.style.display = 'none';
          featuredEl.innerHTML = '';
        }

        /* Results grid or empty state */
        var wrap = document.getElementById('results-wrap');
        if (list.length === 0) {
          wrap.innerHTML =
            '<div class="empty-state">' +
              '<div class="empty-ico">' + RH.icon('calendar', 'icon-lg') + '</div>' +
              '<h3>No venues match your current filters</h3>' +
              '<p>Try clearing your search keyword or adjusting the filters to discover more tables.</p>' +
              '<button class="btn btn-primary btn-sm" id="reset-filters-empty">Reset Filters</button>' +
            '</div>';
        } else {
          wrap.innerHTML =
            '<div class="grid-auto">' + list.map(function (v) {
              return RH.venueCard(v, { showDistance: true });
            }).join('') + '</div>';
        }

        /* Recommended row */
        document.getElementById('reco-row').innerHTML = venues.map(function (v) {
          return (
            '<div class="reco-card" data-open-venue="' + v.id + '" role="button" tabindex="0">' +
              '<img src="' + v.image + '" alt="' + v.name + '">' +
              '<span class="badge uppercase">' + v.category + '</span>' +
              '<h3 class="bold truncate small" style="margin-top:4px;">' + v.name + '</h3>' +
              '<p class="vc-meta tiny" style="margin-top:4px;">' + RH.icon('star') + '<strong>' + v.rating + '</strong> · ' + v.city + '</p>' +
              '<div style="border-top:1px solid rgba(212,163,115,.22);margin-top:8px;padding-top:8px;display:flex;justify-content:space-between;align-items:center;">' +
                '<span class="tiny bold t-burgundy">$' + v.basePrice + ' / visit</span>' +
                '<span class="tiny bold t-burgundy">Book →</span>' +
              '</div>' +
            '</div>'
          );
        }).join('');
      }

      function syncPills() {
        document.querySelectorAll('#cat-pills .chip').forEach(function (c) {
          c.classList.toggle('is-active', c.getAttribute('data-cat') === f.category);
        });
      }

      paintResults();

      /* ---------------- bindings ---------------- */
      document.getElementById('cat-pills').addEventListener('click', function (e) {
        var chip = e.target.closest('[data-cat]');
        if (!chip) return;
        f.category = chip.getAttribute('data-cat');
        syncPills(); paintResults();
      });

      document.getElementById('apply-search').addEventListener('click', function () {
        f.keyword = document.getElementById('f-keyword').value.trim();
        f.location = document.getElementById('f-location').value;
        f.date = document.getElementById('f-date').value;
        f.guests = document.getElementById('f-guests').value;
        paintResults();
      });
      document.getElementById('f-keyword').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); document.getElementById('apply-search').click(); }
      });

      document.getElementById('more-filters').addEventListener('click', function () {
        var adv = document.getElementById('advanced-filters');
        adv.hidden = !adv.hidden;
        var isOpen = !adv.hidden;
        this.classList.toggle('is-open', isOpen);
        this.setAttribute('aria-expanded', String(isOpen));
        var chevron = document.getElementById('more-filters-chevron');
        if (chevron) {
          chevron.innerHTML = RH.icon(isOpen ? 'chevron-up' : 'chevron-down', 'icon-sm');
        }
      });

      ['f-rating', 'f-price'].forEach(function (id) {
        document.getElementById(id).addEventListener('change', function (e) {
          f[id === 'f-rating' ? 'rating' : 'price'] = e.target.value;
          paintResults();
        });
      });

      function clearAll() {
        f.keyword = ''; f.category = 'All'; f.location = 'All Locations';
        f.rating = 'Any Rating'; f.price = 'Any Price';
        document.getElementById('f-keyword').value = '';
        document.getElementById('f-rating').value = 'Any Rating';
        document.getElementById('f-price').value = 'Any Price';
        syncPills(); paintResults();
      }
      document.getElementById('clear-all').addEventListener('click', clearAll);

      document.getElementById('reco-reset').addEventListener('click', function () {
        clearAll();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  });
})(window.RH = window.RH || {});
