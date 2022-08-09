import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Mycontext from './MyContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState('');

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const dataJson = await response.json();
      const dataResult = dataJson.results;
      setData(dataResult);
    };
    getData();
  }, []);

  function handleChange({ target: { value } }) {
    setFilterByName(value);
  }

  return (
    <Mycontext.Provider value={ { data, filterByName, handleChange } }>
      {children}
    </Mycontext.Provider>
  );
}
Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;

// Obrigado Cestari pela dica de colocar o handle no Provider
