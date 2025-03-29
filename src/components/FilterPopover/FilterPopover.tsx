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
import { CheckSquare, Filter } from "react-feather";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
  isFilterOpened: boolean;
  isFormReset: boolean;
  setIsFilterOpened: Dispatch<boolean>;
  setIsFormReset: Dispatch<boolean>;
};

const filterSchema = z
  .object({
    "breed": z.union([
      z.undefined(),
      z.string().length(0),
      z.string().min(1, { message: "Breed needs to be at least 1 character long." })
    ]),
    "maxAge": z.union([
      z.undefined(),
      z.string().length(0, { message: "Max age needs to be a number or leave it empty." }),
      z.coerce.number().nonnegative({ message: "Max age needs to be a number greater than or equal to zero." })
    ]),
    "minAge": z.union([
      z.undefined(),
      z.string().length(0, { message: "Min age needs to be a number or leave it empty." }),
      z.coerce.number().nonnegative({ message: "Min age needs to be a number greater than or equal to zero." })
    ]),
    "zipCode": z.union([
      z.undefined(),
      z.string().length(0),
      z.string().min(1, { message: "Zip code needs to be at least 1 character long." })
    ]),
  });

export default function FilterPopover({
  isFilterOpened,
  isFormReset,
  setIsFilterOpened,
  setIsFormReset
}: Props) {
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
    defaultValues: {
      breed: breed ?? undefined,
      maxAge: maxAge ?? undefined,
      minAge: minAge ?? undefined,
      zipCode: zipCode ?? undefined,
    },
    resolver: zodResolver(filterSchema),
  });

  const onSubmit = (values: z.infer<typeof filterSchema>) => {
    setBreed((values.breed !== undefined && values.breed.length > 0)
      ? values.breed : null);
    setMaxAge((values.maxAge !== undefined && typeof values.maxAge !== "string" && values.maxAge > -1)
      ? values.maxAge : null);
    setMinAge((values.minAge !== undefined && typeof values.minAge !== "string" && values.minAge > -1)
      ? values.minAge : null);
    setZipCode((values.zipCode !== undefined && values.zipCode.length > 0)
      ? values.zipCode : null);
    setFrom(0);
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

  useEffect(() => {
    if (isFormReset) {
      form.reset({
        breed: undefined,
        maxAge: undefined,
        minAge: undefined,
        zipCode: undefined,
      });
      setIsFormReset(false);
    }
  }, [isFormReset]);

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
                        type="number"
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
                        type="number"
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
              <CheckSquare color="black" size={24} />
              Apply
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
