import React from 'react';
import modalOverlayStyles from './modal-overlay.module.css';
import PropTypes from "prop-types";

type TModalOverlayProps = {
    onClose: () => void
}

const ModalOverlay: React.FC<TModalOverlayProps> = (props) => {
        return (
            <div className={modalOverlayStyles.overlay} onClick={props.onClose}></div>
        )
}

/*
ModalOverlay.propsTypes = {
    onClose: PropTypes.func.isRequired
}*/

export default  ModalOverlay; 