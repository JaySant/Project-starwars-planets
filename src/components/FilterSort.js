import React, { useContext } from 'react';
import Mycontext from '../context/MyContext';

function FilterSort() {
  const { options, sortBy, setSortBy, onOrderFilter,
    handleRadio } = useContext(Mycontext);
  return (
    <div>
      <label htmlFor="column-sort">
        Ordenar:
        <select
          data-testid="column-sort"
          onChange={ ({ target: { value } }) => setSortBy({
            ...sortBy, column: value,
          }) }
          name="column-sort"
          value={ sortBy.column }
          id="column-sort"
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

      <div>
        <label htmlFor="column-asc">
          <input
            type="radio"
            value="ASC"
            data-testid="column-sort-input-asc"
            onChange={ handleRadio }
            id="column-asc"
            name="sort"
          />
          Ascendente
        </label>
      </div>
      <div>
        <label htmlFor="column-desc">
          <input
            type="radio"
            value="DESC"
            name="sort"
            data-testid="column-sort-input-desc"
            onChange={ handleRadio }
            id="column-desc"
          />
          Descendente
        </label>
      </div>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ onOrderFilter }
      >
        ORDENAR
      </button>

    </div>
  );
}

export default FilterSort;
