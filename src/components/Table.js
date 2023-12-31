import React, { useContext } from 'react';
import Mycontext from '../context/MyContext';

function Table() {
  const { newData, filterByName } = useContext(Mycontext);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {newData.filter((planetNameFilter) => planetNameFilter.name
            .includes(filterByName))
            .map((planets) => (
              <tr key={ planets.name }>
                <td data-testid="planet-name">{planets.name}</td>
                <td>{planets.rotation_period}</td>
                <td>{planets.orbital_period}</td>
                <td>{planets.diameter}</td>
                <td>{planets.climate}</td>
                <td>{planets.gravity}</td>
                <td>{planets.terrain}</td>
                <td>{planets.surface_water}</td>
                <td>{planets.population}</td>
                <td>{planets.films}</td>
                <td>{planets.created}</td>
                <td>{planets.edited}</td>
                <td>{planets.url}</td>
              </tr>
            ))}

        </tbody>
      </table>
    </div>
  );
}

export default Table;
