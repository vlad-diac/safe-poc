---
title: How to use API Keys – Safe Docs
url: https://docs.safe.global/core-api/how-to-use-api-keys
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
lastmod: 2025-10-03T15:39:09+00:00
priority: 0.80
---

# How to use API Keys – Safe Docs

API

How to use API keys

# How to use API Keys

To enhance the security and reliability of your integrations, Safe is introducing **authenticated API access**.
Authenticated requests ensure that only authorized applications and developers can interact with our services, protecting your data and the overall ecosystem.

⚠️

Public (unauthenticated) API endpoints will soon be deprecated. To prevent any disruptions, we strongly recommend transitioning your integrations to authenticated API access as soon as possible.

This guide explains how to generate an API key, use it for authenticated requests, and handle rate limits, errors, and security best practices.

## Getting a Safe API Key

1. Visit the [Safe API Dashboard (opens in a new tab)](https://developer.safe.global/).
2. Create an account (if you haven’t already).
3. Generate your API key in the **API Keys** section.

*The API Key is a JWT, which is set to expire after 5 years.*

## Using Your API Key

To authenticate your requests, include your API key in the Authorization header. Below, there are different request examples. We use EIP3770 names for chains, so for example, for Ethereum Mainnet (eth):



cURLJavaScript (Fetch)SafeApiKit

`_10

curl -X GET "https://api.safe.global/tx-service/eth/api/v2/safes/0x5298a93734c3d979ef1f23f78ebb871879a21f22/multisig-transactions" \

_10

-H "Authorization: Bearer $YOUR_API_KEY"`

## Rate Limits and Usage Tiers

The Safe API currently has a default rate limit of 5 requests per second. If you require a higher rate limit, please contact us at [support@safe.global](mailto:support@safe.global) to discuss upgrading your tier and to understand usage quotas.

## Error Handling

If your API key is invalid or exceeds its rate limit, the API returns standard HTTP error codes:

- `401 Unauthorized`: Invalid or missing API key.
- `429 Too Many Requests`: Rate limit exceeded.

Make sure your application gracefully handles these errors to avoid disruptions.

## Best Practices

- **Store keys securely**: Use environment variables or secure vaults instead of hard-coding API keys in your application.
- **Rotate keys periodically**: Periodically rotate your API keys to minimize potential security risks.
- **Revoke compromised keys immediately**: If an API key is compromised, revoke it immediately via the dashboard and generate a new one.

## Need Help?

If you have questions or encounter issues, please reach out to our support team at [support@safe.global](mailto:support@safe.global).

[Overview](/core-api/transaction-service-overview "Overview")Supported Networks

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- How to use API Keys
  - Getting a Safe API Key
  - Using Your API Key
  - Rate Limits and Usage Tiers
  - Error Handling
  - Best Practices
  - Need Help?

---

## Related Links

### Internal Links

- [https://docs.safe.global/core-api/how-to-use-api-keys#getting-a-safe-api-key](https://docs.safe.global/core-api/how-to-use-api-keys#getting-a-safe-api-key)
- [https://docs.safe.global/core-api/how-to-use-api-keys#using-your-api-key](https://docs.safe.global/core-api/how-to-use-api-keys#using-your-api-key)
- [https://docs.safe.global/core-api/how-to-use-api-keys#rate-limits-and-usage-tiers](https://docs.safe.global/core-api/how-to-use-api-keys#rate-limits-and-usage-tiers)
- [https://docs.safe.global/core-api/how-to-use-api-keys#error-handling](https://docs.safe.global/core-api/how-to-use-api-keys#error-handling)
- [https://docs.safe.global/core-api/how-to-use-api-keys#best-practices](https://docs.safe.global/core-api/how-to-use-api-keys#best-practices)
- [https://docs.safe.global/core-api/how-to-use-api-keys#need-help](https://docs.safe.global/core-api/how-to-use-api-keys#need-help)
- [Overview](https://docs.safe.global/core-api/transaction-service-overview)

### External Links

- [Safe API Dashboard(opens in a new tab)](https://developer.safe.global/)
- [support@safe.global](mailto:support@safe.global)
- [support@safe.global](mailto:support@safe.global)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)
