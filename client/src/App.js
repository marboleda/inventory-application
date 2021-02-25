import React, { useState, useEffect } from 'react';
import './App.css';
import HomepageGrid from './components/HomepageGrid';

const App = () => {

  const [indexData, setIndexData] = useState([])

  const getIndexData = () => {
    fetch('http://localhost:9000/')
      .then(res => res.json())
      .then(res => setIndexData(res));
  }

  useEffect(() => {
    getIndexData();
  }, [])

  return (
    <div className="App">
      <h1>Got-It-All Grocers</h1>
      <HomepageGrid categories={indexData}></HomepageGrid>
    </div>
  );
}

export default App;
