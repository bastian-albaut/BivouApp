import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../common/store/store';
import SearchBivouacList from '@/app/searchBivouacs/screens/searchBivouacList';

export default function SearchPage() {
  return (
    <Provider store={store}>
      <SearchBivouacList />
    </Provider>
  );
}