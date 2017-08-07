import React, { Component } from 'react';
import App from './App';
import './AppContainer.css'


class AppContainer extends Component {
    render() {
        return (
            <div className="AppContainer">
                <App type={'others'} label={'Другое 2:'} />
                <App type={'products'} label={'Продукты:'} />
                <App type={'other'} label={'Другое:'} />
            </div>
        );
    }
}

export default AppContainer;