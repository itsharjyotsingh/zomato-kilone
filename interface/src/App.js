import './App.css';
import { useState, useEffect } from 'react';
import Review from './ReviewCards/Review';

import Navbox from './components/Navbox.js';

function App() {

  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
  }

  return (
    <>
      <Navbox dark={dark} toggleTheme={toggleTheme}/>
      <Review/>
    </>
  );
}

export default App;
