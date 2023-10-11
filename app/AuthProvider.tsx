"use client";

import { InteractionType, PublicClientApplication } from "@azure/msal-browser";
import { MsalAuthenticationTemplate, MsalProvider } from "@azure/msal-react";
import { loginRequest, msalConfig } from "./authConfig";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const msalInstance = new PublicClientApplication(msalConfig);
  return (
    <MsalProvider instance={msalInstance}>
      <MsalAuthenticationTemplate
        interactionType={InteractionType.Redirect}
        authenticationRequest={loginRequest}
      >
        {children}
      </MsalAuthenticationTemplate>
    </MsalProvider>
  );
};
