# mock-mock-fs

Example with mocha as a test runner.

```js
// convert-file-to-upper-case.js
const fs = require("fs");

function convertFileToUpperCase(path) {
  const content = fs.readFileSync(path, "utf-8");
  fs.writeFileSync(content.toUpperCase(), "utf-8");
}

// convert-file-to-upper-case.spec.js
const rimraf = require("rimraf");
const expect = require("unexpected");
const path = require("path");
const fs = require("fs");

const testFolderPath = path.resolve(__dirname, "__test-tmp__");

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
```
