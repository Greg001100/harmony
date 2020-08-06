import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadState, saveState } from './utilities/localStorage';

const preloadedState = loadState();

const configureStore = () => {
  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk))
  );
};

export default configureStore;
