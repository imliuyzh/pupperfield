import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dog } from "@/types/Dog";
import { MapPin, Zap } from "react-feather";

type Prop = {
  match: Dog | null,
  setMatch: React.Dispatch<Dog | null>,
};


export default function MatchDialog({ match, setMatch }: Prop) {
  const onOpenChange = (open: boolean) => {
    if (open === false) {
      setMatch(null);
    }
  };

  if (match === null) {
    return <></>;
  }
  return (
    <Dialog onOpenChange={onOpenChange} open={true}>
      <DialogContent className="bg-black max-h-[600px] text-white max-w-[600px]">
        <img alt={match.name} className="max-h-[400px] mt-6 max-w-[400px]" src={match.img} />
        <DialogHeader className="mt-2">
          <DialogTitle>{match.name}</DialogTitle>
          <DialogDescription>
            <span className="block">{`${match.age.toString()} Year(s) Old`}</span>
            <div className="flex gap-4 mt-6">
              <Badge className="bg-transparent border-none p-0 text-white" key={crypto.randomUUID()}>
                <Zap color="white" size={20} />
                {match.breed}
              </Badge>
              <Badge className="bg-transparent border-none p-0 text-white" key={crypto.randomUUID()}>
                <MapPin color="white" size={20} />
                {match.zip_code}
              </Badge>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}