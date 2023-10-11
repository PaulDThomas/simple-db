"use client";

import { Navbar } from "flowbite-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import az from "./AZ_SYMBOL_RGB.png";
import { ProfileData } from "./ProfileData";

export default function NavbarWithDropdown() {
  const path = usePathname();
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <Image alt="AstraZeneca" width={32} src={az} />
        Third party tracking
      </Navbar.Brand>
      <div className="flex md:order-2">
        <ProfileData />
      </div>
      <Navbar.Collapse>
        {[
          { href: "/", label: "Search" },
          { href: "/datanav", label: "View data" },
          { href: "/import", label: "Import spreadsheet" },
          { href: "/admin", label: "Admin" },
        ].map((r, i) => (
          <Navbar.Link key={i} href={r.href} active={path === r.href}>
            {r.label}
          </Navbar.Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}
