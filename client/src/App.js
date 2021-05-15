import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import HomepageGrid from './components/HomepageGrid';
import Header from './components/Header';
import CategoryDetail from './components/CategoryDetail';
import ItemDetail from './components/ItemDetail';
import ItemUpdate from './components/ItemUpdate';
import { ItemCreate } from './components/ItemCreate';
import ItemDelete from './components/ItemDelete';

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

  //const serverRoot = 'https://ancient-beyond-65897.herokuapp.com/';
  const serverRoot = 'http://localhost:9000/';



  const [indexData, setIndexData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getIndexData = async () => {
    const res = await fetch('https://ancient-beyond-65897.herokuapp.com/', {mode: 'cors'});
    const data = await res.json();
    setIndexData(data);
    setIsLoading(false);
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
                path={`/category/:id`}>
                  <CategoryDetail serverRoot={serverRoot} />
          </Route>
          <Route exact
                 path={`/category/:id/create_item`}>
                   <ItemCreate serverRoot={serverRoot} />
          </Route>
          <Route exact 
                 path={`/item/:id`}>
                   <ItemDetail serverRoot={serverRoot} />
          </Route>
          <Route exact
                 path={`/item/:id/update`}>
                   <ItemUpdate serverRoot={serverRoot} />
          </Route>
          <Route exact
                 path={`/item/:id/delete`}>
                   <ItemDelete serverRoot={serverRoot} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
