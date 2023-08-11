"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "./_context/AppContextProvider";
import { RowDataRow } from "./api/rowdata/RowDataRow";
import _ from "lodash";
import { ShowBreadcrumb } from "./ShowBreadcrumb";

export const Search = () => {
  const appContext = useContext(AppContext);

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
      const response = await fetch(url);
      if (response.status === 200) {
        setSearchResults((await response.json()).rows as RowDataRow[]);
      }
    } else {
      setSearchResults([]);
    }
  }, []);
  useEffect(() => {
    if (lastSearchedTerm !== "") {
      getSearchItems(lastSearchedTerm);
    }
  }, [getSearchItems, lastSearchedTerm]);

  return (
    <div>
      <div>
        <span style={{ marginRight: "0.25rem" }}>Search:</span>
        <input
          value={currentSearchValue}
          onChange={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setCurrentSearchValue(e.currentTarget.value);
          }}
        />
      </div>
      {lastSearchedTerm !== "" && (
        <>
          <h5 style={{ marginTop: "1rem" }}>
            Search results for {lastSearchedTerm}
          </h5>
          {searchResults.map((item) => (
            <div key={item.id}>
              <ShowBreadcrumb id={item.id} item={item} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};
