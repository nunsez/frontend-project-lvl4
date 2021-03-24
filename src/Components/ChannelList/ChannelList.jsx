import React from 'react';

const renderChannelHeader = () => (
    <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="ml-auto p-0 btn btn-link">
            +
        </button>
    </div>
);

const renderChannelList = (channels) => (
    <div className="nav flex-column nav-pills nav-fill">
        {channels.map((channel) => {
            const { id, name } = channel;

            return (
                <li key={id} className="nav-item">
                    <button type="button" className="nav-link btn-block mb-2 text-left btn btn-light">
                        {name}
                    </button>
                </li>
            );
        })}
    </div>
);

const ChannelList = ({ channels }) => {
    console.log(channels);
    return (
        <div className="col-3 border-right">
            {renderChannelHeader()}
            {renderChannelList(channels)}
        </div>
    );
};

export default ChannelList;
