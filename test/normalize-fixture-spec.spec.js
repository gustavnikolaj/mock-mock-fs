const expect = require("unexpected");
const normalizeFixtureSpec = require("../lib/normalize-fixture-spec");

it("should throw if passed invalid fixture definitions (array)", () => {
  expect(() => normalizeFixtureSpec([]), "to throw", /Invalid fixture spec/);
});

it("should throw if passed invalid fixture definitions (null)", () => {
  expect(() => normalizeFixtureSpec(null), "to throw", /Invalid fixture spec/);
});

it("should throw if passed invalid fixture definitions (string)", () => {
  expect(
    () => normalizeFixtureSpec("foobar"),
    "to throw",
    /Invalid fixture spec/
  );
});

it("should return a valid fixture spec as is", () => {
  expect(
    normalizeFixtureSpec({
      isDirectory: true,
      entries: {
        foo: {
          isFile: true,
          content: { encoding: "utf-8", value: "foofoo" }
        },
        bar: {
          isDirectory: true,
          entries: {
            qux: {
              isFile: true,
              content: { encoding: "utf-8", value: "quxqux" }
            }
          }
        }
      }
    }),
    "to equal",
    {
      isDirectory: true,
      entries: {
        foo: {
          isFile: true,
          content: { encoding: "utf-8", value: "foofoo" }
        },
        bar: {
          isDirectory: true,
          entries: {
            qux: {
              isFile: true,
              content: { encoding: "utf-8", value: "quxqux" }
            }
          }
        }
      }
    }
  );
});

it("should allow short hand syntax for directories", () => {
  expect(
    normalizeFixtureSpec({
      foo: {
        isFile: true,
        content: { encoding: "utf-8", value: "foofoo" }
      },
      bar: {
        qux: {
          isFile: true,
          content: { encoding: "utf-8", value: "quxqux" }
        }
      }
    }),
    "to equal",
    {
      isDirectory: true,
      entries: {
        foo: {
          isFile: true,
          content: { encoding: "utf-8", value: "foofoo" }
        },
        bar: {
          isDirectory: true,
          entries: {
            qux: {
              isFile: true,
              content: { encoding: "utf-8", value: "quxqux" }
            }
          }
        }
      }
    }
  );
});

it("should allow short hand syntax for directories", () => {
  expect(
    normalizeFixtureSpec({
      foo: "foofoo"
    }),
    "to equal",
    {
      isDirectory: true,
      entries: {
        foo: {
          isFile: true,
          content: { encoding: "utf-8", value: "foofoo" }
        }
      }
    }
  );
});
