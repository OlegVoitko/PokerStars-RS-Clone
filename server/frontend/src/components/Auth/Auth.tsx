import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import './Auth.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { registerUserThunk } from '../../store/userSlice';

export interface IFormInput {
  nickname: string;
  password: string;
}

const Auth = (): JSX.Element => {
  const { error, user, status } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {}, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: 'onBlur',
  });

  // const onRegisterSubmit: SubmitHandler<IFormInput> = async (data) => {
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await dispatch(registerUserThunk(data));
  };

  const { t } = useTranslation();

  return (
    <>
      <h2 className='form__title'>{t('register')}</h2>
      {error && <p className='form__error-msg submit__error-msg'>{t(`${error}`)}</p>}
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
      <button className='app-enter-buttons__button button__back' onClick={() => navigate('/')}>
        {t('back')}
      </button>
      {status === 'fulfilled' && (
        <>
          <p className='submit__success-msg'>{t('success')}</p>
          <button
            className='app-enter-buttons__button button__back'
            onClick={() => navigate('/table')}
          >
            {t('table')}
          </button>
        </>
      )}
    </>
  );
};

export default Auth;
