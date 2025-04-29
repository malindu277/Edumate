import LogoIcon from '/src/assets/images/logos/logo-icon.png';
import { Link } from 'react-router';

const Logo = () => {
  return (
    <Link to={'/'}>
      <img src={LogoIcon} alt="logo" className=" max-w-16" />
    </Link>
  );
};

export default Logo;
