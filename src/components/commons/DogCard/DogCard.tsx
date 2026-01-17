import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Dog } from "@/types/Dog";
import { MapPin, Star, Zap } from "react-feather";

type Props = {
  addFavoriteDog: (id: Dog) => void;
  dog: Dog;
  favoriteDogs: Record<string, Dog>;
  key: string;
  removeFavoriteDog: (dogId: string) => void;
};

export default function DogCard({
  addFavoriteDog,
  dog,
  favoriteDogs,
  removeFavoriteDog
}: Props) {
  return (
    <Card className="bg-transparent border-none break-inside-avoid gap-0 inline-block py-0 rounded-none shadow-none w-[300px]">
      <CardContent className="px-0">
        <img
          alt={dog.name}
          className="w-[300px]"
          loading="lazy"
          src={dog.img}
        />
      </CardContent>
      <CardHeader className="bg-black flex gap-6 items-center justify-between py-6 text-white">
        <div>
          {dog.id in favoriteDogs &&
            <Star
              className="fill-(--background) hover:cursor-pointer text-(--background)"
              data-testid="remove-favorite-button"
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
              data-testid="add-favorite-button"
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
              {dog.age.toString()} {(dog.age > 1) ? "Years" : "Year"}
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