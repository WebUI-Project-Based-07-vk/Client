import {
  FC,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import PopupDialog from '~/components/popup-dialog/PopupDialog'
import { PaperProps } from '@mui/material/Paper'

interface Component {
  component: React.ReactElement
  paperProps?: PaperProps
}

interface ModalProvideContext {
  openModal: (
    component: Component,
    delayToClose?: number,
    closeCallbackProp?: () => void
  ) => void
  closeModal: () => void
  closeModalAction: () => void
  setCloseCallback: (callback: () => void) => void
}

interface ModalProviderProps {
  children: React.ReactElement
}

const ModalContext = createContext<ModalProvideContext>(
  {} as ModalProvideContext
)

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [modal, setModal] = useState<React.ReactElement | null>(null)
  const [paperProps, setPaperProps] = useState<PaperProps>({})
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
  const [closeCallback, setCloseCallback] = useState<(() => void) | null>(null)

  const closeModal = useCallback(() => {
    setModal(null)
    setPaperProps({})
    setTimer(null)
    setCloseCallback(null)
  }, [setModal, setPaperProps, setTimer])

  const closeModalAction = useCallback(() => {
    closeCallback ? closeCallback() : closeModal()
  }, [closeCallback, closeModal])

  const closeModalAfterDelay = useCallback(
    (delay?: number) => {
      const timerId = setTimeout(closeModal, delay ?? 5000)
      setTimer(timerId)
    },
    [closeModal]
  )

  const openModal = useCallback(
    (
      { component, paperProps }: Component,
      delayToClose?: number,
      closeCallbackProp?: () => void
    ) => {
      setModal(component)

      paperProps && setPaperProps(paperProps)
      delayToClose && closeModalAfterDelay(delayToClose)
      closeCallbackProp && setCloseCallback(closeCallbackProp)
    },
    [setModal, setPaperProps, closeModalAfterDelay, setCloseCallback]
  )

  const contextValue = useMemo(
    () => ({ openModal, closeModal, closeModalAction, setCloseCallback }),
    [closeModal, openModal, closeModalAction, setCloseCallback]
  )

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {modal && (
        <PopupDialog
          closeModalAfterDelay={closeModalAfterDelay}
          content={modal}
          paperProps={paperProps}
          timerId={timer}
        />
      )}
    </ModalContext.Provider>
  )
}

const useModalContext = () => useContext(ModalContext)

export { ModalProvider, useModalContext }
