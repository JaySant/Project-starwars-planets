import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Mycontext from './MyContext';

function Provider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const dataJson = await response.json();
      const dataResult = dataJson.results;
      setData(dataResult);
    };
    getData();
  }, []);

  return (
    <Mycontext.Provider value={ { data } }>
      {children}
    </Mycontext.Provider>
  );
}
Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
