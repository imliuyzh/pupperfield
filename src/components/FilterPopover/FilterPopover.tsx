import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getDogBreeds } from "@/services/DogService/DogService";
import useSearchStateStore from "@/stores/SearchStateStore/SearchStateStore";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Filter } from "react-feather";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Skeleton } from "../ui/skeleton";

type Prop = {
  isFilterOpened: boolean,
  setIsFilterOpened: React.Dispatch<boolean>,
};

const filterSchema = z
  .object({
    "breed": z.string().optional(),
    "maxAge": z.number().nonnegative({ message: "maxAge needs to be a number greater than or equal to zero." }).optional(),
    "minAge": z.number().nonnegative({ message: "minAge needs to be a number greater than or equal to zero." }).optional(),
    "zipCode": z.string().optional(),
  })
  .refine((data) => Object.values(data).some((value: string | number | undefined) => value !== undefined), {
    message: 'At least one field must be non-empty.',
  });

export default function FilterPopover({ isFilterOpened, setIsFilterOpened }: Prop) {
  const [breedList, setBreedList] = React.useState<string[]>([]);

  const form = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
  });

  React.useEffect(() => {
    getDogBreeds()
      .then(response => {
        if (response.breeds === null) {
          throw response.error;
        }
        setBreedList(response.breeds);
      })
      .catch((error: unknown) => {
        toast("Error", {
          description: "We can't load the breed list, please try again.",
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
        <div>
          <div className="block">
            <h4 className="font-medium leading-none">Filter</h4>
          </div>
          <Form {...form}>
            <form
              className="flex flex-col gap-4 mt-8"
              // onSubmit={form.handleSubmit(async (values) => handleSearch(values))}  // eslint-disable-line
            >
              <FormField
                control={form.control}
                name="breed"
                render={({ field: { ref, ...restField } }) => ( // eslint-disable-line
                  <FormItem>
                    <FormLabel>Breed</FormLabel>
                    {breedList.length <= 0 &&
                      <div className="flex flex-col gap-1">
                        <Skeleton className="h-3 rounded-3xl w-full" />
                        <Skeleton className="h-3 rounded-3xl w-full" />
                      </div>
                    }
                    {breedList.length > 0 &&
                      <Select>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {breedList.map((breed) => (
                            <SelectItem key={breed} value={breed}>{breed}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    }
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
                      <FormLabel>Min Age</FormLabel>
                      <FormControl>
                        <Input className="w-full" type="number" {...restField} />
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
                      <FormLabel>Max Age</FormLabel>
                      <FormControl>
                        <Input className="w-full" type="number" {...restField} />
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
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...restField} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="bg-black text-white hover:bg-black hover:cursor-pointer hover:text-[var(--background)] rounded-none"
                type="submit"
              >
                Apply
              </Button>
            </form>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
}


/*
              <FormField
                control={form.control}
                name="breeds"
                render={({ field: { ref, ...restField } }) => ( // eslint-disable-line
                  <FormItem>
                    <FormLabel>Breeds</FormLabel>
                    <FormControl>
                      <AsyncSelect
                        cacheOptions
                        isMulti
                        loadOptions={loadBreeds}
                        noOptionsMessage={() => "No matches."}
                      />
                    </FormControl>
                    <FormMessage className="italic text-black" />
                  </FormItem>
                )}
              />

  const addBreed = useSearchStateStore(state => state.addBreed),
    removeBreed = useSearchStateStore(state => state.removeBreed),
    setMaxAge = useSearchStateStore(state => state.setMaxAge),
    setMinAge = useSearchStateStore(state => state.setMinAge),
    addZipCode = useSearchStateStore(state => state.addZipCode),
    removeZipCode = useSearchStateStore(state => state.removeZipCode),
    resetSearchState = useSearchStateStore(state => state.resetSearchState);
*/