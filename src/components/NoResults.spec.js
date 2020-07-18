import "@testing-library/jest-dom";
import { render, fireEvent, getNodeText } from "@testing-library/vue";

import NoResults from "./NoResults";

describe("NoResults.vue", () => {
  it("Renders", () => {
    const { getByText } = render(NoResults);
    const Text = getByText("No results found.");
    expect(Text).toBeVisible();
  });
});
