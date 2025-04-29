import { useEffect } from 'react';
import Swal from 'sweetalert2';

const gradientStyle = {
  background:
    'linear-gradient(45deg, rgb(238, 119, 82,0.2), rgb(231, 60, 126,0.2), rgb(35, 166, 213,0.2), rgb(35, 213, 171,0.2))',
  backgroundSize: '400% 400%',
  animation: 'gradient 15s ease infinite',
  height: '100vh',
};

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem('user');
    Swal.fire({
      title: 'Logout successful!',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
    }).then(() => {
      window.location.href = '/';
    });
  }, []);
  return <div style={gradientStyle} className="relative overflow-hidden h-screen"></div>;
};

export default Logout;
