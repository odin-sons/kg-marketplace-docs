import versions from "./versions.js";

export default (versions.find((v) => v.current) || {}).version;
