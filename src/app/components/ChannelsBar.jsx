import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { Button, Nav } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import ChannelItem from './ChannelItem.jsx';
import LanguageSelection from './LanguageSelection.jsx';
import { openModal } from '../reducers/modal';
import { setCurrentChannelId } from '../reducers/channels';
import { setLanguage } from '../reducers/language.js';
import Context from '../utils/context.js';

const ChannelsHeader = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleOpenAddChannelModal = () => {
    dispatch(openModal({ type: 'AddChannel' }));
  };

  return (
    <div className="d-flex mb-2">
      <span>{t('Channels')}</span>
      <Button onClick={handleOpenAddChannelModal} className="ml-auto p-0" variant="link">
        +
      </Button>
    </div>
  );
};

const ChannelsBar = () => {
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
  const { i18n } = useContext(Context);

  const getVariant = (id) => (currentChannelId === id ? 'primary' : 'light');

  const handleSwitchChannel = (id) => () => {
    dispatch(setCurrentChannelId({ id }));
  };

  const handleOpenModal = (id) => ({ type, name = null }) => () => {
    dispatch(openModal({ type, extra: { channelId: id, channelName: name } }));
  };

  const handleSetLanguage = ({ target: { value } }) => {
    dispatch(setLanguage({ i18n, language: value }));
  };

  const ChannelsList = () => (
    <Nav fill className="flex-column" variant="pills">
      {channels.map(({ id, name, removable }) => (
        <Nav.Item key={id}>
          <ChannelItem
            handleSwitchChannel={handleSwitchChannel(id)}
            handleOpenModal={handleOpenModal(id)}
            variant={getVariant(id)}
            removable={removable}
            name={name}
          />
        </Nav.Item>
      ))}
    </Nav>
  );

  Nav.defaultProps = {
    channels: [],
  };

  Nav.propTypes = {
    channels: propTypes.arrayOf(propTypes.object),
  };

  return (
    <div className="col-3 border-right">
      <LanguageSelection onChange={handleSetLanguage} />
      <hr />
      <ChannelsHeader />
      <ChannelsList />
    </div>
  );
};

export default ChannelsBar;
