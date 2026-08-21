// The mod version this exact build was built for — derived from versions.js
// rather than duplicated, so the two can never drift apart. Used client-side
// (scripts/version-switcher.js) to find "this build's own entry" again after
// the dropdown gets replaced with a freshly-fetched manifest, since that
// build's `url` for itself won't match: a page can only ever bake in "/" for
// its own current version, while a live/updated manifest may since have
// moved that same version to a real archived url once a newer one shipped.
import versions from "./versions.js";

export default (versions.find((v) => v.current) || {}).version;
