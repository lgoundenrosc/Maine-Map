/* Shared render helpers. Chips, callouts, inset boxes, accordion cards.
   Everything here is presentation only. No content lives in this file. */
(function (global) {
  'use strict';

  var D = global.RoscData;

  function esc(s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function attr(s) { return esc(s); }

  /* ------------------------------------------------------------- chips --- */

  function opennessChip(v) {
    if (!v) return '';
    return '<span class="chip chip-' + esc(v) + '" title="Openness to an outside company">' + esc(v) + '</span>';
  }

  function heatChip(v) {
    if (!v) return '';
    return '<span class="chip chip-' + esc(v) + '" title="Cluster heat">' + esc(v) + '</span>';
  }

  function depthTag(v) {
    if (!v) return '';
    return '<span class="depth" title="Qualitative depth of Maine’s base in this cluster. No dollar sizing is rendered because Maine holds no budget authority.">' + esc(v) + '</span>';
  }

  function accreditationChip(v, note) {
    if (!v) return '';
    var cls = 'chip-acc-na', label = v;
    if (v === 'ISO 17025') cls = 'chip-acc-iso';
    else if (v === 'UNACCREDITED') cls = 'chip-acc-un';
    else if (v === 'CONTAMINATED') cls = 'chip-acc-cont';
    var t = note ? ' title="' + attr(note) + '"' : '';
    return '<span class="chip ' + cls + '"' + t + '>' + esc(label) + '</span>';
  }

  function contaminatedChip() {
    return '<span class="chip chip-acc-cont" title="Sited in the Brunswick Landing hangar complex covered by the August 2024 AFFF release. Remediation status unconfirmed.">CONTAMINATED</span>';
  }

  /* Confidence. verified renders nothing at all, by design. */
  function confidenceChip(c, note, asOf) {
    if (!c || c === 'verified') return '';
    if (c === 'unverified') {
      return '<span class="chip chip-unverified" title="' + attr(note || 'unconfirmed') + '">UNVERIFIED</span>';
    }
    if (c === 'stale') {
      var y = (asOf || '').slice(0, 4);
      return '<span class="chip chip-stale" title="' + attr(note || ('Source may have changed. Last known good ' + (y || 'date unconfirmed') + '.')) + '">STALE</span>';
    }
    return '<span class="chip chip-gap" title="' + attr(note || 'Listed in the verification gaps table') + '">NOT CONFIRMED</span>';
  }

  /* Where the SOCOM map would show a contact string and Maine has none. */
  function emptyState(label) {
    return '<span class="empty-state" title="Listed in the verification gaps table">' + esc(label || 'not yet confirmed') + '</span>';
  }

  /* --------------------------------------------------------- inset boxes -- */

  function inset(kind, label, html) {
    var cls = {
      grey: 'inset-grey', vc: 'inset-vc', entry: 'inset-entry',
      white: 'inset-white', constraint: 'inset-constraint', scope: 'inset-scope'
    }[kind] || 'inset-grey';
    return '<div class="inset ' + cls + '">' +
      '<span class="inset-label">' + esc(label) + '</span>' + html + '</div>';
  }

  function vcRead(text) { return text ? inset('vc', 'VC READ', '<p>' + esc(text) + '</p>') : ''; }
  function vcAngle(text) { return text ? inset('vc', 'VC ANGLE', '<p>' + esc(text) + '</p>') : ''; }
  function whiteSpace(text) { return text ? inset('white', 'VC WHITE SPACE', '<p>' + esc(text) + '</p>') : ''; }
  function constraint(text) { return text ? inset('constraint', 'MAINE CONSTRAINT', '<p>' + esc(text) + '</p>') : ''; }

  function entryPoints(list) {
    var html = '';
    if (list && list.length) {
      html += '<div class="entry-list">' + list.map(function (e) {
        return esc(e.value) + (e.confidence && e.confidence !== 'verified' ? ' ' + confidenceChip(e.confidence, e.note) : '');
      }).join('<span class="sep">·</span>') + '</div>';
    }
    if (!html) html = emptyState('not yet confirmed');
    return inset('entry', 'Entry points', html);
  }

  function programsAndDeals(list) {
    if (!list || !list.length) return '';
    return inset('grey', 'PROGRAMS & DEALS', '<ul>' + list.map(function (p) {
      return '<li>' + esc(p.text) + ' ' + confidenceChip(p.confidence, p.note, p.asOf) + '</li>';
    }).join('') + '</ul>');
  }

  function factRows(facts) {
    if (!facts || !facts.length) return '';
    return '<div class="facts">' + facts.map(function (f) {
      var val = f.value
        ? '<span class="fact-val">' + esc(f.value) + ' ' + confidenceChip(f.confidence, f.note, f.asOf) + '</span>'
        : '<span class="fact-val">' + emptyState('not yet confirmed') + '</span>';
      return '<div class="fact-row"><span class="fact-key">' + esc(f.label) + '</span>' + val + '</div>';
    }).join('') + '</div>';
  }

  function sourceRefs(ids) {
    if (!ids || !ids.length) return '';
    var byId = {};
    (D.sources || []).forEach(function (s) { byId[s.id] = s; });
    return '<div class="src-refs">Sources: ' + ids.map(function (id) {
      var s = byId[id];
      var t = s ? (s.n + '. ' + s.title + ' (' + s.publisher + ', ' + s.date + ')') : id;
      return '<span class="src-ref" title="' + attr(t) + '">' + esc(s ? String(s.n) : id) + '</span>';
    }).join('') + '</div>';
  }

  /* ------------------------------------------------------------- cards ---- */

  var cardSeq = 0;

  /**
   * Accordion card. Collapsed shows tile, title, sub and a value or rating.
   * Expanded shows the body. Print forces every card open.
   */
  function card(opts) {
    var id = 'card-' + (++cardSeq);
    var tile = opts.tile
      ? '<span class="tile" style="background:' + attr(opts.tile.color) + '">' + esc(opts.tile.label) + '</span>' : '';
    var right = opts.right || '';
    return '<div class="card" data-entity="' + attr(opts.entityId || '') + '"' +
      (opts.filterData || '') + '>' +
      '<button class="card-head" type="button" aria-expanded="false" aria-controls="' + id + '">' +
        tile +
        '<span class="grow">' +
          '<span class="card-title">' + opts.title + '</span>' +
          (opts.sub ? '<span class="card-sub">' + opts.sub + '</span>' : '') +
        '</span>' +
        right +
        '<span class="chev" aria-hidden="true">▼</span>' +
      '</button>' +
      '<div class="card-body" id="' + id + '" hidden>' + opts.body + '</div>' +
    '</div>';
  }

  function valuePill(text, color) {
    if (!text) return '';
    var style = color ? ' style="background:' + attr(color) + '18;border-color:' + attr(color) + '55;color:' + attr(color) + '"' : '';
    return '<span class="value-pill"' + style + '>' + esc(text) + '</span>';
  }

  function locLine(loc) {
    if (!loc) return '';
    return '<span class="loc">' + esc(loc.town) + ' · ' +
      loc.lat.toFixed(4) + ', ' + loc.lng.toFixed(4) +
      ' <span title="All coordinates in this document are approximate">(' + esc(loc.precision) + ')</span></span>';
  }

  function bindAccordions(root) {
    root.querySelectorAll('.card-head').forEach(function (btn) {
      if (btn.dataset.bound) return;
      btn.dataset.bound = '1';
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!open));
        var body = document.getElementById(btn.getAttribute('aria-controls'));
        if (body) body.hidden = open;
        var ch = btn.querySelector('.chev');
        if (ch) ch.textContent = open ? '▼' : '▲';
      });
    });
  }

  global.RoscUI = {
    esc: esc, attr: attr,
    opennessChip: opennessChip, heatChip: heatChip, depthTag: depthTag,
    accreditationChip: accreditationChip, contaminatedChip: contaminatedChip,
    confidenceChip: confidenceChip, emptyState: emptyState,
    inset: inset, vcRead: vcRead, vcAngle: vcAngle, whiteSpace: whiteSpace,
    constraint: constraint, entryPoints: entryPoints, programsAndDeals: programsAndDeals,
    factRows: factRows, sourceRefs: sourceRefs, card: card, valuePill: valuePill,
    locLine: locLine, bindAccordions: bindAccordions
  };
})(window);
