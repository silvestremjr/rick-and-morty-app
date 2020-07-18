import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/vue";

import CharacterDetails from "./CharacterDetails";
import CharacterEpisodes from "../views/CharacterEpisodes";

const props = {
  details: {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    origin: {
      name: "Earth (C-137)",
    },
    episode: [
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
};

const routes = [
  {
    path: "/characters/:id",
    name: "CharacterEpisodes",
    component: CharacterEpisodes,
    props: true,
  },
];
describe("CharacterDetails.vue", () => {
  it("Renders character details", async () => {
    const { getByText, debug } = render(CharacterDetails, {
      props,
      routes,
    });

    const CharacterName = await getByText("#1 Rick Sanchez");
    const DataName = `#${props.details.id} ${props.details.name}`;

    expect(CharacterName).toHaveTextContent(DataName);
  });
  it("Renders 'Episodes list' button", async () => {
    const { getByText, debug } = await render(CharacterDetails, {
      props: { ...props, episodes: false },
      routes,
    });

    const ButtonEpisodes = getByText("List of episodes");

    expect(ButtonEpisodes).toBeVisible();
  });
  it("Not renders 'Episodes list' button", async () => {
    const { debug } = await render(CharacterDetails, {
      props: { ...props, episodes: true },
      routes,
    });

    const ButtonEpisodes = screen.queryByText("List of episodes");

    expect(ButtonEpisodes).not.toBeInTheDocument();
  });
});
