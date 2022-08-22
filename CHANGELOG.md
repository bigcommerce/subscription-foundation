All notable changes to this project will be documented in this file.

### 0.9.0

- Initial beta release

### 0.9.1

- Remove 'hours' subscription interval option which is not supported by the Stripe API
- Prevent empty descriptions from being sent to Stripe when creating or updating products
- Update sample .env file to use human readable names for customer attribute fields

### 0.9.2

- Audit and clean up dependencies
- Add support for Vercel, including a deploy button in the readme
- Add prebuild step to automate generation of prisma client and perform db migrations
- Reduce number of required env variables by moving non-private ones to constants
- Use customer attribute id from DB instead of hardcoded value in customer portal nav link template
