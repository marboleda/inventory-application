import React, { useState, useEffect } from 'react';
import './App.css';
import HomepageGrid from './components/HomepageGrid';
import Header from './components/Header';

const App = () => {

  const [indexData, setIndexData] = useState([])
  const [selectedCategoryDetail, setSelectedCategoryDetail] = useState({})

  const getIndexData = () => {
    fetch('http://localhost:9000/', {mode: 'cors'})
      .then(res => res.json())
      .then(res => setIndexData(res));
  }

  const getCategoryDetail = (categoryId) => {
    fetch(`http://localhost:9000/category/${categoryId}`, {mode: 'cors'})
      .then(res => res.json())
      .then(res => setSelectedCategoryDetail(res));
  }

  useEffect(() => {
    getIndexData();
  }, [])

  return (
    <div className="App">
      <Header></Header>
      <HomepageGrid 
        onCategoryClick={getCategoryDetail}
        categories={indexData}
        selectedCategoryDetail={selectedCategoryDetail}>
      </HomepageGrid>
    </div>
  );
}

export default App;
