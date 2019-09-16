import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import configurationStore from '../../src/store/configureStore';

const store = configurationStore();

const Root = (props) => {
    console.disableYellowBox = true;
    return(
        <App {...props} selectedPhase={2}/>
)
};

export default Root;
