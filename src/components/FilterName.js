import React, { useContext } from 'react';
import Mycontext from '../context/MyContext';

function FilterName() {
  const { filterByName, handleChange } = useContext(Mycontext);

  return (
    <div>
      <form>
        <input
          placeholder="Digite um planeta"
          type="text"
          data-testid="name-filter"
          onChange={ handleChange }
          value={ filterByName }
        />
      </form>
    </div>
  );
}

export default FilterName;
