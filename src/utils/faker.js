import { faker } from "@faker-js/faker";

const generateFakeBooks = (count = 10000) =>
  Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    Title: faker.lorem.words(3),
    Author: faker.person.fullName(),
    Genre: faker.music.genre(),
    PublishedYear: faker.date.past({ years: 50 }).getFullYear(),
    ISBN: faker.string.alphanumeric(13).toUpperCase(),
  }));

export { generateFakeBooks };
