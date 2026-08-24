/* Rendering primitives: chips, callouts, tables, blocks.
   No prose lives in this file. Every string a reader sees arrives from
   data/bundle.js, which is generated from the source markdown. The only
   strings authored here are interface labels. */

(function (global) {
  'use strict';

  /* ---------------------------------------------------------------- */
  /* Element helper                                                    */
  /* ---------------------------------------------------------------- */

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === null || v === undefined || v === false) return;
        if (k === 'class') node.className = v;
        else if (k === 'text') node.textContent = v;
        else if (k === 'html') node.innerHTML = v;
        else if (k.slice(0, 2) === 'on') node.addEventListener(k.slice(2), v);
        else node.setAttribute(k, v === true ? '' : v);
      });
    }
    (children || []).forEach(function (c) {
      if (c === null || c === undefined || c === false) return;
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return node;
  }

  function svgEl(tag, attrs, children) {
    var node = document.createElementNS('http://www.w3.org/2000/svg', tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === null || v === undefined || v === false) return;
        if (k.slice(0, 2) === 'on') node.addEventListener(k.slice(2), v);
        else node.setAttribute(k, v);
      });
    }
    (children || []).forEach(function (c) {
      if (c === null || c === undefined || c === false) return;
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return node;
  }

  /* ---------------------------------------------------------------- */
  /* Chips                                                             */
  /* ---------------------------------------------------------------- */

  function chip(text, cls) {
    return el('span', { class: 'chip ' + cls, text: text });
  }

  function heatChip(v) {
    if (!v) return null;
    var k = { HOT: 'heat-hot', OPEN: 'heat-open', WATCH: 'heat-watch' }[v.toUpperCase()] || 'heat-watch';
    return chip(v, k);
  }

  function depthChip(v) {
    return v ? chip('DEPTH: ' + v, 'depth') : null;
  }

  function healthChip(v) {
    if (!v) return null;
    var k = { STRONG: 'health-strong', ADEQUATE: 'health-adequate', LIMITED: 'health-limited' }[v.toUpperCase()];
    return k ? chip(v, k) : chip(v, 'depth');
  }

  function opennessChip(v) {
    if (!v) return null;
    var k = { HIGH: 'open-high', MED: 'open-med', LOW: 'open-low' }[v.toUpperCase()];
    return k ? chip(v, k) : chip(v, 'depth');
  }

  /* Accreditation. CONTAMINATED is the strongest red in the palette and is
     applied to the source's own term for the Brunswick Landing hangars. */
  function accreditationChip(v) {
    if (!v) return null;
    var V = v.toUpperCase().trim();
    if (V === 'PFAS SITE') return chip(v, 'acc-contaminated');
    if (V === 'CONTAMINATED') return chip(v, 'acc-contaminated');
    if (V.indexOf('ISO 17025') === 0) return chip(v, 'acc-iso');
    if (V === 'NOT CONFIRMED' || V === 'N/A') return chip(v, 'acc-none');
    if (V === 'RESTRICTED') return chip(v, 'acc-restricted');
    return chip(v, 'acc-other');
  }

  function confidenceChip(v) {
    if (!v) return null;
    var V = v.toUpperCase().trim();
    if (V === 'VERIFIED') return chip(v, 'conf-verified');
    if (V === 'NOT CONFIRMED') return chip(v, 'conf-empty');
    if (V === 'COMPANY-SUPPLIED') return chip(v, 'conf-supplied');
    return chip(v, 'conf-unverified');
  }

  /* A confidence marker lifted out of the prose by the parser. */
  function markerChip(run) {
    var tone = { verified: 'conf-verified', empty: 'conf-empty', supplied: 'conf-supplied' }[run.tone] || 'conf-unverified';
    return el('span', { class: 'chip ' + tone + ' marker', text: run.v, title: 'Confidence marker carried from the source' });
  }

  /* ---------------------------------------------------------------- */
  /* Runs                                                              */
  /* ---------------------------------------------------------------- */

  function appendRuns(parent, runs) {
    (runs || []).forEach(function (r) {
      if (r.t === 'marker') parent.appendChild(markerChip(r));
      else parent.appendChild(document.createTextNode(r.v));
    });
    return parent;
  }

  function runsText(runs) {
    return (runs || []).map(function (r) { return r.t === 'marker' ? '[' + r.v + ']' : r.v; }).join('');
  }

  /* ---------------------------------------------------------------- */
  /* Callouts                                                          */
  /* ---------------------------------------------------------------- */

  function callout(c) {
    var box = el('div', { class: 'callout cs-' + c.scheme });
    box.appendChild(el('span', { class: 'clabel', text: c.label }));
    (c.paragraphs || []).forEach(function (p) {
      box.appendChild(appendRuns(el('p'), p.runs));
    });
    return box;
  }

  /* ---------------------------------------------------------------- */
  /* Tables                                                            */
  /* ---------------------------------------------------------------- */

  var MONO_HEADERS = /^(location|size|value|position|scale|term|stage|accreditation|confidence|health|access)$/i;

  function cellFor(header, cell, isFirst) {
    var h = (header || '').toLowerCase().trim();
    var raw = cell.raw;

    if (h === 'health') {
      var hc = healthChip(raw);
      if (hc) return el('td', { class: 'chipcell' }, [hc]);
    }
    if (h === 'confidence') {
      var cc = confidenceChip(raw);
      if (cc) return el('td', { class: 'chipcell' }, [cc]);
    }
    if (h === 'accreditation') {
      var ac = accreditationChip(raw);
      if (ac) return el('td', { class: 'chipcell' }, [ac]);
    }

    var cls = isFirst ? 'first' : (MONO_HEADERS.test(h) ? 'mono' : '');
    return appendRuns(el('td', { class: cls }), cell.runs);
  }

  function table(t, caption) {
    var kids = [];
    if (!t.headerless) {
      kids.push(el('thead', null, [
        el('tr', null, t.headers.map(function (h) { return el('th', { text: h }); }))
      ]));
    }
    kids.push(el('tbody', null, t.rows.map(function (cells) {
      return el('tr', null, cells.map(function (c, i) {
        return cellFor(t.headerless ? '' : t.headers[i], c, i === 0);
      }));
    })));
    var wrap = el('div', { class: 'tablewrap' }, [el('table', { class: 'data' }, kids)]);
    if (!caption) return wrap;
    return el('div', null, [el('p', { class: 'table-caption', text: caption }), wrap]);
  }

  /* ---------------------------------------------------------------- */
  /* Generic blocks                                                    */
  /* ---------------------------------------------------------------- */

  function block(b) {
    switch (b.type) {
      case 'para':
        return appendRuns(el('p', { class: 'prose' }), b.runs);

      case 'meta':
        return el('p', { class: 'metastrip' }, b.parts.map(function (p) {
          return el('span', { text: p });
        }));

      case 'rating':
        return el('div', { class: 'chiprow' }, [heatChip(b.heat), depthChip(b.depth)]);

      case 'openness':
        return el('div', { class: 'chiprow' }, [
          opennessChip(b.level),
          el('span', { class: 'metastrip', style: 'margin:0' }, [el('span', { text: b.contact })])
        ]);

      case 'callout':
        return callout(b);

      case 'table':
        return table(b);

      default:
        return null;
    }
  }

  function blocks(list) {
    var frag = document.createDocumentFragment();
    (list || []).forEach(function (b) {
      var node = block(b);
      if (node) frag.appendChild(node);
    });
    return frag;
  }

  function entry(e) {
    var wrap = el('div', { class: 'card' });
    wrap.appendChild(el('h4', { class: 'entry-title', text: e.title }));
    wrap.appendChild(blocks(e.blocks));
    return wrap;
  }

  function subsection(sub, opts) {
    var frag = document.createDocumentFragment();
    var h = el('h3', { class: 'sub-title', id: sub.id });
    if (sub.num) h.appendChild(el('span', { class: 'n', text: sub.num }));
    h.appendChild(document.createTextNode(sub.title));
    frag.appendChild(h);
    frag.appendChild(blocks(sub.blocks));
    (sub.entries || []).forEach(function (e) { frag.appendChild(entry(e)); });
    return frag;
  }

  function section(s, opts) {
    opts = opts || {};
    var frag = document.createDocumentFragment();
    if (!opts.skipBlocks) frag.appendChild(blocks(s.blocks));
    (s.entries || []).forEach(function (e) { frag.appendChild(entry(e)); });
    (s.subsections || []).forEach(function (sub) {
      if (opts.skipSubsection && opts.skipSubsection(sub)) return;
      frag.appendChild(subsection(sub));
    });
    return frag;
  }

  global.R = {
    el: el, svgEl: svgEl, chip: chip,
    heatChip: heatChip, depthChip: depthChip, healthChip: healthChip,
    opennessChip: opennessChip, accreditationChip: accreditationChip,
    confidenceChip: confidenceChip,
    appendRuns: appendRuns, runsText: runsText,
    callout: callout, table: table,
    block: block, blocks: blocks, entry: entry, subsection: subsection, section: section
  };
})(window);
