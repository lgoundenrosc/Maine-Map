/**
 * Place canonicalization for the ecosystem map.
 *
 * The source records carry a free text `location.town` written for a reading
 * document, not for a rollup. Three things need resolving before towns can be
 * counted and plotted.
 *
 * 1. One municipality is spelled several ways. Brunswick Landing is the former
 *    naval air station inside the town of Brunswick, and Hangar 5 is a building
 *    on it. All three roll up to Brunswick and keep their sub-place label.
 * 2. `Statewide` is a real fact about an organization's scope, not a gap, so it
 *    is plotted at Augusta, the state capital, using the same coordinate the
 *    source already records for other genuinely Augusta-based entries. The
 *    chip on each of these records still reads its original `Statewide` label
 *    so a reader is never told the organization is headquartered in Augusta,
 *    only that it is shown there as the seat of state government.
 * 3. `Maine` and `Coastal` are placeholders carrying invented coordinates so
 *    the old map could draw a dot. `Maine` means the source never named a
 *    town, and `Coastal` means it names a marine region instead of one. Both
 *    are given a placement other than municipality and are listed rather than
 *    plotted, since nothing should be placed on the map at a coordinate that
 *    was made up to satisfy a renderer.
 * 4. One record sits in New Hampshire. It stays on the map because it is inside
 *    the viewport and the test route matters, but it is not a Maine community
 *    and does not count toward one.
 */

window.RoscData = window.RoscData || {};

window.RoscData.places = {
  /** Source `town` string to canonical municipality, with an optional sub-place. */
  canonical: {
    'Brunswick Landing': { town: 'Brunswick', sub: 'Brunswick Landing' },
    'Hangar 5, Brunswick Landing': { town: 'Brunswick', sub: 'Hangar 5, Brunswick Landing' },
    'Thomaston and Camden': { town: 'Thomaston', sub: 'Thomaston and Camden' },
    'Durham, New Hampshire': { town: 'Durham, New Hampshire', placement: 'out-of-state' },
    'Maine': { town: 'No town recorded', placement: 'statewide' },
    'Statewide': { town: 'Augusta', sub: 'Statewide', placement: 'municipality' },
    'Coastal': { town: 'Gulf of Maine', placement: 'region' }
  },

  /** Where a municipality center is drawn. Set from the most frequent
      coordinate in the source records rather than a gazetteer, so the map and
      the document cannot disagree. Augusta reuses the coordinate the source
      already carries for its own genuinely Augusta-based records. */
  centers: {
    'Brunswick': { lat: 43.9075, lng: -69.9628 },
    'Portland': { lat: 43.6591, lng: -70.2568 },
    'Orono': { lat: 44.9012, lng: -68.6698 },
    'East Boothbay': { lat: 43.8598, lng: -69.5983 },
    'Bangor': { lat: 44.8016, lng: -68.7712 },
    'Augusta': { lat: 44.3106, lng: -69.7795 }
  },

  /** Rendered above the list of records that carry no municipality. */
  placementLabels: {
    municipality: 'Municipality',
    'out-of-state': 'Outside Maine',
    statewide: 'Statewide, no single location',
    region: 'Marine region, no single location',
    unplaced: 'No location recorded'
  },

  unplacedNote:
    'These records are not plotted. The source either never named a town, ' +
    'names a marine region rather than an address, or (for a few statewide ' +
    'financial instruments) carries no location at all. Placing a dot in ' +
    'any of these cases would invent a precision the source does not carry. ' +
    'This is separate from the statewide organizations shown at Augusta, ' +
    'the state capital, where the statewide remit itself is the fact on ' +
    'record.',

  attribution:
    'Coastline from OpenStreetMap contributors, ODbL. State boundaries from the US Census Bureau. ' +
    'Organization coordinates are approximate town centers, for orientation only.'
};
