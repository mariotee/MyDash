import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from 'material-theme';
import './index.css';

import routes from 'routes';
import store from 'store';

const App = () => {
  return <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <HashRouter>
        <Switch>
        {
					routes.map((prop, index) => {
            return <Route
							exact
							key={index}
							path={prop.path}
							component={prop.component}
              />
						})          
				}
        </Switch>
      </HashRouter>
    </Provider>
  </MuiThemeProvider>
}

ReactDOM.render(<App/>,document.getElementById('root'));