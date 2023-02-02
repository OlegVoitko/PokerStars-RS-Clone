import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { socket } from '../../socket';

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
    socket.emit('send', data);
    console.log(data);
  };
  console.log(errors);
  return (
    <section className='chat'>
      <section className='chat__messages-list'></section>
      <form className='chat__form' onSubmit={handleSubmit(onSubmit)}>
        <input className='chat__input' type='text' {...register('text', { required: true })} />
        <button className='chat__btn' type='submit' disabled={!!errors.text}>
          Send
        </button>
      </form>
    </section>
  );
};

export default Chat;
