import { useState } from 'react';
import reactLogo from '../images/react.svg';
import viteLogo from '/vite.svg';
import '../styles/App.scss';

function App() {
  const titleH1 = 'Country Info App';
  const titleH2 =
    'Explore information about countries, capitals and flags. Add new countries and filter through the list';

  return (
    <>
      <header className="header">
        <h1>{titleH1}</h1>
        <h2>{titleH2}</h2>
      </header>
      <main></main>
    </>
  );
}

export default App;
