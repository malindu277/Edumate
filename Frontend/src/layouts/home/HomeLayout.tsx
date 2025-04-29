import { FC } from 'react';
import { Outlet } from 'react-router';
import ScrollToTop from 'src/components/shared/ScrollToTop';
import Header from './header/Header';

const HomeLayout: FC = () => {
  return (
    <>
      <div className="flex w-full min-h-screen dark:bg-darkgray">
        <div className=" flex w-full flex-col bg-slate-200">
          {/* Header */}
          <Header />
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
    </>
  );
};

export default HomeLayout;
