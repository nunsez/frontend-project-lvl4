import React, { useState, useContext } from 'react';
import Modal from './Modal.jsx';
import ChannelList from './ChannelList.jsx';
import Chat from './Chat.jsx';
import NicknameContext from '../nicknameContext.js';

const App = () => {
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
