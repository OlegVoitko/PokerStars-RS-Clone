import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import './Auth.scss';
import { useCreatePlayerMutation } from '../../services/playerAPI';

interface IFormInput {
  nickname: string;
  password: string;
}

const Auth: FC = (): JSX.Element => {
  const [createPlayer, { isLoading }] = useCreatePlayerMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const res = createPlayer(data);

    console.log('data', data);
    console.log('errors', errors);
    console.log('res', res);
  };

  const { t } = useTranslation();

  return (
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
  );
};

export default Auth;
