import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import CardBox from '../../components/shared/CardBox';
import API_SERVICE, { BACKEND_URL } from 'src/utils/api-services';
import { Course } from 'src/types/course/course';
import axios from 'axios';
import VideoPlayerModal from 'src/components/modals/VideoPlayerModal';
import Swal from 'sweetalert2';

const CourseViewPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [course, setCourse] = useState<Course>({});
  const { id } = useParams();

  const userStr = localStorage.getItem('user');

  if (!userStr) {
    const timer = setInterval(() => {
      window.location.href = '/';
    }, 3000);
    Swal.fire({
      title: 'Please Login',
      text: 'Please login as access this page',
      icon: 'warning',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
      willClose: () => clearInterval(timer),
    });
  }

  // Fetch data from backend
  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_SERVICE.courses}/${id}`);
      setCourse(response.data.data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const gridCols = (course.videos?.length ?? 0) < 4 ? course.videos?.length ?? 0 : 4;
  console.log(gridCols);

  if (isLoading) {
    return (
      <CardBox>
        <div className="flex flex-col justify-start items-center mt-3">
          <p className="text-center text-primary text-lg">Loading...</p>
        </div>
      </CardBox>
    );
  }

  if (!course) {
    return (
      <CardBox>
        <div className="flex flex-col justify-start items-center mt-3">
          <p className="text-center text-primary text-lg">Course not found</p>
        </div>
      </CardBox>
    );
  }

  return (
    <CardBox>
      <div className="flex flex-col justify-start items-center my-3">
        <h5 className="card-title text-2xl">{course.title}</h5>
        <p className="text-lg">{course.description}</p>
      </div>
      <div className="flex flex-col w-full justify-center items-center pb-3 ">
        <div className="flex flex-col h-[40vh] rounded-md overflow-hidden">
          <img
            src={`${BACKEND_URL}/${course.thumbnail}`}
            alt={course.title}
            className="object-cover h-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
            }}
          />
        </div>

        <div
          className={`grid ${
            gridCols === 1
              ? 'grid-cols-1'
              : gridCols === 2
              ? 'grid-cols-2'
              : gridCols === 3
              ? 'grid-cols-3'
              : 'grid-cols-4'
          } p-5 gap-5 mt-3`}
        >
          {course.videos?.map((video, index) => (
            <VideoPlayerModal key={index} video={video} />
          ))}
        </div>
      </div>
    </CardBox>
  );
};

export default CourseViewPage;
