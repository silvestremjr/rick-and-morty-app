import { addDecorator } from "@storybook/vue";
import StoryRouter from 'storybook-vue-router';

import CharacterDetails from "../components/CharacterDetails";

addDecorator(StoryRouter());

const details = {
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
};

export default {
  title: "Character Details",
  component: CharacterDetails,
  excludeStories: /.*Data$/,
};

export const Default = () => ({
  components: { CharacterDetails },
  template: '<CharacterDetails :details="details" />',
  props: {
    details: {
      default: () => details,
    },
  },
});

export const Episodes = () => ({
  components: { CharacterDetails },
  template: '<CharacterDetails :details="details" :episodes="true" />',
  props: {
    details: {
      default: () => details,
    },
  },
});
