import {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './app/App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';
import {store} from './store/store';

ReactDOM.render(
    <StrictMode>
        <Provider store={store}>
            <HashRouter>
                <App/>
            </HashRouter>
        </Provider>
    </StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
