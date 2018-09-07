function displayStatusOne() {
    let status;
    const token = localStorage.getItem('user1accessToken');
    const expirationDate = new Date(Number.parseInt(localStorage.getItem('user1expirationDate')));
    const isExpired = expirationDate < new Date();

    if (!token) {
        status = 'User 1 has no access token present in local storage, meaning that you are not logged in. <a href="#" onclick="renewOne()">Click here to attempt an SSO login</a> <br>' +
            '<a href="#" onclick="parseHash1()">Click here to attempt to parse hash 1</a>';
    } else if (isExpired) {
        status = 'User 1 has an expired access token in local storage. <a href="#" onclick="renewOne()">Click here to renewOne it</a>';
        document.getElementById('logout').style.visibility = 'visible';
    } else {
        status = `User 1 has an access token in local storage, and it expires on ${expirationDate}. <a href="#" onclick="renewOne()">Click here to renew it</a>`;
        document.getElementById('logout').style.visibility = 'visible';
    }
    document.getElementById('status1').innerHTML = status;
}

function displayStatusTwo() {
    let status;
    const token = localStorage.getItem('user2accessToken');
    const expirationDate = new Date(Number.parseInt(localStorage.getItem('user2expirationDate')));
    const isExpired = expirationDate < new Date();

    if (!token) {
        status = 'User 2 has no access token present in local storage, meaning that you are not logged in. <a href="#" onclick="renewTwo()">Click here to attempt an SSO login</a> <br>' +
            '<a href="#" onclick="parseHash2()">Click here to attempt to parse hash 2</a>';
    } else if (isExpired) {
        status = 'User 2 has an expired access token in local storage. <a href="#" onclick="renewTwo()">Click here to renewOne it</a>';
        document.getElementById('logout').style.visibility = 'visible';
    } else {
        status = `User 2 has an access token in local storage, and it expires on ${expirationDate}. <a href="#" onclick="renewTwo()">Click here to renew it</a>`;
        document.getElementById('logout').style.visibility = 'visible';
    }
    document.getElementById('status2').innerHTML = status;
}

function saveAuth1Result (result) {
    console.log(`Saving user 1`, result)
    localStorage.setItem(`user1accessToken`, result.accessToken);
    localStorage.setItem(`user1expirationDate`, Date.now() + Number.parseInt(result.expiresIn) * 1000);
    displayStatusOne();
}
function saveAuth2Result (result) {
    console.log(`Saving user 2`, result)
    localStorage.setItem(`user2accessToken`, result.accessToken);
    localStorage.setItem(`user2expirationDate`, Date.now() + Number.parseInt(result.expiresIn) * 1000);
    displayStatusTwo();
}

function renewOne () {
    auth0jsOne.checkSession({
    }, function (err, result) {
        if (err) {
            alert(`Could not get a new token using silent authentication (${err.error}). Redirecting to login page...`);
            auth0jsOne.authorize();
        } else {
            console.log('Renew 1', result)
            saveAuth1Result(result);
        }
    });
}
function renewTwo () {
    auth0jsTwo.checkSession({
    }, function (err, result) {
        if (err) {
            alert(`Could not get a new token using silent authentication (${err.error}). Redirecting to login page...`);
            auth0jsTwo.authorize();
        } else {
            console.log('Renew 2', result)
            saveAuth2Result(result);
        }
    });
}

function parseHash1 () {
    auth0jsOne.parseHash(window.location.hash, function (err, result) {
        if (err) {
            console.error(err);
        } else if (result) {
            console.log('ParseHash 1', result)
            saveAuth1Result(result);
        }
    });
}

function parseHash2 () {
    auth0jsTwo.parseHash(window.location.hash, function (err, result) {
        if (err) {
            console.error(err);
        } else if (result) {
            console.log('ParseHash 2', result)
            saveAuth2Result(result);
        }
    });
}

displayStatusOne();
displayStatusTwo();
