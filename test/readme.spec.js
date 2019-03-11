const fs = require("fs");

function convertFileToUpperCase(path) {
  const content = fs.readFileSync(path, "utf-8");
  fs.writeFileSync(path, content.toUpperCase(), "utf-8");
}

const rimraf = require("rimraf");
const expect = require("unexpected");
const path = require("path");
const mockMockFs = require("../");

const testFolderPath = path.resolve(__dirname, "../__tmp__");

describe("convertFileToUpperCase", () => {
  beforeEach(() => {
    // mockMockFs does not clean up itself, so we are rimraffing the folder
    // between invocations.
    rimraf.sync(testFolderPath);
  });

  it("should convert a files text content to upper case", () => {
    mockMockFs(
      {
        "foo.txt": "foobar"
      },
      testFolderPath
    );

    const testFilePath = path.resolve(testFolderPath, "foo.txt");

    convertFileToUpperCase(testFilePath);

    expect(fs.readFileSync(testFilePath, "utf-8"), "to equal", "FOOBAR");
  });
});
