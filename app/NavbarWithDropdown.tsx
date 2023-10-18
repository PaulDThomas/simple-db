"use client";

import { Navbar } from "flowbite-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import az from "./AZ_SYMBOL_RGB.png";
import { ProfileData } from "./ProfileData";

export default function NavbarWithDropdown() {
  const path = usePathname();
  return (
    <Navbar
      fluid
      className={"bg-sky-900 border-gray-500 text-amber-400 sticky top-0 z-10"}
    >
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
          <Navbar.Link
            key={i}
            href={r.href}
            // active={path === r.href}
            className={path === r.href ? "text-sky-400" : "text-amber-400"}
          >
            {r.label}
          </Navbar.Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}
