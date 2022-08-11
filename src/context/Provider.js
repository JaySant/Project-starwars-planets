import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Mycontext from './MyContext';

const INITIAL_OPTIONS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filterNumeric, setFilterNumeric] = useState([]);
  const [options, setOptions] = useState(INITIAL_OPTIONS);
  // const [isOrder, setIsOrder] = useState(false);
  const [sortBy, setSortBy] = useState({
    column: 'population',
    sort: 'ASC',
  });

  const [filter, setFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  useEffect(() => {
    const negOne = -1;
    const getData = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const dataJson = await response.json();
      const dataResult = dataJson.results;
      setData(dataResult.sort((a, b) => (a.name > b.name ? 1 : negOne)));
      setNewData(dataResult);
    };
    getData();
  }, []);

  function handleChange({ target }) {
    const { name, value } = target;
    setFilter((prev) => ({ ...prev, [name]: value }));
    if (name === 'name') {
      setFilterByName(value);
    }
  }

  function handleSubmit() {
    setOptions(options.filter((option) => option !== filter.column));
    setFilterNumeric((prev) => [...prev, filter]);
  }

  useEffect(() => {
    setFilter((prev) => ({ ...prev, column: options[0] }));
  }, [options]);

  function handleResetFilter() {
    setOptions(INITIAL_OPTIONS);
    setFilterNumeric([]);
  }

  function onDeleteFilter(event) {
    setFilterNumeric(filterNumeric
      .filter((_filter) => _filter.column !== event.target.id));
    setOptions([...options, event.target.id]);
  }

  useEffect(() => {
    const comparations = {
      'maior que': (a, b) => Number(a) > Number(b),
      'menor que': (a, b) => Number(a) < Number(b),
      'igual a': (a, b) => Number(a) === Number(b),
    };

    const res = filterNumeric.reduce((acc, curr) => {
      const result = acc.filter((planet) => {
        const planetFiltered = planet[curr.column];
        const { value } = curr;
        return comparations[curr.comparison](planetFiltered, value);
      });
      return result;
    }, data);
    setNewData(res);
  }, [filter, filterNumeric, data]);

  function onOrderFilter() {
    const dataSort = [...data];
    const numNegative = -1;
    const SortFilter = {
      ASC: () => dataSort
        .sort((a, b) => parseInt(a[sortBy.column], 10) - parseInt(b[sortBy.column], 10)),
      // if (a[sortBy.column] === 'unknown') {
      //   return 1;
      // }
      // if (b[sortBy.column] === 'unknown') {
      //   return numNegative;
      // }
      DESC: () => dataSort
        .sort((a, b) => {
          if (a[sortBy.column] === 'unknown') {
            return 1;
          }
          if (b[sortBy.column] === 'unknown') {
            return numNegative;
          }
          return parseInt(b[sortBy.column], 10) - parseInt(a[sortBy.column], 10);
        }),
    };
    SortFilter[sortBy.sort]();
    setNewData(dataSort);
    console.log(dataSort);
  }

  return (
    <Mycontext.Provider
      value={ { data,
        filterByName,
        filter,
        handleChange,
        handleSubmit,
        newData,
        options,
        filterNumeric,
        setFilterNumeric,
        onDeleteFilter,
        handleResetFilter,
        setSortBy,
        sortBy,
        onOrderFilter,
      } }
    >
      {children}
    </Mycontext.Provider>
  );
}
Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;

// Obrigado Cestari pela dica de colocar o handle no Provider
// data.map((item) => Number(item[column]) > Number(value)));
