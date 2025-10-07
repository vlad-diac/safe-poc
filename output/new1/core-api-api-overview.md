---
title: Safe{Core} Infrastructure – Safe Docs
url: https://docs.safe.global/core-api/api-overview
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
lastmod: 2025-10-03T15:39:09+00:00
priority: 1.00
---

# Safe{Core} Infrastructure – Safe Docs

API

Overview

# Safe{Core} Infrastructure

The Safe{Core} Infrastructure consists of the following services:

[#### Safe Transaction Service

The Safe Transaction Service tracks transactions related to Safe contracts using tracing on Mainnet, Sepolia, and Gnosis Chain. It uses event indexing for the other chains. For each supported network there is one instance of the Transaction Service.](/core-api/transaction-service-overview)

[#### Safe Events Service

The Events Service handles Safe indexing events and delivers them as HTTP webhooks, connection to the events queue processed by the Transaction Service. The service's database stores the configuration of webhook destinations.](https://github.com/safe-global/safe-events-service)

## Architecture

Safe{Wallet} uses these services to offer functionality to end customers via the web and mobile applications. The [Safe Client Gateway (opens in a new tab)](https://github.com/safe-global/safe-client-gateway-nest) acts as a facade between the end customer and the Safe{Core} services and the [Safe Config Service (opens in a new tab)](https://github.com/safe-global/safe-config-service) stores all supported networks and chain-specific variables.

Safe's production setup consists of several instances of the Transaction Service orchestrated by the Config Service, which are later consumed by the Safe Client Gateway. The Events Service notifies the Safe Client Gateway when new events are indexed, helping to improve the user experience.

![Overview of the backend services and their components.](/_next/static/media/diagram-services.bf9f3417.png)

## Integration Flow for Safe{Wallet} and Safe{Core}

- The Client Gateway leverages the Config Service to find the Transaction Service instance required for a specific request.
- The Client Gateway forwards the request to the specified Transaction Service instance for the supported networks (determined by the Config Service).
- The Client Gateway transforms, aggregates, and caches information from the Config and Transaction Services, optimizing data for Safe's web and mobile clients.
- The Event Service provides information to the Client Gateway when the Transaction Service indexes an event using webhooks. The Client Gateway is then responsible for providing this information to the end clients.

Even though the Config Service and Transaction Service instances are reachable by clients that aren't the Client Gateway, this may change in the future. The Client Gateway is the outermost component of the Safe infrastructure and should be the single point of communication with any front-end client.

## Rate limits

All Safe{Core} Infrastructure services have a rate limit of 5 requests per second.

## Running locally

[Safe Infrastructure (opens in a new tab)](https://github.com/safe-global/safe-infrastructure) repository and the [running services locally (opens in a new tab)](https://github.com/safe-global/safe-infrastructure/blob/main/docs/running_locally.md) guide show how to run Safe's infrastructure ([Safe{Wallet} (opens in a new tab)](https://app.safe.global) and Safe{Core}). Note that these documents are examples of how these services run, and the configuration should adapt to the needs of a specific use case.

← Go Home[Running the Safe Transaction Service](/core-api/api-safe-transaction-service "Running the Safe Transaction Service")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Safe{Core} Infrastructure
      - Safe Transaction Service
      - Safe Events Service
  - Architecture
  - Integration Flow for Safe{Wallet} and Safe{Core}
  - Rate limits
  - Running locally

---

## Related Links

### Internal Links

- [Safe Transaction ServiceThe Safe Transaction Service tracks transactions related to Safe contracts using tracing on Mainnet, Sepolia, and Gnosis Chain. It uses event indexing for the other chains. For each supported network there is one instance of the Transaction Service.](https://docs.safe.global/core-api/transaction-service-overview)
- [https://docs.safe.global/core-api/api-overview](https://docs.safe.global/core-api/api-overview)
- [https://docs.safe.global/core-api/api-overview](https://docs.safe.global/core-api/api-overview)
- [https://docs.safe.global/core-api/api-overview](https://docs.safe.global/core-api/api-overview)
- [https://docs.safe.global/core-api/api-overview](https://docs.safe.global/core-api/api-overview)
- [Running the Safe Transaction Service](https://docs.safe.global/core-api/api-safe-transaction-service)

### External Links

- [Safe Events ServiceThe Events Service handles Safe indexing events and delivers them as HTTP webhooks, connection to the events queue processed by the Transaction Service. The service's database stores the configuration of webhook destinations.](https://github.com/safe-global/safe-events-service)
- [Safe Client Gateway(opens in a new tab)](https://github.com/safe-global/safe-client-gateway-nest)
- [Safe Config Service(opens in a new tab)](https://github.com/safe-global/safe-config-service)
- [Safe Infrastructure(opens in a new tab)](https://github.com/safe-global/safe-infrastructure)
- [running services locally(opens in a new tab)](https://github.com/safe-global/safe-infrastructure/blob/main/docs/running_locally.md)
- [Safe{Wallet}(opens in a new tab)](https://app.safe.global)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)
