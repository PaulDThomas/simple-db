import { useAccount, useMsal } from "@azure/msal-react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import { loginRequest } from "./authConfig";

export const ProfileData = () => {
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0]);
  const name = accounts[0] && accounts[0].name;
  const [picUrl, setPicUrl] = useState<string | null>(null);

  const getToken = useCallback(async () => {
    if (account) {
      const response = await instance.acquireTokenSilent({
        ...loginRequest,
        account,
      });
      const bearer = `Bearer ${response.accessToken}`;
      return bearer;
    }
  }, [account, instance]);

  const getPicture = useCallback(async () => {
    const token = await getToken();
    if (token) {
      try {
        const response = await fetch(
          "https://graph.microsoft.com/v1.0/me/photo/$value",
          {
            headers: { Authentication: token },
          }
        );
        if (response.ok) {
          const myBlob = await response.blob();
          setPicUrl(URL.createObjectURL(myBlob));
        }
      } catch {
        console.warn("Retrieve profile picture failed");
      }
    }
  }, [getToken]);

  useLayoutEffect(() => {
    process.env.NEXT_PUBLIC_ENV !== "local" && getPicture();
  }, [getPicture]);

  return (
    <>
      <Dropdown
        arrowIcon={false}
        inline
        // label={<Avatar alt="User settings" img={img} rounded />}
        label={
          picUrl ? (
            <Image alt="User settings" height={32} width={32} src={picUrl} />
          ) : (
            <Avatar alt="User settings" rounded />
          )
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
