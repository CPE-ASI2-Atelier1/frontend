/**
 * @author Arthur Jezequel
 * @author Evann Nalewajek
 */

import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css'
import App from './App.tsx'
import { store } from './store';

// For server side rendering
if (typeof window !== 'undefined') {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </StrictMode>,
    )
}
