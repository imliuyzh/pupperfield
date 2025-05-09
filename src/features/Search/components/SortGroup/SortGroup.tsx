import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSearchStateStore from "@/features/Search/stores/SearchStateStore";
import type { SortField } from "@/features/Search/types/SearchState";
import { ArrowDown, ArrowUp } from "react-feather";

export default function SortGroup() {
  const sortField = useSearchStateStore(state => state.sortField),
    sortOrder = useSearchStateStore(state => state.sortOrder),
    setFrom = useSearchStateStore(state => state.setFrom),
    setSortField = useSearchStateStore(state => state.setSortField),
    setSortOrder = useSearchStateStore(state => state.setSortOrder);

  return (
    <div className="flex items-center">
      <Select
        defaultValue="breed"
        value={sortField}
        onValueChange={(value: SortField) => {
          setSortField(value);
          setFrom(0);
        }}
      >
        <SelectTrigger
          className="[&_svg:not([class*='text-'])]:text-black bg-transparent! border-none cursor-pointer shadow-none text-black text-sm"
          data-testid="sort-selector"
        >
          <SelectValue data-testid="sort-field" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem data-testid="sort-age" value="age">Age</SelectItem>
            <SelectItem data-testid="sort-breed" value="breed">Breed</SelectItem>
            <SelectItem data-testid="sort-name" value="name">Name</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {sortOrder === "asc" &&
        <ArrowUp
          className="hover:cursor-pointer"
          color="black"
          data-testid="sort-desc"
          onClick={() => {
            setSortOrder("desc");
            setFrom(0);
          }}
          size={18}
        />
      }
      {sortOrder === "desc" &&
        <ArrowDown
          className="hover:cursor-pointer"
          color="black"
          data-testid="sort-asc"
          onClick={() => {
            setSortOrder("asc");
            setFrom(0);
          }}
          size={18}
        />
      }
    </div>
  );
}