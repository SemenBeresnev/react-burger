import React from 'react';
import ReactDOM from "react-dom";
import modalStyles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";

type TModalProps = {
  title?: string,
  onClose: () => void
}

const Modal: React.FC<TModalProps> = (props) => {
  const handleCatchEsc = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      props.onClose();
    }
  }
  React.useEffect(() => {
    document.addEventListener('keyup', handleCatchEsc);
    return () => {
      document.removeEventListener('keyup', handleCatchEsc);
    }
  })

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={props.onClose} />
      <div className={`${modalStyles.modal} pt-10 pr-10 pl-10 pb-15`}>
        <div className={modalStyles.header}>
          <h3 className={`${modalStyles.title} text text_type_main-large`}>{props.title}</h3>
          <div className={modalStyles.close_pointer} onClick={props.onClose}><CloseIcon type={"primary"} /></div>
        </div>
         {props.children}
      </div>
    </>,
    document.getElementById('modal-root')! //  херь какая-то непонятная. Взял с доки typescript
    )
}

/*
Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    title: PropTypes.string
}*/

export default  Modal;