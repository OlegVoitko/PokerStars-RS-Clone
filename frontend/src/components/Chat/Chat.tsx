import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './style.scss';

interface IChatForm {
  text: string;
}

const Chat: FC = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IChatForm>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<IChatForm> = (data) => {
    console.log(data);
  };
  return (
    <section className='chat'>
      <section className='chat__messages-list'></section>
      <form className='chat__form' onSubmit={handleSubmit(onSubmit)}>
        <input className='chat__input' type='text' {...register('text', { required: true })} />
        <button className='chat__btn' type='submit'>
          Send
        </button>
      </form>
    </section>
  );
};

export default Chat;
