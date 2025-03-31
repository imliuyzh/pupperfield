import {
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  Pagination as ShadcnPagination,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PageSize } from "@/features/Search/types/SearchState";
import type { Dispatch } from "react";

type Props = {
  cursor: number;
  pageSize: PageSize;
  total: number;
  setCursor: (newCursor: number) => void;
  setPageSize: Dispatch<PageSize>;
};

function Pagination({
  cursor,
  pageSize,
  total,
  setCursor,
  setPageSize
}: Props) {
  return (
    <>
      {total > 0 &&
        <ShadcnPagination>
          <PaginationContent>
            <PaginationItem>
              <Select
                defaultValue="25"
                value={pageSize.toString()}
                onValueChange={(value) => {
                  setCursor(0);
                  setPageSize(parseInt(value) as PageSize);
                }}
              >
                <SelectTrigger className="[&_svg:not([class*='text-'])]:text-black bg-transparent! border-none cursor-pointer mr-8 shadow-none text-black text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="25">25 Items</SelectItem>
                    <SelectItem value="50">50 Items</SelectItem>
                    <SelectItem value="75">75 Items</SelectItem>
                    <SelectItem value="100">100 Items</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </PaginationItem>
            {(cursor - pageSize) >= 0 && total > pageSize &&
              <PaginationItem>
                <PaginationPrevious
                  className="border-1 border-black dark:hover:bg-transparent dark:hover:text-black hover:cursor-pointer mr-2 text-black"
                  onClick={() => {
                    setCursor(cursor - pageSize);
                  }}
                />
              </PaginationItem>
            }
            {(cursor + pageSize) < total && total > pageSize &&
              <PaginationItem>
                <PaginationNext
                  className="border-1 border-black dark:hover:bg-transparent dark:hover:text-black hover:cursor-pointer ml-2 text-black"
                  onClick={() => {
                    setCursor(cursor + pageSize);
                  }}
                />
              </PaginationItem>
            }
          </PaginationContent>
        </ShadcnPagination>
      }
    </>
  );
}

export default Pagination;