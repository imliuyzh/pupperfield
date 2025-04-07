import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Dog } from "@/types/Dog";
import type { Dispatch } from "react";
import { MapPin, Zap } from "react-feather";

type Props = {
  match: Dog | null;
  setMatch: Dispatch<Dog | null>;
};

export default function MatchDialog({ match, setMatch }: Props) {
  const onOpenChange = (open: boolean) => {
    if (open === false) {
      setMatch(null);
    }
  };

  return (
    <>
      {match !== null &&
        <Dialog onOpenChange={onOpenChange} open={true}>
          <DialogContent className="bg-black max-h-[600px] text-white max-w-[600px]">
            <img
              alt={match.name}
              className="max-h-[400px] mt-6 max-w-[400px]"
              src={match.img}
            />
            <DialogHeader className="mt-2">
              <DialogTitle>{match.name}</DialogTitle>
              <DialogDescription>
                <span>
                  {match.age.toString()} {(match.age > 1) ? "Years" : "Year"}
                </span>
                <span className="flex gap-4 mt-6">
                  <Badge
                    className="bg-transparent border-none p-0 text-white"
                    key={crypto.randomUUID()}
                  >
                    <Zap color="white" size={20} />
                    {match.breed}
                  </Badge>
                  <Badge
                    className="bg-transparent border-none p-0 text-white"
                    key={crypto.randomUUID()}
                  >
                    <MapPin color="white" size={20} />
                    {match.zip_code}
                  </Badge>
                </span>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      }
    </>
  );
}