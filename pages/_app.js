import React, { useEffect } from 'react'
import { KeyringProvider, useKeyring } from '@w3ui/react-keyring'
import { UploaderProvider } from '@w3ui/react-uploader'
import { UploadsListProvider } from "@w3ui/react-uploads-list";

import '../styles/globals.css'
import '../styles/spinner.css'
import '../styles/tachyons.min.css'

function App ({ Component, pageProps }) {
  return (
    <KeyringProvider>
      <UploaderProvider>
        <UploadsListProvider>
          <AgentLoader>
            <div className='vh-100 flex flex-column justify-center items-center sans-serif light-silver pt5'>
              <header>
                <img src='/logo.png' width='250' alt='logo' />
              </header>
              <div className='w-90 w-50-ns mw6 h-100'>
                <Component {...pageProps} />
              </div>
            </div>
          </AgentLoader>
        </UploadsListProvider>
      </UploaderProvider>
    </KeyringProvider>
  )
}


function AgentLoader ({ children }) {
  const [, { loadAgent }] = useKeyring()
  // eslint-disable-next-line
  useEffect(() => { loadAgent() }, []) // load agent - once.
  return children
}

export default App;
