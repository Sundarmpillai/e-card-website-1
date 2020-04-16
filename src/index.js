import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as firebase from 'firebase';
import 'firebase/firestore';
import * as serviceWorker from './serviceWorker';
import {createStore,applyMiddleware, compose} from 'redux'
import rootReducer from './store/reducer/rootReducer'
import {Provider,useSelector } from 'react-redux'
import thunk from 'redux-thunk'
import { ReactReduxFirebaseProvider,isLoaded ,reactReduxFirebase} from 'react-redux-firebase'
import { reduxFirestore,createFirestoreInstance,getFirestore } from 'redux-firestore'
import fbConfig from './config/fbConfig'

const rrfConfig = {userProfile: 'user', useFirestoreForProfile:true} // react-redux-firebase config
const initialState = {}
// Initialize firebase instance
if (!firebase.apps.length) {
   firebase.initializeApp({rrfConfig});
}

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if(serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.log(e);
  }
};

const peristedState = loadState();

const store = createStore(
    rootReducer,
    peristedState,
    compose(
    applyMiddleware(thunk.withExtraArgument({firebase})) // to add other middleware
    )
  );

  store.subscribe(() => {
    saveState(store.getState());
  });

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance // <- needed if using firestore
  }

  function AuthIsLoaded({ children }) {
    const auth = useSelector(state => state.firebase.auth)
    if (!isLoaded(auth)) return <div>Loading Screen...</div>;
        return children
}


ReactDOM.render(<Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
        <AuthIsLoaded>
          <App />
        </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>, document.getElementById('root'));
  serviceWorker.unregister();
  