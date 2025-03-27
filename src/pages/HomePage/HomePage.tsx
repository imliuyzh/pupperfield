import Header from "@/components/Header/Header";
import useUserStore from "@/stores/UserStore/UserStore";
import React from "react";
import { Redirect } from "wouter";

export default function HomePage() {
  const [breeds, setBreeds] = React.useState<string[]>([]),
    [zipCodes, setZipCodes] = React.useState<string[]>([]),
    [minAge, setMinAge] = React.useState<number>(-1),
    [maxAge, setMaxAge] = React.useState<number>(-1),
    [size, setSize] = React.useState<25 | 50 | 75 | 100>(25),
    [cursor, setCursor] = React.useState<number>(0),
    [sortField, setSortField] = React.useState<"age" | "breed" | "name">("breed"),
    [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc"),
    [isFilterModalOpened, setIsFilterModalOpened] = React.useState<boolean>(false);
  const email = useUserStore(state => state.email), name = useUserStore(state => state.name);

  const handleSearch = async () => {
    const payload = {
      from: cursor,
      size,
      sort: `${sortField}:${sortOrder}`,
      ageMax: maxAge,
      ageMin: minAge,
      breeds,
      zipCodes,
    };
  };

  if (email === null || name === null) {
    return <Redirect replace to="/login" />;
  }

  return (
    <div className="ml-[18vw] mr-[18vw]">
      <Header showFavorites />
    </div>
  );
}