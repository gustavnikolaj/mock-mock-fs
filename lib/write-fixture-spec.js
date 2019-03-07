const path = require("path");
const fs = require("fs");

module.exports = function writeFixtureSpec(spec, rootDir) {
  if (!rootDir) {
    throw new Error("Must pass in a rootDir");
  }

  if (typeof spec !== "object" || spec === null || !spec.isDirectory) {
    throw new Error("Can only write valid specs.");
  }

  fs.mkdirSync(rootDir);

  for (const [key, entry] of Object.entries(spec.entries)) {
    if (path.isAbsolute(key)) {
      throw new Error("Absolute paths in specs is not allowed.");
    }

    const destination = path.resolve(rootDir, key);

    if (entry.isDirectory) {
      writeFixtureSpec(entry, destination);
    } else if (entry.isFile) {
      fs.writeFileSync(
        destination,
        entry.content.value,
        entry.content.encoding
      );

      if (entry.time) {
        const unixTime = entry.time / 1000;
        fs.utimesSync(destination, unixTime, unixTime);
      }
    } else {
      throw new Error("Unknown entry: " + key);
    }
  }
};
