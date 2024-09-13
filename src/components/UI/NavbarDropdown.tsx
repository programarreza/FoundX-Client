"use client";

import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";

const NavbarDropdown = () => {
  const router = useRouter();

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Avatar
            className="cursor-pointer"
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem onClick={() => handleNavigation("/profile")}>
            Profile
          </DropdownItem>

          <DropdownItem
            onClick={() => handleNavigation("/profile/create-post")}
          >
            Create Post
          </DropdownItem>

          <DropdownItem onClick={() => handleNavigation("/profile/settings")}>
            Settings
          </DropdownItem>

          <DropdownItem className="text-danger" color="danger">
            Log out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default NavbarDropdown;
