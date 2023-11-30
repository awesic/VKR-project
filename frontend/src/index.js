import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import './index.css';
import App from './App';
import store from "./store";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <Provider store={store}>
        <App/>
    // </Provider>
    // <Provider store={store}>
    //     <BrowserRouter>
    //         <Routes>
    //             <Route element={<App/>}/>
    //         </Routes>
    //     </BrowserRouter>
    // </Provider>
);
