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
  'Bath':               { lat: 43.911, lng: -69.821 },
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
  'Kittery':            { lat: 43.090, lng: -70.737 },
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
  'Yarmouth':           { lat: 43.796, lng: -70.187 },
  'Aroostook County':   { lat: 46.720, lng: -68.600, countyLevel: true },
  'Coastal':            { lat: 43.530, lng: -69.300, offshore: true }
};

/*
 * Simplified outline of Maine, drawn as a closed ring of lat/lng vertices.
 * Schematic rather than surveyed. The coast is generalised heavily, islands
 * are omitted, and the Quebec and New Brunswick borders are reduced to a
 * handful of segments. It exists to give the points a recognisable shape.
 */
const OUTLINE = [
  /* South coast, Kittery to Quoddy Head, running northeast.
     Generalised but no longer a smooth envelope: Casco Bay, the Kennebec,
     the Damariscotta and Medomak rivers, Penobscot Bay and Mount Desert are
     all cut in, so a town on the water reads as a town on the water. Islands
     other than Mount Desert are omitted and Mount Desert is joined to the
     mainland. */
  [-70.72, 43.05], [-70.62, 43.17], [-70.58, 43.28], [-70.47, 43.36],
  [-70.38, 43.45], [-70.37, 43.52], [-70.30, 43.56], [-70.20, 43.57],
  /* Casco Bay */
  [-70.23, 43.65], [-70.19, 43.72], [-70.14, 43.79], [-70.08, 43.83],
  [-70.02, 43.78], [-69.99, 43.70], [-69.94, 43.80], [-69.87, 43.75],
  /* Kennebec, up past Bath and back down */
  [-69.82, 43.84], [-69.79, 43.95], [-69.74, 43.86], [-69.68, 43.83],
  /* Boothbay, Damariscotta and Medomak */
  [-69.66, 43.79], [-69.64, 43.85], [-69.61, 43.79], [-69.57, 43.87],
  [-69.53, 44.05], [-69.47, 43.90], [-69.40, 44.12], [-69.33, 43.95],
  [-69.30, 43.93], [-69.26, 43.93],
  /* Penobscot Bay, up the west shore past Rockland and Belfast to Bucksport,
     then back down the east shore around Castine */
  [-69.15, 44.00], [-69.06, 44.10], [-69.03, 44.20], [-68.98, 44.38],
  [-68.97, 44.43], [-68.88, 44.47], [-68.83, 44.55], [-68.80, 44.45],
  [-68.82, 44.40], [-68.75, 44.35],
  /* Blue Hill Bay and Mount Desert */
  [-68.60, 44.40], [-68.53, 44.30], [-68.40, 44.28], [-68.30, 44.22],
  [-68.15, 44.28], [-68.12, 44.40],
  /* Down East */
  [-68.00, 44.45], [-67.85, 44.48], [-67.70, 44.50], [-67.60, 44.55],
  [-67.45, 44.62], [-67.40, 44.65], [-67.30, 44.68], [-67.15, 44.75],
  [-66.98, 44.82], [-66.95, 44.90],
  /* New Brunswick border, up the St Croix and then due north */
  [-67.02, 45.00], [-67.15, 45.15], [-67.30, 45.20], [-67.45, 45.50],
  [-67.55, 45.62], [-67.75, 45.70], [-67.78, 46.00], [-67.79, 46.50],
  [-67.79, 47.06],
  /* The St John valley across the top */
  [-68.23, 47.35], [-68.40, 47.28], [-68.90, 47.18], [-69.05, 47.42],
  [-69.24, 47.46],
  /* Quebec border, southwest along the height of land */
  [-69.99, 46.70], [-70.31, 45.97], [-70.72, 45.51], [-70.84, 45.29],
  [-71.08, 45.31],
  /* New Hampshire border, south to the sea */
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
