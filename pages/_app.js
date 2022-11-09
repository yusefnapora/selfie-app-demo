import { useEffect } from "react";
import { AuthProvider, useAuth } from "@w3ui/react-keyring";
import { UploaderProvider } from "@w3ui/react-uploader";
import { UploadsListProvider } from "@w3ui/react-uploads-list";

import "../styles/globals.css";
import "../styles/tachyons.min.css";
import "../styles/spinner.css";

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <UploaderProvider>
        <UploadsListProvider>
          <IdentityLoader>
            <div className="vh-100 pt5 flex flex-column justify-center items-center sans-serif light-silver">
              <header>
                <img src="/logo.png" width="250" alt="logo" />
              </header>
              <div className="w-90 w-50-ns mw6 h-100">
                <Component {...pageProps} />
              </div>
            </div>
          </IdentityLoader>
        </UploadsListProvider>
      </UploaderProvider>
    </AuthProvider>
  );
}

function IdentityLoader({ children }) {
  const { loadDefaultIdentity } = useAuth();
  // eslint-disable-next-line
  useEffect(() => {
    loadDefaultIdentity();
  }, []); // try to load default identity - once.
  return children;
}

export default App;
