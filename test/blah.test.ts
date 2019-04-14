import { addDigits } from "../src";

describe("gates", () => {
  it("works", () => {
    expect(addDigits("11", "1")).toBe("100");
    expect(addDigits("111", "1")).toBe("1000");
    expect(addDigits("011", "1")).toBe("100");
    expect(addDigits("101", "1")).toBe("110");
    expect(addDigits("1100", "1")).toBe("1101");
    expect(addDigits("11011", "1")).toBe("11100");
  });
});
