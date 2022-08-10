import React, { useContext } from 'react';
import Mycontext from '../context/MyContext';

function FilterNumber() {
  const { filter,
    handleChange,
    handleSubmit,
    options,
    filterNumeric,
    onDeleteFilter,
    handleResetFilter } = useContext(Mycontext);

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="column">
          Column
          <select
            data-testid="column-filter"
            onChange={ handleChange }
            value={ filter.column }
            name="column"
          >
            {
              options.map((option) => (
                <option key={ option } value={ option }>
                  {option}
                </option>
              ))
            }
          </select>
        </label>

        <label htmlFor="comparison">
          Comparison
          <select
            data-testid="comparison-filter"
            value={ filter.comparison }
            onChange={ handleChange }
            name="comparison"
          >
            <option key="maior que">maior que</option>
            <option key="menor que">menor que</option>
            <option key="igual a">igual a</option>
          </select>
        </label>

        <label htmlFor="value">
          <input
            data-testid="value-filter"
            value={ filter.value }
            onChange={ handleChange }
            name="value"
          />
        </label>

        <button
          type="submit"
          data-testid="button-filter"
        >
          FILTRAR

        </button>

      </form>

      <div>
        {
          filterNumeric.map((item) => (
            <div data-testid="filter" key={ item.id }>
              <div>
                { item.column }
                {' '}
                { item.comparison }
                {' '}
                { item.value }
              </div>
              <button
                id={ item.column }
                onClick={ onDeleteFilter }
                type="button"
              >
                X
              </button>
            </div>
          ))
        }

        <button
          type="button"
          onClick={ handleResetFilter }
          data-testid="button-remove-filters"
        >
          remover filtros
        </button>
      </div>

    </div>

  );
}

export default FilterNumber;
