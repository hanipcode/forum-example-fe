import { useEffect } from 'react';
import Router from 'next/router';

export default function useCheckLogin() {
  console.log('test 123');
  useEffect(() => {
    async function checkLogin() {
      const token = localStorage.getItem('token');
      console.log(token);
      if (!token) {
        Router.replace('/login');
      }
    }

    checkLogin();
  }, []);
}
