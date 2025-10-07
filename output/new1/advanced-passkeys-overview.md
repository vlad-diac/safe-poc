---
title: What are passkeys? – Safe Docs
url: https://docs.safe.global/advanced/passkeys/overview
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# What are passkeys? – Safe Docs

Advanced

Passkeys

Overview

# What are passkeys?

Passkeys are a standard authentication method designed to avoid using traditional passwords, providing a more secure and user-friendly experience.

Passkeys are based on public and private key pairs to secure user authentication. The public key is stored on the server side, while the private key is secured in the user's device. The user is authenticated by proving ownership of the private key, usually with biometric sensors, without extracting it from the device at any time. This method ensures that sensitive information remains protected and reduces the risk of credential theft.

## Why do we need passkeys?

Passkeys offer significant security improvements over traditional passwords. In the context of web3, where secure key management is paramount, passkeys provide an efficient alternative to seed phrases, which are often considered both a security liability and a subpar user experience.

[#### Key management

Passkeys eliminate the need for users to store seed phrases securely. They ensure the user's private key remains secure even if a server is compromised.](/advanced/passkeys/overview)

[#### User experience

Passkeys streamline the authentication process by allowing users to sign in to accounts with a biometric sensor, pin, or gesture.](/advanced/passkeys/overview)

[#### Resilience

Passkeys are stored in a device secure element, ensuring they can not be easily accessible to the internet. They can also be synced across multiple devices.](/advanced/passkeys/overview)

Safe offers the capability to sign into your wallet using passkeys by implementing a dedicated module that verifies the integrity of the key provided.

## Passkeys Support

Passkeys and syncing are supported by Apple and Android devices. If a device uses [Cross-device authentication (CDA) (opens in a new tab)](https://passkeys.dev/docs/reference/terms/#cross-device-authentication-cda), its passkeys will be portable to other devices. You can read more about device support [here (opens in a new tab)](https://passkeys.dev/device-support/#matrix).

Passkeys can also be integrated with ERC-4337, providing enhanced user experience in managing web3 accounts. See our tutorials to build your own implementation, or check out [ERC-4337 support contract for passkeys (opens in a new tab)](https://github.com/safe-global/safe-modules/tree/main/modules/passkey/contracts/4337) for more information.

## Further reading

- [The official W3C standard (opens in a new tab)](https://www.w3.org/TR/webauthn)
- [WebAuthn API specification (opens in a new tab)](https://webauthn.wtf/how-it-works/basics)
- [Passkeys 101 by FIDO Alliance (opens in a new tab)](https://fidoalliance.org/passkeys)

[Safe and EIP-7702](/advanced/eip-7702/7702-safe "Safe and EIP-7702")[Safe and Passkeys](/advanced/passkeys/passkeys-safe "Safe and Passkeys")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- What are passkeys?
  - Why do we need passkeys?
      - Key management
      - User experience
      - Resilience
  - Passkeys Support
  - Further reading

---

## Related Links

### Internal Links

- [https://docs.safe.global/advanced/passkeys/overview](https://docs.safe.global/advanced/passkeys/overview)
- [Key managementPasskeys eliminate the need for users to store seed phrases securely. They ensure the user's private key remains secure even if a server is compromised.](https://docs.safe.global/advanced/passkeys/overview)
- [User experiencePasskeys streamline the authentication process by allowing users to sign in to accounts with a biometric sensor, pin, or gesture.](https://docs.safe.global/advanced/passkeys/overview)
- [ResiliencePasskeys are stored in a device secure element, ensuring they can not be easily accessible to the internet. They can also be synced across multiple devices.](https://docs.safe.global/advanced/passkeys/overview)
- [https://docs.safe.global/advanced/passkeys/overview](https://docs.safe.global/advanced/passkeys/overview)
- [https://docs.safe.global/advanced/passkeys/overview](https://docs.safe.global/advanced/passkeys/overview)
- [Safe and EIP-7702](https://docs.safe.global/advanced/eip-7702/7702-safe)
- [Safe and Passkeys](https://docs.safe.global/advanced/passkeys/passkeys-safe)

### External Links

- [Cross-device authentication (CDA)(opens in a new tab)](https://passkeys.dev/docs/reference/terms)
- [here(opens in a new tab)](https://passkeys.dev/device-support)
- [ERC-4337 support contract for passkeys(opens in a new tab)](https://github.com/safe-global/safe-modules/tree/main/modules/passkey/contracts/4337)
- [The official W3C standard(opens in a new tab)](https://www.w3.org/TR/webauthn)
- [WebAuthn API specification(opens in a new tab)](https://webauthn.wtf/how-it-works/basics)
- [Passkeys 101 by FIDO Alliance(opens in a new tab)](https://fidoalliance.org/passkeys)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)
