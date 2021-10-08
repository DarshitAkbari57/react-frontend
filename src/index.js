import React from "react";
import ReactDOM from "react-dom";
// import 'ant-design-pro/dist/ant-design-pro.css';
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from './store';
import axios from 'axios';

// axios.interceptors.response.use(
//   function (response) {
//       return response;
//   },
//   function (error) {
//     // 401 means user is not authenticated, set user to empty object({})
//     if (error.response && error.response.status === 401 && error.response.data.type=="auth") {
//         // store.dispatch({
//         //     type: UPDATE_USER,
//         //     payload: null
//         // })

//       delete axios.defaults.headers.common['Authorization'];
      
//       const { redirect } = getPageQuery(); // Note: There may be security issues, please note
//       setCurrentUser({});
//       if (window.location.pathname !== '/user/login' && !redirect) {
//         history.replace({
//           pathname: '/user/login',
//           search: stringify({
//             redirect: window.location.href,
//           }),
//         });
//       }

//     }

//     if (typeof error.response === 'undefined') {
//       // dispatch({type:constantName,errorMessage:'Network error!'});
//       error = { ...error, response: { data: 'Network error!' } }
//     }

//     // if (error.response.status === 500) {
//     //   // dispatch({type:constantName,errorMessage:'Internal server error!'});
//     //   error = { ...error, response: { data: 'Internal server error!' } }

//     // }

//     return Promise.reject(error);
// });


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
