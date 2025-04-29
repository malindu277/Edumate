import Logo from '/src/assets/images/logos/logo-icon.png';
import { Link } from 'react-router';
const FullLogo = () => {
  return (
    <Link to={'/'} className="flex items-center gap-1">
      <img src={Logo} alt="logo" className="block max-w-10" />
      <span className="text-primary text-2xl font-extrabold">Edumate</span>
    </Link>
  );
};

export default FullLogo;
