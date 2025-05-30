const ConfirmModal = ({ handleCancel, handleConfirm }) => {
    return (
        <>
            <h3 className="text-center text-3xl mb-4">Êtes-vous sûr ?</h3>
            <div className="confirmModal-container flex flex-row items-center justify-center">
                <button className="bg-mybank-red p-2 text-white rounded-[5px] m-4 transition-all duration-300 ease-in-out hover:bg-red-600" onClick={ handleCancel }>Annuler</button>
                <button className="bg-mybank-green p-2 text-white rounded-[5px] m-4 transition-all duration-300 ease-in-out hover:bg-green-600" onClick={ handleConfirm }>Confirmer</button>
            </div>
        </>
    );
}

export default ConfirmModal;