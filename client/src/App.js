import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import HomepageGrid from './components/HomepageGrid';
import Header from './components/Header';
import CategoryDetail from './components/CategoryDetail';
import ItemDetail from './components/ItemDetail';

const LoadingMessage = styled.p`
  color: #427d00;
`;

const App = () => {

  const emptyItemObject = {
    _id: '0',
    name: '',
    weight_num: 0,
    weight_unit: "g",
    price: 0,
    category: '0',
    stock: 0
  }

  const [indexData, setIndexData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategoryDetail, setSelectedCategoryDetail] = useState({category: {_id: '0'}});
  const [selectedItemDetail, setSelectedItemDetail] = useState(emptyItemObject);

  const getIndexData = () => {
    fetch('https://ancient-beyond-65897.herokuapp.com/', {mode: 'cors'})
      .then(res => res.json())
      .then(res => { 
        setIndexData(res);
        setIsLoading(false);
      });
  }

  const getCategoryDetail = (categoryId) => {
    fetch(`https://ancient-beyond-65897.herokuapp.com/category/${categoryId}`, {mode: 'cors'})
      .then(res => res.json())
      .then(res => setSelectedCategoryDetail(res));
  }

  const getItemDetail = (itemId) => {
    fetch(`https://ancient-beyond-65897.herokuapp.com/item/${itemId}`, {mode: 'cors'})
    .then(res => res.json())
    .then(res => setSelectedItemDetail(res));   
  }

  useEffect(() => {
    getIndexData();
  }, [])



  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <Switch>
          {isLoading ? <LoadingMessage>Loading Categories...</LoadingMessage> : null}
          <Route exact path='/'>
            <HomepageGrid 
              onCategoryClick={getCategoryDetail}
              categories={indexData}>
            </HomepageGrid>
          </Route>
          <Route exact path={`/category/${selectedCategoryDetail.category._id}`}>
            <CategoryDetail 
              categoryData={selectedCategoryDetail}
              onItemClick={getItemDetail}>
            </CategoryDetail>
          </Route>
          <Route exact path={`/item/${selectedItemDetail._id}`}>
            <ItemDetail itemData={selectedItemDetail}>
            </ItemDetail>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
