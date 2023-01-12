import React from "react";
import cls from "clsx";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import styles from "./Modal.module.scss";

const modalRoot = document.getElementById("modal-root");

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode | React.ReactNode[];
  maxWidth: number;
}

export const Modal: React.FC<Props> = ({
  open,
  onClose,
  children,
  maxWidth,
}) => {
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <CSSTransition
      in={open}
      timeout={{
        exit: 200,
      }}
      classNames={{
        enter: styles.enter,
        enterDone: styles.enterDone,
        exit: styles.exit,
      }}
      unmountOnExit
    >
      <div className={cls(styles.modalWrap)}>
        <div className={styles.background} onMouseDown={onClose} />
        <div
          className={cls(styles.modalContent)}
          style={{ maxWidth: `${maxWidth}rem` }}
        >
          {children}
        </div>
      </div>
    </CSSTransition>,
    modalRoot
  );
};
