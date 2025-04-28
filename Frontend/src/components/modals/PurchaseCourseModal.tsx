import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { useState } from 'react';
import PurchaseCourseForm from '../forms/PurchaseCourseForm';
import { Course } from 'src/types/course/course';

const PurchaseCourseModal = ({ refresh, course }: { refresh: () => void; course: Course }) => {
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
      <Button onClick={() => setOpenModal(true)} color={'primary'} className="rounded-md py-1 px-1">
        Purchase
      </Button>
      <Modal show={openModal} size="2xl" onClose={onCloseModal} popup>
        <ModalHeader />
        <ModalBody>
          <div className="space-y-3">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center">
              {'Purchase Course'}
            </h3>
            <h5 className="text-md font-medium text-gray-900 dark:text-white text-center">
              You have to complete this course within 30 days, after that you will have to pay
              again.
            </h5>
            <PurchaseCourseForm courseData={course} handleTaskCompletion={handleTaskCompletion} />
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default PurchaseCourseModal;
