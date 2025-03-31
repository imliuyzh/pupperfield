import DogCard from "@/components/commons/DogCard/DogCard";
import type { Dog } from "@/types/Dog";
import { memo } from "react";

type Props = {
  addFavoriteDog: (id: Dog) => void;
  dogs: Dog[];
  favoriteDogs: Record<string, Dog>;
  removeFavoriteDog: (dogId: string) => void;
};

function _DogCardList({
  addFavoriteDog,
  dogs,
  favoriteDogs,
  removeFavoriteDog
}: Props) {
  return (
    <div className="flex flex-row flex-wrap gap-8 justify-between">
      {dogs.map((dog: Dog) => {
        return (
          <DogCard
            addFavoriteDog={addFavoriteDog}
            dog={dog}
            favoriteDogs={favoriteDogs}
            key={dog.id}
            removeFavoriteDog={removeFavoriteDog}
          />
        );
      })}
    </div>
  );
}

const DogCardList = memo(_DogCardList);

export default DogCardList;