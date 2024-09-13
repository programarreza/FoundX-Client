import { ReactNode } from "react";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return <div>
	<h2>This is user layout</h2>
	{children}</div>;
};

export default ProfileLayout;
