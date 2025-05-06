import DogCardList from "@/components/commons/DogCardList/DogCardList";
import Footer from "@/components/commons/Footer/Footer";
import Header from "@/components/commons/Header/Header";
import { Button } from "@/components/ui/button";
import { getDogMatch } from "@/features/Favorites/api/MatchService";
import MatchDialog from "@/features/Favorites/components/MatchDialog/MatchDialog";
import useFavoritesStore from "@/features/Favorites/stores/FavoritesStore";
import useSearchStateStore from "@/features/Search/stores/SearchStateStore";
import type { Dog } from "@/types/Dog";
import { useState } from "react";
import { toast } from "sonner";

export default function FavoritesPage() {
  const [match, setMatch] = useState<Dog | null>(null);
  const {
    addFavoriteDog,
    favoriteDogs,
    removeFavoriteDog,
    resetFavoriteDogs
  } = useFavoritesStore();
  const resetSearchState = useSearchStateStore(state => state.resetSearchState);

  /**
   * Request a match from the server and handle the response.
   */
  const getAMatch = async () => {
    const response = await getDogMatch(Object.keys(favoriteDogs));
    if ("error" in response) {
      console.error(response.error);
      toast.error("We encountered an unknown error, please try again.");
    } else {
      if (response.match !== null) {
        setMatch(favoriteDogs[response.match]);
      } else {
        console.error("A match could not be generated.");
        toast.error("A match could not be generated.");
      }
    }
  };

  return (
    <div className="m-auto w-[64vw]">
      <Header
        showHome
        resetFavoriteDogs={resetFavoriteDogs}
        resetSearchState={resetSearchState}
      />
      <main>
        {Object.keys(favoriteDogs).length <= 0 &&
          <h1 className="tagline text-[min(144px,8rem)]/[max(136px,6rem)] text-black tracking-[-8px]">
            Please mark more puppies as your favorites!
          </h1>
        }
        {Object.keys(favoriteDogs).length > 0 &&
          <div className="mt-20">
            <DogCardList
              addFavoriteDog={addFavoriteDog}
              dogs={Object.values(favoriteDogs)}
              favoriteDogs={favoriteDogs}
              removeFavoriteDog={removeFavoriteDog}
            />
            <div className="flex gap-4 mt-32">
              <Button
                className="bg-black text-white hover:bg-black hover:cursor-pointer hover:text-(--background) rounded-none"
                onClick={async () => await getAMatch()} // eslint-disable-line
              >
                Match
              </Button>
              <Button
                className="dark:bg-transparent dark:hover:bg-transparent hover:cursor-pointer hover:text-black rounded-none text-black"
                onClick={resetFavoriteDogs}
                variant="outline"
              >
                Clear
              </Button>
            </div>
            <MatchDialog match={match} setMatch={setMatch} />
          </div>
        }
      </main>
      <div className="mb-[2rem] mt-24">
        <Footer />
      </div>
    </div>
  );
}