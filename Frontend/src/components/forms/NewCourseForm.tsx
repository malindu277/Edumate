import { ChangeEvent, useEffect, useState } from 'react';
import { Button, FileInput, Label, TextInput, HelperText } from 'flowbite-react';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import API_SERVICE from '../../utils/api-services';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Course } from '../../types/course/course';
import { CURRENCY } from 'src/utils/constants';

const NewCourseForm = ({ handleTaskCompletion }: { handleTaskCompletion: () => void }) => {
  const [formData, setFormData] = useState<Course>({});
  const [videoList, setVideoList] = useState<{ topic: string; link: string }[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [field, index] = name.split('-');

    setVideoList((prev) => {
      const updatedList = [...prev];
      if (!updatedList[+index]) {
        updatedList[+index] = { topic: '', link: '' };
      }
      updatedList[+index][field as 'topic' | 'link'] = value;
      return updatedList;
    });
  };

  useEffect(() => {
    setFormData({ ...formData, videos: videoList });
  }, [videoList]);

  useEffect(() => {
    if (thumbnail !== null) {
      setFormData({ ...formData, thumbnail });
    }
  }, [thumbnail]);

  const handleOnSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.price || videoList.length === 0) {
      alert('Please fill in all the required fields');
      return;
    }

    try {
      const response = await axios.post(API_SERVICE.courses, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: 'Course created successfully!',
          text: `${response.data?.data?.title} - course has been created.`,
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(() => handleTaskCompletion());
      } else {
        Swal.fire({
          title: 'Error creating course!',
          text: `${response.data?.message || 'An unknown error occurred'}`,
          icon: 'success',
          confirmButtonText: 'Try again',
        });
      }
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        title: 'Error creating course!',
        text: `${error}`,
        icon: 'error',
        confirmButtonText: 'Try again',
      });
    }
  };

  return (
    <form
      className="flex w-full flex-col gap-2"
      onSubmit={handleOnSubmit}
      encType="multipart/form-data"
    >
      <div className="flex flex-row gap-3">
        <div className="w-2/3">
          <div className="mb-2 block">
            <Label htmlFor="CourseTitle">Course Title</Label>
          </div>
          <TextInput
            id="CourseTitle"
            name="title"
            type="text"
            placeholder="New React JS Course"
            required
            onChange={handleOnChange}
          />
        </div>
        <div className="w-1/3">
          <div className="mb-2 block">
            <Label htmlFor="CoursePrice">{`Course Price (${CURRENCY})`}</Label>
          </div>
          <TextInput
            id="CoursePrice"
            name="price"
            type="number"
            required
            onChange={handleOnChange}
          />
        </div>
      </div>

      <div id="fileUpload" className="w-full">
        <div className="flex flex-row justify-between">
          <Label className="mb-2 block" htmlFor="CourseThumbnail">
            Course Thumbnail
          </Label>
          <HelperText className="mt-1 text-right text-sm">
            A good image will make your course more appealing and attract potential learners.
          </HelperText>
        </div>

        <FileInput
          id="CourseThumbnail"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setThumbnail(e.target.files?.[0] ?? null)}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="CourseDescription">Course Description</Label>
        </div>
        <TextInput
          id="CourseDescription"
          name="description"
          type="text"
          placeholder="The best online course to learn React JS."
          required
          onChange={handleOnChange}
        />
      </div>

      <div className="p-3 max-h-40 overflow-y-scroll bg-gray-100 border-gray-300 border my-4 rounded-md">
        <Table className="table-fixed">
          <TableHead className="text-center">
            <TableHeadCell className="w-1/12">#</TableHeadCell>
            <TableHeadCell className="w-5/12">Topic</TableHeadCell>
            <TableHeadCell className="w-6/12">Video Link</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {Array.from({ length: 8 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell className="whitespace-nowrap font-medium text-gray-900">
                  {i + 1}
                </TableCell>
                <TableCell className="p-1 m-0">
                  <TextInput
                    id={`topic-${i}`}
                    name={`topic-${i}`}
                    type="text"
                    placeholder="Topic"
                    onChange={handleContentChange}
                  />
                </TableCell>
                <TableCell className="p-1 m-0">
                  <TextInput
                    id={`videoLink-${i}`}
                    name={`link-${i}`}
                    type="text"
                    placeholder="Video Link"
                    onChange={handleContentChange}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Button type="submit" color="primary" className="my-3" disabled={isLoading}>
        Publish
      </Button>
    </form>
  );
};

export default NewCourseForm;
