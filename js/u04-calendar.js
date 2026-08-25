/* ReserveHub — U04 · Check Availability & Slot Selection */
(function (RH) {
  'use strict';

  RH.registerScreen('U04', {
    title: 'Check Availability',
    render: function (root) {
      var store = RH.store;
      var draft = store.get('draft') || {};
      var venue = RH.utils.findVenue(draft.venueId || store.get('selectedVenueId')) || store.get('venues')[0];

      if (!venue) {
        root.innerHTML =
          '<div class="empty-state"><h3>Please select a venue first.</h3>' +
          '<button class="btn btn-primary btn-sm" data-nav="U02">Explore Venues</button></div>';
        return;
      }

      /* Today and helper dates */
      var todayStr = '2026-08-25';
      var tomorrowStr = '2026-08-26';
      var fridayStr = '2026-08-28';
      var saturdayStr = '2026-08-29';

      var sel = {
        date: draft.date || todayStr,
        time: draft.time || (venue.slots[0] || '07:00 PM'),
        guests: Number(draft.guests) || 2,
        packageId: venue.packages && venue.packages.some(function (p) { return p.id === draft.packageId; })
          ? draft.packageId
          : (venue.packages && venue.packages[0] ? venue.packages[0].id : 'pkg-standard')
      };

      /* Slots Categorized for realistic availability checking */
      var allSlots = venue.slots || ['11:30 AM', '12:30 PM', '01:30 PM', '05:30 PM', '06:30 PM', '07:30 PM', '08:30 PM', '09:30 PM'];
      
      var serviceGroups = [
        {
          name: 'Lunch Service',
          icon: 'sun',
          timeRange: '11:30 AM – 02:30 PM',
          slots: allSlots.filter(function (s) {
            return s.indexOf('AM') !== -1 || s.indexOf('12:') !== -1 || s.indexOf('01:') !== -1 || s.indexOf('02:') !== -1;
          })
        },
        {
          name: 'Dinner Service',
          icon: 'moon',
          timeRange: '05:30 PM – 09:30 PM',
          slots: allSlots.filter(function (s) {
            return s.indexOf('05:') !== -1 || s.indexOf('06:') !== -1 || s.indexOf('07:') !== -1 || s.indexOf('08:') !== -1;
          })
        },
        {
          name: 'Late Evening',
          icon: 'sparkles',
          timeRange: '09:00 PM – 11:00 PM',
          slots: allSlots.filter(function (s) {
            return s.indexOf('09:') !== -1 || s.indexOf('10:') !== -1 || s.indexOf('11:') !== -1;
          })
        }
      ].filter(function (g) { return g.slots.length > 0; });

      /* Fallback if slots didn't match groups */
      if (serviceGroups.length === 0) {
        serviceGroups = [{ name: 'All Open Slots', icon: 'clock', timeRange: 'Service Hours', slots: allSlots }];
      }

      function currentPkg() {
        return (venue.packages || []).filter(function (p) { return p.id === sel.packageId; })[0] ||
          (venue.packages && venue.packages[0]) ||
          { id: 'pkg-standard', name: 'Standard Dining Reservation', price: venue.basePrice || 38, perText: '/ guest', includes: ['Reserved Table Seating', 'Welcome Drink'] };
      }

      function calcTotals() {
        var pkg = currentPkg();
        var baseTotal = pkg.price * sel.guests;
        var promoDiscount = Math.round(baseTotal * 0.15);
        var grandTotal = Math.max(0, baseTotal - promoDiscount);
        return {
          pkg: pkg,
          baseTotal: baseTotal,
          discount: promoDiscount,
          total: grandTotal
        };
      }

      function paintSummary() {
        var totals = calcTotals();
        var sumDate = document.getElementById('sum-date');
        var sumTime = document.getElementById('sum-time');
        var sumGuests = document.getElementById('sum-guests');
        var sumLine = document.getElementById('sum-line');
        var sumSubtotal = document.getElementById('sum-subtotal');
        var sumDiscount = document.getElementById('sum-discount');
        var sumGrand = document.getElementById('sum-grand');
        var barMeta = document.getElementById('bar-meta');
        var barTotal = document.getElementById('bar-total');

        if (sumDate) sumDate.textContent = sel.date;
        if (sumTime) sumTime.textContent = sel.time || 'Select a time slot';
        if (sumGuests) sumGuests.textContent = sel.guests + (sel.guests === 1 ? ' Guest' : ' Guests');
        if (sumLine) {
          sumLine.innerHTML =
            '<div style="display:flex;justify-content:space-between;align-items:center;">' +
              '<span class="tiny">' + totals.pkg.name + ' (' + sel.guests + ' × $' + totals.pkg.price + ')</span>' +
              '<strong class="tiny">$' + totals.baseTotal + '</strong>' +
            '</div>';
        }
        if (sumSubtotal) sumSubtotal.textContent = '$' + totals.baseTotal;
        if (sumDiscount) sumDiscount.textContent = '-$' + totals.discount;
        if (sumGrand) sumGrand.textContent = '$' + totals.total;

        if (barMeta) {
          barMeta.textContent = sel.date + ' · ' + (sel.time || 'No slot') + ' · ' + sel.guests + ' guests';
        }
        if (barTotal) {
          barTotal.textContent = '$' + totals.total + ' total';
        }

        document.querySelectorAll('.u04-continue').forEach(function (b) {
          b.disabled = !sel.time;
        });
      }

      root.innerHTML =
      '<div style="padding-bottom:90px;" class="page anim-up">' +

        /* Top navigation / Back to U03 */
        '<div class="flow-back" style="margin-bottom:18px;">' +
          '<button class="back-btn" id="btn-back-u03" data-nav-back="U03" aria-label="Back to Shop Profile" title="Back to Shop Profile">' +
            RH.icon('arrow-left') +
          '</button>' +
          '<div>' +
            '<div style="display:flex;align-items:center;gap:6px;">' +
              '<span class="badge" style="background:#FFF1F2;color:#9F1239;border:1px solid #FECDD3;font-size:11px;font-weight:700;">' +
                'Step 1 of 3: Check Availability' +
              '</span>' +
            '</div>' +
            '<h1 class="black" style="font-size:22px;color:var(--ink);margin-top:2px;">Check Availability &amp; Reserve Table</h1>' +
            '<p class="tiny t-muted" style="margin-top:2px;">' + venue.name + ' · ' + venue.location + '</p>' +
          '</div>' +
        '</div>' +

        '<div class="flow-layout">' +

          /* Left Steps Column */
          '<div class="stack" style="gap:20px;">' +

            /* Step 1: Date & Party Size */
            '<section class="step-panel stack" style="gap:16px;">' +
              '<div>' +
                '<h2><span class="step-num">1</span> Select Date &amp; Party Size</h2>' +
                '<p class="tiny t-muted" style="margin-top:3px;margin-left:34px;">Choose your dining date and party count to view live open tables.</p>' +
              '</div>' +

              /* Quick Date Filter Chips */
              '<div>' +
                '<label class="book-field-label" style="margin-bottom:8px;">' + RH.icon('calendar', 'icon-sm') + ' Quick Date Selection</label>' +
                '<div class="u04-quick-dates" id="u04-date-chips">' +
                  '<button type="button" class="u04-date-chip' + (sel.date === todayStr ? ' is-active' : '') + '" data-set-date="' + todayStr + '">Today (Aug 25)</button>' +
                  '<button type="button" class="u04-date-chip' + (sel.date === tomorrowStr ? ' is-active' : '') + '" data-set-date="' + tomorrowStr + '">Tomorrow (Aug 26)</button>' +
                  '<button type="button" class="u04-date-chip' + (sel.date === fridayStr ? ' is-active' : '') + '" data-set-date="' + fridayStr + '">This Friday (Aug 28)</button>' +
                  '<button type="button" class="u04-date-chip' + (sel.date === saturdayStr ? ' is-active' : '') + '" data-set-date="' + saturdayStr + '">This Saturday (Aug 29)</button>' +
                '</div>' +
              '</div>' +

              '<div class="filter-grid" style="gap:14px;">' +
                '<div class="field">' +
                  '<label for="pk-date">' + RH.icon('calendar', 'icon-sm') + ' Custom Reservation Date</label>' +
                  '<input type="date" id="pk-date" class="input" value="' + sel.date + '" min="' + todayStr + '">' +
                '</div>' +
                '<div class="field">' +
                  '<label for="pk-guests">' + RH.icon('users', 'icon-sm') + ' Number of Guests</label>' +
                  '<select id="pk-guests" class="select">' +
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12].map(function (n) {
                      return '<option value="' + n + '"' + (n === sel.guests ? ' selected' : '') + '>' + n + (n === 1 ? ' Guest (Solo Dining)' : (n === 2 ? ' Guests (Couples Table)' : (n >= 6 ? ' Guests (VIP Group)' : ' Guests'))) + '</option>';
                    }).join('') +
                  '</select>' +
                '</div>' +
              '</div>' +
            '</section>' +

            /* Step 2: Available Time Slots Matrix */
            '<section class="step-panel stack" style="gap:16px;">' +
              '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap;">' +
                '<div>' +
                  '<h2><span class="step-num">2</span> Select Dining Time Slot</h2>' +
                  '<p class="tiny t-muted" style="margin-top:3px;margin-left:34px;">Live availability updated in real-time with instant maître d\' confirmation.</p>' +
                '</div>' +
                '<span class="slots-avail-badge">' + allSlots.length + ' slots open</span>' +
              '</div>' +

              '<div class="stack" style="gap:16px;" id="u04-services-container">' +
                serviceGroups.map(function (group) {
                  return (
                    '<div style="background:#FAF8F5;border:1px solid var(--border-card);border-radius:12px;padding:14px;">' +
                      '<div class="u04-service-title">' +
                        RH.icon(group.icon, 'icon-sm') + ' ' + group.name +
                        '<span style="font-size:11px;font-weight:500;color:#64748B;margin-left:auto;text-transform:none;letter-spacing:0;">' + group.timeRange + '</span>' +
                      '</div>' +
                      '<div class="slots-btn-grid" style="grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px;">' +
                        group.slots.map(function (slotTime, sIdx) {
                          var isSelected = slotTime === sel.time;
                          var tag = sIdx === 0 ? '✓ Open' : (sIdx === 1 ? '🔥 Filling Fast' : '2 Left');
                          return (
                            '<button type="button" class="u04-slot-btn' + (isSelected ? ' is-selected' : '') + '" data-slot="' + slotTime + '">' +
                              '<span class="u04-slot-time">' + slotTime + '</span>' +
                              '<span class="u04-slot-tag">' + tag + '</span>' +
                            '</button>'
                          );
                        }).join('') +
                      '</div>' +
                    '</div>'
                  );
                }).join('') +
              '</div>' +
            '</section>' +

            /* Step 3: Experience Package Tier */
            '<section class="step-panel stack" style="gap:14px;">' +
              '<div>' +
                '<h2><span class="step-num">3</span> Choose Experience Package</h2>' +
                '<p class="tiny t-muted" style="margin-top:3px;margin-left:34px;">Select standard dining or upgrade to chef tasting tiers.</p>' +
              '</div>' +
              '<div class="stack" style="gap:12px;" id="pkg-list">' +
                (venue.packages || []).map(function (p) {
                  var active = p.id === sel.packageId;
                  return (
                    '<label class="pkg-card' + (active ? ' is-active' : '') + '" data-pkg="' + p.id + '" style="cursor:pointer;">' +
                      '<span style="display:flex;align-items:flex-start;gap:12px;">' +
                        '<input type="radio" name="u04-pkg"' + (active ? ' checked' : '') + ' style="margin-top:3px;">' +
                        '<span>' +
                          '<strong class="bold small" style="display:block;color:var(--ink);">' + p.name + '</strong>' +
                          '<span style="display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;">' +
                            p.includes.map(function (inc) {
                              return '<span class="badge" style="background:#F1F5F9;color:#334155;font-size:11px;padding:2px 8px;">✓ ' + inc + '</span>';
                            }).join('') +
                          '</span>' +
                        '</span>' +
                      '</span>' +
                      '<span class="t-burgundy bold" style="font-size:15px;white-space:nowrap;margin-left:auto;">$' + p.price + ' <small class="t-muted" style="font-weight:400;font-size:11.5px;">' + p.perText + '</small></span>' +
                    '</label>'
                  );
                }).join('') +
              '</div>' +
            '</section>' +

          '</div>' +

          /* Right Summary Aside */
          '<aside class="sticky-side">' +
            '<div class="summary-side stack" style="gap:16px;">' +
              '<div style="border-bottom:1px solid rgba(212,163,115,.25);padding-bottom:12px;">' +
                '<span class="badge" style="background:#FFF1F2;color:#9F1239;border:1px solid #FECDD3;font-size:11px;font-weight:700;margin-bottom:4px;display:inline-block;">' +
                  'Reservation Summary' +
                '</span>' +
                '<h2 style="font-size:18px;font-weight:800;color:var(--ink);margin-top:2px;">' + venue.name + '</h2>' +
                '<p class="tiny t-muted">' + venue.location + '</p>' +
              '</div>' +

              '<div class="summary-box stack" style="gap:6px;background:#FAF8F5;border-radius:10px;padding:12px;">' +
                '<div class="sum-row"><span style="display:inline-flex;align-items:center;gap:6px;color:#64748B;">' + RH.icon('calendar', 'icon-sm') + 'Date</span><strong id="sum-date" style="color:var(--ink);">' + sel.date + '</strong></div>' +
                '<div class="sum-row"><span style="display:inline-flex;align-items:center;gap:6px;color:#64748B;">' + RH.icon('clock', 'icon-sm') + 'Time Slot</span><strong id="sum-time" style="color:var(--burgundy);">' + sel.time + '</strong></div>' +
                '<div class="sum-row"><span style="display:inline-flex;align-items:center;gap:6px;color:#64748B;">' + RH.icon('users', 'icon-sm') + 'Party Size</span><strong id="sum-guests" style="color:var(--ink);">' + sel.guests + ' Guests</strong></div>' +
              '</div>' +

              '<div class="stack" style="gap:8px;">' +
                '<div id="sum-line"></div>' +
                '<div class="sum-row" style="color:#059669;font-weight:600;font-size:12.5px;">' +
                  '<span>Member Promo Discount (15%)</span>' +
                  '<span id="sum-discount">-$0</span>' +
                '</div>' +
                '<div class="sum-total" style="border-top:1px dashed #CBD5E1;padding-top:8px;margin-top:4px;">' +
                  '<span style="font-weight:800;font-size:15px;">Total Deposit</span>' +
                  '<span class="amount" id="sum-grand" style="font-size:22px;color:var(--burgundy);font-weight:900;">$0</span>' +
                '</div>' +
                '<p class="micro t-faint" style="margin-top:2px;">Includes VIP table hold &amp; instant maître d\' allocation.</p>' +
              '</div>' +

              '<button class="btn btn-primary btn-lg btn-block u04-continue" id="continue-desktop" style="background:var(--burgundy);color:#FFF;font-weight:800;padding:14px;border-radius:12px;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 4px 14px rgba(122,31,43,0.3);">' +
                RH.icon('user-check', 'icon-sm') + ' Continue to Guest Details ' + RH.icon('arrow-right', 'icon-sm') +
              '</button>' +

              '<div style="text-align:center;">' +
                '<p class="micro t-faint">' + RH.icon('shield-check', 'icon-sm') + ' 100% Free Cancellation up to 24h before visit</p>' +
              '</div>' +
            '</div>' +
          '</aside>' +

        '</div>' +

        /* Mobile Action Bar */
        '<div class="actionbar">' +
          '<div>' +
            '<span class="tiny t-muted" style="display:flex;align-items:center;gap:4px;">' +
              RH.icon('check-circle', 'icon-sm') + '<span id="bar-meta">' + sel.date + ' · ' + sel.time + '</span>' +
            '</span>' +
            '<strong style="color:var(--burgundy);font-size:16px;" id="bar-total">$0 total</strong>' +
          '</div>' +
          '<button class="btn btn-primary u04-continue" id="continue-mobile" style="background:var(--burgundy);font-weight:700;display:flex;align-items:center;gap:6px;padding:10px 18px;">' +
            'Continue (U05) ' + RH.icon('chevron-right', 'icon-sm') +
          '</button>' +
        '</div>' +

      '</div>';

      paintSummary();

      /* ---------------- Bindings & Event Handlers ---------------- */

      /* Date Input */
      var dateInput = document.getElementById('pk-date');
      if (dateInput) {
        dateInput.addEventListener('change', function (e) {
          sel.date = e.target.value;
          document.querySelectorAll('.u04-date-chip').forEach(function (c) {
            c.classList.toggle('is-active', c.getAttribute('data-set-date') === sel.date);
          });
          paintSummary();
        });
      }

      /* Quick Date Filter Chips */
      var chipsWrap = document.getElementById('u04-date-chips');
      if (chipsWrap) {
        chipsWrap.addEventListener('click', function (e) {
          var btn = e.target.closest('[data-set-date]');
          if (!btn) return;
          sel.date = btn.getAttribute('data-set-date');
          if (dateInput) dateInput.value = sel.date;
          chipsWrap.querySelectorAll('.u04-date-chip').forEach(function (c) { c.classList.remove('is-active'); });
          btn.classList.add('is-active');
          paintSummary();
        });
      }

      /* Guests Selector */
      var guestsSelect = document.getElementById('pk-guests');
      if (guestsSelect) {
        guestsSelect.addEventListener('change', function (e) {
          sel.guests = Number(e.target.value) || 2;
          paintSummary();
        });
      }

      /* Slot Selection Grid */
      var servicesContainer = document.getElementById('u04-services-container');
      if (servicesContainer) {
        servicesContainer.addEventListener('click', function (e) {
          var btn = e.target.closest('[data-slot]');
          if (!btn) return;
          sel.time = btn.getAttribute('data-slot');
          servicesContainer.querySelectorAll('.u04-slot-btn').forEach(function (b) { b.classList.remove('is-selected'); });
          btn.classList.add('is-selected');
          paintSummary();
        });
      }

      /* Package Selection */
      var pkgList = document.getElementById('pkg-list');
      if (pkgList) {
        pkgList.addEventListener('click', function (e) {
          var card = e.target.closest('[data-pkg]');
          if (!card) return;
          sel.packageId = card.getAttribute('data-pkg');
          pkgList.querySelectorAll('.pkg-card').forEach(function (c) {
            var active = c.getAttribute('data-pkg') === sel.packageId;
            c.classList.toggle('is-active', active);
            var radio = c.querySelector('input[type="radio"]');
            if (radio) radio.checked = active;
          });
          paintSummary();
        });
      }

      /* Continue to U05 (Guest Details) */
      function proceedToU05() {
        if (!sel.time) {
          RH.toast('Please select an available dining time slot');
          return;
        }
        var totals = calcTotals();
        store.patch({
          draft: {
            venueId: venue.id,
            date: sel.date,
            time: sel.time,
            guests: sel.guests,
            packageId: sel.packageId,
            packageName: totals.pkg.name,
            seating: 'Main Dining Room',
            dietary: [],
            addons: [],
            specialNotes: '',
            promoCode: 'MEMBER15',
            discount: totals.discount,
            baseTotal: totals.baseTotal,
            total: totals.total
          }
        });
        RH.router.navigate('U05');
      }

      var continueDesktop = document.getElementById('continue-desktop');
      if (continueDesktop) continueDesktop.addEventListener('click', proceedToU05);

      var continueMobile = document.getElementById('continue-mobile');
      if (continueMobile) continueMobile.addEventListener('click', proceedToU05);
    }
  });
})(window.RH = window.RH || {});
