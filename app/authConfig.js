import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: `${process.env.NEXT_PUBLIC_AUTH_CLIENTID}`,
    authority: `${process.env.NEXT_PUBLIC_AUTH_AUTHORITY}`,
  },
  redirectUri: `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI}`,
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        // console.log('level', level);
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            // console.info(message);
            return;
          case LogLevel.Verbose:
            // console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
      piiLoggingEnabled: false,
    },
    windowHashTimeout: 60000,
    iframeHashTimeout: 6000,
    loadFrameTimeout: 0,
    asyncPopups: false,
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: [`${process.env.NEXT_PUBLIC_AUTH_SCOPE}`],
  // scopes: [
  //   "calendars.read",
  //   "user.read",
  //   "openid",
  //   "profile",
  //   "people.read",
  //   "user.readbasic.all",
  // ],
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
