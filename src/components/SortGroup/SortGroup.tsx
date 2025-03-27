import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSearchStateStore from "@/stores/SearchStateStore/SearchStateStore";
import { ArrowDown, ArrowUp } from "react-feather";

export default function SortGroup() {
  const sortField = useSearchStateStore(state => state.sortField),
    sortOrder = useSearchStateStore(state => state.sortOrder),
    setSortField = useSearchStateStore(state => state.setSortField),
    setSortOrder = useSearchStateStore(state => state.setSortOrder);

  return (
    <div className="flex items-center">
      <Select
        defaultValue="breed"
        value={sortField}
        onValueChange={(value: "age" | "breed" | "name") => {
          setSortField(value);
        }}
      >
        <SelectTrigger className="[&_svg:not([class*='text-'])]:text-black bg-transparent! border-none cursor-pointer shadow-none text-black text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-none">
          <SelectGroup>
            <SelectItem value="age">Age</SelectItem>
            <SelectItem value="breed">Breed</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {sortOrder === "asc" &&
        <ArrowUp
          className="hover:cursor-pointer"
          color="black"
          onClick={() => {
            setSortOrder("desc");
          }}
          size={18}
        />
      }
      {sortOrder === "desc" &&
        <ArrowDown
          className="hover:cursor-pointer"
          color="black"
          onClick={() => {
            setSortOrder("asc");
          }}
          size={18}
        />
      }
    </div>
  );
}