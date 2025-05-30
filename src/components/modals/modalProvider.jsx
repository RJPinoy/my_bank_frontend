import * as React from 'react';

const ModalContext = React.createContext();

export const ModalProvider = ({ children }) => {
    const [modalState, setModalState] = React.useState({
        isVisible: false,
        type: null,
        props: {},
    });

    const showModal = (type, props) => {
        setModalState({ isVisible: true, type, props });
    };

    const hideModal = () => {
        setModalState({ isVisible: false, type: null, props: {} });
    };

    return (
        <ModalContext.Provider value={{ modalState, showModal, hideModal }}>
            { children }
        </ModalContext.Provider>
    );
};

export const useModal = () => React.useContext(ModalContext);