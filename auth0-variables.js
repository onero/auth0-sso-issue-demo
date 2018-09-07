const AUTH0_CLIENT_ONE_ID = '';
const AUTH0_CLIENT_TWO_ID = '';
const AUTH0_DOMAIN = '';

if (!AUTH0_CLIENT_ONE_ID || !AUTH0_DOMAIN) {
    alert('Make sure to set the AUTH0_CLIENT_ID and AUTH0_DOMAIN variables in auth0-variables.js.');
}

const auth0jsOne = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ONE_ID,
    audience: 'https://' + AUTH0_DOMAIN + '/userinfo',
    scope: 'openid profile',
    responseType: 'token',
    redirectUri: 'http://localhost:5000'
});

const auth0jsTwo = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_TWO_ID,
    audience: 'https://' + AUTH0_DOMAIN + '/userinfo',
    scope: 'openid profile',
    responseType: 'token',
    redirectUri: 'http://localhost:5000'
});
