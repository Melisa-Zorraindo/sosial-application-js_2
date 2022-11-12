import { postAuthLogin } from "../noroff-api-helper.mjs";
import { LocalStorageMock } from "../storageMock.mjs";

global.localStorage = new LocalStorageMock();

const TEST_EMAIL = "MelZor72659@stud.noroff.no";
const TEST_PASSWORD = "password";
const TEST_USER = {
  name: "melisa_zorraindo",
  email: "MelZor72659@stud.noroff.no",
};
const TEST_PROFILE = JSON.stringify(TEST_USER);

function fetchSuccess() {
  return Promise.resolve({
    ok: true,
    status: 200,
    statusText: "OK",
    json: () => Promise.resolve(TEST_USER),
  });
}

describe("login", () => {
  it("Returns a valid token when provided with valid credentials", async () => {
    global.fetch = jest.fn(() => fetchSuccess());
    const user = await postAuthLogin(TEST_EMAIL, TEST_PASSWORD);
    const profile = JSON.stringify(user);
    expect(TEST_EMAIL).toMatch(/^[\w\-.]+@(stud.)?noroff.no$/);
    expect(TEST_PASSWORD).toHaveLength(8);
    expect(profile).toMatch(TEST_PROFILE);
  });
});
