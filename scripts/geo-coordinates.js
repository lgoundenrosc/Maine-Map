/*
 * Derived coordinates for the geographic view.
 *
 * EVERY coordinate in this file was derived from a place name that appears in
 * content/maine_map_content_v3.md. None of it is surveyed and none of it came
 * from the source document, which carries no coordinates at all. Everything
 * here ships tagged precision: "approximate" and the interface says so on the
 * map itself.
 *
 * Spot-check target: town centroid, roughly two decimal places of usable
 * accuracy. Anything finer is noise at the scale this map renders.
 *
 * A place is listed here only if its name appears in the source. Where the
 * source names a county rather than a town the entry is marked
 * countyLevel: true and the point is a county centroid.
 */

const PLACES = {
  'Augusta':            { lat: 44.311, lng: -69.780 },
  'Bangor':             { lat: 44.801, lng: -68.778 },
  'Bar Harbor':         { lat: 44.388, lng: -68.204 },
  'Bath':               { lat: 43.911, lng: -69.813 },
  'Belfast':            { lat: 44.426, lng: -69.007 },
  'Bethel':             { lat: 44.404, lng: -70.791 },
  'Biddeford':          { lat: 43.493, lng: -70.453 },
  'Brewer':             { lat: 44.796, lng: -68.762 },
  'Brunswick':          { lat: 43.915, lng: -69.966 },
  'Brunswick Landing':  { lat: 43.891, lng: -69.939 },
  'Castine':            { lat: 44.387, lng: -68.799 },
  'Damariscotta':       { lat: 44.033, lng: -69.519 },
  'Durham NH':          { lat: 43.134, lng: -70.926, outsideMaine: true },
  'East Boothbay':      { lat: 43.838, lng: -69.598 },
  'Eastport':           { lat: 44.906, lng: -66.990 },
  'Ellsworth':          { lat: 44.544, lng: -68.419 },
  'Gorham':             { lat: 43.679, lng: -70.444 },
  'Hanover NH':         { lat: 43.702, lng: -72.289, outsideMaine: true },
  'Kittery':            { lat: 43.089, lng: -70.744 },
  'Lewiston':           { lat: 44.101, lng: -70.215 },
  'Limestone':          { lat: 46.909, lng: -67.826 },
  'Machias':            { lat: 44.715, lng: -67.461 },
  'Millinocket':        { lat: 45.658, lng: -68.710 },
  'Newport':            { lat: 44.836, lng: -69.276 },
  'North Berwick':      { lat: 43.304, lng: -70.734 },
  'Orono':              { lat: 44.883, lng: -68.671 },
  'Portland':           { lat: 43.659, lng: -70.255 },
  'Presque Isle':       { lat: 46.681, lng: -68.016 },
  'Rangeley':           { lat: 44.966, lng: -70.644 },
  'Redington Township': { lat: 45.020, lng: -70.420 },
  'Rockland':           { lat: 44.104, lng: -69.109 },
  'Saco':               { lat: 43.501, lng: -70.443 },
  'Sanford':            { lat: 43.439, lng: -70.774 },
  'Searsport':          { lat: 44.463, lng: -68.926 },
  'South Portland':     { lat: 43.641, lng: -70.241 },
  'Waldoboro':          { lat: 44.093, lng: -69.376 },
  'Waterboro':          { lat: 43.536, lng: -70.720 },
  'Waterville':         { lat: 44.552, lng: -69.632 },
  'Westbrook':          { lat: 43.677, lng: -70.371 },
  'Yarmouth':           { lat: 43.801, lng: -70.187 },
  'Aroostook County':   { lat: 46.600, lng: -68.450, countyLevel: true },
  'Coastal':            { lat: 43.530, lng: -69.300, offshore: true }
};

/*
 * Simplified outline of Maine, drawn as a closed ring of lat/lng vertices.
 * Schematic rather than surveyed. The coast is generalised heavily, islands
 * are omitted, and the Quebec and New Brunswick borders are reduced to a
 * handful of segments. It exists to give the points a recognisable shape.
 */
const OUTLINE = [
  /* South coast, running northeast from Kittery. Drawn as a smooth seaward
     envelope rather than a true coastline, so that every coastal town named
     in the source falls inside the shape. Penobscot Bay, Casco Bay and the
     peninsulas are not cut in. */
  [-70.68, 43.06], [-70.55, 43.24], [-70.36, 43.40], [-70.20, 43.50],
  [-70.08, 43.58], [-69.96, 43.64], [-69.82, 43.66], [-69.70, 43.70],
  [-69.55, 43.72], [-69.40, 43.74], [-69.25, 43.80], [-69.05, 43.90],
  [-68.90, 44.05], [-68.60, 44.10], [-68.35, 44.15], [-68.15, 44.22],
  [-67.95, 44.32], [-67.75, 44.42], [-67.55, 44.48], [-67.35, 44.58],
  [-67.10, 44.72], [-66.95, 44.80], [-66.92, 44.92],
  /* New Brunswick border, up the St Croix and then due north. */
  [-67.05, 45.05], [-67.15, 45.15], [-67.30, 45.20], [-67.45, 45.50],
  [-67.55, 45.62], [-67.75, 45.70], [-67.78, 46.00], [-67.79, 46.50],
  [-67.79, 47.06],
  /* The St John valley across the top. */
  [-68.23, 47.35], [-68.40, 47.28], [-68.90, 47.18], [-69.05, 47.42],
  [-69.24, 47.46],
  /* Quebec border, southwest along the height of land. */
  [-69.99, 46.70], [-70.31, 45.97], [-70.72, 45.51], [-70.84, 45.29],
  [-71.08, 45.31],
  /* New Hampshire border, south to the sea. */
  [-71.05, 45.00], [-70.96, 44.81], [-70.83, 44.50], [-70.98, 44.30],
  [-71.03, 44.10], [-70.97, 43.79], [-70.82, 43.58], [-70.96, 43.42],
  [-70.86, 43.22], [-70.80, 43.04]
];

/*
 * The roughly 60-mile industrial arc named in the brief. Three anchor towns,
 * all of which appear in the source.
 */
const CORRIDOR = ['Bath', 'Portland', 'Kittery'];

module.exports = { PLACES, OUTLINE, CORRIDOR };
