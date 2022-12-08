import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import authService from '../services/auth/AuthService';
import Router from './Router/Router';
import OneSignal from "react-onesignal";
import '../styles/globals.css';
import 'toastr/build/toastr.min.css';

export default function App() {
  const [initialized, setInitialized] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      authService.restoreLogin(dispatch);
    }
  }, [token]);


  useEffect(() => {
    if (initialized === false) {
      OneSignal.init({
        appId: "d53b5846-dfba-42d8-8106-35f30303928e",
        allowLocalhostAsSecureOrigin: true
      });

      setInitialized(true);
    }

    OneSignal.isPushNotificationsEnabled()
      .then(response => {
        if (response === false) {
          OneSignal.showSlidedownPrompt({force: true});
        }
      })

    return () => {
    }
  }, [initialized]);

  return (
    <>
      <img className='top-left-bg' src='/images/top-right-bg.png' alt={'bg'}/>
      <img className='bottom-right-bg' src='/images/bottom-left-bg.png' alt={'bg'}/>
      <Router/>
    </>
  );
}
