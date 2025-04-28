import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { useEffect, useState } from 'react';
import EditCourseForm from '../forms/EditCourseForm';
import Swal from 'sweetalert2';
import API_SERVICE from 'src/utils/api-services';
import axios from 'axios';

const EditCourseModal = ({
  refresh,
  courseId,
  open,
  onClose,
}: {
  refresh: () => void;
  courseId: string;
  open: boolean;
  onClose: () => void;
}) => {
  const [courseData, setCoursesData] = useState({});

  const getCourseById = async (id: string) => {
    if (!id) return;
    try {
      const response = await axios.get(`${API_SERVICE.courses}/${id}`);
      if (response.status !== 200) throw new Error('Failed to fetch course details');
      setCoursesData(response.data.data);
    } catch (error: any) {
      Swal.fire({
        title: 'Error fetching course',
        text: error.message,
        icon: 'error',
      });
    }
  };

  useEffect(() => {
    if (open && courseId) {
      getCourseById(courseId);
    }
  }, [open, courseId]);

  const handleTaskCompletion = () => {
    onClose();
    refresh();
  };

  return (
    <Modal show={open} size="4xl" onClose={onClose} popup>
      <ModalHeader />
      <ModalBody>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-center text-gray-900 dark:text-white">
            Edit a Course
          </h3>
          <EditCourseForm handleTaskCompletion={handleTaskCompletion} courseData={courseData} />
        </div>
      </ModalBody>
    </Modal>
  );
};

export default EditCourseModal;
