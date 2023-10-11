"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Image from "next/image";
import az from "./AZ_SYMBOL_RGB.png";
import Link from "next/link";

export default function NavbarWithDropdown() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <Image alt="AstraZeneca" width={32} src={az} />
        Third party tracking
      </Navbar.Brand>
      {/* <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div> */}
      <Navbar.Collapse>
        <Navbar.Link active href="/datanav">
          <p>View data</p>
        </Navbar.Link>
        <Navbar.Link href="/import">Import spreadsheet</Navbar.Link>
        <Navbar.Link href="/admin">Admin</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
