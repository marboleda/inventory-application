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

  const getCategoryDetail = (categoryId) => {
    fetch(`http://localhost:9000/category/${categoryId}`)
      .then(res => res.json())
      .then(res => console.log(res));
  }

  useEffect(() => {
    getIndexData();
  }, [])

  return (
    <div className="App">
      <h1>Got-It-All Grocers</h1>
      <HomepageGrid 
        onCategoryClick={getCategoryDetail}
        categories={indexData}>
      </HomepageGrid>
    </div>
  );
}

export default App;
