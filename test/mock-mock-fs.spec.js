const expect = require("unexpected");
const mockMockFs = require("../");

it("should be a function", () => {
  expect(mockMockFs, "to be a function");
});
