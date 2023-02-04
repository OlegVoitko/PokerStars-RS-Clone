import React from 'react';
import EnterForm from '../EnterForm/EnterForm';
import { SubmitHandler } from 'react-hook-form';
import { IFormInput } from '../Auth/Auth';
import { useCheckPlayerMutation } from '../../services/playerAPI';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const [checkPlayer, { isLoading }] = useCheckPlayerMutation();

  // const onLoginSubmit = (data: IFormInput): Promise<void> => {
  const onLoginSubmit = (e: React.FormEvent<HTMLFormElement>, data: IFormInput) => {
    // const onLoginSubmit: SubmitHandler<IFormInput> = async (data) => {
    // const res = await checkPlayer(data);
    checkPlayer(data)
      .unwrap()
      .then((data) => {
        //TODO change isAuth
        console.log('data', data);
        navigate('/table');
      })
      .catch((error) => {
        console.log('error', error);
      });
    // if () {
    //   console.log(res);
    // }
    // console.log('data', data);
    // console.log('errors', errors);
    // console.log('res', res);
  };

  return (
    <>
      {/*<EnterForm handleSubmitFunc={onLoginSubmit} />*/}
      <EnterForm handleSubmitFunc={(e) => onLoginSubmit} />
      <h1>LOGIN</h1>
      <button>ghj</button>
    </>
  );
};

export default Login;
