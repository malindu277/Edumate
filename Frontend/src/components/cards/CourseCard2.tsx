import { Badge } from 'flowbite-react';
import { Link } from 'react-router';
import { BACKEND_URL } from 'src/utils/api-services';
import { Course } from 'src/types/course/course';
import { ACCESS_DAYS, CURRENCY } from 'src/utils/constants';

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <div className="lg:col-span-4 col-span-12">
      <Link to={'#'} className="group">
        <div className="max-h-32 rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-0 relative w-full break-words overflow-hidden h-full flex flex-row">
          <div className="relative">
            <img
              src={`${BACKEND_URL}/${course.thumbnail}`}
              alt="Course Thumbnail"
              className="w-72 h-32 rounded-md object-cover"
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

          <div className="flex flex-col gap-5 justify-between px-5 py-1 h-full ">
            <div className="flex flex-col gap-2 justify-between">
              <h5 className="text-lg font-bold line-clamp-2">{course.title}</h5>
              <div className="text-xs">
                {(course.description ?? '').length > 100
                  ? `${(course.description ?? '').slice(0, 97)}...`
                  : course.description ?? ''}
              </div>
            </div>

            <div className="flex items-center justify-center text-sm text-primary font-bold">
              {`You will be charged ${course.price} ${CURRENCY} & you will get ${ACCESS_DAYS} of Access to this course.`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
