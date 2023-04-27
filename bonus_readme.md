# BONUS FILE

## Summary

[1. Figma (Our design)](https://www.figma.com/community/file/1232336481479291339)  
[2. Connection with google Oauth API](#google)

## OUR FIGMA <a name="figma"></a>

You can retreive our design for free in [our figma page](https://www.figma.com/community/file/1232336481479291339), if you can follow the advices below ! 

### Some advices
You should agree to have a harmonized design: 
- having only 2 main colors colors for your visual identities (for us it was orange and black).
- One button to rule them all + some declinations of this one.
- Only one font family for all the website.
- SVG files for your images as this you can change the color and the size really easily.
- For your width, height etc... take always aa multiple of 8 (this is a rule from real designer).

## How to connect to google API <a name="google"></a>
- First you have to create a google developer account on : https://console.cloud.google.com/ 
- Then enter a URI for example https://localhost:443/api/auth/google/redirect (like my image) it will redirect my backend
![Google dev console](https://media.discordapp.net/attachments/1101125011449839687/1101125121000886272/Capture_decran_2023-04-27_a_14.36.25.png?width=820&height=1138)

- Then you can find all the code in [this page](https://github.com/vbachele/ft_transcendence_42/blob/main/backend/src/auth/google-auth/google.service.ts)

More details about the code: 
1. The global function
2. How to generate OauthClient et the URL 
```c
async getUserFromGoogle(tokens: any) {
    try {
    const oauth2Client = await this.getOauth2ClientGoogle();
    await oauth2Client.setCredentials(tokens);
    const { data } = await google.oauth2('v2').userinfo.get({ auth: oauth2Client });
    let userInfos = {
			email: data.email,
      access_token: tokens.access_token,
		}
    return userInfos;
  }
  catch(error) {
    console.log("Fetch google user doesnt work, next step is testing with 42api")
  }
    return null;
  }
```

```c
  async getOauth2ClientGoogle() {
    const oauth2Client = new google.auth.OAuth2(
      'your_ID,
      'Your secret',
      'Your URI'
    );

    // generate a url that asks permissions for Blogger and Google Calendar scopes
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ];
    
    const url = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'offline',
      scope: scopes
    });
    return oauth2Client;
  }
```
