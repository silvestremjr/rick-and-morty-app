import "@testing-library/jest-dom";
import { render } from "@testing-library/vue";

import Loading from "./Loading";

describe("Loading.vue", () => {
  it("Renders", () => {
    const { getByText } = render(Loading);
    const Text = getByText("Loading...");
    expect(Text).toBeVisible();
  });
});
