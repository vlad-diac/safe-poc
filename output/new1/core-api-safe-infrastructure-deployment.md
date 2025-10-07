---
title: Safe{Core} Infrastructure deployment – Safe Docs
url: https://docs.safe.global/core-api/safe-infrastructure-deployment
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
lastmod: 2025-10-03T15:39:09+00:00
priority: 0.80
---

# Safe{Core} Infrastructure deployment – Safe Docs

API

Infrastructure Deployment

# Safe{Core} Infrastructure deployment

Once you have deployed the [Safe{Core} contracts](/core-api/safe-contracts-deployment), you must deploy the off-chain components of the Safe{Core} Stack, including backend and frontend services.

You have three options for deploying the Safe stack, depending on your needs.

## Option 1: Safe Core Contributor Platform-as-a-Service

We roll out new networks quarterly, depending on our internal capacity, and only for medium to large chains based on a strict scoring framework.

ℹ️

If you want to submit your chain for assessment in the next quarter, please fill out this [form (opens in a new tab)](https://noteforms.com/forms/request-safe-ui-and-infra-support-4weugt).

### Hard requirements

- EVM-compatible chain.
- At least two dedicated RPC node providers, with preference for at least one Tier 1 provider of Infura, Alchemy, Quicknode. You can find more on RPC nodes [here](/core-api/api-safe-transaction-service/rpc-requirements).

## Option 2: Third-party integrators

We are happy to introduce you to our integrators. Please contact [networks@safe.global](mailto:networks@safe.global).

## Option 3: Self-hosting

If you have engineering and cloud resources, you can also deploy the different components of the stack by following one of the procedures below.

You can find [docker images for a majority of platforms (opens in a new tab)](https://hub.docker.com/u/safeglobal).

### Requirements

#### Hardware

These are the hardware requirements to run the different services required.

| Network | Transaction Service | Client Gateway | Config Service | Database |
| --- | --- | --- | --- | --- |
| Small (new chain with low traffic) | CPU: 2 vCPU RAM: 8GiB | CPU: 2 vCPU RAM: 8 GiB | CPU: 2 vCPU RAM: 8 GiB | CPU: 2 vCPU RAM: 8GiB |
| Standard | CPU: 4 vCPU RAM: 16GiB | CPU: 2 vCPU RAM: 8 GiB | CPU: 2 vCPU RAM: 8 GiB | CPU: 4 vCPU RAM: 16GiB |
| Large (large chain with high-traffic) | CPU: 8 vCPU RAM: 32GiB | CPU: 2 vCPU RAM: 8 GiB | CPU: 2 vCPU RAM: 8 GiB | CPU: 16 vCPU RAM: 64GiB |

#### RPC

For support, please refer to the [RPC requirements](/core-api/api-safe-transaction-service/rpc-requirements#what-are-the-rpc-requirements). Safe (L1) requires tracing for indexing, while Safe (L2) supports events/logs.

### Docker-compose deployment

Our docker-compose files are available on the [safe-infrastructure (opens in a new tab)](https://github.com/safe-global/safe-infrastructure) repository.

`_10

git clone git@github.com:safe-global/safe-infrastructure.git

_10

cd safe-infrastructure`

#### Prerequisites

- [Docker (opens in a new tab)](https://docs.docker.com/guides/) v20.10+
- [Docker-compose (opens in a new tab)](https://docs.docker.com/compose/) 2.x.x+
- Running [Ethereum JSON RPC client (opens in a new tab)](https://ethereum.org/en/developers/docs/apis/json-rpc/)

#### Configuration

`_10

cp .env.sample .env

_10

vi .env

_10

REVERSE_PROXY_PORT=8000

_10

CFG_VERSION=latest

_10

CGW_VERSION=latest

_10

TXS_VERSION=latest

_10

UI_VERSION=latest

_10

EVENTS_VERSION=latest

_10

RPC_NODE_URL=<REPLACE BY YOUR RPC ENDPOINT>`

#### Run

`_10

sh scripts/run_locally.sh

_10

# will ask to set up username/password for config-service and transactions-service`

This command runs seventeen Docker containers from the [docker-compose.yml (opens in a new tab)](https://github.com/safe-global/safe-infrastructure/blob/main/docker-compose.yml):

- Nginx reverse proxy
- Postgres 14.x database (x3 for Transaction Service, Config Service, and Events Service)
- Redis database (x2 for Transaction Service and Client Gateway)
- RabbitMQ message queue (x2 for Transaction Service and General)
- Transaction Service workers & scheduler (x4)
- Transaction Service web
- Config Service web
- Client Gateway web
- Events service web
- Wallet web

### Kubernetes deployment

⚠️

Our [Helm Charts (opens in a new tab)](https://github.com/5afe/safe-helm-charts) are currently in alpha version, use them at your own risk and do not hesitate to share feedback.

An official helm chart creates all the necessary manifests, including the service account and RBAC entities needed for service discovery.

`_10

helm repo add safe https://5afe.github.io/safe-helm-charts/charts/packages

_10

helm repo update

_10

helm install [RELEASE_NAME] safe/safe-stack -f your_values.yaml [-n NAMESPACE]`

The helm chart allows you to inline all the configurations directly in your `values.yaml`:

`_10

helm show values safe/safe-stack`

### Configuration

After all the components are up and running, you need to configure the Transaction Service and config service to start indexing data and connect to your chain from Safe{Wallet}.

#### Transaction Service

By default, Transaction Service will automatically setup `MasterCopies` and `Proxy Factories` for [a list of known networks (opens in a new tab)](https://github.com/safe-global/safe-eth-py/blob/main/safe_eth/safe/addresses.py).

If your network is not supported you have to add the addresses manually in `http://YOUR_TRANSACTION_SERVICE_DOMAIN/admin/` in **Proxy Factories** and also in **Safe master copies** section.

![safe-infrastructure-installation-configuration.png](/_next/static/media/safe-infrastructure-installation-configuration.0f12af56.png)

#### Config Service

Open `http://YOUR_CONFIG_SERVICE_DOMAIN/admin` to configure your chain:

![safe-infrastructure-installation-config-service.png](/_next/static/media/safe-infrastructure-installation-config-service.200966dc.png)

You can find more information on all parameters available in the [Safe Config Service documentation](/config-service-configuration/overview).

Well done! You now have the Safe Contracts deployed on your chain and the Safe infrastructure up and running.

[Contracts Deployment](/core-api/safe-contracts-deployment "Contracts Deployment")Configuration

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Safe{Core} Infrastructure deployment
  - Option 1: Safe Core Contributor Platform-as-a-Service
    - Hard requirements
  - Option 2: Third-party integrators
  - Option 3: Self-hosting
    - Requirements
      - Hardware
      - RPC
    - Docker-compose deployment
      - Prerequisites
      - Configuration
      - Run
    - Kubernetes deployment
    - Configuration
      - Transaction Service
      - Config Service

---

## Related Links

### Internal Links

- [Safe{Core} contracts](https://docs.safe.global/core-api/safe-contracts-deployment)
- [https://docs.safe.global/core-api/safe-infrastructure-deployment](https://docs.safe.global/core-api/safe-infrastructure-deployment)
- [https://docs.safe.global/core-api/safe-infrastructure-deployment](https://docs.safe.global/core-api/safe-infrastructure-deployment)
- [here](https://docs.safe.global/core-api/api-safe-transaction-service/rpc-requirements)
- [https://docs.safe.global/core-api/safe-infrastructure-deployment](https://docs.safe.global/core-api/safe-infrastructure-deployment)
- [https://docs.safe.global/core-api/safe-infrastructure-deployment](https://docs.safe.global/core-api/safe-infrastructure-deployment)
- [https://docs.safe.global/core-api/safe-infrastructure-deployment](https://docs.safe.global/core-api/safe-infrastructure-deployment)
- [https://docs.safe.global/core-api/safe-infrastructure-deployment](https://docs.safe.global/core-api/safe-infrastructure-deployment)
- [https://docs.safe.global/core-api/safe-infrastructure-deployment](https://docs.safe.global/core-api/safe-infrastructure-deployment)
- [RPC requirements](https://docs.safe.global/core-api/api-safe-transaction-service/rpc-requirements)
- [https://docs.safe.global/core-api/safe-infrastructure-deployment](https://docs.safe.global/core-api/safe-infrastructure-deployment)
- [https://docs.safe.global/core-api/safe-infrastructure-deployment](https://docs.safe.global/core-api/safe-infrastructure-deployment)
- [https://docs.safe.global/core-api/safe-infrastructure-deployment](https://docs.safe.global/core-api/safe-infrastructure-deployment)
- [https://docs.safe.global/core-api/safe-infrastructure-deployment](https://docs.safe.global/core-api/safe-infrastructure-deployment)
- [https://docs.safe.global/core-api/safe-infrastructure-deployment](https://docs.safe.global/core-api/safe-infrastructure-deployment)
- [https://docs.safe.global/core-api/safe-infrastructure-deployment](https://docs.safe.global/core-api/safe-infrastructure-deployment)
- [https://docs.safe.global/core-api/safe-infrastructure-deployment](https://docs.safe.global/core-api/safe-infrastructure-deployment)
- [https://docs.safe.global/core-api/safe-infrastructure-deployment](https://docs.safe.global/core-api/safe-infrastructure-deployment)
- [Safe Config Service documentation](https://docs.safe.global/config-service-configuration/overview)
- [Contracts Deployment](https://docs.safe.global/core-api/safe-contracts-deployment)

### External Links

- [form(opens in a new tab)](https://noteforms.com/forms/request-safe-ui-and-infra-support-4weugt)
- [networks@safe.global](mailto:networks@safe.global)
- [docker images for a majority of platforms(opens in a new tab)](https://hub.docker.com/u/safeglobal)
- [safe-infrastructure(opens in a new tab)](https://github.com/safe-global/safe-infrastructure)
- [Docker(opens in a new tab)](https://docs.docker.com/guides)
- [Docker-compose(opens in a new tab)](https://docs.docker.com/compose)
- [Ethereum JSON RPC client(opens in a new tab)](https://ethereum.org/en/developers/docs/apis/json-rpc)
- [docker-compose.yml(opens in a new tab)](https://github.com/safe-global/safe-infrastructure/blob/main/docker-compose.yml)
- [Helm Charts(opens in a new tab)](https://github.com/5afe/safe-helm-charts)
- [a list of known networks(opens in a new tab)](https://github.com/safe-global/safe-eth-py/blob/main/safe_eth/safe/addresses.py)
