import React from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannelId } from '../reducers/channels';

const renderChannelHeader = (setModalInfo) => {
    const handleAddChannel = () => {
        setModalInfo((curState) => ({ ...curState, state: 'show' }));
    };

    return (
        <div className="d-flex mb-2">
            <span>Channels</span>
            <button onClick={handleAddChannel} type="button" className="ml-auto p-0 btn btn-link">
                +
            </button>
        </div>
    );
};

const handleSwitchChannel = ({ id, dispatch }) => () => {
    dispatch(setCurrentChannelId({ id }));
};

const ChannelsList = ({ setModalInfo }) => {
    const dispatch = useDispatch();
    const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);

    const renderChannelList = () => (
        <ul className="nav flex-column nav-pills nav-fill">
            {channels.map((channel) => {
                const { id, name } = channel;
                const btnClass = cn('nav-link btn-block mb-2 text-left btn', {
                    'btn-light': id !== currentChannelId,
                    'btn-primary': id === currentChannelId,
                });

                return (
                    <li key={id} className="nav-item">
                        <button type="button" className={btnClass} onClick={handleSwitchChannel({ id, dispatch })}>
                            {name}
                        </button>
                    </li>
                );
            })}
        </ul>
    );

    return (
        <div className="col-3 border-right">
            {renderChannelHeader(setModalInfo)}
            {renderChannelList()}
        </div>
    );
};

export default ChannelsList;
