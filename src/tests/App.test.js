import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

//  const columnEl = screen.getByRole('combobox', {  name: /column/i})
//  const comparisonEl = screen.getByRole('combobox', {  name: /comparison/i})
// const valueEl = screen.getByRole('textbox', {  name: /value/i})
// const buttonFilterEl = screen.getByRole('button', {  name: /filtrar/i})
// const buttonRemoveEl = screen.getByRole('button', {  name: /remover filtros/i})
// const columnOrderEl = screen.getByRole('combobox', {  name: /ordenar:/i})
// const radioASC = screen.getByRole('radio', {  name: /ascendente/i})
// const radioDESC = screen.getByRole('radio', {  name: /descendente/i})
// const buttonOrderEl = screen.getByRole('button', {  name: /ordenar/i})
// const removeFilter = screen.getAllByRole('button', {  name: /x/i})

describe('', () => {
  const promise = Promise.resolve(testData)
  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({json: () => promise})
    render(<App />);
    await act(async () => {await promise})
  })
  afterEach(() => jest.clearAllMocks())
  test('Testa requisição para a API;', async () => {
    const linkElement = screen.getByTestId("name-filter");
    expect(linkElement).toBeInTheDocument();
    userEvent.type(linkElement, 'oo')
    const planet = await screen.findByRole('cell', {  name: /naboo/i})
    expect(planet).toBeInTheDocument();

  });
  test('Testa os filtros', () => {
    const columnEl = screen.getByRole('combobox', {  name: /column/i})
    const comparisonEl = screen.getByRole('combobox', {  name: /comparison/i})
    const valueEl = screen.getByRole('textbox', {  name: /value/i})
    const buttonFilterEl = screen.getByRole('button', {  name: /filtrar/i})
    userEvent.selectOptions(columnEl, 'orbital_period')
    userEvent.selectOptions(comparisonEl, 'igual a')
    userEvent.type(valueEl, '368')
    userEvent.click(buttonFilterEl)
    userEvent.selectOptions(columnEl, 'population')
    userEvent.selectOptions(comparisonEl, 'maior que')
    userEvent.type(valueEl, '1000')
    userEvent.click(buttonFilterEl)
    userEvent.selectOptions(columnEl, 'diameter')
    userEvent.selectOptions(comparisonEl, 'menor que')
    userEvent.type(valueEl, '20000')
    userEvent.click(buttonFilterEl)
    const planet = screen.getByRole('cell', {  name: /coruscant/i})
    expect(planet).toBeInTheDocument()
    const removeFilter = screen.getAllByRole('button', {  name: /x/i})
    expect(removeFilter).toHaveLength(3)
    userEvent.click(removeFilter[0])
    const buttonRemoveEl = screen.getByRole('button', {  name: /remover filtros/i})
    userEvent.click(buttonRemoveEl)
  })
  test('Testa o ascendente das colunas', () => {
    const columnOrderEl = screen.getByRole('combobox', {  name: /ordenar:/i})
    const radioASC = screen.getByRole('radio', {  name: /ascendente/i})
    const buttonOrderEl = screen.getByRole('button', {  name: /ordenar/i})
    userEvent.selectOptions(columnOrderEl, 'diameter')
    userEvent.click(radioASC)
    userEvent.click(buttonOrderEl)
  })
  test('Testa o descendente das colunas', () => {
    const columnOrderEl = screen.getByRole('combobox', {  name: /ordenar:/i})
    const radioDESC = screen.getByRole('radio', {  name: /descendente/i})
    const buttonOrderEl = screen.getByRole('button', {  name: /ordenar/i})
    userEvent.selectOptions(columnOrderEl, 'population')
    userEvent.click(radioDESC)
    userEvent.click(buttonOrderEl)
  })
})


