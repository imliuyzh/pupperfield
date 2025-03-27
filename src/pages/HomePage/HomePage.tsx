import DogCard from "@/components/DogCard/DogCard";
import FilterPopover from "@/components/FilterPopover/FilterPopover";
import Header from "@/components/Header/Header";
import SortGroup from "@/components/SortGroup/SortGroup";
import useUserStore from "@/stores/UserStore/UserStore";
import type { Dog } from "@/types/Dog";
import React from "react";
import { RefreshCcw } from "react-feather";
import { Redirect } from "wouter";
import useSearchStateStore from "@/stores/SearchStateStore/SearchStateStore";

export default function HomePage() {
  const [searchResults, setSearchResults] = React.useState<Dog[]>([]),
    [isFilterOpened, setIsFilterOpened] = React.useState<boolean>(false);
  const email = useUserStore(state => state.email), name = useUserStore(state => state.name);
  const resetSearchState = useSearchStateStore(state => state.resetSearchState);

  if (email === null || name === null) {
    return <Redirect replace to="/login" />;
  }

  return (
    <div className="ml-[18vw] mr-[18vw]">
      <Header showFavorites />
      <aside className="flex items-center justify-between mt-36">
        <FilterPopover
          isFilterOpened={isFilterOpened}
          setIsFilterOpened={setIsFilterOpened}
        />
        <div className="flex gap-4 items-center">
          <RefreshCcw
            className="cursor-pointer"
            color="black"
            onClick={() => {
              resetSearchState();
            }}
            size={18}
          />
          <SortGroup />
        </div>
        
      </aside>
      <main className="mt-8">
        {searchResults.map((dog: Dog) => <DogCard dog={dog} key={crypto.randomUUID()} />)}
      </main>
    </div>
  );
}