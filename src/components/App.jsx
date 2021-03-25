import React, { useState } from 'react';
import Modal from './Modal.jsx';
import ChannelList from './ChannelList.jsx';
import Chat from './Chat.jsx';

const App = ({ gon }) => {
    const [ModalInfo, setModalInfo] = useState({ state: 'hide', title: 'Add a channel' });
    const { channels, messages, currentChannelId } = gon;
    const name = 'Your Name';
    document.title = `Slack: ${name}`;

    return (
        <div className="row h-100 pb-3">
            <ChannelList currentChannelId={currentChannelId} channels={channels} setModalInfo={setModalInfo} />
            <Chat messages={messages.filter((m) => m.channelId === currentChannelId)} />
            {ModalInfo.state === 'show' && <Modal setModalInfo={setModalInfo} ModalInfo={ModalInfo} />}
        </div>
    );
};

export default App;
