import './App.css';
import React, { useState } from 'react';
import GenericForm from './components/GenericForm';

function App() {
  const [flows, setFlows] = useState([
    {
      name: 'Jumping Forms',
      config: 'workflow_first.json',
      submitToHasura: false
    },
    {
      name: 'Hasura Submissions',
      config: 'workflow_second.json',
      submitToHasura: true
    },
    {
      name: 'Offline Capabilities',
      config: 'workflow_first.json',
      offline: true
    },
    {
      name: 'File Upload',
      config: 'workflow_first.json'
    }
  ])

  const [selectedFlow, setSelectedFlow] = useState({});

  return (
    <div className="App">
      <div className='container'>
        {!Object.keys(selectedFlow).length ?
          <>
            <div className='heading animate__animated animate__fadeInDown'>Workflow Demo App</div>
            <div className='subtitle animate__animated animate__fadeInDown'>Please select one of the flows</div>
            <div className='btnContainer'>
              {flows?.map(el => <div className='workflowBtns animate__animated animate__fadeIn' onClick={() => setSelectedFlow(el)}>{el.name}</div>)}
            </div>
          </>
          : <GenericForm {...{ selectedFlow, setSelectedFlow }} />
        }

      </div>
    </div>
  );
}

export default App;
