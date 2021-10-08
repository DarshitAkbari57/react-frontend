import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";

import Login from "./login";
import Signup from "./signup";
import Home from "./home";
import ForgetPassword from "./forgetPassword";
import UpdatePassword from "./updatePassword";
import OnBoarding from "./onboarding";
import Join from "./join-link";
import ThankYou from "./thank-you";
import Verify from "./verify-email";
// import Invite from "./invite";


const Routes = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/itinerary/join/:id" component={Join} />
      <Route exact path="/userverify/:userId/:token" component={Verify} />
      {/* <Route exact path="/itinerary/invite/:itineraryId" component={Invite} /> */}
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/thank-you" component={ThankYou} />
      <Route exact path="/onboarding" component={OnBoarding} />
      <Route exact path="/forget" component={ForgetPassword} />
      <Route exact path="/update/password/:id" component={UpdatePassword} />
      <Route exact path="/update/password/:id" component={UpdatePassword} />
      <Redirect to="/login" />
    </Switch>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => {
      dispatch({
        type: "LOGIN",
        payload: data,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
