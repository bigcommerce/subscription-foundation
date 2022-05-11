const STRIPE_CLIENT_ID = process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID;
const STRIPE_REDIRECT_URL = process.env.NEXT_PUBLIC_STRIPE_REDIRECT_URL;

export const STRIPE_OAUTH_URL = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${STRIPE_CLIENT_ID}&scope=read_write&redirect_uri=${STRIPE_REDIRECT_URL}`;
export const CUSTOMER_PORTAL_HEADLINE = 'My Awesome Store';