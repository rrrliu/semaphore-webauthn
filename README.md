# semaphore-webauthn

**NOTE: This repository has been archived. The most up-to-date code is at [semaphore-protocol/semaphore](https://github.com/semaphore-protocol/semaphore/tree/main/packages/heyauthn) and the npm package is published at [@semaphore-protocol/heyauthn](https://www.npmjs.com/package/@semaphore-protocol/heyauthn).**

## Example usage:

```typescript
import { WebAuthnIdentity } from "semaphore-webauthn";

// STEP 1: Configure WebAuthn options
const options = {
  rpName: "my-app",
  rpID: window.location.hostname,
  userID: "my-id",
  userName: "my-name",
};

// STEP 2: Register a new WebAuthn credential and get its Semaphore identity
const newWebAuthnIdentity = await WebAuthnIdentity.fromRegister(options);

// Now we can save this commitment in our DB (pseudocode)
const { commitment } = newWebAuthnIdentity.getIdentity();
fetch("/api/register" /* Replace this with your endpoint */, {
  commmitment,
  // ...
});

// STEP 3: Authenticate existing WebAuthn credential and signal
const existingWebAuthnIdentity = await WebAuthnIdentity.fromRegister(options);
// Get existing group and anonymously signal (pseudocode)
import { Group } from "@semaphore-protocol/group";
import { generateProof } from "@semaphore-protocol/proof";

const group = new Group(groupId, groupSize);
group.addMembers(memberList);

generateProof(
  existingWebAuthnIdentity.getIdentity(),
  group,
  groupId,
  "this is a signal",
  {
    zkeyFilePath: "./semaphore.zkey",
    wasmFilePath: "./semaphore.wasm",
  }
);
```
