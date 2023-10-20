import Link from "next/link";
import { LoadFields } from "./LoadFields";
import { Search } from "./Search";
import { RecentLinks } from "./_components/RecentLinks";

export default function Home() {
  return (
    <LoadFields>
      <Search />
      <RecentLinks />
    </LoadFields>
  );
}
