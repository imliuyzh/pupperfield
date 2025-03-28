import DogCardList from "@/components/DogCardList/DogCardList";
import FilterPopover from "@/components/FilterPopover/FilterPopover";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import PupperfieldPagination from "@/components/PupperfieldPagination/PupperfieldPagination";
import SortGroup from "@/components/SortGroup/SortGroup";
import { getDogs, searchDogs } from "@/services/DogService/DogService";
import useSearchStateStore from "@/stores/SearchStateStore/SearchStateStore";
import useUserStore from "@/stores/UserStore/UserStore";
import type { Dog, DogInfoResponse, DogSearchRequest, DogSearchResponse } from "@/types/Dog";
import { PageSize } from "@/types/SearchState";
import React from "react";
import { Loader, RefreshCcw } from "react-feather";
import { toast } from "sonner";
import { Redirect } from "wouter";

export default function HomePage() {
  const [pageSize, setPageSize] = React.useState<PageSize>("25"),
    [loading, setLoading] = React.useState<boolean>(false),
    [resultList, setResultList] = React.useState<Dog[]>([]),
    [isFilterOpened, setIsFilterOpened] = React.useState<boolean>(false);

  const email = useUserStore(state => state.email),
    name = useUserStore(state => state.name);

  const breed = useSearchStateStore(state => state.breed),
    from = useSearchStateStore(state => state.from),
    maxAge = useSearchStateStore(state => state.maxAge),
    minAge = useSearchStateStore(state => state.minAge),
    size = useSearchStateStore(state => state.size),
    sortField = useSearchStateStore(state => state.sortField),
    sortOrder = useSearchStateStore(state => state.sortOrder),
    zipCode = useSearchStateStore(state => state.zipCode),
    setFrom = useSearchStateStore(state => state.setFrom),
    setResultSize = useSearchStateStore(state => state.setSize),
    resetSearchState = useSearchStateStore(state => state.resetSearchState);

  const createDogSearchRequest = (): DogSearchRequest => {
    const payload: DogSearchRequest = {
      from,
      size: parseInt(pageSize),
      sort: `${sortField}:${sortOrder}`,
    };
    if (breed !== null && breed.length > 0) {
      payload.breeds = [breed];
    }
    if (maxAge !== null && maxAge > -1) {
      payload.ageMax = maxAge;
    }
    if (minAge !== null && minAge > -1) {
      payload.ageMin = minAge;
    }
    if (zipCode !== null && zipCode.length > 0) {
      payload.zipCodes = [zipCode];
    }
    return payload;
  };

  React.useEffect(() => {
    if (email !== null && name !== null) {
      setLoading(true);
      searchDogs(createDogSearchRequest())
        .then((searchResponse: DogSearchResponse) => {
          if ("error" in searchResponse) {
            throw searchResponse.error;
          }
          setResultSize(searchResponse.result!.total);
          return getDogs(searchResponse.result!.resultIds);
        })
        .then((dogInfoResponse: DogInfoResponse) => {
          if ("error" in dogInfoResponse) {
            throw dogInfoResponse.error;
          }
          setResultList(dogInfoResponse.dogs!);
          setLoading(false);
        })
        .catch((error: unknown) => {
          console.error(error);
          toast("Error", {
            description: "We can't load the search result, please try again.",
          });
        });
    }
  }, [breed, from, maxAge, minAge, pageSize, sortField, sortOrder, zipCode]);

  if (email === null || name === null) {
    return <Redirect replace to="/login" />;
  }

  return (
    <div className="m-auto w-[64vw]">
      <Header showFavorites />
      <aside className="flex gap-18 items-center justify-between mt-36">
        <SortGroup />
        <div className="flex gap-8 items-center">
          <FilterPopover
            isFilterOpened={isFilterOpened}
            setIsFilterOpened={setIsFilterOpened}
          />
          <RefreshCcw
            className="cursor-pointer"
            color="black"
            onClick={() => {
              resetSearchState();
            }}
            size={18}
          />
        </div>
      </aside>
      <main className="mt-20">
        {loading &&
          <div className="flex gap-12 place-content-center text-black w-full">
            <Loader className="animate-spin" color="black" size={32} />
            <span>Loading...</span>
          </div>
        }
        {loading == false && resultList.length <= 0 &&
          <h1 className="flex place-content-center tagline text-black">
            :-(
          </h1>
        }
        {loading == false && resultList.length > 0 && <DogCardList dogs={resultList} />}
      </main>
      <div className="mt-20">
        <PupperfieldPagination
          cursor={from}
          pageSize={pageSize}
          total={size}
          setCursor={setFrom}
          setPageSize={setPageSize}
        />
      </div>
      <div className="mb-[2rem] mt-24">
        <Footer />
      </div>
    </div>
  );
}