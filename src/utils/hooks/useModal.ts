import { useDispatch, useSelector } from 'react-redux';
import { useRef, useCallback, useEffect } from 'react';
import {
  closeModal,
  offModalVisible,
  onModalVisible,
} from '../../redux/modal/slice';
import {
  selectIsVisible,
  selectModalStatus,
} from '../../redux/modal/selectors';

const useModal = () => {
  const isOpen = useSelector(selectModalStatus);
  const isVisible = useSelector(selectIsVisible);
  const dispatch = useDispatch();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClose = useCallback(() => {
    dispatch(offModalVisible());
    timeoutRef.current = setTimeout(() => {
      dispatch(closeModal());
    }, 500);
  }, [dispatch]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        handleClose();
      }
    },
    [handleClose],
  );

  useEffect(() => {
    if (isOpen) {
      timeoutRef.current = setTimeout(() => {
        dispatch(onModalVisible());
      }, 0);

      document.body.style.overflow = 'hidden';
    } else {
      dispatch(offModalVisible());
      timeoutRef.current = setTimeout(() => {
        document.body.style.overflow = 'auto';
      }, 500);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [dispatch, isOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [handleClose]);

  return {
    isOpen,
    handleClose,
    isVisible,
    handleOverlayClick,
  };
};

export default useModal;
