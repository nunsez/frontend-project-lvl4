// prettier-ignore
import {
    Dropdown, ButtonGroup, Button, Nav,
} from 'react-bootstrap';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import propTypes from 'prop-types';
import { setCurrentChannelId } from '../reducers/channels';
import { openModal } from '../reducers/modal';

const ChannelsHeader = React.memo(() => {
    const dispatch = useDispatch();

    const handleOpenAddChannelModal = () => {
        dispatch(openModal({ type: 'AddChannel' }));
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

// prettier-ignore
const DropdownWrapper = ({
    children, variant, onRemove, onRename,
}) => (
    <Dropdown as={ButtonGroup} className="d-flex mb-2">
        {children}
        <Dropdown.Toggle split variant={variant} className="flex-grow-0" />
        <Dropdown.Menu>
            <Dropdown.Item onClick={onRemove}>Remove</Dropdown.Item>
            <Dropdown.Item onClick={onRename}>Rename</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
);

DropdownWrapper.defaultProps = {
    variant: 'light',
    onRemove: () => {},
    onRename: () => {},
};

DropdownWrapper.propTypes = {
    children: propTypes.element.isRequired,
    variant: propTypes.string,
    onRemove: propTypes.func,
    onRename: propTypes.func,
};

const ChannelsBar = () => {
    const dispatch = useDispatch();
    const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);

    const handleSwitchChannel = (id) => () => {
        dispatch(setCurrentChannelId({ id }));
    };

    const handleOpenModal = ({ id, type, name = null }) => () => {
        dispatch(openModal({ type, extra: { channelId: id, channelName: name } }));
    };

    const NavButton = ({ channel }) => {
        const { id, name, removable } = channel;
        const variant = currentChannelId === id ? 'primary' : 'light';

        const ChannelButton = ({ className }) => (
            <Nav.Link as={Button} onClick={handleSwitchChannel(id)} className={className} variant={variant}>
                {name.trim()}
            </Nav.Link>
        );

        Nav.Link.defaultProps = {
            onClick: () => {},
        };

        Nav.Link.propTypes = {
            onClick: propTypes.func,
            className: propTypes.string.isRequired,
            variant: propTypes.string.isRequired,
        };

        if (!removable) {
            return <ChannelButton className="text-left btn-block mb-2" />;
        }

        return (
            <DropdownWrapper
                variant={variant}
                onRemove={handleOpenModal({ id, type: 'RemoveChannel' })}
                onRename={handleOpenModal({ id, type: 'RenameChannel', name })}
            >
                <ChannelButton className="text-left flex-grow-1" />
            </DropdownWrapper>
        );
    };

    NavButton.defaultProps = {
        channel: {
            name: 'default channel name',
            removable: true,
        },
    };

    NavButton.propTypes = {
        channel: propTypes.shape({
            id: propTypes.number.isRequired,
            name: propTypes.string,
            removable: propTypes.bool,
        }),
    };

    const ChannelsNav = () => (
        <Nav fill className="flex-column" variant="pills">
            {channels.map((channel) => (
                <Nav.Item key={channel.id}>
                    <NavButton channel={channel} />
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
            <ChannelsHeader />
            <ChannelsNav />
        </div>
    );
};

export default ChannelsBar;
