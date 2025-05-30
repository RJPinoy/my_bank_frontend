import { useModal } from './ModalProvider';
import ConfirmModal from './confirmModal/confirmModal';
import TransactionModal from './transactionModal/transactionModal';

const ModalHandler = () => {
    const { modalState, hideModal } = useModal();

    const renderModal = () => {
        switch (modalState.type) {
            case 'transaction':
                return <TransactionModal handleCancel={hideModal} {...modalState.props} />;
            default:
                return <ConfirmModal handleCancel={hideModal} {...modalState.props} />;
        }
    };

    if (!modalState.isVisible) return null;

    return (
        <div
            id="modal-container"
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 w-full h-full flex items-center justify-center flex-col z-[999]"
            onClick={hideModal}
        >
            <div className="modal text-black font-bold bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md" onClick={(e) => e.stopPropagation()}>
                {renderModal()}
            </div>
        </div>
    );
};

export default ModalHandler;