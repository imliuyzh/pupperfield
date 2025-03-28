import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { getDogBreeds } from "@/services/DogService/DogService";
import useSearchStateStore from "@/stores/SearchStateStore/SearchStateStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Dispatch, useEffect, useState } from "react";
import { Filter } from "react-feather";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
  isFilterOpened: boolean;
  setIsFilterOpened: Dispatch<boolean>;
};

const filterSchema = z.object({
  "breed": z.optional(z.string().min(1, { message: "breed needs to be at least 1 character long." })),
  "maxAge": z.union([z.undefined(), z.coerce.number().nonnegative({ message: "maxAge needs to be a number greater than or equal to zero." })]),
  "minAge": z.union([z.undefined(), z.coerce.number().nonnegative({ message: "minAge needs to be a number greater than or equal to zero." })]),
  "zipCode": z.optional(z.string().min(1, { message: "zipCode needs to be at least 1 character long." })),
});

export default function FilterPopover({ isFilterOpened, setIsFilterOpened }: Props) {
  const [breedList, setBreedList] = useState<string[]>([]);

  const breed = useSearchStateStore(state => state.breed),
    maxAge = useSearchStateStore(state => state.maxAge),
    minAge = useSearchStateStore(state => state.minAge),
    zipCode = useSearchStateStore(state => state.zipCode),
    setBreed = useSearchStateStore(state => state.setBreed),
    setFrom = useSearchStateStore(state => state.setFrom),
    setMaxAge = useSearchStateStore(state => state.setMaxAge),
    setMinAge = useSearchStateStore(state => state.setMinAge),
    setZipCode = useSearchStateStore(state => state.setZipCode);

  const form = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
    values: {
      "breed": breed ?? undefined,
      "maxAge": maxAge ?? undefined,
      "minAge": minAge ?? undefined,
      "zipCode": zipCode ?? undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof filterSchema>) => {
    console.log(values);
    if (values.breed !== undefined && values.breed.length > 0) {
      setBreed(values.breed);
      setFrom(0);
    } else {
      setBreed(null);
    }

    if (values.maxAge !== undefined && values.maxAge > -1) {
      setMaxAge(values.maxAge);
      setFrom(0);
    } else {
      setMaxAge(null);
    }

    if (values.minAge !== undefined && values.minAge > -1) {
      setMinAge(values.minAge);
      setFrom(0);
    } else {
      setMinAge(null);
    }

    if (values.zipCode !== undefined && values.zipCode.length > 0) {
      setZipCode(values.zipCode);
      setFrom(0);
    } else {
      setZipCode(null);
    }

    setIsFilterOpened(false);
  };

  useEffect(() => {
    getDogBreeds()
      .then(response => {
        if (response.breeds === null) {
          throw response.error;
        }
        setBreedList(response.breeds);
      })
      .catch((error: unknown) => {
        toast("Error", {
          description: "We can't load the breed list, please try later.",
        });
        console.error(error);
      });
  }, []);

  return (
    <Popover
      onOpenChange={(open) => {
        setIsFilterOpened(open);
      }}
      open={isFilterOpened}
    >
      <PopoverTrigger asChild>
        <Filter
          className="hover:cursor-pointer"
          color="black"
          onClick={() => {
            setIsFilterOpened(true);
          }}
          size={24}
        />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Form {...form}>
          <form
            className="flex flex-col gap-2"
            onSubmit={form.handleSubmit(onSubmit)}  // eslint-disable-line
          >
            <FormField
              control={form.control}
              name="breed"
              render={({ field: { onChange, ref, ...restField } }) => ( // eslint-disable-line
                <FormItem>
                  <Select
                    disabled={breedList.length <= 0}
                    onValueChange={onChange}
                    {...restField}
                  >
                    <FormControl>
                      <SelectTrigger className="border-[#27272a] border-1 w-full">
                        <SelectValue placeholder="Breed" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {breedList.map((breed) => (
                        <SelectItem
                          key={breed}
                          value={breed}
                        >
                          {breed}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="minAge"
                render={({ field: { ref, ...restField } }) => ( // eslint-disable-line
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[#27272a] border-1 w-full"
                        placeholder="Min Age"
                        {...restField}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxAge"
                render={({ field: { ref, ...restField } }) => ( // eslint-disable-line
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[#27272a] border-1 w-full"
                        placeholder="Max Age"
                        {...restField}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field: { ref, ...restField } }) => ( // eslint-disable-line
                <FormItem>
                  <FormControl>
                    <Input
                      className="border-[#27272a] border-1 w-full"
                      placeholder="Zip Code"
                      {...restField}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="bg-white text-black hover:cursor-pointer mt-2 rounded-none"
              type="submit"
            >
              Apply
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}