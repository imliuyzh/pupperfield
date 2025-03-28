import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logOut } from "@/services/AuthService/AuthService";
import useDogStore from "@/stores/DogStore/DogStore";
import useSearchStateStore from "@/stores/SearchStateStore/SearchStateStore";
import useUserStore from "@/stores/UserStore/UserStore";
import logo from "@assets/images/logo.svg";
import { Home, LogOut, Menu, Star, User } from "react-feather";
import { toast } from "sonner";
import { Link, useLocation } from "wouter";

type Props = {
  showFavorites?: boolean;
  showHome?: boolean;
};

export default function Header(props: Props = {
  showFavorites: false,
  showHome: false,
}) {
  const resetFavoriteDogs = useDogStore(state => state.resetFavoriteDogs);
  const resetSearchState = useSearchStateStore(state => state.resetSearchState);
  const { email, name, resetUser } = useUserStore();
  const [, setLocation] = useLocation();

  /**
   * Clear the user's state and log out.
   * @return an empty promise
   */
  const handleLogOut = async (): Promise<void> => {
    const response = await logOut();
    if (response.ok) {
      resetSearchState();
      resetFavoriteDogs();
      resetUser();
      setLocation("/login", { replace: true });
    } else {
      toast("Error", {
        description: "We encountered an unknown error, please close this page, clear history, and restart your browser.",
      });
    }
  };

  return (
    <header className="flex items-start justify-between">
      <div >
        <Link to="/">
          <div className="bg-black flex h-[24rem] pl-[1rem] pr-[1rem] items-end w-[8rem]">
            <img
              alt="Logo"
              className="bottom-[3rem] relative"
              src={logo}
            />
          </div>
        </Link>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Menu
            className="hover:cursor-pointer relative top-[4rem]"
            color="black"
            size={28}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit">
          <DropdownMenuLabel>
            <div className="flex gap-4 items-center m-4">
              <User color="white" size={40} />
              <div className="flex flex-col gap-2">
                <span className="block">{name}</span>
                <span className="block text-xs">{email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            {props.showHome &&
              <DropdownMenuItem>
                <Link className="flex gap-2 items-center" to="/">
                  <Home color="white" />
                  Home
                </Link>
              </DropdownMenuItem>
            }
            {props.showFavorites &&
              <DropdownMenuItem>
                <Link className="flex gap-2 items-center" to="/favorites">
                  <Star color="white" />
                  Favorites
                </Link>
              </DropdownMenuItem>
            }
          </DropdownMenuGroup>
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={async () => {  // eslint-disable-line
              await handleLogOut();
            }}
          >
            <LogOut color="white" />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}