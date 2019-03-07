const normalizeFixtureSpec = require("./normalize-fixture-spec");
const writeFixtureSpec = require("./write-fixture-spec");

module.exports = function mockMockFs(files, rootDir) {
  const spec = normalizeFixtureSpec(files);

  writeFixtureSpec(spec, rootDir);
};
