import { useState } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';
import { useNavigate } from 'react-router';

const AuthRegister = () => {
  const navigate = useNavigate();

  // State to hold form input values
  const [formData, setFormData] = useState({
    username: '',
    emailAddress: '',
    userPassword: '',
  });

  // Handle input field changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submitted data:', formData);
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
          name="username"
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
          <Label htmlFor="emailAddress" value="Email Address" />
        </div>
        <TextInput
          id="emailAddress"
          name="emailAddress"
          type="email"
          sizing="md"
          required
          value={formData.emailAddress}
          onChange={handleChange}
          className="form-control form-rounded-xl"
        />
      </div>
      <div className="mb-6">
        <div className="mb-2 block">
          <Label htmlFor="userPassword" value="Password" />
        </div>
        <TextInput
          id="userPassword"
          name="userPassword"
          type="password"
          sizing="md"
          required
          value={formData.userPassword}
          onChange={handleChange}
          className="form-control form-rounded-xl"
        />
      </div>
      <Button color="primary" type="submit" className="w-full">
        Sign Up
      </Button>
    </form>
  );
};

export default AuthRegister;
