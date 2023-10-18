import Link from "next/link";
import { LoadFields } from "./LoadFields";
import { Search } from "./Search";

export default function Home() {
  return (
    <LoadFields>
      <Search />
    </LoadFields>
  );
}
