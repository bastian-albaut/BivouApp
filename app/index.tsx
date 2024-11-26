import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../common/store/store';
import LoginPage from '@/app/users/screens/login';

export default function SearchPage() {
  return (
    <Provider store={store}>
      <LoginPage />
    </Provider>
  );
}