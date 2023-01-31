import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import './Auth.scss';

interface IFormInput {
  nick: string;
  password: string;
}
// interface AuthProps {}
//
// const Auth: FC<AuthProps> = () => (
const Auth: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: 'onBlur',
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    console.log(errors);
  };

  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='auth-form'>
      <p>{t('password')}</p>
      <input
        className='auth-form__input'
        // placeholder='nickName'
        placeholder={t('nickName')}
        {...register('nick', { required: true, maxLength: 10 })}
      />
      {errors.nick && errors.nick.type === 'required' && (
        <span className='form__error-msg'>Nick is required</span>
      )}
      {errors.nick && errors.nick.type === 'maxLength' && (
        <span className='form__error-msg'>Max length 10 symbols</span>
      )}
      <input
        placeholder={t('password')}
        // placeholder='password'
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
      <input type='submit' className='auth-form__input' />
    </form>
  );
};

export default Auth;
