import React, { FC, useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import './Auth.scss';
import { useCreatePlayerMutation } from '../../services/playerAPI';
import { useNavigate } from 'react-router-dom';
import EnterForm from '../EnterForm/EnterForm';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { registerPlayer } from '../../store/playerSlice';

export interface IFormInput {
  nickname: string;
  password: string;
}

const Auth: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const { player } = useAppSelector((state) => state.player);
  const [submitError, setSubmitError] = useState('');

  const [createPlayer, { isLoading, isSuccess, error, isError }] = useCreatePlayerMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: 'onBlur',
  });

  // const onRegisterSubmit: SubmitHandler<IFormInput> = async (data) => {
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    createPlayer(data)
      .unwrap()
      .then((data) => {
        //TODO notify about successful registration
        dispatch(registerPlayer(data));
        console.log('data', data);
        // navigate('/table');
      })
      .catch((error) => {
        console.log('error.data.error', error.data.error);
        setSubmitError(error.data.error);
        // setSubmitError(error.data.error);
      });
  };

  const { t } = useTranslation();

  return (
    <>
      <h2 className='form__title'>{t('register')}</h2>
      {submitError && <p className='form__error-msg submit__error-msg'>{submitError}</p>}
      {/*<EnterForm handleSubmitFunc={(e) => onRegisterSubmit} />*/}
      <form onSubmit={handleSubmit(onSubmit)} className='auth-form'>
        <input
          className='auth-form__input'
          placeholder={t('nick')}
          {...register('nickname', { required: true, maxLength: 10 })}
        />
        {errors.nickname && errors.nickname.type === 'required' && (
          <span className='form__error-msg'>Nick is required</span>
        )}
        {errors.nickname && errors.nickname.type === 'maxLength' && (
          <span className='form__error-msg'>Max length 10 symbols</span>
        )}
        <input
          placeholder={t('password')}
          type='password'
          className='auth-form__input'
          {...register('password', { required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === 'required' && (
          <span className='form__error-msg'>Password is required</span>
        )}
        {errors.password && errors.password.type === 'minLength' && (
          <span className='form__error-msg'>Min length 6 symbols</span>
        )}
        <input type='submit' value={t('submit')} className='auth-form__input' />
      </form>
      <button className='app-enter-buttons__button button__back' onClick={() => navigate('/')}>
        {t('back')}
      </button>
    </>
  );
};

export default Auth;
