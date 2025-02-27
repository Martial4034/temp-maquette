import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import WebApp from '@twa-dev/sdk';

import "./index.css";
import App from "./App.tsx";
import "./i18n.ts";
import AppProvider from "./contexts/AppContext.tsx";

export const WEB_HOST_URI = "https://flappy-dda38.web.app"

WebApp.MainButton.hide();
WebApp.expand();
WebApp.ready();
WebApp.enableClosingConfirmation();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <TonConnectUIProvider manifestUrl={`${WEB_HOST_URI}/tonconnect-manifest.json`}>
        <App />
      </TonConnectUIProvider>
    </AppProvider>
  </StrictMode>,
);
