import { useEffect, useState } from 'react';
import axios from 'axios';
import CardBox from '../../components/shared/CardBox';
import API_SERVICE from 'src/utils/api-services';
import CourseCard from 'src/components/cards/CourseCard';
import { Course } from 'src/types/course/course';

const CoursesPage = () => {
  const [coursesData, setCoursesData] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data from backend
  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_SERVICE.courses}`);
      setCoursesData(response.data.data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <CardBox>
      <div className="flex flex-col justify-start items-center pb-5">
        <h5 className="card-title">Our Courses</h5>
        <p>
          The best place to learn IT skills is right here, where we offer a variety of courses
          tailored to your needs.
        </p>
      </div>
      <div className="grid grid-cols-12 gap-5">
        {isLoading ? (
          <div className="col-span-12 items-center">
            <p className="text-center text-primary">Loading...</p>
          </div>
        ) : coursesData.length === 0 ? (
          <div className="col-span-12 items-center">
            <p className="text-center text-primary">No courses available.</p>
          </div>
        ) : (
          coursesData.map((course) => <CourseCard key={course._id} course={course} />)
        )}
      </div>
    </CardBox>
  );
};

export default CoursesPage;
