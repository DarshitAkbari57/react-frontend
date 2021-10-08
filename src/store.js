import { Provider } from "react-redux";
import axios from 'axios';

import { createStore } from "redux";

const authReducer = function (state = {message: null}, action) {
  switch (action.type) {
    case "LOGIN":
      axios.defaults.headers.common["x-auth-token"] = action.payload.token;
      // console.log("token set ...")
      // console.log(axios.defaults.headers.common['x-auth-token'])
      // console.log({...action.payload})
      localStorage.setItem("auth", JSON.stringify({ ...action.payload }));
      return { ...action.payload };
    case "UPDATE_USER":
      // console.log("update user .............................")
      // console.log(action.payload)
      localStorage.setItem(
        "auth",
        JSON.stringify({ ...state, user: { ...state.user, ...action.payload } })
      );
      console.log("update ........................");
      console.log({ ...state, user: { ...state.user, ...action.payload } });
      return { ...state, user: { ...state.user, ...action.payload } };
    // case 'NOTIFY':
    //   return {
    //     ...state, notify: action.payload,
    //   }
    case "MESSAGE":
        return {
            ...state, 
            message: action.payload,
        }
    case "LOGOUT":
      // localStorage.setItem("auth",null)
      localStorage.removeItem("auth");
      delete axios.defaults.headers.common["x-auth-token"];
      return null;
    default:
      return state;
  }
};

const store = createStore(authReducer);

export default store;
