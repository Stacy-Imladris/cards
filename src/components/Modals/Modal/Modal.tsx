import {CSSProperties, FC, memo} from 'react';
import styles from './Modal.module.css'
import ReactDOM from 'react-dom';
import {selectTheme} from '../../../store/selectors';
import t from '../../../common/styles/Themes.module.css';
import {useAppSelector} from '../../../store/store';

type Props = {
  onClickNotOpen: () => void
  isOpen: boolean
  backgroundStyle?: CSSProperties
  modalStyle?: CSSProperties
}
export const Modal: FC<Props> = memo(({onClickNotOpen, isOpen, children, backgroundStyle, modalStyle}) => {
  const theme = useAppSelector(selectTheme)

  if (!isOpen) return null

  return (
      ReactDOM.createPortal(
          <>
            <div style={{...backgroundStyle}} className={styles.background} onClick={onClickNotOpen}/>
            <div style={{...modalStyle}} className={`${styles.modal} ${t[theme]} ${t[theme + '-text']}`}>
              <div className={styles.escape}>
                <div onClick={onClickNotOpen}>✘</div>
              </div>
              {children}
            </div>
          </>, document.body)
  )
})