import { FC } from 'react';
import { Outlet } from 'react-router';
import ScrollToTop from 'src/components/shared/ScrollToTop';
import Sidebar from './sidebar/Sidebar';
import Header from './header/Header';
import Swal from 'sweetalert2';

const AdminLayout: FC = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    const user = JSON.parse(userStr);
    if (user.username !== 'admin') {
      const timer = setInterval(() => {
        window.location.href = '/';
      }, 3000);
      Swal.fire({
        title: 'Only admin have access to this page',
        text: 'Please login as admin to access this page',
        icon: 'warning',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
        willClose: () => clearInterval(timer),
      });
    }
  } else {
    window.location.href = '/';
  }

  return (
    <>
      <div className="flex w-full min-h-screen dark:bg-darkgray">
        <div className="page-wrapper flex w-full  ">
          {/* Header/sidebar */}
          <Sidebar />
          <div className="page-wrapper-sub flex flex-col w-full dark:bg-darkgray">
            {/* Top Header  */}
            <Header />

            <div className={`bg-lightgray dark:bg-dark  h-full rounded-bb`}>
              {/* Body Content  */}
              <div className={`w-full`}>
                <ScrollToTop>
                  <div className="container py-30">
                    <Outlet />
                  </div>
                </ScrollToTop>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
