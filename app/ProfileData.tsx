import { useMsal } from "@azure/msal-react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";

export const ProfileData = () => {
  const { accounts } = useMsal();
  const name = accounts[0] && accounts[0].name;
  return (
    <>
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <Avatar
            alt="User settings"
            // img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            rounded
          />
        }
      >
        <Dropdown.Header>
          <span className="block text-sm">{name}</span>
        </Dropdown.Header>
        {/* 
        <Dropdown.Item></Dropdown.Item>
        <Dropdown.Divider />
        */}
      </Dropdown>
      <Navbar.Toggle />
    </>
  );
};
