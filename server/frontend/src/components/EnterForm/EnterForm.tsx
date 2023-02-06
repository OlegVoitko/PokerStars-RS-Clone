import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import './EnterForm.scss';

interface EnterFormProps {
  // handleSubmitFunc: (data: IFormInput) =>  Promise<void>
  handleSubmitFunc: (e: React.FormEvent<HTMLFormElement>) => void;
}

interface IFormInput {
  nickname: string;
  password: string;
}

// const EnterForm: FC = (): JSX.Element => {
const EnterForm: FC<EnterFormProps> = ({ handleSubmitFunc }): JSX.Element => {
  const { t } = useTranslation();
  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: 'onBlur',
  });

  return (
    <>
      <form onSubmit={handleSubmitFunc} className='auth-form'>
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
    </>
  );
};

export default EnterForm;
