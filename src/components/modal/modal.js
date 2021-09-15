import React from 'react';
import ReactDOM from "react-dom";
import modalStyles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";

function Modal(props) {
    const handleEscCloseModal = (e) => {
        if (e.keyCode === 27) {
            props.onClose(e);
        }
    }
    React.useEffect(() => {
        document.addEventListener('keyup', handleEscCloseModal);
        return () => {
            document.removeEventListener('keyup', handleEscCloseModal);
        }
    })

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClose={props.onClose} />
            <div className={`${modalStyles.modal} pt-10 pr-10 pl-10 pb-15`}>
                <div className={modalStyles.header}>
                    <h3 className={`${modalStyles.title} text text_type_main-large`}>{props.title}</h3>
                    <div className={modalStyles.close} onClick={props.onClose}><CloseIcon type={"primary"} /></div>
                </div>
                <div>{props.children}</div>
            </div>
        </>,
        document.getElementById('modal-root')
    )
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    title: PropTypes.string
}

export default  Modal;