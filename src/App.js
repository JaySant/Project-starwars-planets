import React from 'react';
import Provider from './context/Provider';
import Table from './components/Table';
import FilterName from './components/FilterName';
import FilterNumber from './components/FilterNumber';

function App() {
  return (
    <Provider>
      <h2>Projeto Star Wars - Trybe</h2>
      <FilterName />
      <FilterNumber />
      <Table />
    </Provider>

  );
}

export default App;
