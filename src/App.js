import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import Main from './components/MainComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';




class App extends Component {

    
    render() {
        const store = ConfigureStore();
        return (
            <Provider store={store}>
          <BrowserRouter>
              <div className="App">
                  <Main />
              </div>
          </BrowserRouter>
      </Provider>
        );
    };
}

export default App;

// installed the Redux library along with React-Redux, a library to help integrate Redux with React applications. 
// You set up a reducer and used it to initialize the Redux store state with the createStore() function from Redux.  
// then used the <Provider> component from Redux to make the store available to child components connected with the connect() function from React-Redux. 
// Then you connected the Main component with connect() and made the store state available to the Main component as props using mapStateToProps(). 