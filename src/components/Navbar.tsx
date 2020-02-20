import { useCallback } from 'react';
import Router from 'next/router';

interface Props {
  isLogin?: boolean;
}

function Navbar({ isLogin = false }: Props) {
  const onLogin = useCallback(() => Router.push('/login'), []);
  const onLogout = useCallback(() => {
    localStorage.removeItem('token');
    Router.push('/login');
  }, []);
  return (
    <nav className="navbar navbar-dark bg-dark text-center">
      <a className="navbar-brand mx-auto" href="#">
        Forum Perbincangan
      </a>
      {!isLogin && (
        <button onClick={onLogin} className="btn btn-primary">
          Login
        </button>
      )}
      {isLogin && (
        <button onClick={onLogout} className="btn btn-primary">
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;
