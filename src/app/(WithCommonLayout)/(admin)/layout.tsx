import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <h2>Admin Layout</h2>
      {children}
    </div>
  );
};

export default AdminLayout;
