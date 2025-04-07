import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  Pagination as ShadcnPagination,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  cursor: number;
  pageSize: PageSize;
  setCursor: (newCursor: number) => void;
  setPageSize: Dispatch<PageSize>;
  total: number;
};

export default function Pagination({
  cursor,
  pageSize,
  setCursor,
  setPageSize,
  total,
}: Props) {
  const [isFilterOpened, setIsFilterOpened] = useState<boolean>(false);
  return (
    <>
      {total > pageSize &&
        <ShadcnPagination>
          <PaginationContent className="flex justify-between w-full">
            <PaginationItem>
              <Select
                defaultValue="25"
                onValueChange={(value) => {
                  setCursor(0);
                  setPageSize(parseInt(value) as PageSize);
                }}
                value={pageSize.toString()}
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
            <div className="flex flex-row gap-2 items-center">
              <PaginationItem>
                <Popover
                  onOpenChange={(open) => {
                    setIsFilterOpened(open);
                  }}
                  open={isFilterOpened}
                >
                  <PopoverTrigger className="focus-visible:outline-none">
                    <Label
                      className="focus-visible:outline-none hover:cursor-pointer hover:decoration-dotted hover:underline pr-2 text-black"
                      onMouseOver={() => {
                        setIsFilterOpened(true);
                      }}
                    >
                      {Math.ceil(cursor / pageSize) + 1} (out of {Math.ceil(total / pageSize)})
                    </Label>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-14">
                    <Input
                      className="text-white"
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          const value = parseInt(event.currentTarget.value);
                          if (value > 0 && value <= Math.ceil(total / pageSize)) {
                            setCursor(pageSize * (value - 1));
                            setIsFilterOpened(false);
                          } else {
                            toast.error("Please provide a valid page number.");
                          }
                        }
                      }}
                      placeholder={(Math.ceil(cursor / pageSize) + 1).toString()}
                      type="number"
                    />
                  </PopoverContent>
                </Popover>
              </PaginationItem>
              {(cursor - pageSize) >= 0 &&
                <PaginationItem>
                  <PaginationPrevious
                    className="border-1 border-black dark:hover:bg-transparent dark:hover:text-black hover:cursor-pointer mr-2 text-black"
                    onClick={() => {
                      setCursor(cursor - pageSize);
                    }}
                  />
                </PaginationItem>
              }
              {(cursor + pageSize) < total &&
                <PaginationItem>
                  <PaginationNext
                    className="border-1 border-black dark:hover:bg-transparent dark:hover:text-black hover:cursor-pointer ml-2 text-black"
                    onClick={() => {
                      setCursor(cursor + pageSize);
                    }}
                  />
                </PaginationItem>
              }
            </div>
          </PaginationContent>
        </ShadcnPagination>
      }
    </>
  );
}