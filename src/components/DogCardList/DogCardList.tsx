import DogCard from "@/components/DogCard/DogCard";
import type { Dog } from "@/types/Dog";
import { memo } from "react";

function _DogCardList({ dogs }: { dogs: Dog[] }) {
  return (
    <div className="flex flex-row flex-wrap gap-8 justify-between">
      {dogs.map((dog: Dog) => <DogCard dog={dog} key={crypto.randomUUID()} />)}
    </div>
  );
}

const DogCardList = memo(_DogCardList);

export default DogCardList;