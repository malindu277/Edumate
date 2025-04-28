import { useState } from 'react';
import { Badge } from 'flowbite-react';
import { Link } from 'react-router';
import API_SERVICE, { BACKEND_URL } from 'src/utils/api-services';
import PurchaseCourseModal from '../modals/PurchaseCourseModal';
import { Button } from 'flowbite-react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useEffect } from 'react';
import { Course, CoursePurchase } from 'src/types/course/course';
import { CURRENCY_SIGN } from 'src/utils/constants';

const CourseCard = ({ course }: { course: Course }) => {
  const [purchasedCourses, setPurchasedCourses] = useState<CoursePurchase[]>([]);
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const fetchPurchasedCourses = async () => {
    try {
      const response = await axios.get(`${API_SERVICE.purchases}/u/${user.username}`);
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch purchased courses:', error);
    }
  };
  const fetchCourses = async () => {
    const courses = await fetchPurchasedCourses();
    setPurchasedCourses(courses);
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  const forwardToLogin = () => {
    const timer = setInterval(() => {
      window.location.href = '/login';
    }, 5000);
    Swal.fire({
      title: 'Please Login',
      text: 'You have to Login to purchase and access courses',
      icon: 'info',
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false,
      willClose: () => clearInterval(timer),
    });
  };

  return (
    <div className="lg:col-span-4 col-span-12">
      <Link to={'#'} className="group">
        <div className="rounded-xl dark:shadow-dark-md shadow-lg bg-white dark:bg-darkgray p-0 relative w-full break-words overflow-hidden h-full flex flex-col">
          <div className="relative">
            <img
              src={`${BACKEND_URL}/${course.thumbnail}`}
              alt="Course Thumbnail"
              className="w-full h-52 rounded-md object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
              }}
            />
            <Badge
              color={'white'}
              className="absolute bottom-5 start-5 font-semibold rounded-sm bg-primary text-white"
            >
              {course.videos?.length || 0} video{course.videos?.length !== 1 && 's'}
            </Badge>
          </div>

          <div className="flex flex-col justify-between px-6 pb-6 h-full">
            <div>
              <h5 className="text-lg my-2 group-hover:text-primary line-clamp-2">{course.title}</h5>
              <div className="my-3">
                {(course.description ?? '').length > 100
                  ? `${(course.description ?? '').slice(0, 97)}...`
                  : course.description ?? ''}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 bottom-0">
              <div className="flex items-center justify-center text-lg text-primary font-bold">{`Price: ${CURRENCY_SIGN} ${course.price}`}</div>
              {userStr ? (
                purchasedCourses?.some(
                  (purchasedCourse) => purchasedCourse.courseId === course._id,
                ) ? (
                  <Button
                    as={Link}
                    to={`/course/${course._id}`}
                    color={'success'}
                    className="rounded-md py-1 px-1"
                  >
                    Access
                  </Button>
                ) : (
                  <PurchaseCourseModal course={course} refresh={fetchCourses} />
                )
              ) : (
                <Button onClick={forwardToLogin} color={'primary'} className="rounded-md py-1 px-1">
                  Purchase
                </Button>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
