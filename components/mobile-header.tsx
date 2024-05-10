import { MobileSiderbar } from "./mobile-siedebar";

export const MobileHeader = () => {
  return (
    <nav className="lg:hidden px-4 h-[50px] items-center bg-green-500 border-b fixed top-0 w-full z-50">
      <MobileSiderbar />
    </nav>
  );
};