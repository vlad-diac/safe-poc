---
title: Onramp with Stripe – Safe Docs
url: https://docs.safe.global/sdk/onramp/stripe
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Onramp with Stripe – Safe Docs

SDK

[Onramp](/sdk/onramp)

Stripe

# Onramp with Stripe

The [Stripe fiat-to-crypto onramp service (opens in a new tab)](https://docs.stripe.com/crypto/onramp) allows you to integrate a secure widget into your application that enables users to purchase cryptocurrencies using their credit card or bank account.

## Prerequisites

1. [Node.js and npm (opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. [Stripe account (opens in a new tab)](https://dashboard.stripe.com/register)
3. A web application using your favorite CLI and language. For example [React with NextJS (opens in a new tab)](https://nextjs.org/docs), [Vue with Nuxt (opens in a new tab)](https://nuxt.com/) or [Svelte with SvelteKit (opens in a new tab)](https://kit.svelte.dev/).
4. A [deployed Safe](/sdk/protocol-kit) for your users.

## Integrate the Stripe fiat-to-crypto onramp widget

### Obtain your public and private keys

To use the Stripe fiat-to-crypto onramp service, you need to obtain your [public and private keys (opens in a new tab)](https://docs.stripe.com/keys).
You have to apply for the crypto onramp service and add at least your business address and information to your Stripe account.
When your application is approved, you will find your public and private keys in your [Stripe Developer Dashboard (opens in a new tab)](https://dashboard.stripe.com/test/apikeys).

### Install dependencies

First, install Stripe's client library.

npm

yarn

pnpm

`_10

npm install --save @stripe/stripe-js @stripe/crypto`

### Generate a new `client_secret`

To authenticate your users, you need to generate a `client_secret` to initialize the Stripe widget.
For this, you must make an API request to the [Stripe API (opens in a new tab)](https://docs.stripe.com/api/crypto/onramp_sessions) using your Stripe private key.
It will return a unique `client_secret` that you can use to initialize the Stripe widget for your users.

To ensure you don't leak your private key, you should make the request from your backend.
The backend can then send the `client_secret` to your front end.
You can use the [Stripe server example (opens in a new tab)](https://github.com/5afe/stripe-server-example) as a starting point for your backend.

Here is how you generate a crypto onramp session using your private key:

TypeScript

curl

`_16

const stripeSessionResponse = await fetch(

_16

'https://api.stripe.com/v1/crypto/onramp_sessions',

_16

{

_16

method: 'POST',

_16

headers: {

_16

'Content-Type': 'application/x-www-form-urlencoded',

_16

Authorization:

_16

'Bearer sk_test_51...Eg7o' // your private key for Stripe

_16

},

_16

// optional parameters, for example the users' Safe address

_16

body: 'wallet_addresses[ethereum]=0x3A16E3090e32DDeD2250E862B9d5610BEF13e93d'

_16

}

_16

)

_16

_16

const decodedResponse = await stripeSessionResponse.json()

_16

const clientSecret = decodedResponse['client_secret']`

### Initialize the Stripe widget

The Stripe widget is a secure iframe that allows users to purchase cryptocurrencies.

You can initialize the Stripe widget using the `client_secret` you obtained from the previous step:

TypeScript

HTML

`_10

import { loadStripeOnramp } from '@stripe/crypto'

_10

_10

// StripeOnramp is imported with the scripts from step one

_10

const stripeOnramp = await loadStripeOnramp(

_10

'pk_test_51...GgYH'

_10

)

_10

_10

// Use the client secret from the previous step

_10

const onrampSession = stripeOnramp.createSession({ clientSecret })

_10

onrampSession.mount('#onramp-element')`

### Listen to Stripe events

You can listen to the [frontend events (opens in a new tab)](https://docs.stripe.com/crypto/using-the-api#frontend-events) from the Stripe widget to update your UI or handle errors.

TypeScript

`_17

// Listen to events using the onrampSession object from one of the previous step

_17

onrampSession.addEventListener('onramp_ui_loaded', event => {

_17

console.log('Onramp UI loaded:', event)

_17

})

_17

_17

onrampSession.addEventListener('onramp_session_updated', event => {

_17

console.log('Onramp session updated:', event)

_17

})

_17

_17

// For modal overlay render mode only

_17

onrampSession.addEventListener('onramp_ui_modal_opened', event => {

_17

console.log('Onramp UI modal opened:', event)

_17

})

_17

_17

onrampSession.addEventListener('onramp_ui_modal_closed', event => {

_17

console.log('Onramp UI modal closed:', event)

_17

})`

Now, Stripe will render the widget in the `onramp-element` div, allowing users to purchase cryptocurrencies securely.

![The Stripe widget](https://b.stripecdn.com/docs-statics-srv/assets/crypto-onramp-overview.c4c0682697f2cd4c1c2769c3c5e08506.png)

## Test the Stripe widget

### Test customer data

In production, each customer should pass an individual KYC process, but you should probably test your application before that.
You can use the following test data to bypass the KYC process while in [test mode (opens in a new tab)](https://stripe.com/docs/test-mode).
Make sure to select USD as the currency to buy cryptocurrency with.

| **Field** | **Value** | **Description** |
| --- | --- | --- |
| **Email** | [your-email@example.com](mailto:your-email@example.com) | Use any test or fake emails |
| **Phone Number** | +18004444444 | Use +18004444444 for phone number |
| **OTP Verification Code** | 000000 | Use 000000 for the OTP verification code |
| **First Name** | John | Use any first name |
| **Last Name** | Verified | Use Verified for the last name |
| **Birthday** | January 1, 1901 | Use January 1, 1901 for successful identity verification |
| **Identification Type** | Social Security Number | Select Social Security Number for identification type |
| **Identification Number** | 000000000 | Enter 000000000 to fill the identification number field |
| **Country** | United States | Select United States for country |
| **Address Line 1** | address\_full\_match | Use address\_full\_match for successful identity verification |
| **City** | Seattle | Use Seattle for city |
| **State** | Washington | Select Washington for state |
| **Zip Code** | 12345 | Use 12345 for zip code |
| **Test Credit Card Number** | 4242424242424242 | Use test credit card 4242424242424242 |
| **Expiration Date** | 12/24 | Use future expiration date 12/24 |
| **CVC** | 123 | Use any CVC 123 |
| **Billing Zip Code** | 12345 | Use any zip code 12345 for billing |

### Example images for KYC and payment method

In the following images, you'll find examples of how to complete the KYC process and setup the payment method for a successful test purchase.

#### Personal Info

![KYC Personal info example](/_next/static/media/stripe-kyc-personal-info.df0aa0ba.png)

#### Address

![KYC Address Example](/_next/static/media/stripe-kyc-address.0ebe0dc3.png)

#### Payment Method

![Payment Method](/_next/static/media/stripe-kyc-payment-method.d293ce28.png)

These data will allow you to test the Stripe widget without passing the KYC process.

## Conclusion

Well done, you have successfully integrated the Stripe fiat-to-crypto onramp service into your application.
Your users can now purchase cryptocurrencies securely within your app.

If you have any questions or encounter any issues, contact the [Stripe support (opens in a new tab)](https://support.stripe.com/) team.

[Monerium](/sdk/onramp/monerium "Monerium")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Onramp with Stripe
  - Prerequisites
  - Integrate the Stripe fiat-to-crypto onramp widget
    - Obtain your public and private keys
    - Install dependencies
    - Generate a newclient_secret
    - Initialize the Stripe widget
    - Listen to Stripe events
  - Test the Stripe widget
    - Test customer data
    - Example images for KYC and payment method
      - Personal Info
      - Address
      - Payment Method
  - Conclusion

---

## Related Links

### Internal Links

- [Onramp](https://docs.safe.global/sdk/onramp)
- [https://docs.safe.global/sdk/onramp/stripe](https://docs.safe.global/sdk/onramp/stripe)
- [deployed Safe](https://docs.safe.global/sdk/protocol-kit)
- [https://docs.safe.global/sdk/onramp/stripe](https://docs.safe.global/sdk/onramp/stripe)
- [https://docs.safe.global/sdk/onramp/stripe](https://docs.safe.global/sdk/onramp/stripe)
- [https://docs.safe.global/sdk/onramp/stripe](https://docs.safe.global/sdk/onramp/stripe)
- [https://docs.safe.global/sdk/onramp/stripe](https://docs.safe.global/sdk/onramp/stripe)
- [https://docs.safe.global/sdk/onramp/stripe](https://docs.safe.global/sdk/onramp/stripe)
- [https://docs.safe.global/sdk/onramp/stripe](https://docs.safe.global/sdk/onramp/stripe)
- [https://docs.safe.global/sdk/onramp/stripe](https://docs.safe.global/sdk/onramp/stripe)
- [https://docs.safe.global/sdk/onramp/stripe](https://docs.safe.global/sdk/onramp/stripe)
- [https://docs.safe.global/sdk/onramp/stripe](https://docs.safe.global/sdk/onramp/stripe)
- [https://docs.safe.global/sdk/onramp/stripe](https://docs.safe.global/sdk/onramp/stripe)
- [https://docs.safe.global/sdk/onramp/stripe](https://docs.safe.global/sdk/onramp/stripe)
- [https://docs.safe.global/sdk/onramp/stripe](https://docs.safe.global/sdk/onramp/stripe)
- [https://docs.safe.global/sdk/onramp/stripe](https://docs.safe.global/sdk/onramp/stripe)
- [Monerium](https://docs.safe.global/sdk/onramp/monerium)

### External Links

- [Stripe fiat-to-crypto onramp service(opens in a new tab)](https://docs.stripe.com/crypto/onramp)
- [Node.js and npm(opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Stripe account(opens in a new tab)](https://dashboard.stripe.com/register)
- [React with NextJS(opens in a new tab)](https://nextjs.org/docs)
- [Vue with Nuxt(opens in a new tab)](https://nuxt.com)
- [Svelte with SvelteKit(opens in a new tab)](https://kit.svelte.dev)
- [public and private keys(opens in a new tab)](https://docs.stripe.com/keys)
- [Stripe Developer Dashboard(opens in a new tab)](https://dashboard.stripe.com/test/apikeys)
- [Stripe API(opens in a new tab)](https://docs.stripe.com/api/crypto/onramp_sessions)
- [Stripe server example(opens in a new tab)](https://github.com/5afe/stripe-server-example)
