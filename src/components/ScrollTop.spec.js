import "@testing-library/jest-dom";
import { render } from "@testing-library/vue";

import ScrollTop from "./ScrollTop";

describe("ScrollTop.vue", () => {
  it("It renders", () => {
    const { getByTitle } = render(ScrollTop);
    const scrollElement = getByTitle("Go to top");

    expect(scrollElement).toBeVisible();
  });
});
