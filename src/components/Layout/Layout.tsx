import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import { useSelector } from 'react-redux';
import {
  selectModalStatus,
  selectModalType,
} from '../../redux/modal/selectors';
import Modal from '../shared/Modal/Modal';

import { ReactNode, useCallback, useEffect, useState } from 'react';

import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';

const Layout = () => {
  const modalOpen = useSelector(selectModalStatus);
  const currentModalType = useSelector(selectModalType);
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  const checkCurrentModalType = useCallback(() => {
    if (!currentModalType) return null; /* IMPROVE  <NavListServices />*/

    switch (currentModalType) {
      case 'registration':
        return <RegisterForm />;
      case 'login':
        return <LoginForm />;
      default:
        return null;
    }
  }, [currentModalType]);

  useEffect(() => {
    if (modalOpen) {
      setModalContent(checkCurrentModalType());
    } else {
      setModalContent(null);
    }
  }, [checkCurrentModalType, modalOpen]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      {modalOpen && currentModalType && <Modal>{modalContent}</Modal>}
    </>
  );
};
export default Layout;
