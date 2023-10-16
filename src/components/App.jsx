import { useEffect, useState } from 'react';
import '../styles/index.scss';

function App() {
  const [countries, setCountries] = useState([]);
  const [nameSearch, setNameSearch] = useState('');
  const [continentSearch, setContinentSearch] = useState('');
  const [newCountry, setNewCountry] = useState({
    name: '',
    capital: '',
    flag: '',
    continents: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    fetch(
      'https://restcountries.com/v3.1/all?fields=name,capital,flag,region'
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCountries(data);
      });
  }, []);

  const handleInputNameSearch = (event) => {
    setNameSearch(event.target.value);
  };

  const handleInputContinentSearch = (event) => {
    setContinentSearch(event.target.value);
  };

  const handleInputAdd = (event) => {
    const clonedNewCountry = { ...newCountry };
    clonedNewCountry[event.target.id] = event.target.value;
    setNewCountry(clonedNewCountry);
  };

  const handleForm = (event) => {
    event.preventDefault();
  };

  const handleClick = () => {
    if (
      newCountry.name === '' ||
      newCountry.capital === '' ||
      newCountry.flag === '' ||
      newCountry.continents === ''
    ) {
      setError(
        'Debes rellenar el nombre del país, la capital, el continente o la url de la bandera'
      );
    } else {
      setCountries([...countries, newCountry]);
      setError('');
      setNewCountry({
        name: '',
        capital: '',
        flag: '',
        continents: ''
      });
    }
  };

  const titleH1 = 'Country Info App';
  const titleH2 =
    'Explore information about countries, capitals and flags. Add new countries and filter through the list';

  const renderCountries = () => {
    return countries
      .filter(
        (country) =>
          country.name.common.toLowerCase().includes(nameSearch.toLowerCase()) ||
          country.region.toLowerCase().includes(continentSearch.toLowerCase())
      )
      .map((country, index) => (
        <li className='item' key={index}>
          <p>{country.flag}</p> 
          <p>Nombre: {country.name.common}</p>
          <p>Capital: {country.capital}</p>
          <p>Continent: {country.region}</p>
        </li>
      ));
  };

  return (
    <>
      <header className='header'>
        <h1 className='titleH1'>{titleH1}</h1>
        <h2 className='titleH2'>{titleH2}</h2>
        <form onSubmit={handleForm}>
          <input
            type='text'
            name='nameSearch'
            placeholder='Spain'
            value={nameSearch}
            onChange={handleInputNameSearch}
          />
          <select
            name='continentSearch'
            value={continentSearch}
            onChange={handleInputContinentSearch}
          >
            <option value='all'>All</option>
            <option value='africa'>Africa</option>
            <option value='north america'>North America</option>
            <option value='south america'>South America</option>
            <option value='europe'>Europe</option>
            <option value='asia'>Asia</option>
            <option value='oceania'>Oceania</option>
          </select>
        </form>
      </header>
      <main className='container'>
        <ul className='contact-list'>{renderCountries()}</ul>
        <form onSubmit={handleForm}>
          <h3>Añade un nuevo país</h3>
          <input
            type='text'
            name='name'
            id='name'
            placeholder='Country name'
            value={newCountry.name}
            onChange={handleInputAdd}
          />
          <input
            type='text'
            name='capital'
            id='capital'
            placeholder='Capital'
            value={newCountry.capital}
            onChange={handleInputAdd}
          />
          <input
            type='text'
            name='flag'
            id='flag'
            placeholder='Flag icon'
            value={newCountry.flag}
            onChange={handleInputAdd}
          />
          <input
            type='text'
            name='continent'
            id='continent'
            placeholder='Continent'
            value={newCountry.region}
            onChange={handleInputAdd}
          />
          <input type='submit' value='Añadir' onClick={handleClick} />
        </form>
        <p>{error}</p>
      </main>
    </>
  );
}

export default App;
