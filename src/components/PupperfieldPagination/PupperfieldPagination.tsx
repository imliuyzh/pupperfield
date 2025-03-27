import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageSize } from "@/types/SearchState";
import React from "react";

type Prop = {
  cursor: number,
  pageSize: PageSize,
  total: number,
  setCursor: (newCursor: number) => void,
  setPageSize: React.Dispatch<PageSize>,
};

function PupperfieldPagination({
  cursor,
  pageSize,
  total,
  setCursor,
  setPageSize
}: Prop) {
  return (
    <>
      {total > 0 &&
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Select
                defaultValue="25"
                value={pageSize}
                onValueChange={(value) => {
                  setCursor(0);
                  setPageSize(value as PageSize);
                }}
              >
                <SelectTrigger className="[&_svg:not([class*='text-'])]:text-black bg-transparent! border-none cursor-pointer mr-8 shadow-none text-black text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectGroup>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="75">75</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </PaginationItem>
            {(cursor - parseInt(pageSize)) >= 0 && total > parseInt(pageSize) &&
              <PaginationItem>
                <PaginationPrevious
                  className="border-1 border-black dark:hover:bg-transparent dark:hover:text-black hover:cursor-pointer mr-2 text-black"
                  onClick={() => {
                    setCursor(cursor - parseInt(pageSize));
                  }}
                />
              </PaginationItem>
            }
            {(cursor + parseInt(pageSize)) <= total && total > parseInt(pageSize) &&
              <PaginationItem>
                <PaginationNext
                  className="border-1 border-black dark:hover:bg-transparent dark:hover:text-black hover:cursor-pointer ml-2 text-black"
                  onClick={() => {
                    setCursor(cursor + parseInt(pageSize));
                  }}
                />
              </PaginationItem>
            }
          </PaginationContent>
        </Pagination>
      }
    </>
  );
}

export default PupperfieldPagination;