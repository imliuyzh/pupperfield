import DogCardList from "@/components/DogCardList/DogCardList";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import MatchDialog from "@/components/MatchDialog/MatchDialog";
import { Button } from "@/components/ui/button";
import useDogStore from "@/stores/DogStore/DogStore";
import useUserStore from "@/stores/UserStore/UserStore";
import { Dog } from "@/types/Dog";
import { getDogMatch } from "@services/DogService/DogService";
import React from "react";
import { toast } from "sonner";
import { Redirect } from "wouter";

export default function FavoritesPage() {
  const [match, setMatch] = React.useState<Dog | null>(null);
  const email = useUserStore(state => state.email), name = useUserStore(state => state.name);
  const favoriteDogs = useDogStore(state => state.favoriteDogs), resetFavoriteDogs = useDogStore(state => state.resetFavoriteDogs);

  const getAMatch = async () => {
    const response = await getDogMatch(Object.keys(favoriteDogs));
    if ("error" in response) {
      console.error(response.error);
      toast("Error", {
        description: "We encountered an unknown error, please try again.",
      });
    } else {
      if (response.match !== null) {
        setMatch(favoriteDogs[response.match]); 
      } else {
        console.error("A match could not be generated.");
      }
    }
  };

  if (email === null || name === null) {
    return <Redirect replace to="/login" />;
  }

  return (
    <div className="ml-[18vw] mr-[18vw]">
      <Header showHome />
      <main>
        {Object.keys(favoriteDogs).length <= 0 &&
          <h1 className="tagline text-[min(144px,8rem)]/[max(136px,6rem)] text-black tracking-[-8px]">
            Please mark more puppies as your favorites!
          </h1>
        }
        {Object.keys(favoriteDogs).length > 0 &&
          <div className="mt-20">
            <DogCardList dogs={Object.values(favoriteDogs)} />
            <div className="flex gap-4 mt-32">
              <Button
                className="bg-black text-white hover:bg-black hover:cursor-pointer hover:text-[var(--background)] rounded-none"
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