import React, { useState, useContext } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import Modal from './Modal.jsx';
import ChannelList from './ChannelList.jsx';
import Chat from './Chat.jsx';
import NicknameContext from '../nicknameContext.js';
import { addMessage } from '../reducers/messages.js';

const App = () => {
    const socket = io();
    const dispatch = useDispatch();

    // socket event logger
    socket.onAny(console.log);
    socket.on('newMessage', ({ data: { type, attributes } }) => {
        if (type === 'messages') {
            dispatch(addMessage({ attributes }));
        }
    });

    const [ModalInfo, setModalInfo] = useState({ state: 'hide', title: 'Add a channel' });
    const nickname = useContext(NicknameContext);

    document.title = `Slack | ${nickname}`;

    return (
        <div className="row h-100 pb-3">
            <ChannelList setModalInfo={setModalInfo} />
            <Chat />
            {ModalInfo.state === 'show' && <Modal setModalInfo={setModalInfo} ModalInfo={ModalInfo} />}
        </div>
    );
};

export default App;
