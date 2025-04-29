import { useState } from 'react';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { Link, useNavigate } from 'react-router';

const AuthLogin = () => {
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // Handle input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Save user data to local storage
    localStorage.setItem('user', JSON.stringify(formData));
    if (formData.username === 'admin') {
      navigate('/admin/courses');
      return;
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <div className="mb-2 block">
          <Label htmlFor="username" value="Username" />
        </div>
        <TextInput
          id="username"
          type="text"
          sizing="md"
          required
          value={formData.username}
          onChange={handleChange}
          className="form-control form-rounded-xl"
        />
      </div>
      <div className="mb-4">
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password" />
        </div>
        <TextInput
          id="password"
          type="password"
          sizing="md"
          required
          value={formData.password}
          onChange={handleChange}
          className="form-control form-rounded-xl"
        />
      </div>
      <div className="flex justify-between my-5">
        <div className="flex items-center gap-2">
          <Checkbox id="accept" className="checkbox" />
          <Label htmlFor="accept" className="opacity-90 font-normal cursor-pointer">
            Remember this Device
          </Label>
        </div>
        <Link to="/" className="text-primary text-sm font-medium">
          Forgot Password?
        </Link>
      </div>
      <Button type="submit" color="primary" className="w-full bg-primary text-white rounded-xl">
        Sign in
      </Button>
    </form>
  );
};

export default AuthLogin;
