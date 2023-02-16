import React, { useEffect } from 'react';
import { IFormInput } from '../Auth/Auth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { loginUserThunk } from '../../store/userSlice';
import './Login.scss';

const Login = (): JSX.Element => {
  const { error, user, status } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {}, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput): Promise<void> => {
    await dispatch(loginUserThunk(data));
  };

  return (
    <>
      <h2 className='form__title'>{t('login')}</h2>
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
        <input type='submit' value={t('submit')} className='app-enter-buttons__button' />
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

export default Login;
