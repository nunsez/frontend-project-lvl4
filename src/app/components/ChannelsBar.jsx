import React from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannelId } from '../reducers/channels';
import { open, setType } from '../reducers/modal';

const ChannelsHeader = () => {
    const dispatch = useDispatch();

    const handleOpenAddChannelModal = () => {
        const type = 'Add a channel';
        dispatch(setType({ type }));
        dispatch(open());
    };

    return (
        <div className="d-flex mb-2">
            <span>Channels</span>
            <button onClick={handleOpenAddChannelModal} type="button" className="ml-auto p-0 btn btn-link">
                +
            </button>
        </div>
    );
};

const ChannelsBar = () => {
    const dispatch = useDispatch();
    const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);

    const handleSwitchChannel = (id) => () => {
        dispatch(setCurrentChannelId({ id }));
    };

    const ChannelsList = () => (
        <ul className="nav flex-column nav-pills nav-fill">
            {channels.map((channel) => {
                const { id, name } = channel;
                const btnClass = cn('nav-link btn-block mb-2 text-left btn', {
                    'btn-light': id !== currentChannelId,
                    'btn-primary': id === currentChannelId,
                });

                return (
                    <li key={id} className="nav-item">
                        <button type="button" className={btnClass} onClick={handleSwitchChannel(id)}>
                            {name}
                        </button>
                    </li>
                );
            })}
        </ul>
    );

    return (
        <div className="col-3 border-right">
            <ChannelsHeader />
            <ChannelsList />
        </div>
    );
};

export default ChannelsBar;
