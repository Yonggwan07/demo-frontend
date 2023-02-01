import React, { useEffect, useState } from 'react';
import {
  useDispatch,
  useSelector,
} from '../../../node_modules/react-redux/es/exports';
import AuthForm from '../../components/auth/AuthForm';
import { changeField, initializeForm, signin } from '../../modules/auth';
import { useNavigate } from 'react-router-dom';
import { check } from '../../modules/user';
import { getMenuList } from '../../modules/menuList';

const LoginForm = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { form, _auth, _authError, user } = useSelector(
    ({ auth, userInfo }) => ({
      form: auth.login,
      _auth: auth.auth,
      _authError: auth.authError,
      user: userInfo.userInfo,
    }),
  );

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(changeField({ form: 'login', key: name, value }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { userId, password } = form;

    if ([userId, password].includes('')) {
      return;
    }

    dispatch(signin({ userId, password }));
  };

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (_authError) {
      switch (_authError.response.status) {
        case 401:
          setError('Invalid user name or password');
          break;

        case 504:
          setError('504 - Gateway timeout');
          break;

        default:
          setError('Unknown error');
      }
    }

    // 로그인 성공
    if (_auth !== null && _auth.success) {
      dispatch(check());
      dispatch(getMenuList());
      navigate('/main');
    }
  }, [_auth, _authError, dispatch, navigate]);

  useEffect(() => {
    if (user) {
      navigate('/main');
    }
  }, [user, navigate]);

  return (
    <AuthForm
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default LoginForm;
