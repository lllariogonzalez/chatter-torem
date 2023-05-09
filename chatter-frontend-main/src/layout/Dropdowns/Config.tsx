import { useRouter } from 'next/router';
import { useState } from 'react';
import ConfirmDialog from '../../components/ConfirmDialog';
import NewChatModal from '../../components/HomeChat/NewChatModal';
import { NotificationFailure, NotificationSuccess } from '../../components/Notifications';
import { useAppDispatch } from '../../redux/hooks';
import { setLogoutData } from '../../redux/userSlice';
import { DropDownProps } from '../../types/chat';
import apiClient from '../../utils/client';
import { clearToken } from '../../utils/sessionToken';

function ConfigDropdown(dropDownProps: DropDownProps) {
  const { getChatsData, userData, isOpen } = dropDownProps;

  const [delDialogIsOpen, setDelDialogIsOpen] = useState(false);
  const [newChatModalIsOpen, setNewChatModalIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleDeleteUser = () => {
    setDelDialogIsOpen(true);
  };

  const handleNewChatModal = () => {
    setNewChatModalIsOpen(true);
  };

  const handleConfirmDelete = () => {
    /* 
      TODO: 
      1. Get current user data 
      2. Delete user 
    */
    apiClient
      .delete('/users')
      .then((response) => {
        NotificationSuccess(response.data.message);
        router.push('/');
      })
      .catch((error) => NotificationFailure(error.response.data.message));

    dispatch(setLogoutData());
    clearToken();
  };

  return (
    <div className={isOpen ? 'configDropdown scale1' : 'configDropdown'}>
      <ul>
        <li onClick={handleNewChatModal}>
          <div>Nuevo chat</div>
        </li>
        <li onClick={handleDeleteUser}>
          <div>Eliminar cuenta</div>
        </li>
      </ul>

      <NewChatModal
        isOpen={newChatModalIsOpen}
        setIsOpen={setNewChatModalIsOpen}
        userData={userData}
        getChatsData={getChatsData}
      />
      <ConfirmDialog
        title="Eliminar Usuario"
        text="¿Está seguro que desea eliminar la cuenta?"
        isOpen={delDialogIsOpen}
        handleCancel={setDelDialogIsOpen}
        handleOk={handleConfirmDelete}
      />
    </div>
  );
}

export default ConfigDropdown;
