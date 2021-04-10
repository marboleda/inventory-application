import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import HomepageGrid from './components/HomepageGrid';
import Header from './components/Header';
import CategoryDetail from './components/CategoryDetail';
import ItemDetail from './components/ItemDetail';
import ItemUpdate from './components/ItemUpdate';
import ItemCreate from './components/ItemCreate';
import ItemDelete from './components/ItemCreate';

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

  const getIndexData = () => {
    fetch('https://ancient-beyond-65897.herokuapp.com/', {mode: 'cors'})
      .then(res => res.json())
      .then(res => { 
        setIndexData(res);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getIndexData();
  }, [])



  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <Switch>
          {isLoading ? <LoadingMessage>Loading Content...</LoadingMessage> : null}
          <Route exact path='/'>
            <HomepageGrid 
              categories={indexData}>
            </HomepageGrid>
          </Route>
          <Route exact 
                path={`/category/:id`}
                component={CategoryDetail}>
          </Route>
          <Route exact
                 path={`/category/:id/create_item`}
                 component={ItemCreate}>
          </Route>
          <Route exact 
                 path={`/item/:id`}
                 component={ItemDetail}>
          </Route>
          <Route exact
                 path={`/item/:id/update`}
                 component={ItemUpdate}>
          </Route>
          <Route exact
                 path={`/item/:id/delete`}
                 component={ItemDelete}>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
