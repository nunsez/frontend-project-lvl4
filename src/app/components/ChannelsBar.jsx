import React from 'react';
import cn from 'classnames';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannelId } from '../reducers/channels';
import { open, setType } from '../reducers/modal';

const ChannelsHeader = React.memo(() => {
    const dispatch = useDispatch();

    const handleOpenAddChannelModal = () => {
        const type = 'Add a channel';
        dispatch(setType({ type }));
        dispatch(open());
    };

    return (
        <div className="d-flex mb-2">
            <span>Channels</span>
            <Button onClick={handleOpenAddChannelModal} className="ml-auto p-0" variant="link">
                +
            </Button>
        </div>
    );
});

const DropdownWrapper = ({ children, variant }) => (
    <Dropdown as={ButtonGroup} className="d-flex mb-2">
        {children}
        <Dropdown.Toggle split variant={variant} className="flex-grow-0" />
        <Dropdown.Menu>
            <Dropdown.Item>Remove</Dropdown.Item>
            <Dropdown.Item>Rename</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
);

const ChannelsBar = () => {
    const dispatch = useDispatch();
    const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);

    const handleSwitchChannel = (id) => () => {
        dispatch(setCurrentChannelId({ id }));
    };

    const getChannelItem = ({ id, name, removable }) => {
        const btnClass = cn('nav-link text-left', {
            'btn-block': !removable,
            'mb-2': !removable,
            'flex-grow-1': removable,
        });
        const variant = currentChannelId === id ? 'primary' : 'light';

        const ChannelButton = () => (
            <Button onClick={handleSwitchChannel(id)} className={btnClass} variant={variant}>
                {name}
            </Button>
        );

        return (
            <li key={id} className="nav-item">
                {removable ? (
                    <DropdownWrapper variant={variant}>
                        <ChannelButton />
                    </DropdownWrapper>
                ) : (
                    <ChannelButton />
                )}
            </li>
        );
    };

    const ChannelsList = () => <ul className="nav flex-column nav-pills nav-fill">{channels.map(getChannelItem)}</ul>;

    return (
        <div className="col-3 border-right">
            <ChannelsHeader />
            <ChannelsList />
        </div>
    );
};

export default ChannelsBar;
