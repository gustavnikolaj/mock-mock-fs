/* global beforeAll */

const expect = require("unexpected");
const writeFixtureSpec = require("../lib/write-fixture-spec");
const path = require("path");
const { readFile, mkdirp, remove, stat } = require("fs-extra");

it("should be a function", () => {
  expect(writeFixtureSpec, "to be a function");
});

describe("in a tmp dir", () => {
  const tmpDirRoot = path.resolve(__dirname, "../__tmp__/writeFixtureSpec");

  beforeAll(async () => {
    await remove(tmpDirRoot);
    await mkdirp(tmpDirRoot);
  });

  it("should write a simple fixture", async () => {
    const tmpDir = path.resolve(tmpDirRoot, "simple-fixture");

    writeFixtureSpec(
      {
        isDirectory: true,
        entries: {
          foo: {
            isFile: true,
            content: {
              encoding: "utf-8",
              value: "foobar"
            }
          }
        }
      },
      tmpDir
    );

    expect(
      await readFile(path.resolve(tmpDir, "foo"), "utf-8"),
      "to equal",
      "foobar"
    );
  });

  it("should write a simple fixture", async () => {
    const tmpDir = path.resolve(tmpDirRoot, "fixture-with-dirs");

    writeFixtureSpec(
      {
        isDirectory: true,
        entries: {
          foo: {
            isDirectory: true,
            entries: {
              foo: {
                isFile: true,
                content: {
                  encoding: "utf-8",
                  value: "foobar"
                }
              }
            }
          }
        }
      },
      tmpDir
    );

    expect(
      await readFile(path.resolve(tmpDir, "foo/foo"), "utf-8"),
      "to equal",
      "foobar"
    );
  });

  it("should set mtime on file", async () => {
    const tmpDir = path.resolve(tmpDirRoot, "time");

    writeFixtureSpec(
      {
        isDirectory: true,
        entries: {
          foo: {
            isFile: true,
            time: 3600000,
            content: {
              encoding: "utf-8",
              value: "foobar"
            }
          }
        }
      },
      tmpDir
    );

    expect(await stat(path.resolve(tmpDir, "foo")), "to satisfy", {
      atime: new Date(3600000),
      mtime: new Date(3600000)
    });
  });
});
