import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authService from '../../../services/auth/AuthService';
import styles from './layout.module.css';
import Navbar from '../Navbar/Navbar';
import {useNavigate} from "react-router-dom";

export default function Layout(props) {
  const NORMAL_PAGES_PATH_NAMES = [
    '/login',
    '/',
    '/register',
    '/recover',
    '/start',
    '/reset-password/[token]',
  ];

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.authToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token === null) {
      authService.restoreLogin(dispatch);
    }

    if (
      !NORMAL_PAGES_PATH_NAMES.includes(document.location.pathname) &&
      authService.isExpired() === true
    ) {
      navigate('/login');
    }
  }, [token]);

  return (
    <div className={styles.layout}>
      {token ? <Navbar /> : ''}
      <div className={'container mx-auto lg:w-2/3'}>{props.children}</div>
    </div>
  );
}
