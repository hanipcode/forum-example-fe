import Navbar from '../components/Navbar';
import swal from 'sweetalert';
import { useEffect, useCallback, useState } from 'react';
import Services from '../services/services';
import getErrorMessage from '../utils/getErrorMessage';
import Router from 'next/router';

function RegisterPage() {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const initRegister = useCallback(async () => {
    const services = new Services();
    try {
      if (password !== confirmPassword) {
        throw new Error('password dan konfirmasi harus sama');
      }
      await services.register(name, email, password);
      swal('Success', 'Berhasil Melakukan Register, Silahkan Login', 'success');
      Router.push('/login');
    } catch (err) {
      swal('Error', getErrorMessage(err), 'error');
    }
  }, [email, password]);
  return (
    <div>
      <Navbar />
      <div className="container p-2 mt-5">
        <h3 className="text-center">Mendaftar di Forum Perbincangan</h3>
        <div
          className="d-flex flex-column mx-auto card p-4 mt-5"
          style={{ maxWidth: 500 }}
        >
          <div className="d-flex flex-column mb-3">
            <input
              value={name}
              onChange={e => setName(e.currentTarget.value)}
              placeholder="nama"
              className="input form-control flex-grow-1"
            />
          </div>
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
          <div className="d-flex flex-column mb-3">
            <input
              value={confirmPassword}
              type="password"
              onChange={e => setConfirmPassword(e.currentTarget.value)}
              placeholder="Konfirmasi Password"
              className="input form-control"
            />
          </div>
          <p>
            Sudah memiliki akun ? Silahkan <a href="/login">Login</a>
          </p>
          <div className=" text-center">
            <button
              className="btn btn-large btn-primary"
              onClick={initRegister}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
