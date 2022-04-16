import {CSSProperties, FC, memo} from 'react';
import s from './Modal.module.css'
import ReactDOM from 'react-dom';

type ModalPropsType = {
    onClickNotOpen: () => void
    isOpen: boolean
    width: number
    height: number
    modalStyle?: CSSProperties
}
export const Modal: FC<ModalPropsType> = memo(({onClickNotOpen, isOpen, width, height,children, modalStyle}) => {
    const top = `calc(50vh - ${height / 2}px)`
    const left = `calc(50vw - ${width / 2}px)`

    if (!isOpen) return null

    return ReactDOM.createPortal(
        <>
            <div className={s.background} onClick={onClickNotOpen}/>
            <div style={{top, left, width, height, ...modalStyle}}
                 className={s.modal}>
                {children}
            </div>
        </>,
        document.body)
})