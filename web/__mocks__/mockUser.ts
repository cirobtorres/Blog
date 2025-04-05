import { faker } from "@faker-js/faker";
import { generateRandomCreatedAt } from "./utilities/randomISOdatetime";

export const createAuthenticatedUser = () => ({
  ok: true,
  data: {
    id: faker.number.int({ min: 1, max: 1000 }),
    documentId: faker.string.uuid(),
    ...(() => {
      const username = faker.person.fullName();
      let email;
      email = faker.internet.email();
      email = email.substring(email.indexOf("@") + 1);
      email = username.toLowerCase().replace(" ", ".") + email;
      return { username, email };
    })(),
    provider: "google",
    confirmed: true,
    blocked: false,
    ...generateRandomCreatedAt(),
  },
  error: null,
});

export const unauthorizedUserMock = {
  ok: false,
  data: null,
  error: {
    status: 401,
    name: "Unauthorized",
    message: "User not authenticated",
  },
};

export const notFoundUserMock = {
  ok: false,
  data: null,
  error: {
    status: 404,
    name: "",
    message: "Not Found",
  },
};
