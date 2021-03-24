import React from 'react';
import Modal from '../Components/Modal/Modal.jsx';
import ChannelList from '../Components/ChannelList/ChannelList.jsx';
import Chat from '../Components/Chat/Chat.jsx';

const App = ({ gon }) => {
    const { channels, messages, currentChannelId } = gon;
    console.log(channels);

    return (
        <div className="row h-100 pb-3">
            <Modal />
            <ChannelList channels={channels} />
            <Chat currentChannelId={currentChannelId} messages={messages} />
        </div>
    );
};

export default App;
