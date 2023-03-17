import { Identity } from "@semaphore-protocol/identity";
import { WebAuthnIdentity } from "../src";

jest.mock("@simplewebauthn/browser", () => ({
  startRegistration: async () => ({
    id: "my-new-credential",
    rawId: "my-new-credential",
    response: {
      clientDataJSON: "",
      attestationObject: "",
    },
    clientExtensionResults: {},
    type: "public-key",
  }),
  startAuthentication: async () => ({
    id: "my-existing-credential",
    rawId: "my-existing-credential",
    response: {
      clientDataJSON: "",
      attestationObject: "",
    },
    clientExtensionResults: {},
    type: "public-key",
  }),
}));

const options = {
  rpName: "my-app",
  rpID: "hostname",
  userID: "my-id",
  userName: "my-name",
};

/**
 * Helper function to check if two Semaphore identities have the same secret value
 * by ensuring their trapdoor, nullifier, and commitment are the same.
 * @param {Identity} actualIdentity
 * @param {Identity} expectedIdentity
 */
function expectIdentitiesToMatch(
  actualIdentity: Identity,
  expectedIdentity: Identity
): void {
  expect(expectedIdentity.trapdoor).toEqual(actualIdentity.trapdoor);
  expect(expectedIdentity.nullifier).toEqual(actualIdentity.nullifier);
  expect(expectedIdentity.commitment).toEqual(actualIdentity.commitment);
}

describe("WebAuthnIdentity", () => {
  it("WebAuthnIdentity.fromRegister identical to registering credential and creating Identity", async () => {
    const newWebAuthnIdentity = await WebAuthnIdentity.fromRegister(options);
    const expectedIdentity = new Identity("my-new-credential");
    expectIdentitiesToMatch(
      newWebAuthnIdentity.getIdentity(),
      expectedIdentity
    );
  });

  it("WebAuthnIdentity.fromAuthenticate identical to authenticating credential and creating Identity", async () => {
    const existingWebAuthnIdentity = await WebAuthnIdentity.fromAuthenticate(
      options
    );
    const expectedIdentity = new Identity("my-existing-credential");
    expectIdentitiesToMatch(
      existingWebAuthnIdentity.getIdentity(),
      expectedIdentity
    );
  });
});
