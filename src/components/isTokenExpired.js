export const isTokenExpired = function(token) {
    if (!token) {
        return true;
    }
    if (token === '') {
        return true;
    } else {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        var jwt = JSON.parse(window.atob(base64));

        var dt = new Date();
        var utcNow = new Date(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate(), dt.getUTCHours(), dt.getUTCMinutes(), dt.getUTCSeconds());
        if (parseFloat(jwt.exp) < parseFloat(utcNow.getTime() / 1000)) {
            return true;
        }
    }
    return false;
}