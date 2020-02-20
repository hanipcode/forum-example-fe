import Navbar from '../components/Navbar';
import swal from 'sweetalert';
import { useEffect, useCallback, useState } from 'react';
import Services from '../services/services';
import getErrorMessage from '../utils/getErrorMessage';
import Router from 'next/router';

function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const initLogin = useCallback(async () => {
    const services = new Services();
    try {
      const response = await services.login(email, password);
      const { token } = response;
      localStorage.setItem('token', token);
      swal('Success', 'Berhasil Login', 'success');
      Router.push('/home');
    } catch (err) {
      swal('Error', getErrorMessage(err), 'error');
    }
  }, [email, password]);
  return (
    <div>
      <Navbar />
      <div className="container p-2 mt-5">
        <h3 className="text-center">Login di Forum Perbincangan</h3>
        <div
          className="d-flex flex-column mx-auto card p-4 mt-5"
          style={{ maxWidth: 500 }}
        >
          <div className="d-flex flex-column mb-3">
            <input
              value={email}
              onChange={e => setEmail(e.currentTarget.value)}
              placeholder="email"
              className="input form-control flex-grow-1"
            />
          </div>
          <div className="d-flex flex-column mb-3">
            <input
              value={password}
              type="password"
              onChange={e => setPassword(e.currentTarget.value)}
              placeholder="password"
              className="input form-control"
            />
          </div>
          <p>
            Tidak memiliki akun ? <a href="/register">Register</a>
          </p>
          <div className=" text-center">
            <button className="btn btn-large btn-primary" onClick={initLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
