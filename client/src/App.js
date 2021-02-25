import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

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
      <ul>
        {indexData.map((category) => {
          return <li key={category._id}>{category.name}</li>
        })}
      </ul>
    </div>
  );
}

export default App;
