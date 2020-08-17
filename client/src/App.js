import React, {Fragment} from 'react';
import { ModelAProvider } from './context/ModelAContext';
import Homepage from './components/Homepage';
import './App.scss';

function App() {
  return (
    <ModelAProvider>
      <Fragment>
        <Homepage />
      </Fragment>
    </ModelAProvider>
  );
}

export default App;
