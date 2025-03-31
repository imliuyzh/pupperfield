import DogCardList from "@/components/commons/DogCardList/DogCardList";
import Footer from "@/components/commons/Footer/Footer";
import Header from "@/components/commons/Header/Header";
import useFavoritesStore from "@/features/Favorites/stores/FavoritesStore";
import { getDogs, searchDogs } from "@/features/Search/api/DogService";
import FilterPopover from "@/features/Search/components/FilterPopover/FilterPopover";
import Pagination from "@/features/Search/components/Pagination/Pagination";
import SortGroup from "@/features/Search/components/SortGroup/SortGroup";
import useSearchStateStore from "@/features/Search/stores/SearchStateStore";
import type {
  DogInfoResponse,
  DogSearchRequest,
  DogSearchResponse
} from "@/features/Search/types/Search";
import useUserStore from "@/stores/UserStore";
import type { Dog } from "@/types/Dog";
import { useCallback, useEffect, useState } from "react";
import { Loader, RefreshCcw } from "react-feather";
import { toast } from "sonner";

export default function HomePage() {
  const [loading, setLoading] = useState<boolean>(false),
    [resultList, setResultList] = useState<Dog[]>([]),
    [totalResult, setTotalResult] = useState<number>(0),
    [isFilterOpened, setIsFilterOpened] = useState<boolean>(false),
    [isFormReset, setIsFormReset] = useState<boolean>(false);

  const email = useUserStore(state => state.email),
    name = useUserStore(state => state.name);

  const favoriteDogs = useFavoritesStore(state => state.favoriteDogs),
    addFavoriteDog = useFavoritesStore(useCallback(state => state.addFavoriteDog, [])),
    removeFavoriteDog = useFavoritesStore(useCallback(state => state.removeFavoriteDog, [])),
    resetFavoriteDogs = useFavoritesStore(useCallback(state => state.resetFavoriteDogs, []));

  const breed = useSearchStateStore(state => state.breed),
    from = useSearchStateStore(state => state.from),
    maxAge = useSearchStateStore(state => state.maxAge),
    minAge = useSearchStateStore(state => state.minAge),
    pageSize = useSearchStateStore(state => state.size),
    sortField = useSearchStateStore(state => state.sortField),
    sortOrder = useSearchStateStore(state => state.sortOrder),
    zipCode = useSearchStateStore(state => state.zipCode),
    setFrom = useSearchStateStore(state => state.setFrom),
    setPageSize = useSearchStateStore(state => state.setSize),
    resetSearchState = useSearchStateStore(state => state.resetSearchState);

  const createDogSearchRequest = (): DogSearchRequest => {
    const payload: DogSearchRequest = {
      from,
      size: pageSize,
      sort: `${sortField}:${sortOrder}`,
    };
    if (breed !== null && breed.length > 0) {
      payload.breeds = [breed];
    }
    if (maxAge > -1) {
      payload.ageMax = maxAge;
    }
    if (minAge > -1) {
      payload.ageMin = minAge;
    }
    if (zipCode !== null && zipCode.length > 0) {
      payload.zipCodes = [zipCode];
    }
    return payload;
  };

  useEffect(() => {
    if (email !== null && name !== null) {
      setLoading(true);
      searchDogs(createDogSearchRequest())
        .then((searchResponse: DogSearchResponse) => {
          if ("error" in searchResponse) {
            throw searchResponse.error;
          }
          setTotalResult(searchResponse.result!.total);
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

  return (
    <div className="m-auto w-[64vw]">
      <Header
        showFavorites
        resetFavoriteDogs={resetFavoriteDogs}
        resetSearchState={resetSearchState}
      />
      <aside className="flex gap-18 items-center justify-between mt-36">
        <SortGroup />
        <div className="flex gap-8 items-center">
          <FilterPopover
            isFilterOpened={isFilterOpened}
            isFormReset={isFormReset}
            setIsFilterOpened={setIsFilterOpened}
            setIsFormReset={setIsFormReset}
          />
          <RefreshCcw
            className="cursor-pointer"
            color="black"
            onClick={() => {
              resetSearchState();
              setIsFormReset(true);
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
        {loading == false && resultList.length > 0 &&
          <DogCardList
            addFavoriteDog={addFavoriteDog}
            dogs={resultList}
            favoriteDogs={favoriteDogs}
            removeFavoriteDog={removeFavoriteDog}
          />
        }
      </main>
      <div className="mt-20">
        <Pagination
          cursor={from}
          pageSize={pageSize}
          total={totalResult}
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