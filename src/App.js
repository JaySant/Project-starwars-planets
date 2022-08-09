import React from 'react';
import Provider from './context/Provider';
import Table from './components/Table';
import FilterName from './components/FilterName';

function App() {
  return (
    <Provider>
      <h2>Projeto Star Wars - Trybe</h2>
      <FilterName />
      <Table />
    </Provider>

  );
}

export default App;
