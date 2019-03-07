const { inspect } = require("util");

function normalizeFixtureSpec(spec, allowStrings = false) {
  if (allowStrings && typeof spec === "string") {
    spec = {
      isFile: true,
      content: {
        encoding: "utf-8",
        value: spec
      }
    };
  }

  if (typeof spec !== "object" || Array.isArray(spec) || spec === null) {
    throw new Error(`Invalid fixture spec: ${inspect(spec)}`);
  }

  if (spec.isFile) {
    return spec;
  }

  const normalizedSpec = {
    isDirectory: true,
    entries: {}
  };

  const entries = spec.isDirectory ? spec.entries : spec;

  Object.keys(entries).forEach(key => {
    const entry = entries[key];
    normalizedSpec.entries[key] = normalizeFixtureSpec(entry, true);
  });

  return normalizedSpec;
}

module.exports = normalizeFixtureSpec;
