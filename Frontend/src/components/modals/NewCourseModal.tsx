import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import NewCourseForm from '../forms/NewCourseForm';

const NewCourseModal = ({ refresh }: { refresh: () => void }) => {
  const [openModal, setOpenModal] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
  }

  const handleTaskCompletion = () => {
    setOpenModal(false);
    refresh();
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)} color={'primary'} className="rounded-md py-1 px-3">
        <Icon icon={'solar:add-circle-outline'} height={18} /> Add Course
      </Button>
      <Modal show={openModal} size="4xl" onClose={onCloseModal} popup>
        <ModalHeader />
        <ModalBody>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center">
              Create a New Course
            </h3>
            <NewCourseForm handleTaskCompletion={handleTaskCompletion} />
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default NewCourseModal;
