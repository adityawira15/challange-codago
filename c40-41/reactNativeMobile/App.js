import React from 'react';
import Home from './components/home';
import AddProduct from './components/addproduct'
import Details from './components/details'
import { configuration } from './store';
import { Provider } from 'react-redux';
import { Router, Stack, Scene } from 'react-native-router-flux';

const store = configuration()

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Stack key="root">
            <Scene key="home" component={Home} title="Home" />
            <Scene key="addproduct" component={AddProduct} title="Add Product" />
            <Scene key="details" component={Details} title="Details" />
          </Stack>
        </Router>
      </Provider>
    )
  }
}
