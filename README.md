# BigCommerce Subscription Foundation

🚀 Fast track builds of custom subscription experiences on the BigCommerce platform. Save 100s of hours.

💰 **Pre-integrated into Stripe Billing**, including authentication, merchant onboarding, subscription product management, subscription creation, and customer-facing subscription management.

💅 Utilizes the Channels Toolkit to provide a natively integrated subscription channel that fits nicely within the BigCommerce control panel.

| Product Management                       | Storefront Widget                     |
| ---------------------------------------- | ------------------------------------- |
| ![App Preview](sample-control-panel.png) | ![App Preview](sample-storefront.png) |

## Get started

Head to the [Subscription Foundation](https://developer.bigcommerce.com/docs/ae2455ab4d3d8-subscription-foundation) article to begin!


## Key areas of codebase

- `/backend`
  - Where the auth and various API services live. These are uses within the internal API endpoints to keep routes secure and reach out to external APIs.
- `/prisma`
  - Where the DB models and initial seed data lives. Prisma uses this to generate DB clients for the app.
- `/shared`
  - Where the types and helper utilities are located.
- `/src/pages`
  - Where the sections of the app, including the UI for the BigCommerce app that will show inside the control panel, are managed.
  - Next.js docs: https://nextjs.org/docs/basic-features/pages
- `/src/pages/api`
  - Where the APIs for the app are managed.
  - Next.js docs: https://nextjs.org/docs/api-routes/introduction
    - `/cart`, `/channel`, and `/product`: Contains endpoints that proxy to BigCommerce APIs.`
    - `/store`: Contains endpoints that update app information in the DB.`
    - `/stripe`: Contains endpoints that proxy to Stripe APIs.`
    - `/webhooks/index.ts`: Contains the webhook listener for the "Order Created" BigCommerce event which is used to create the initial Stripe subscription.
- `/src/providers`
  - Where the context providers used within pages and components live.

## Contributing

Want to help expand this foundation? We'd love to collaborate! To kick off, here's a breakdown of items we've itemized as either potential improvements to the existing codebase or features worth adding.

- Improvements:
  - Implement cart metafields to improve shopper UX (removes overloading of product name)
  - Move FE cart requests / calculations within subscription widget to be handled within single internal API endpoint
  - Centralize logging so it's easily turned on / off and connected into third-party logging services
- Features:
  - Additional subscription use cases outside of 'Subscribe and Save'
  - Handling for more complex tax and shipping scenarios, changes occurs to price after initial subscription creation
  - Ability to see subscription information inline, within My Account -> Order section of storefront

## Learn More

### Additional Subscription Solutions

Check out the wide variety of subscription apps on the [BigCommerce App Marketplace](https://www.bigcommerce.com/apps/recurring-billing-subscriptions/?source=subscription-foundation).

### The BigCommerce Platform

Looking to help the world's leading brands and the next generation of successful merchants take flight? To learn more about developing on top of the BigCommerce platform, take a look at the following resources:

- [BigCommerce Developer Center](https://developer.bigcommerce.com/?source=subscription-foundation) - Learn more about BigCommerce platform features, APIs and SDKs
- [BigDesign](https://developer.bigcommerce.com/big-design/?source=subscription-foundation) - An interactive site for BigCommerce's React Components with live code editing
- [Building BigCommerce Apps](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/building-apps?source=subscription-foundation) - Learn how to build apps for the BigCommerce marketplace
