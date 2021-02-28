import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import HomepageGrid from './components/HomepageGrid';
import Header from './components/Header';
import CategoryDetail from './components/CategoryDetail'

const App = () => {

  const [indexData, setIndexData] = useState([])
  const [selectedCategoryDetail, setSelectedCategoryDetail] = useState({category: {_id: '0'}});

  const getIndexData = () => {
    fetch('https://ancient-beyond-65897.herokuapp.com/', {mode: 'cors'})
      .then(res => res.json())
      .then(res => setIndexData(res));
  }

  const getCategoryDetail = (categoryId) => {
    fetch(`https://ancient-beyond-65897.herokuapp.com/category/${categoryId}`, {mode: 'cors'})
      .then(res => res.json())
      .then(res => setSelectedCategoryDetail(res));
  }

  useEffect(() => {
    getIndexData();
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <Switch>
          <Route exact path='/'>
            <HomepageGrid 
              onCategoryClick={getCategoryDetail}
              categories={indexData}
              selectedCategoryDetail={selectedCategoryDetail}>
            </HomepageGrid>
          </Route>
          <Route exact path={`/category/${selectedCategoryDetail.category._id}`}>
            <CategoryDetail categoryData={selectedCategoryDetail}>
            </CategoryDetail>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
