/**
 * Place canonicalisation for the ecosystem map.
 *
 * The source records carry a free text `location.town` written for a reading
 * document, not for a rollup. Three things need resolving before towns can be
 * counted and plotted.
 *
 * 1. One municipality is spelled several ways. Brunswick Landing is the former
 *    naval air station inside the town of Brunswick, and Hangar 5 is a building
 *    on it. All three roll up to Brunswick and keep their sub-place label.
 * 2. Some records are not in a town at all. `Maine`, `Statewide` and `Coastal`
 *    are placeholders carrying invented coordinates so the old map could draw a
 *    dot. They are given a placement other than municipality and are listed
 *    rather than plotted. Nothing is placed on the map at a coordinate that was
 *    made up to satisfy a renderer.
 * 3. One record sits in New Hampshire. It stays on the map because it is inside
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
    'Statewide': { town: 'Statewide', placement: 'statewide' },
    'Coastal': { town: 'Gulf of Maine', placement: 'region' }
  },

  /** Where a municipality centre is drawn. Set from the most frequent
      coordinate in the source records rather than a gazetteer, so the map and
      the document cannot disagree. */
  centres: {
    'Brunswick': { lat: 43.9075, lng: -69.9628 },
    'Portland': { lat: 43.6591, lng: -70.2568 },
    'Orono': { lat: 44.9012, lng: -68.6698 },
    'East Boothbay': { lat: 43.8598, lng: -69.5983 },
    'Bangor': { lat: 44.8016, lng: -68.7712 }
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
    'These records are not plotted. The source gives them a statewide or ' +
    'regional remit rather than an address, and placing a dot would invent a ' +
    'precision the source does not carry.',

  attribution:
    'Coastline from OpenStreetMap contributors, ODbL. State boundaries from the US Census Bureau. ' +
    'Organisation coordinates are approximate town centres, for orientation only.'
};
