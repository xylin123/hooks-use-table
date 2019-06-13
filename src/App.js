import React, { Fragment, useState } from 'react';
import { Button } from 'antd';
import UseHooksTable from './UseHooksTable';
import UseClassTable from './UseClassTable';
import './App.css';

function App() {
  const [state, setState] = useState(false);
  return (
    <Fragment>
      <Button onClick={() => setState(!state)}>{ state ? 'UseHooksTable' : 'UseClassTable' }</Button>
      {
        state ? <UseHooksTable /> : <UseClassTable />
      }
    </Fragment>
  );
}

export default App;
