import {
  generateAuthenticationOptions,
  GenerateAuthenticationOptionsOpts,
  generateRegistrationOptions,
  GenerateRegistrationOptionsOpts,
} from "@simplewebauthn/server";
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import { Identity } from "@semaphore-protocol/identity";

export default class WebAuthnIdentity {
  private _identity: Identity;

  constructor(identity: Identity) {
    this._identity = identity;
  }

  /**
   * Registers a new WebAuthn credential and returns its WebAuthnIdentity.
   *
   * @param {GenerateRegistrationOptionsOpts} options - WebAuthn options for registering a new credential.
   * @returns A WebAuthnIdentity with the newly registered credential.
   */
  public async fromRegister(options: GenerateRegistrationOptionsOpts) {
    const registrationOptions = generateRegistrationOptions(options);
    const { id } = await startRegistration(registrationOptions);
    const identity = new Identity(id);
    return new WebAuthnIdentity(identity);
  }

  /**
   * Authenticates an existing WebAuthn credential and returns its WebAuthnIdentity.
   *
   * @param {GenerateAuthenticationOptionsOpts} options - WebAuthn options for authenticating an existing credential.
   * @returns A WebAuthnIdentity with the existing credential.
   */
  public async fromAuthenticate(options: GenerateAuthenticationOptionsOpts) {
    const authenticationOptions = generateAuthenticationOptions(options);
    const { id } = await startAuthentication(authenticationOptions);
    const identity = new Identity(id);
    return new WebAuthnIdentity(identity);
  }

  public get identity(): Identity {
    return this._identity;
  }
}
