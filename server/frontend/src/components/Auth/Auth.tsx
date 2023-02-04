import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import './Auth.scss';
import { useCreatePlayerMutation } from '../../services/playerAPI';
import { useNavigate } from 'react-router-dom';

export interface IFormInput {
  nickname: string;
  password: string;
}

const Auth: FC = (): JSX.Element => {
  const navigate = useNavigate();
  // const state = { user: null, error: null };
  // const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));

  const [createPlayer, { isLoading }] = useCreatePlayerMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // const res = await createPlayer(data);
    createPlayer(data)
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

  const { t } = useTranslation();

  return (
    <>
      {/*{error && <p>{error.message}</p>}*/}
      <form onSubmit={handleSubmit(onSubmit)} className='auth-form' action='/table'>
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

export default Auth;
