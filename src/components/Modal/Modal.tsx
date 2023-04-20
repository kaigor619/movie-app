import React, { useRef } from "react";
import cls from "clsx";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import styles from "./Modal.module.scss";

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
  const modalRootRef = useRef(document.getElementById("modal-root"));

  if (!modalRootRef.current) return null;

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
      <div className={styles.modalWrap}>
        <div
          data-testid="overlay"
          className={styles.background}
          onMouseDown={onClose}
        />
        <div
          data-testid="dialog"
          className={cls(styles.modalContent)}
          style={{ maxWidth: `${maxWidth}rem` }}
        >
          {children}
        </div>
      </div>
    </CSSTransition>,
    modalRootRef.current
  );
};
