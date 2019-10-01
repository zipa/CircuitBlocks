import React, { useState } from 'react';

import { Alert } from './components/Modal';
import { Home, Editor } from './layouts';

import './tmp.css';
import './assets/material_icons.css';
import './assets/poppins.css';
import './assets/source_code_pro.css';
import InstallInfo from "./components/InstallInfo";
import Error from "./layouts/Home/components/Error";

const App = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [error, setError] = useState<string|undefined>(undefined);
  const [errorFatal, setErrorFatal] = useState<boolean>(false);
  const [filename, setFilename] = useState('');
  const [isInstalling, setIsInstalling] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const monacoRef = React.createRef();
  const blocklyRef = React.createRef<Editor>();

  const openHome = () => {
    (blocklyRef.current as any).cleanup();
    setIsEditorOpen(false);
  };

  const openEditor = (data: string, filename?: string) => {
    (blocklyRef.current as any).load(data);
    setFilename(filename || '');
    setIsEditorOpen(true);
  };

  const closeAlert = () => {
    console.log('No :(');
    setIsAlertOpen(false);
  };

  const okAlert = () => {
    console.log('Ok');
    setIsAlertOpen(false);
  };

  const reportError = (message: string, fatal?: boolean) => {
    setError(message);
    if(fatal){
      setErrorFatal(true);
    }
  };

  return (
    <>
      {isAlertOpen && (
        <Alert title="Foobar" body="Something......" close={closeAlert} yes={okAlert} />
      )}
      { error && <Error message={error} dismiss={() => setError(undefined)}  /> }
      <InstallInfo setIsInstalling={installing => setIsInstalling(installing)} reportError={(message, fatal) => reportError(message, fatal)} />
      <Home reportError={(message, fatal) => reportError(message, fatal)}
            scrollStop={!!error || isInstalling}
            isEditorOpen={isEditorOpen}
            openEditor={openEditor} />
      <Editor
          reportError={(message, fatal) => reportError(message, fatal)}
        isEditorOpen={isEditorOpen}
        title={filename}
        setFilename={setFilename}
        openHome={openHome}
        monacoRef={monacoRef}
        ref={blocklyRef}
      />
    </>
  );
};

export default App;
