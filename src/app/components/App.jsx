import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import Chat from './Chat.jsx';
import getModal from './modals';
import ChannelsBar from './ChannelsBar.jsx';
import Context from '../context.js';

const App = () => {
  const { userName } = useContext(Context);
  const modalInfo = useSelector((state) => state.modalInfo);
  const Modal = getModal(modalInfo.type);

  document.title = `Slack | ${userName}`;

  return (
    <div className="row h-100 pb-3">
      <ChannelsBar />
      <Chat />
      {modalInfo.isOpened && <Modal />}
    </div>
  );
};

export default App;
