import { useEffect, useState } from 'react';
import axios from 'axios';
import { Dropdown } from 'flowbite-react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { Icon } from '@iconify/react';
import { Table } from 'flowbite-react';
import NewCourseModal from '../modals/NewCourseModal';
import API_SERVICE, { BACKEND_URL } from 'src/utils/api-services';
import Swal from 'sweetalert2';
import EditCourseModal from '../modals/EditCourseModal';
import { CURRENCY_SIGN } from 'src/utils/constants';

const CoursesTable = () => {
  const [coursesTableData, setCoursesTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editCourseId, setEditCourseId] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Fetch data from backend
  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_SERVICE.courses}`);
      setCoursesTableData(response.data.data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleEdit = (id: string) => {
    setEditCourseId(id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    const isConfirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this course!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    });

    if (isConfirm.isConfirmed) {
      try {
        const response = await axios.delete(`${API_SERVICE.courses}/${id}`);
        if (response.status === 200) {
          fetchCourses();
          Swal.fire({
            title: 'Course deleted successfully.',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
        } else {
          throw new Error('An error occurred while deleting the course.');
        }
      } catch (error) {
        Swal.fire({
          title: 'Failed to delete course.',
          text: `Error : ${error}`,
          icon: 'error',
          confirmButtonText: 'Try again',
        });
      }
    }
  };

  const refresh = () => {
    fetchCourses();
  };

  const tableActionData = [
    {
      icon: 'solar:pen-new-square-broken',
      listtitle: 'Edit',
      action: handleEdit,
    },
    {
      icon: 'solar:trash-bin-minimalistic-outline',
      listtitle: 'Delete',
      action: handleDelete,
    },
  ];

  return (
    <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
      <div className="flex flex-row justify-between">
        <h5 className="card-title">Courses</h5>
        <NewCourseModal refresh={refresh} />
      </div>
      <div className="mt-3">
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="p-6">Title</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell className="text-center">Number of Videos</Table.HeadCell>
              <Table.HeadCell className="text-right">Price</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-border dark:divide-darkborder">
              {coursesTableData.length > 0 ? (
                coursesTableData.map((course: any, index: number) => (
                  <Table.Row key={index}>
                    <a href={`/course/${course._id}`} target="_blank">
                      <Table.Cell className="whitespace-nowrap ps-6">
                        <div className="flex gap-3 items-center">
                          <img
                            src={`${BACKEND_URL}/${course.thumbnail}`}
                            alt="Course Thumbnail"
                            className="h-[60px] w-[80px] rounded-md object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
                            }}
                          />
                          <div className="truncate line-clamp-2 sm:text-wrap max-w-56">
                            <h6 className="text-sm">{course.title}</h6>
                          </div>
                        </div>
                      </Table.Cell>
                    </a>
                    <Table.Cell title={course.description}>
                      <div>
                        {course.description.length > 40
                          ? `${course.description.slice(0, 37)}...`
                          : course.description}
                      </div>
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      {course.videos?.length || 0} video{course.videos?.length !== 1 && 's'}
                    </Table.Cell>
                    <Table.Cell className="text-right">
                      <h5 className="text-base text-wrap">{`${CURRENCY_SIGN} ${course.price}`}</h5>
                    </Table.Cell>
                    <Table.Cell>
                      <Dropdown
                        label=""
                        dismissOnClick={false}
                        renderTrigger={() => (
                          <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
                            <HiOutlineDotsVertical size={22} />
                          </span>
                        )}
                      >
                        {tableActionData.map((items, idx) => (
                          <Dropdown.Item
                            key={idx}
                            className="flex gap-3"
                            onClick={() => items.action(course._id)}
                          >
                            <Icon icon={`${items.icon}`} height={18} />
                            <span>{items.listtitle}</span>
                          </Dropdown.Item>
                        ))}
                      </Dropdown>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : isLoading ? (
                <Table.Row>
                  <Table.Cell colSpan={5} className="text-center">
                    Loading...
                  </Table.Cell>
                </Table.Row>
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={5} className="text-center">
                    No Course data found
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
          <EditCourseModal
            refresh={refresh}
            courseId={editCourseId}
            open={isEditing}
            onClose={() => setIsEditing(false)}
          />
        </div>
      </div>
    </div>
  );
};

export { CoursesTable };
