"use client";

import { statusOptions, categoryOptions } from "../../util/commonUtils";
import { SelectInputSearch } from "../common/SelectInput";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const createPageURL = (e: ChangeEvent<HTMLSelectElement>) => {
    const name: string = e.target.name;
    const value: string = e.target.value;
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <form className="mt-1 w-fit inline-block">
      <label>
        Név:
        <input
          type="text"
          name="query"
          className="border focused-input ml-2"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("query")?.toString()}
        />
        <SelectInputSearch
          label="Státusz"
          options={statusOptions}
          name="status"
          emptyField
          onChange={createPageURL}
        />
        <SelectInputSearch
          label="Kategória"
          options={categoryOptions}
          name="category"
          emptyField
          onChange={createPageURL}
        />
      </label>
    </form>
  );
}
