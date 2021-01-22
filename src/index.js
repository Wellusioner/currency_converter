import React from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/Home';
import 'fontsource-roboto';

import './assets/style/style.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './redux/reducers';
import rootSaga from './redux/sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

