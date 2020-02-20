import { AxiosError } from 'axios';
import Router from 'next/router';

export default function getErrorMessage(err: Error) {
  if ((err as AxiosError).response?.data?.message) {
    return (err as AxiosError).response?.data?.message;
  }
  return err.message;
}
