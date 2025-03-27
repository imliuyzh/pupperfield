import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getDogBreeds } from "@/services/DogService/DogService";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Filter } from "react-feather";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Prop = {
  isFilterModalOpened: boolean,
  setBreeds: React.Dispatch<string[]>,
  setIsFilterModalOpened: React.Dispatch<boolean>,
  setMaxAge: React.Dispatch<number>,
  setMinAge: React.Dispatch<number>,
  setZipCodes: React.Dispatch<string[]>,
};

const formSchema = z.object({
  "breeds": z.string().array().min(0, { message: "breeds needs to be a list of strings." }),
  "maxAge": z.number().nonnegative({ message: "maxAge needs to be a number greater than or equal to zero." }),
  "minAge": z.number().nonnegative({ message: "minAge needs to be a number greater than or equal to zero." }),
  "zipCodes": z.string().array().min(0, { message: "zipCodes needs to be a list of strings." }),
});

export default function FilterModal({
  isFilterModalOpened,
  setBreeds,
  setIsFilterModalOpened,
  setMaxAge,
  setMinAge,
  setZipCodes
}: Prop) {
  const [breedList, setBreedList] = React.useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "breeds": [],
      "maxAge": -1,
      "minAge": -1,
      "zipCodes": [],
    },
  });

  const onOpenChange = (open: boolean) => {
    if (open === false) {
      setIsFilterModalOpened(false);
    }
  };

  React.useEffect(() => {
    getDogBreeds()
      .then(response => {
        if (response.breeds === null) {
          throw response.error;
        } else {
          setBreedList(response.breeds);
        }
      })
      .catch((error: unknown) => {
        console.error(error);
        toast("Error", {
          description: "Something happened while getting the breeds, please try again.",
        });
      });
  }, []);

  if (isFilterModalOpened === false) {
    return <></>;
  }
  return (
    <Dialog onOpenChange={onOpenChange} open={isFilterModalOpened}>
      <DialogTrigger asChild>
        <Filter
          color="gray"
          onClick={() => {
            setIsFilterModalOpened(true);
          }}
        />
      </DialogTrigger>
      <DialogContent className="bg-black text-white">
        <DialogHeader>
          <DialogTitle>Filter</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-2"
            onSubmit={form.handleSubmit(async (values) => await onSubmit(values))}  // eslint-disable-line
          >
            <FormField
              control={form.control}
              name="breeds"
              render={({ field: { ref, ...restField } }) => ( // eslint-disable-line
                <FormItem>
                  <FormControl>
                    <Input
                      className="border-2 dark:bg-transparent dark:aria-invalid:border-black dark:aria-invalid:ring-transparent focus-visible:border-2 focus-visible:border-black placeholder:text-black rounded-none text-black"
                      placeholder="B" {...restField}
                    />
                  </FormControl>
                  <FormMessage className="italic text-black" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field: { ref, ...restField } }) => ( // eslint-disable-line
                <FormItem>
                  <FormControl>
                    <Input
                      className="border-2 dark:bg-transparent dark:aria-invalid:border-black dark:aria-invalid:ring-transparent focus-visible:border-2 focus-visible:border-black placeholder:text-black rounded-none text-black"
                      placeholder="Email" {...restField}
                    />
                  </FormControl>
                  <FormMessage className="italic text-black" />
                </FormItem>
              )}
            />
            <Button
              className="bg-black text-white hover:bg-black hover:cursor-pointer hover:text-[var(--background)] rounded-none"
              type="submit"
            >
              <LogIn color="white" />
              Log In
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}