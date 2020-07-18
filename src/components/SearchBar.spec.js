import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/vue";

import SearchBar from "./SearchBar";

describe("SearchBar.vue", () => {
  it("Renders input field", () => {
    const { getByPlaceholderText } = render(SearchBar);
    const inputText = getByPlaceholderText("Search by name");

    expect(inputText).toBeInTheDocument();
  });
  it("Renders search button ", () => {
    const { getByText } = render(SearchBar);
    const searchButton = getByText("Search");

    expect(searchButton).toBeInTheDocument();
  });
  it("Form submit input value correctly", async () => {
    const { getByPlaceholderText, getByRole, emitted } = render(SearchBar);
    const inputText = getByPlaceholderText("Search by name");
    const searchButton = getByRole("button");

    await fireEvent.update(inputText, "Rick");
    await fireEvent.click(searchButton);

    expect(emitted()).toHaveProperty("search");

    expect(emitted().search[0][0]).toBe("Rick");
  });
});
