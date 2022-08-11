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
      <form>
        <label htmlFor="column">
          Column
          <select
            data-testid="column-filter"
            onChange={ handleChange }
            value={ filter.column }
            name="column"
            id="column"
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
            id="comparison"
          >
            <option key="maior que">maior que</option>
            <option key="menor que">menor que</option>
            <option key="igual a">igual a</option>
          </select>
        </label>

        <label htmlFor="value">
          Value
          <input
            data-testid="value-filter"
            value={ filter.value }
            onChange={ handleChange }
            name="value"
            id="value"
          />
        </label>

        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleSubmit }

        >
          FILTRAR

        </button>

      </form>
      <div>
        {
          filterNumeric.map((item, index) => (
            <div data-testid="filter" key={ index }>
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
