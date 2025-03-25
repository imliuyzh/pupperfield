import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useUserStore, { type UserActions } from "@/stores/UserStore/UserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { logIn } from "@services/AuthService/AuthService";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Email is required." }),
  name: z.string().trim().min(1, { message: "Name is required." }),
});

export default function LoginForm() {
  const setUser = useUserStore((state: UserActions) => state.setUser);
  const [, setLocation] = useLocation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await logIn(values);
    if (response.ok === false) {
      console.error(response.error);
      toast("Error", {
        description: "We encountered an unknown error, please try again.",
      });
    } else {
      setUser(values.email, values.name);
      setLocation("/", { replace: true });
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-2"
        onSubmit={() => {
          form.handleSubmit(async (values) => {
            await onSubmit(values);
          });
        }}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field: { ...restField } }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="border-2 dark:bg-transparent dark:aria-invalid:border-black dark:aria-invalid:ring-transparent focus-visible:border-2 focus-visible:border-black placeholder:text-black rounded-none text-black"
                  placeholder="Name" {...restField}
                />
              </FormControl>
              <FormMessage className="italic text-black" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field: { ...restField } }) => (
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
          Submit
        </Button>
      </form>
    </Form>
  );
}