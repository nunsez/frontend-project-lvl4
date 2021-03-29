import React, { useContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './modal/AddModal.jsx';
import ChannelsBar from './ChannelsBar.jsx';
import Chat from './Chat.jsx';
import NicknameContext from '../nicknameContext.js';
import { addMessage } from '../reducers/messages.js';
import { addChannel } from '../reducers/channels.js';

const socket = io();

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // socket event logger
        socket.onAny((event, { data }) => {
            console.log(event, 'data: ', data, 'type: ', data.type);
        });
        socket.on('newMessage', ({ data: { type, attributes } }) => {
            if (type === 'messages') {
                dispatch(addMessage({ attributes }));
            }
        });
        socket.on('newChannel', ({ data: { type, attributes } }) => {
            if (type === 'channels') {
                dispatch(addChannel({ attributes }));
            }
        });
        return () => socket.removeAllListeners();
    }, []);

    const nickname = useContext(NicknameContext);
    const modalInfo = useSelector((state) => state.modalInfo);

    document.title = `Slack | ${nickname}`;

    return (
        <div className="row h-100 pb-3">
            <ChannelsBar />
            <Chat />
            {modalInfo.isOpened && <Modal />}
        </div>
    );
};

export default App;
