import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/vue";
import router from "../router";

import EpisodesList from "./EpisodesList";
import CharacterEpisodes from "../views/CharacterEpisodes";

const store = {
  state: {
    episodesList: [
      {
        id: 1,
        episode: "S01E01",
        name: "Pilot",
      },
      {
        id: 2,
        episode: "S01E02",
        name: "Lawnmower Dog",
      },
    ],
  },
  getters: {
    GET_EPISODES_LIST: (state) => {
      return state.episodesList;
    },
  },
  mutations: {
    EPISODES_LIST(state, payload) {
      state.episodesList = [
        {
          id: 2,
          episode: "S01E02",
          name: "Lawnmower Dog",
        },
        {
          id: 1,
          episode: "S01E01",
          name: "Pilot",
        },
      ];
    },
  },
};
const routes = [
  {
    path: "/characters/:id",
    name: "CharacterEpisodes",
    component: CharacterEpisodes,
    props: true,
  },
];

describe("EpisodesList.vue", () => {
  it("It renders episodes correctly", async () => {
    render(EpisodesList, {
      routes,
      store,
    });
    const EpisodeTitle = await screen.getByText("Pilot");
    const StateTitle = store.state.episodesList[0].name;

    expect(EpisodeTitle).toHaveTextContent(StateTitle);
  });

  it("Order list of episodes by name", async () => {
    const { getByText, debug } = render(EpisodesList, {
      routes,
      store,
    });
    const OrderByName = getByText("Name");
    await fireEvent.click(OrderByName);

    const EpisodeTitle = await screen.getByText("Pilot");
    const StateTitle = store.state.episodesList[1].name;

    expect(EpisodeTitle).toHaveTextContent(StateTitle);
  });

  it("Order list of episodes by ID", async () => {
    const { getByText, debug } = render(EpisodesList, {
      routes,
      store,
    });
    const OrderByName = getByText("#");
    await fireEvent.click(OrderByName);

    const EpisodeTitle = await screen.getByText("2");
    const StateTitle = store.state.episodesList[0].id;

    expect(EpisodeTitle).toHaveTextContent(StateTitle);
  });
  
  it("Order list of episodes by ID", async () => {
    const { getByText, debug } = render(EpisodesList, {
      routes,
      store,
    });
    const OrderByName = getByText("#");
    await fireEvent.click(OrderByName);

    const EpisodeTitle = await screen.getByText("2");
    const StateTitle = store.state.episodesList[0].id;

    expect(EpisodeTitle).toHaveTextContent(StateTitle);
  });

});
