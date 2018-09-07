# Auth0 SSO Issue Demo

## This project was created with the intent of displaying a issue with Auth0 SSO for multiple users concurrently

### Setup:
1. Go to https://manage.auth0.com/#/clients and create two single-page application clients.
2. Add `http://localhost:5000` as allowed callback URLs and as a Web Origin for both.
3. Create two databases at `https://manage.auth0.com/#/connections/database`
4. When creating new users for your app at `https://manage.auth0.com/#/users`, make sure to make one in each DB!
5. Enter your Auth0 domain and client IDs in the [`auth0-variables.js`](/auth0-variables.js) file.

To start the sample, start a web server in the root of this repository at port 5000, or just run:

```sh
npm install -g serve
serve
```

and then browse to [http://localhost:5000](http://localhost:5000).

### How to demo
  - First click "Click here to attempt an SSO login" to attempt connection
  - Then click "Click here to attempt to parse hash 1"
  - Login with user 1 for first SPA
  - Attempt to renew user 1, which should be possible with issues
  - Now carry out same procedure for user two
  - When trying to renew user 1 now you will get the Auth0 error "login_required"
  
Credits to inspiration for this project goes to https://github.com/auth0-samples/oidc-sso-sample
