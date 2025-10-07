---
title: Get the Safe CLI – Safe Docs
url: https://docs.safe.global/advanced/cli-installation
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Get the Safe CLI – Safe Docs

Advanced

Installation

# Get the Safe CLI

The Safe CLI can be run using [Docker (opens in a new tab)](https://www.docker.com) or [pip (opens in a new tab)](https://pip.pypa.io/en/stable).

## Using Docker

**Prerequisite:** Install [Docker Desktop (opens in a new tab)](https://www.docker.com/products/docker-desktop/).

Once Docker is installed on your system, run the following command to create new Safe accounts:

`_10

docker run -it safeglobal/safe-cli safe-creator`

You can also run the following command to run the Safe CLI with an existing Safe:

`_10

docker run -it safeglobal/safe-cli safe-cli <checksummed_safe_address> <ethereum_node_url>`

## Using Python pip

**Prerequisite:** [Python (opens in a new tab)](https://www.python.org/downloads/) >= 3.9 (Python 3.12 is recommended).

Once Python is installed on your system, run the following command to install the Safe CLI:

`_10

pip3 install -U safe-cli`

[Overview](/advanced/cli-overview "Overview")[Demos](/advanced/cli-demos "Demos")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Get the Safe CLI
  - Using Docker
  - Using Python pip

---

## Related Links

### Internal Links

- [https://docs.safe.global/advanced/cli-installation](https://docs.safe.global/advanced/cli-installation)
- [https://docs.safe.global/advanced/cli-installation](https://docs.safe.global/advanced/cli-installation)
- [Overview](https://docs.safe.global/advanced/cli-overview)
- [Demos](https://docs.safe.global/advanced/cli-demos)

### External Links

- [Docker(opens in a new tab)](https://www.docker.com)
- [pip(opens in a new tab)](https://pip.pypa.io/en/stable)
- [Docker Desktop(opens in a new tab)](https://www.docker.com/products/docker-desktop)
- [Python(opens in a new tab)](https://www.python.org/downloads)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)
