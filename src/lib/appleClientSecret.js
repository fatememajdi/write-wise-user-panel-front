var jwt = require('jsonwebtoken');
// var fs = require('fs');
// const privateKey = fs.readFileSync("PrivateKey.p8");
// // set the JWT payload

export default function AppleClientSecret() {

    var config = {
        'kid': process.env.APPLE_KEY_ID,
        'iss': process.env.APPLE_TEAM_ID,
        'exp': Math.floor(Date.now() / 1000) + (60 * 60),
        'iat': Math.floor(Date.now() / 1000) - 30,
        'aud': 'https://appleid.apple.com',
        'sub': process.env.APPLE_CLIENT_ID,
    }
    //Fetch the private key 
    let JWTpayload =
    {
        'exp': config.exp,
        'iat': config.iat,
        'iss': config.iss,
        'aud': "https://appleid.apple.com",
        'sub': config.sub
    }
    let ClientSecret = jwt.sign(JWTpayload, '-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQg7L1x2WLAT93qFf8JmyzQdA8FLpTHAI7KZm230SYH1migCgYIKoZIzj0DAQehRANCAAS7K5Fj4Uobr6fgNaRz7Zoz9YrauxRif5k8jmeI/Ymijqf0tt+Tcr4Cd+u7smnPdEf5Ov+2z8EHr+UpgXvqH0BW\n-----END PRIVATE KEY-----'.replace(/\\n/g, '\n'), {
        algorithm: 'ES256', header: {

            kid: config.kid,
            typ: undefined
        }
    });

    // console.log(ClientSecret);
    return ClientSecret;

}