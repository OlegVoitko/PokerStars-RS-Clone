import React, { FC, useRef, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from '../../hooks/hook';
import { IMessage } from '../../store/chatSlice';
import { sendMessage } from '../../store/chatSlice';
import './style.scss';

interface IChatForm {
  text: string;
}

const nickname = 'Joe';

const Chat: FC = (): JSX.Element => {
  const { messages } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IChatForm>({
    mode: 'onBlur',
  });

  const bottomList = useRef<HTMLDivElement>(null);

  const renderMessages = (data: IMessage[]) => {
    return data.map(({ text, nickname, date }, i) => (
      <li key={i}>{`${new Date(date).toString().slice(0, 24)} ${nickname}: ${text}`}</li>
    ));
  };

  const onSubmit: SubmitHandler<IChatForm> = (data) => {
    const messageData = {
      text: data.text,
      nickname,
      date: Date.now(),
    };
    //TODO dispatch (thunk)
    dispatch(sendMessage(messageData));
    setValue('text', '');
  };

  const scrollToBottom = () => {
    bottomList.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <section className='chat'>
      <ul className='chat__messages-list'>
        {renderMessages(messages)}
        <div ref={bottomList}></div>
      </ul>
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
