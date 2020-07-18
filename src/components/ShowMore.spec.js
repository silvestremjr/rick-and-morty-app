import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/vue";

import ShowMore from "./ShowMore";

const store = {
  state: {
    next: 1,
    pages: 1,
    loading: false,
  },
  getters: {
    GET_NEXT_PAGE: (state) => {
      return state.next;
    },
    GET_TOTAL_PAGES: (state) => {
      return state.pages;
    },
    LOADING: (state) => {
      return state.loading;
    },
  },
};

describe("ShowMore.vue", () => {
  it("It renders", async () => {
    const { getByText } = await render(ShowMore, {
      store: store
    });

    const Button = getByText("Show more");
    expect(Button).toBeInTheDocument();
  });

  it('Emit "ShowMore" on click', async () => {
    const { getByText, emitted } = await render(ShowMore, {
      store: store,
    });

    const Button = getByText("Show more");
    await fireEvent.click(Button);

    expect(emitted()).toHaveProperty("showMore");
  });
});
