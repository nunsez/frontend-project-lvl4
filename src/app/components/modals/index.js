import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';
import RenameChannel from './RenameChannel.jsx';

const modals = {
    AddChannel,
    RemoveChannel,
    RenameChannel,
};

export default (modalType) => modals[modalType];
