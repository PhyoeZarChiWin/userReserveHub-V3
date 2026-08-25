/* ReserveHub — U08 · My Page / Bookings */
(function (RH) {
  'use strict';

  RH.registerScreen('U08', {
    title: 'My Reservations',
    render: function (root) {
      var store = RH.store;
      var venues = store.get('venues');
      var favoritesCount = store.get('favorites').length;

      var ui = { tab: 'Upcoming', query: '', status: 'ALL', sort: 'date-asc' };

      root.innerHTML =
      '<div class="page" style="max-width:1000px;margin-inline:auto;">' +

        /* Header banner */
        '<div class="page-banner">' +
          '<div>' +
            '<span class="badge">' + RH.icon('shield-check', 'icon-sm') + 'Guaranteed Seating</span>' +
            '<h1 class="black" style="font-size:26px;margin-top:8px;">My Reservations &amp; Bookings</h1>' +
            '<p class="small t-muted" style="margin-top:2px;">Manage your scheduled tables, special dining requests, and guest passes.</p>' +
          '</div>' +
          '<button class="btn btn-primary" data-nav="U02">' + RH.icon('plus', 'icon-sm') + 'Book New Table</button>' +
        '</div>' +

        /* Metrics */
        '<div class="metrics-grid" id="metrics"></div>' +

        /* Controls */
        '<div class="controls-panel">' +
          '<div class="controls-top">' +
            '<div class="tabs-seg" id="tab-seg">' +
              ['Upcoming', 'Past', 'All'].map(function (t) {
                return '<button class="tab-seg' + (ui.tab === t ? ' is-active' : '') + '" data-tab="' + t + '">' + t + '</button>';
              }).join('') +
            '</div>' +
            '<div class="controls-search"><div class="input-wrap">' + RH.icon('search', 'icon-sm') +
              '<input class="input" id="bk-search" placeholder="Search by restaurant, confirmation code, location..." value=""></div></div>' +
            '<div style="display:flex;align-items:center;gap:8px;flex:none;">' +
              '<span class="tiny t-faint">Sort:</span>' +
              '<select class="select" id="bk-sort" style="width:auto;">' +
                '<option value="date-asc">Date: Earliest First</option>' +
                '<option value="date-desc">Date: Latest First</option>' +
                '<option value="price-high">Total: High to Low</option>' +
                '<option value="guests-high">Guests: Largest Party</option></select>' +
            '</div>' +
          '</div>' +
          '<div class="status-row" id="status-row">' +
            '<span class="tiny t-faint bold">Status:</span>' +
            ['ALL', 'Confirmed', 'Pending', 'Completed', 'Cancelled'].map(function (s) {
              return '<button class="status-filter' + (s === ui.status ? ' is-active' : '') + '" data-status="' + s + '">' + s + '</button>';
            }).join('') +
          '</div>' +
        '</div>' +

        '<div id="booking-list-wrap"></div>' +
      '</div>';

      function counts() {
        var all = store.get('bookings');
        return {
          upcoming: all.filter(function (b) { return b.status === 'Confirmed' || b.status === 'Pending'; }).length,
          past: all.filter(function (b) { return b.status === 'Completed' || b.status === 'Cancelled'; }).length,
          spent: all.reduce(function (s, b) { return b.status !== 'Cancelled' ? s + b.totalPaid : s; }, 0)
        };
      }

      function paintMetrics() {
        var c = counts();
        document.getElementById('metrics').innerHTML =
          metric('Upcoming', c.upcoming, 'calendar', 'var(--burgundy)') +
          metric('Completed', c.past, 'check-circle', '#047857') +
          metric('Total Spent', '$' + c.spent, 'dollar-sign', 'var(--ink)', true) +
          metric('Saved Venues', favoritesCount, 'heart', '#E11D48');

        function metric(label, value, icon, color, plain) {
          return (
            '<div class="metric"><div class="metric-label"><span>' + label + '</span>' + RH.icon(icon) + '</div>' +
            '<p class="metric-value" style="color:' + color + ';">' + value + '</p>' +
            '<p class="micro t-faint" style="margin-top:2px;">' +
              (label === 'Upcoming' ? 'Active reservations' :
               label === 'Completed' ? 'Past experiences' :
               label === 'Total Spent' ? 'Dining investments' : 'In your wishlist') + '</p></div>'
          );
        }
      }

      function filteredList() {
        var list = store.get('bookings').filter(function (b) {
          if (ui.tab === 'Upcoming' && b.status !== 'Confirmed' && b.status !== 'Pending') return false;
          if (ui.tab === 'Past' && b.status !== 'Completed' && b.status !== 'Cancelled') return false;
          if (ui.status !== 'ALL' && b.status !== ui.status) return false;
          if (ui.query.trim()) {
            var q = ui.query.toLowerCase();
            var hit = [b.venueName, b.refNumber, b.location, b.date].some(function (field) {
              return String(field).toLowerCase().indexOf(q) !== -1;
            });
            if (!hit) return false;
          }
          return true;
        });
        list.sort(function (a, b) {
          if (ui.sort === 'date-asc') return a.date.localeCompare(b.date);
          if (ui.sort === 'date-desc') return b.date.localeCompare(a.date);
          if (ui.sort === 'price-high') return b.totalPaid - a.totalPaid;
          if (ui.sort === 'guests-high') return b.guests - a.guests;
          return 0;
        });
        return list;
      }

      function trackerHtml(status) {
        if (status === 'Cancelled') return '';
        var done = status === 'Confirmed' || status === 'Completed';
        var step = function (label, cls) { return '<span class="tracker-step ' + cls + '">' + label + '</span>'; };
        return (
          '<div class="tracker">' +
            '<div style="display:flex;justify-content:space-between;font-size:11px;font-weight:700;color:#475569;margin-bottom:7px;">' +
              '<span style="display:inline-flex;gap:4px;align-items:center;color:var(--burgundy);">' + RH.icon('sparkles', 'icon-sm') + 'Seating Tracker:</span>' +
              '<span style="color:#64748b;font-weight:400;">' + (status === 'Completed' ? 'Experience Concluded' : 'Guaranteed VIP Placement') + '</span></div>' +
            '<div class="tracker-steps">' +
              step(RH.icon('check', '') + ' Booked', 'done') +
              step((done ? RH.icon('check', '') + '' : '2.') + ' Table Assigned', done ? 'done' : '') +
              step((done ? RH.icon('check', '') + '' : '3.') + ' Kitchen Notified', done ? 'done' : '') +
              step(status === 'Completed' ? 'Finished' : 'Ready to Dine', status === 'Completed' ? 'final' : 'live') +
            '</div></div>'
        );
      }

      function paintList() {
        var list = filteredList();
        var wrap = document.getElementById('booking-list-wrap');

        if (list.length === 0) {
          wrap.innerHTML =
            '<div class="empty-state">' +
              '<div class="empty-ico">' + RH.icon('calendar', 'icon-lg') + '</div>' +
              '<h3>No matching reservations found</h3>' +
              '<p>' + (ui.query || ui.status !== 'ALL'
                ? 'Try clearing your search query or adjusting your filters.'
                : 'You have no reservations under this tab yet. Explore fine dining spots to book a table.') + '</p>' +
              '<button class="btn btn-primary btn-sm" id="empty-explore">Explore Fine Dining Venues</button>' +
            '</div>';
          var ex = document.getElementById('empty-explore');
          if (ex) ex.addEventListener('click', function () {
            ui.query = ''; ui.status = 'ALL';
            document.getElementById('bk-search').value = '';
            syncStatus(); paintList();
            RH.router.navigate('U02');
          });
          return;
        }

        wrap.innerHTML = '<div class="booking-list">' + list.map(function (b) {
          var cd = RH.getCountdownLabel(b.date, b.status);
          var addons = RH.addonsCount(b.preOrderedAddons);
          var venueBtn = b.venueId;

          var chips = '';
          if (b.seatingArea) chips += '<span class="neutral-chip">Seating: <strong>' + b.seatingArea + '</strong></span>';
          (b.dietaryRestrictions || []).forEach(function (diet) {
            chips += '<span class="warn-chip">⚠️ ' + diet + '</span>';
          });
          if (addons > 0) chips += '<span class="purple-chip">🍾 ' + addons + ' Pre-ordered Course(s)</span>';
          if (b.specialRequests) chips += '<em class="tiny t-muted truncate" style="max-width:420px;">"' + b.specialRequests + '"</em>';

          var confirmedTools =
            (b.status === 'Confirmed'
              ? '<button class="tool-btn" data-reschedule="' + b.id + '" title="Change date, time, or guest count">' + RH.icon('pencil') + 'Reschedule</button>' +
                '<button class="tool-btn" data-requests="' + b.id + '" title="Dietary preferences and celebration notes">' + RH.icon('message-plus') + 'Special Requests</button>' +
                '<button class="tool-btn" data-addons="' + b.id + '" title="Add Champagne, Caviar or Tasting Courses" style="color:#6B21A8;border-color:#E9D5FF;">' + RH.icon('wine') + 'Pre-Order Courses</button>'
              : '') +
            '<button class="tool-btn" data-split="' + b.id + '" title="Split cost per person with friends">' + RH.icon('share-2') + 'Split Bill</button>' +
            '<button class="tool-btn" data-contact="' + b.id + '" title="Call host or view map directions">' + RH.icon('phone') + 'Host &amp; Map</button>' +
            (b.status === 'Confirmed'
              ? '<button class="tool-btn" data-ics="' + b.id + '" title="Download Calendar (.ics)">' + RH.icon('calendar') + '.ICS</button>'
              : '');

          var primaryAction = (b.status === 'Confirmed' || b.status === 'Pending')
            ? '<button class="btn btn-danger-outline btn-sm" data-cancel="' + b.id + '">Cancel</button>'
            : '<button class="btn btn-primary btn-sm" data-rebook="' + b.id + '">' + (b.status === 'Completed' ? 'Write Review / Rebook' : 'Rebook Table') + ' ' + RH.icon('chevron-right', 'icon-sm') + '</button>';

          return (
            '<article class="booking-card anim-up" data-open-booking="' + b.id + '" role="button" tabindex="0">' +
              '<div class="bc-statusbar">' +
                '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
                  '<span class="ref-chip">Ref: ' + b.refNumber + '</span>' +
                  '<span class="countdown-chip ' + cd.cls + '">' + cd.text + '</span>' +
                '</div>' +
                '<div style="display:flex;align-items:center;gap:12px;">' +
                  '<span class="status-pill st-' + b.status.toLowerCase() + '">' + b.status + '</span>' +
                  '<span class="bc-viewhint">View Details ' + RH.icon('chevron-right', 'icon-sm') + '</span>' +
                '</div>' +
              '</div>' +

              '<div class="bc-main">' +
                '<div class="bc-row">' +
                  '<div class="bc-venue">' +
                    '<img class="bc-thumb" src="' + b.venueImage + '" alt="' + b.venueName + '" data-open-venue-thumb="' + venueBtn + '">' +
                    '<div class="bc-info">' +
                      '<div style="display:flex;gap:6px;flex-wrap:wrap;">' +
                        '<span class="neutral-chip">' + (b.occasion || 'Dining Table') + '</span>' +
                        (b.tableNumber ? '<span class="badge" style="letter-spacing:0;">' + b.tableNumber + '</span>' : '') +
                      '</div>' +
                      '<h2 class="bc-title clamp1" data-open-venue-title="' + venueBtn + '">' + b.venueName + '</h2>' +
                      '<div class="bc-meta">' +
                        '<span class="cal" style="display:inline-flex;gap:4px;align-items:center;">' + RH.icon('calendar', 'icon-sm') + b.date + '</span>' +
                        '<span style="display:inline-flex;gap:4px;align-items:center;">' + RH.icon('clock', 'icon-sm') + b.time + '</span>' +
                        '<span style="display:inline-flex;gap:4px;align-items:center;">' + RH.icon('users', 'icon-sm') + b.guests + ' Guests</span>' +
                      '</div>' +
                      '<p class="micro t-faint truncate" style="display:flex;gap:4px;align-items:center;">' + RH.icon('map-pin', 'icon-sm') + b.location + '</p>' +
                    '</div>' +
                  '</div>' +
                  '<div class="bc-pricebox" data-noclick>' +
                    '<span class="vc-price-label">Total Paid / Deposit</span>' +
                    '<strong style="font-size:19px;color:var(--burgundy);display:block;">$' + b.totalPaid + '</strong>' +
                    '<span class="micro" style="color:#047857;font-weight:800;display:block;">✓ Paid Online</span>' +
                    '<button class="btn btn-sm" style="margin-top:6px;background:var(--cream);border:1px solid rgba(122,31,43,.32);color:var(--burgundy);" data-pass="' + b.id + '">' + RH.icon('qr-code', 'icon-sm') + ' Dining Pass</button>' +
                  '</div>' +
                '</div>' +

                trackerHtml(b.status) +

                (chips ? '<div style="border-top:1px solid #F1F5F9;padding-top:10px;display:flex;flex-wrap:wrap;align-items:center;gap:6px;">' + chips + '</div>' : '') +

                '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;border-top:1px solid rgba(212,163,115,.22);padding-top:12px;" data-noclick>' +
                  '<div class="bc-tools">' + confirmedTools + '</div>' +
                  '<div style="margin-left:auto;">' + primaryAction + '</div>' +
                '</div>' +
              '</div>' +
            '</article>'
          );
        }).join('') + '</div>';
      }

      function syncTabs() {
        document.querySelectorAll('#tab-seg .tab-seg').forEach(function (t) {
          t.classList.toggle('is-active', t.getAttribute('data-tab') === ui.tab);
        });
      }
      function syncStatus() {
        document.querySelectorAll('#status-row .status-filter').forEach(function (t) {
          t.classList.toggle('is-active', t.getAttribute('data-status') === ui.status);
        });
      }

      paintMetrics(); paintList();

      /* ---------------- bindings ---------------- */
      document.getElementById('tab-seg').addEventListener('click', function (e) {
        var t = e.target.closest('[data-tab]');
        if (!t) return;
        ui.tab = t.getAttribute('data-tab'); syncTabs(); paintList();
      });
      document.getElementById('status-row').addEventListener('click', function (e) {
        var t = e.target.closest('[data-status]');
        if (!t) return;
        ui.status = t.getAttribute('data-status'); syncStatus(); paintList();
      });
      document.getElementById('bk-search').addEventListener('input', function (e) { ui.query = e.target.value; paintList(); });
      document.getElementById('bk-sort').addEventListener('change', function (e) { ui.sort = e.target.value; paintList(); });

      var findBooking = function (id) {
        return store.get('bookings').filter(function (b) { return b.id === id; })[0];
      };

      /* Card-level interactions */
      document.getElementById('booking-list-wrap').addEventListener('click', function (e) {
        /* stopPropagation zones */
        if (e.target.closest('[data-noclick]')) {
          handleTool(e);
          return;
        }
        var thumb = e.target.closest('[data-open-venue-thumb]');
        if (thumb) {
          var vid = thumb.getAttribute('data-open-venue-thumb');
          if (RH.utils.findVenue(vid)) RH.openVenue(vid, 'U03'); else RH.router.navigate('U02');
          return;
        }
        var title = e.target.closest('[data-open-venue-title]');
        if (title) {
          var vid2 = title.getAttribute('data-open-venue-title');
          if (RH.utils.findVenue(vid2)) RH.openVenue(vid2, 'U03'); else RH.router.navigate('U02');
          return;
        }
        handleTool(e);

        var card = e.target.closest('[data-open-booking]');
        if (card) {
          var bid = card.getAttribute('data-open-booking');
          store.patch({ selectedBookingId: bid });
          RH.router.navigate('U09');
        }
      });

      function handleTool(e) {
        var sel;
        if ((sel = e.target.closest('[data-reschedule]'))) {
          var b1 = findBooking(sel.getAttribute('data-reschedule'));
          if (b1) RH.openRescheduleModal(b1, function (patch) { updateBooking(Object.assign({}, b1, patch)); });
          e.stopPropagation(); return;
        }
        if ((sel = e.target.closest('[data-cancel]'))) {
          var b2 = findBooking(sel.getAttribute('data-cancel'));
          if (b2) RH.openCancelModal(b2, function (id) {
            patchBooking(id, { status: 'Cancelled' });
            RH.toast('Reservation cancelled. Refund initiated.');
          });
          e.stopPropagation(); return;
        }
        if ((sel = e.target.closest('[data-pass]'))) {
          var b3 = findBooking(sel.getAttribute('data-pass'));
          if (b3) RH.openDiningPassModal(b3);
          e.stopPropagation(); return;
        }
        if ((sel = e.target.closest('[data-ics]'))) {
          var b4 = findBooking(sel.getAttribute('data-ics'));
          if (b4) RH.downloadBookingIcs(b4, RH.toast);
          e.stopPropagation(); return;
        }
        if ((sel = e.target.closest('[data-rebook]'))) {
          var b5 = findBooking(sel.getAttribute('data-rebook'));
          if (b5 && RH.utils.findVenue(b5.venueId)) RH.openVenue(b5.venueId, 'U03'); else RH.router.navigate('U02');
          e.stopPropagation(); return;
        }
        if ((sel = e.target.closest('[data-requests]'))) {
          openRequestsModal(findBooking(sel.getAttribute('data-requests')));
          e.stopPropagation(); return;
        }
        if ((sel = e.target.closest('[data-addons]'))) {
          openAddonsModal(findBooking(sel.getAttribute('data-addons')));
          e.stopPropagation(); return;
        }
        if ((sel = e.target.closest('[data-split]'))) {
          openSplitModal(findBooking(sel.getAttribute('data-split')));
          e.stopPropagation(); return;
        }
        if ((sel = e.target.closest('[data-contact]'))) {
          openContactModal(findBooking(sel.getAttribute('data-contact')));
          e.stopPropagation(); return;
        }
      }

      function patchBooking(id, patch) {
        var bookings = store.get('bookings').map(function (b) {
          return b.id === id ? Object.assign({}, b, patch) : b;
        });
        store.patch({ bookings: bookings });
        paintMetrics(); paintList();
      }
      function updateBooking(updated) {
        patchBooking(updated.id, updated);
        RH.toast('Booking for ' + updated.venueName + ' successfully updated!');
      }

      /* Special Requests modal */
      function openRequestsModal(b) {
        if (!b) return;
        var occOpts = RH.OCCASIONS.map(function (o) {
          return '<option' + ((b.occasion || 'Casual Dining') === o ? ' selected' : '') + '>' + o + '</option>';
        }).join('');
        var diets = RH.DIETARY_OPTIONS.map(function (d) {
          var on = (b.dietaryRestrictions || []).indexOf(d) !== -1;
          return '<button type="button" class="diet-chip' + (on ? ' is-active' : '') + '" data-diet="' + d + '">' + (on ? '✓ ' : '+ ') + d + '</button>';
        }).join('');
        RH.openModal(
          '<div class="modal-head"><div><h3>Special Requests &amp; Dietary</h3><p class="small t-muted">' + b.venueName + '</p></div>' +
          '<button class="modal-close" data-modal-close>' + RH.icon('x', 'icon-lg') + '</button></div>' +
          '<form class="modal-body" id="req-form">' +
            '<div class="field"><label>Dining Occasion</label><select id="rq-occ" class="select">' + occOpts + '</select></div>' +
            '<div class="field"><label>Dietary Restrictions &amp; Allergies</label><div style="display:flex;flex-wrap:wrap;gap:6px;" id="rq-diets">' + diets + '</div></div>' +
            '<div class="field"><label>Notes for Maître d\' &amp; Executive Chef</label>' +
              '<textarea id="rq-notes" class="textarea" rows="3" placeholder="e.g. Quiet corner table requested, anniversary candle on dessert...">' + (b.specialRequests || '') + '</textarea></div>' +
            '<div class="modal-foot"><button type="button" class="btn btn-ghost" data-modal-close>Cancel</button>' +
            '<button type="submit" class="btn btn-primary">Update Requests</button></div>' +
          '</form>'
        );
        var picked = (b.dietaryRestrictions || []).slice();
        document.getElementById('rq-diets').addEventListener('click', function (e) {
          var chip = e.target.closest('[data-diet]');
          if (!chip) return;
          var d = chip.getAttribute('data-diet');
          var i = picked.indexOf(d);
          if (i === -1) { picked.push(d); chip.classList.add('is-active'); chip.textContent = '✓ ' + d; }
          else { picked.splice(i, 1); chip.classList.remove('is-active'); chip.textContent = '+ ' + d; }
        });
        document.getElementById('req-form').addEventListener('submit', function (ev) {
          ev.preventDefault();
          updateBooking(Object.assign({}, b, {
            occasion: document.getElementById('rq-occ').value,
            specialRequests: document.getElementById('rq-notes').value,
            dietaryRestrictions: picked
          }));
          RH.toast('Special requests & preferences updated for kitchen & host.');
          RH.closeActiveModal();
        });
      }

      /* Addons modal */
      function openAddonsModal(b) {
        if (!b) return;
        var draft = {};
        (b.preOrderedAddons || []).forEach(function (a) { draft[a.id] = a.quantity; });

        function addonRow(a) {
          var qty = draft[a.id] || 0;
          return (
            '<div class="addon-row" data-addon="' + a.id + '">' +
              '<div style="display:flex;align-items:center;gap:12px;">' +
                '<span style="font-size:24px;">' + a.icon + '</span>' +
                '<div><strong class="tiny" style="display:block;color:#334155;">' + a.name + '</strong>' +
                '<p class="micro t-muted">' + a.desc + '</p>' +
                '<strong class="tiny t-burgundy">+$' + a.price + '</strong></div>' +
              '</div>' +
              '<div>' + (qty > 0
                ? '<div class="qty-box"><button type="button" class="q-minus" data-delta="-1">' + RH.icon('minus', 'icon-sm') + '</button>' +
                  '<strong class="tiny" data-qty>' + qty + '</strong>' +
                  '<button type="button" class="q-plus" data-delta="1">' + RH.icon('plus', 'icon-sm') + '</button></div>'
                : '<button type="button" class="btn btn-ghost btn-sm" data-delta="1">' + RH.icon('plus', 'icon-sm') + ' Add</button>') + '</div>' +
            '</div>'
          );
        }
        function subtotalHtml() {
          var sum = 0;
          Object.keys(draft).forEach(function (id) {
            var a = RH.AVAILABLE_ADDONS.filter(function (x) { return x.id === id; })[0];
            if (a) sum += a.price * draft[id];
          });
          return sum;
        }

        RH.openModal(
          '<div class="modal-head"><div>' +
            '<div class="spot-label" style="color:var(--burgundy);display:flex;gap:5px;align-items:center;">' + RH.icon('sparkles', 'icon-sm') + 'Table Experience Add-ons</div>' +
            '<h3>Pre-Order Food &amp; Amenities</h3></div>' +
          '<button class="modal-close" data-modal-close>' + RH.icon('x', 'icon-lg') + '</button></div>' +
          '<div class="modal-body wide" style="max-height:56vh;overflow-y:auto;">' +
            '<p class="tiny t-muted">Items pre-ordered here will be billed to your table and prepared by the sommelier and kitchen prior to your arrival.</p>' +
            '<div class="stack" style="gap:10px;" id="addons-list">' +
              RH.AVAILABLE_ADDONS.map(addonRow).join('') + '</div>' +
          '</div>' +
          '<div style="background:var(--cream);border-top:1px solid rgba(212,163,115,.32);padding:14px 20px;display:flex;align-items:center;justify-content:space-between;gap:10px;border-radius:0 0 var(--r-2xl) var(--r-2xl);">' +
            '<div><span class="micro t-faint bold uppercase" style="display:block;">Add-ons Subtotal</span>' +
            '<strong style="color:var(--burgundy);font-size:16px;" id="addons-total">+$' + subtotalHtml() + '</strong></div>' +
            '<div style="display:flex;gap:8px;"><button class="btn btn-ghost btn-sm" data-modal-close>Cancel</button>' +
            '<button class="btn btn-primary btn-sm" id="addons-save">Confirm &amp; Save Courses</button></div>' +
          '</div>',
          { wide: true }
        );

        document.getElementById('addons-list').addEventListener('click', function (e) {
          var btn = e.target.closest('[data-delta]');
          if (!btn) return;
          var row = btn.closest('[data-addon]');
          var id = row.getAttribute('data-addon');
          var delta = Number(btn.getAttribute('data-delta'));
          draft[id] = Math.max(0, (draft[id] || 0) + delta);
          if (draft[id] === 0) delete draft[id];

          var a = RH.AVAILABLE_ADDONS.filter(function (x) { return x.id === id; })[0];
          var holder = document.createElement('div');
          holder.innerHTML = addonRow(a);
          row.replaceWith(holder.firstChild);

          document.getElementById('addons-total').textContent = '+$' + subtotalHtml();
        });

        document.getElementById('addons-save').addEventListener('click', function () {
          var oldTotal = (b.preOrderedAddons || []).reduce(function (s, a) { return s + a.price * a.quantity; }, 0);
          var newAddons = Object.keys(draft).map(function (id) {
            var a = RH.AVAILABLE_ADDONS.filter(function (x) { return x.id === id; })[0];
            return { id: id, name: a.name, price: a.price, quantity: draft[id] };
          });
          var newSum = newAddons.reduce(function (s, a) { return s + a.price * a.quantity; }, 0);
          updateBooking(Object.assign({}, b, {
            preOrderedAddons: newAddons,
            totalPaid: b.totalPaid - oldTotal + newSum
          }));
          RH.toast('Pre-ordered courses & amenities updated successfully!');
          RH.closeActiveModal();
        });
      }

      /* Split bill modal */
      function openSplitModal(b) {
        if (!b) return;
        var guests = b.guests || 2;
        var tip = 10;
        RH.openModal(
          '<div class="modal-head"><div><h3>Split Reservation Bill</h3><p class="small t-muted">' + b.venueName + '</p></div>' +
          '<button class="modal-close" data-modal-close>' + RH.icon('x', 'icon-lg') + '</button></div>' +
          '<div class="modal-body">' +
            '<div class="field"><label>Number of Diners Splitting</label>' +
              '<div class="stepper"><button type="button" id="sp-minus">' + RH.icon('minus', 'icon-sm') + '</button>' +
              '<strong id="sp-guests">' + guests + ' Persons</strong>' +
              '<button type="button" id="sp-plus">' + RH.icon('plus', 'icon-sm') + '</button></div></div>' +
            '<div class="field"><label>Add Gratuity / Service Tip</label><div class="tip-grid" id="tip-grid">' +
              [0, 10, 15, 20].map(function (t) {
                return '<button type="button" class="slot' + (t === tip ? ' is-active' : '') + '" data-tip="' + t + '">' + (t === 0 ? 'No Tip' : t + '%') + '</button>';
              }).join('') + '</div></div>' +
            '<div class="summary-box stack" style="gap:4px;" id="split-calc"></div>' +
            '<button class="btn btn-primary btn-block" id="copy-split">' + RH.icon('copy', 'icon-sm') + 'Copy Share Breakdown for Group Chat</button>' +
          '</div>'
        );
        var calc = function () {
          var tipAmt = b.totalPaid * tip / 100;
          var grand = b.totalPaid + tipAmt;
          var per = (grand / guests).toFixed(2);
          document.getElementById('split-calc').innerHTML =
            '<div class="sum-row"><span>Base Bill Deposit:</span><strong>$' + b.totalPaid.toFixed(2) + '</strong></div>' +
            '<div class="sum-row"><span>Gratuity (' + tip + '%):</span><strong>+$' + tipAmt.toFixed(2) + '</strong></div>' +
            '<div class="sum-row" style="border-top:1px solid #E2E8F0;padding-top:8px;"><span class="bold">Total Spend:</span><strong>$' + grand.toFixed(2) + '</strong></div>' +
            '<div class="sum-row" style="border-top:1px dashed rgba(212,163,115,.45);padding-top:8px;color:var(--burgundy);"><span class="bold">Each Person Pays:</span><span class="split-total">$' + per + '</span></div>';
          return { tipAmt: tipAmt, grand: grand, per: per };
        };
        calc();
        document.getElementById('sp-minus').addEventListener('click', function () { guests = Math.max(1, guests - 1); document.getElementById('sp-guests').textContent = guests + ' Persons'; calc(); });
        document.getElementById('sp-plus').addEventListener('click', function () { guests = Math.min(20, guests + 1); document.getElementById('sp-guests').textContent = guests + ' Persons'; calc(); });
        document.getElementById('tip-grid').addEventListener('click', function (e) {
          var t = e.target.closest('[data-tip]');
          if (!t) return;
          tip = Number(t.getAttribute('data-tip'));
          this.querySelectorAll('.slot').forEach(function (s) { s.classList.remove('is-active'); });
          t.classList.add('is-active');
          calc();
        });
        document.getElementById('copy-split').addEventListener('click', function () {
          var r = calc();
          var text = '🍽️ Reservation Bill Share for ' + b.venueName + ' on ' + b.date + ' (' + b.time + '): Total: $' + r.grand.toFixed(2) + ' ($' + b.totalPaid + ' + $' + r.tipAmt.toFixed(2) + ' tip). Per person (' + guests + ' diners): $' + r.per + '. Booking Ref: ' + b.refNumber;
          if (navigator.clipboard) navigator.clipboard.writeText(text);
          RH.toast('Copied split details to clipboard! Ready to paste to your group chat.');
        });
      }

      /* Contact venue modal */
      function openContactModal(b) {
        if (!b) return;
        RH.openModal(
          '<div class="modal-head"><div><h3>Venue Concierge &amp; Directions</h3><p class="small t-muted">' + b.venueName + '</p></div>' +
          '<button class="modal-close" data-modal-close>' + RH.icon('x', 'icon-lg') + '</button></div>' +
          '<div class="modal-body">' +
            '<div class="next-step" style="display:flex;gap:10px;align-items:flex-start;background:var(--cream);">' +
              RH.icon('phone') + '<div><b>Direct Maître d\' Hotline</b><br>+95 1 230 4567 / +95 9 789 123 456<br>' +
              '<span class="micro" style="color:#047857;font-weight:800;">● Lines Open Daily: 10:00 AM – 11:30 PM</span></div></div>' +
            '<div class="next-step" style="display:flex;gap:10px;align-items:flex-start;background:var(--cream);">' +
              RH.icon('map-pin') + '<div><b>Physical Address &amp; Access</b><br>' + b.location + ', Yangon, Myanmar<br>' +
              '<span class="micro t-muted">Complimentary Valet Parking Available at Gate 1</span></div></div>' +
            '<div class="modal-foot">' +
              '<a class="btn btn-primary" target="_blank" rel="noopener" href="https://maps.google.com/?q=' + encodeURIComponent(b.venueName + ' ' + b.location) + '">' + RH.icon('navigation', 'icon-sm') + ' Open Google Maps</a>' +
              '<button class="btn btn-ghost" id="copy-phone">Copy Phone</button>' +
            '</div>' +
          '</div>'
        );
        document.getElementById('copy-phone').addEventListener('click', function () {
          if (navigator.clipboard) navigator.clipboard.writeText('+95 1 230 4567');
          RH.toast('Phone number copied to clipboard!');
        });
      }
    }
  });
})(window.RH = window.RH || {});
