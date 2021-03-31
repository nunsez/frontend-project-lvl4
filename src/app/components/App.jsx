import React, { useContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import getModal from './modals';
import ChannelsBar from './ChannelsBar.jsx';
import Chat from './Chat.jsx';
import NicknameContext from '../nicknameContext.js';
import { addMessage } from '../reducers/messages.js';
import { addChannel, removeChannel, renameChannel } from '../reducers/channels.js';

const socket = io();

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // socket event logger
        socket.onAny((event, { data }) => {
            console.log(event, 'data: ', data, 'type: ', data.type);
        });
        socket.on('newMessage', ({ data: { attributes } }) => {
            dispatch(addMessage({ attributes }));
        });
        socket.on('newChannel', ({ data: { attributes } }) => {
            dispatch(addChannel({ attributes }));
        });
        socket.on('removeChannel', ({ data: { id } }) => {
            dispatch(removeChannel({ id }));
        });
        socket.on('renameChannel', ({ data: { attributes } }) => {
            dispatch(renameChannel({ attributes }));
        });

        return () => socket.removeAllListeners();
    }, []);

    const nickname = useContext(NicknameContext);
    const modalInfo = useSelector((state) => state.modalInfo);
    const Modal = getModal(modalInfo.type);

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
