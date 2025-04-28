import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';
import API_SERVICE from '../../utils/api-services';
import axios from 'axios';
import Swal from 'sweetalert2';
import CourseCard from '../cards/CourseCard2';
import { Course, CardDetails, CoursePurchase } from 'src/types/course/course';
import cardLogos from 'src/assets/images/backgrounds/cardLogos.jpg';
import { ACCESS_DAYS } from 'src/utils/constants';

const PurchaseCourseForm = ({
  handleTaskCompletion,
  courseData,
}: {
  handleTaskCompletion: () => void;
  courseData: Course;
}) => {
  const [formData, setFormData] = useState<CardDetails>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    console.log('Submitted data:', formData);

    if (!formData.cardholderName || !formData.cardNumber || !formData.cvv || !formData.expDate) {
      Swal.fire({
        title: 'Missing Fields',
        text: 'Please fill in all the required fields',
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
      setIsLoading(false);
      return;
    }

    const userStr = localStorage.getItem('user');
    if (!userStr) {
      Swal.fire({
        title: 'Not Logged In',
        text: 'Please login to complete the purchase',
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
      setIsLoading(false);
      return;
    }

    const user = userStr ? JSON.parse(userStr) : null;

    const purchaseData: CoursePurchase = {
      courseId: courseData._id,
      userId: user.username,
      purchaseDate: new Date(),
      expiryDate: new Date(new Date().setDate(new Date().getDate() + ACCESS_DAYS)),
    };

    try {
      const response = await axios.post(API_SERVICE.purchases, purchaseData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: 'Purchase completed successfully!',
          text: `Your reference number is: ${response.data?.data?._id}`,
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(() => handleTaskCompletion());
      } else {
        Swal.fire({
          title: 'Error completing purchase!',
          text: `${response.data?.message || 'An unknown error occurred'}`,
          icon: 'error',
          confirmButtonText: 'Try again',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error completing purchase!',
        text: `${error}`,
        icon: 'error',
        confirmButtonText: 'Try again',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleOnSubmit}>
      <div className="max-h-40 border-gray-200 border rounded-lg">
        <CourseCard course={courseData} />
      </div>

      <div className=" flex justify-center">
        <img
          src={cardLogos}
          alt="Card Types"
          className="w-1/2 object-cover border-gray-200 border rounded-md overflow-hidden"
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="cardholderName">Cardholder Name</Label>
        </div>
        <TextInput
          id="cardholderName"
          name="cardholderName"
          type="text"
          placeholder="John Doe"
          required
          onChange={handleOnChange}
        />
      </div>

      <div className="grid grid-cols-6 gap-2">
        <div className="w-full col-span-3">
          <div className="mb-2 block">
            <Label htmlFor="cardNumber">Card Number</Label>
          </div>
          <TextInput
            id="cardNumber"
            name="cardNumber"
            type="text"
            maxLength={16}
            minLength={16}
            placeholder="4242 XXXX XXXX 1234"
            required
            onChange={handleOnChange}
          />
        </div>
        <div className="w-full col-span-1">
          <div className="mb-2 block">
            <Label htmlFor="cvv">CVV</Label>
          </div>
          <TextInput
            id="cvv"
            name="cvv"
            type="text"
            maxLength={3}
            minLength={3}
            placeholder="XXX"
            required
            onChange={handleOnChange}
          />
        </div>
        <div className="w-full col-span-2">
          <div className="mb-2 block">
            <Label htmlFor="expDate">Expire Date</Label>
          </div>
          <TextInput
            id="expDate"
            name="expDate"
            type="text"
            maxLength={5}
            minLength={5}
            placeholder="MM/YY"
            required
            onChange={handleOnChange}
          />
        </div>
      </div>

      <Button onClick={handleOnSubmit} color="primary" className="my-6" disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Pay Now'}
      </Button>
    </form>
  );
};

export default PurchaseCourseForm;
