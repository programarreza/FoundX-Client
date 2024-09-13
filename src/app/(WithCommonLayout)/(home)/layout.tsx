import { ReactNode } from "react";

const Layout = ({
  children,
  resentPosts,
}: {
  children: ReactNode;
  resentPosts: ReactNode;
}) => {
  return (
    <div>
      {children}
      {resentPosts}
    </div>
  );
};

export default Layout;
