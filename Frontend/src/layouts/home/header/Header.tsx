import { useState, useEffect } from 'react';
import { Button, Navbar } from 'flowbite-react';
import { Icon } from '@iconify/react';
import Profile from './Profile';
import { Drawer } from 'flowbite-react';
import MobileSidebar from '../sidebar/MobileSidebar';
import { Link } from 'react-router';
import FullLogo from '../shared/logo/FullLogo';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // mobile-sidebar
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  return (
    <>
      <header
        className={`sticky top-0 z-[5] ${
          isSticky ? 'bg-white dark:bg-dark fixed w-full' : 'bg-white'
        }`}
      >
        <Navbar
          fluid
          className={`rounded-none bg-transparent dark:bg-transparent py-4 sm:px-30 px-4`}
        >
          {/* Mobile Toggle Icon */}

          <div className="flex gap-3 items-center justify-between w-full ">
            <div className="flex gap-2 items-center">
              <span
                onClick={() => setIsOpen(true)}
                className="h-10 w-10 flex text-black dark:text-white text-opacity-65 xl:hidden hover:text-primary hover:bg-lightprimary rounded-full justify-center items-center cursor-pointer"
              >
                <Icon icon="solar:hamburger-menu-line-duotone" height={21} />
              </span>
              <FullLogo />
            </div>

            {userStr && (
              <div className="flex gap-4 items-center text-lg text-primary font-bold">
                {`Hello ${user?.username?.charAt(0).toUpperCase()}${user?.username?.slice(1)}!`}
              </div>
            )}

            <nav className="hidden xl:flex gap-6 items-center">
              <ul className="flex gap-6 items-center">
                {user && user.username === 'admin' && (
                  <li>
                    <Link to="/admin/courses" className="hover:text-primary">
                      Go to Admin Dashboard
                    </Link>
                  </li>
                )}
              </ul>
            </nav>

            <div className="flex gap-4 items-center ml-16">
              {userStr ? (
                <>
                  <Button
                    as={Link}
                    to="/logout"
                    size={'sm'}
                    color={'primary'}
                    className="rounded-md py-1 px-3"
                  >
                    Logout
                  </Button>
                  <Profile />
                </>
              ) : (
                <Button
                  as={Link}
                  to="/login"
                  size={'sm'}
                  color={'primary'}
                  className="rounded-md py-1 px-3"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </Navbar>
      </header>

      {/* Mobile Sidebar */}
      <Drawer open={isOpen} onClose={handleClose} className="w-130">
        <Drawer.Items>
          <MobileSidebar />
        </Drawer.Items>
      </Drawer>
    </>
  );
};

export default Header;
