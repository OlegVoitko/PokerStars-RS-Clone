import React, { useState } from 'react';
import EnterForm from '../EnterForm/EnterForm';
import { SubmitHandler } from 'react-hook-form';
import { IFormInput } from '../Auth/Auth';
import { useCheckPlayerMutation } from '../../services/playerAPI';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/hook';
import { registerPlayer } from '../../store/playerSlice';
import './Login.scss';

const Login = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [submitError, setSubmitError] = useState('');
  const [checkPlayer, { isLoading }] = useCheckPlayerMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: 'onBlur',
  });

  // const onLoginSubmit = (data: IFormInput): Promise<void> => {
  const onSubmit = (data: IFormInput) => {
    // e.preventDefault();
    // const onLoginSubmit = (e: React.FormEvent<HTMLFormElement>, data: IFormInput) => {
    // const onLoginSubmit: SubmitHandler<IFormInput> = async (data) => {
    // const res = await checkPlayer(data);
    console.log('data', data);
    checkPlayer(data)
      .unwrap()
      .then((data) => {
        //TODO change isAuth
        console.log('data', data);
        dispatch(registerPlayer(data));
        navigate('/table');
      })
      .catch((error) => {
        console.log('error', error);
        setSubmitError(error.data.error);
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
      <h2 className='form__title'>{t('login')}</h2>
      {submitError && <p className='form__error-msg submit__error-msg'>{t(`${submitError}`)}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className='auth-form'>
        <input
          className='auth-form__input'
          placeholder={t('nick')}
          {...register('nickname', { required: true, maxLength: 10 })}
        />
        {errors.nickname && errors.nickname.type === 'required' && (
          <span className='form__error-msg'>{t('required_field')}</span>
        )}
        {errors.nickname && errors.nickname.type === 'maxLength' && (
          <span className='form__error-msg'>{t('max_length_rule')}</span>
        )}
        <input
          placeholder={t('password')}
          type='password'
          className='auth-form__input'
          {...register('password', { required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === 'required' && (
          <span className='form__error-msg'>{t('required_field')}</span>
        )}
        {errors.password && errors.password.type === 'minLength' && (
          <span className='form__error-msg'>{t('min_length_rule')}</span>
        )}
        <input type='submit' value={t('submit')} className='auth-form__input' />
      </form>
      {/*<EnterForm handleSubmitFunc={(e) => onLoginSubmit} />*/}
      <button className='app-enter-buttons__button button__back' onClick={() => navigate('/')}>
        {t('back')}
      </button>
    </>
  );
};

export default Login;
