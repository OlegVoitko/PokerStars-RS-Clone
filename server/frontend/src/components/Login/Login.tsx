import React from 'react';
import { IFormInput } from '../Auth/Auth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { loginPlayerThunk } from '../../store/playerSlice';
import './Login.scss';

const Login = (): JSX.Element => {
  const { error, player } = useAppSelector((state) => state.player);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput): Promise<void> => {
    //TODO notify about successful login
    await dispatch(loginPlayerThunk(data));
    if (player) {
      navigate('/table');
    }
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
        <input type='submit' value={t('submit')} className='auth-form__input' />
      </form>
      <button className='app-enter-buttons__button button__back' onClick={() => navigate('/')}>
        {t('back')}
      </button>
    </>
  );
};

export default Login;
