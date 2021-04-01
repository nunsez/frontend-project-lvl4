import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import getModal from './modals';
import ChannelsBar from './ChannelsBar.jsx';
import Chat from './Chat.jsx';
import NicknameContext from '../nicknameContext.js';

const App = () => {
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
