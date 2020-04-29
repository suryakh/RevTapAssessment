import React from 'react';
import Charts from './charts/Charts';
import Customers from './Tableform/Customers';

function App() {
  return (
    <>
      <div className="container-fluid bg-primary p-4">
      </div>
      <Charts />
      <div className="text-center m-2">
        {/* hiii */}
        <h1>Customer Details</h1>
      </div>
      <Customers />
    </>
  );
}

export default App;
