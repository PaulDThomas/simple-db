"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "./_context/AppContextProvider";
import { RowDataRow } from "./api/rowdata/RowDataRow";
import _ from "lodash";
import { ShowBreadcrumb } from "./_components/ShowBreadcrumb";
import { Label, Spinner, TextInput } from "flowbite-react";

export const Search = () => {
  const [currentSearchValue, setCurrentSearchValue] = useState<string>("");
  const [lastSearchedTerm, setLastSearchedTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<RowDataRow[]>([]);

  // Debounce lastSearchedTerm
  useEffect(() => {
    if (currentSearchValue !== lastSearchedTerm) {
      const timer = setTimeout(() => {
        setLastSearchedTerm(currentSearchValue);
      }, 1000);
      return () => {
        if (timer) clearTimeout(timer);
      };
    }
  }, [currentSearchValue, lastSearchedTerm]);

  // Update search results
  const [searching, setSearching] = useState<boolean>(false);
  const getSearchItems = useCallback(async (searchText: string) => {
    if (searchText !== "") {
      const url = `/api/rowdata?search=${searchText}`;
      setSearching(true);
      const response = await fetch(url);
      if (response.status === 200) {
        setSearchResults((await response.json()).rows as RowDataRow[]);
      }
    } else {
      setSearchResults([]);
    }
    setSearching(false);
  }, []);
  useEffect(() => {
    if (lastSearchedTerm !== "") {
      getSearchItems(lastSearchedTerm);
    }
  }, [getSearchItems, lastSearchedTerm]);

  return (
    <>
      <div>
        <Label htmlFor="search" value="Search" />
        <TextInput
          id="search"
          sizing="md"
          type="text"
          value={currentSearchValue}
          autoFocus
          onChange={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setCurrentSearchValue(e.currentTarget.value);
          }}
        />
      </div>
      <div>
        {lastSearchedTerm !== "" && (
          <>
            {searching && (
              <div>
                <Spinner aria-label="Loading..." />
              </div>
            )}
            <h1 style={{ marginTop: "1rem" }} className="text-2xl">
              Search results for {lastSearchedTerm}
            </h1>
            {searchResults.map((item) => (
              <div key={item.id}>
                <ShowBreadcrumb id={item.id} item={item} />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};
