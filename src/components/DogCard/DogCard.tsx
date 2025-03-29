import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useDogStore from "@/stores/DogStore/DogStore";
import type { Dog } from "@/types/Dog";
import { MapPin, Star, Zap } from "react-feather";

type Props = {
  dog: Dog;
  key: string;
};

export default function DogCard({ dog }: Props) {
  const favoriteDogs = useDogStore(state => state.favoriteDogs),
    addFavoriteDog = useDogStore(state => state.addFavoriteDog),
    removeFavoriteDog = useDogStore(state => state.removeFavoriteDog);

  return (
    <Card className="bg-transparent border-none break-inside-avoid gap-0 inline-block py-0 rounded-none shadow-none w-[380px]">
      <CardContent className="px-0">
        <img
          alt={dog.name}
          className="w-[380px]"
          loading="lazy"
          src={dog.img}
        />
      </CardContent>
      <CardHeader className="bg-black flex gap-6 items-center justify-between py-6 text-white">
        <div>
          {dog.id in favoriteDogs &&
            <Star
              className="fill-(--background) hover:cursor-pointer text-[var(--background)]"
              onClick={() => {
                removeFavoriteDog(dog.id);
              }}
              size={24}
            />
          }
          {(dog.id in favoriteDogs) === false &&
            <Star
              className="hover:cursor-pointer"
              color="white"
              onClick={() => {
                addFavoriteDog(dog);
              }}
              size={24}
            />
          }
        </div>
        <div className="flex flex-col gap-2 items-end min-w-0 text-right truncate">
          <CardTitle>{dog.name}</CardTitle>
          <CardDescription>
            <span className="block">
              {`${dog.age.toString()} Year(s) Old`}
            </span>
            <div className="flex gap-4 mt-6">
              <Badge
                className="bg-transparent border-none p-0 text-white"
                key={crypto.randomUUID()}
              >
                <Zap color="white" size={20} />
                {dog.breed}
              </Badge>
              <Badge
                className="bg-transparent border-none p-0 text-white"
                key={crypto.randomUUID()}
              >
                <MapPin color="white" size={20} />
                {dog.zip_code}
              </Badge>
            </div>
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}