import logo from "@/assets/images/logo.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useUserStore from "@/stores/UserStore";
import { logOut } from "@/utils/authenticate";
import { Home, LogOut, Menu, Star, User } from "react-feather";
import { toast } from "sonner";
import { Link, useLocation } from "wouter";

type Props = {
  resetFavoriteDogs: () => void;
  resetSearchState: () => void;
  showFavorites?: boolean;
  showHome?: boolean;
};

export default function Header(props: Props = {
  resetFavoriteDogs: () => ({}),
  resetSearchState: () => ({}),
  showFavorites: false,
  showHome: false,
}) {
  const { email, name, resetUser } = useUserStore();
  const [, setLocation] = useLocation();

  /**
   * Clear the user's state and log out.
   * @returns an empty promise
   */
  const handleLogOut = async (): Promise<void> => {
    const response = await logOut();
    if (response.ok === false) {
      toast("Error", {
        description: "We encountered an unknown error, please close this page, clear history, and restart your browser.",
      });
    } else {
      props.resetSearchState();
      props.resetFavoriteDogs();
      resetUser();
      setLocation("/login", { replace: true });
    }
  };

  return (
    <header className="flex items-start justify-between">
      <Link to="/">
        <div className="bg-black flex h-[24rem] pl-[1rem] pr-[1rem] items-end w-[8rem]">
          <img
            alt="Logo"
            className="bottom-[3rem] relative"
            src={logo}
          />
        </div>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Menu
            className="hover:cursor-pointer relative top-[4rem]"
            color="black"
            data-testid="menu"
            size={28}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit">
          <DropdownMenuLabel>
            <div className="flex gap-4 items-center m-4">
              <User color="white" size={40} />
              <div className="flex flex-col gap-2">
                <span className="block" data-testid="name">{name}</span>
                <span className="block text-xs" data-testid="email">{email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            {props.showHome &&
              <DropdownMenuItem>
                <Link className="flex gap-2 items-center" data-testid="home" to="/">
                  <Home color="white" />
                  Home
                </Link>
              </DropdownMenuItem>
            }
            {props.showFavorites &&
              <DropdownMenuItem>
                <Link className="flex gap-2 items-center" data-testid="favorites" to="/favorites">
                  <Star color="white" />
                  Favorites
                </Link>
              </DropdownMenuItem>
            }
          </DropdownMenuGroup>
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={async () => await handleLogOut()}  // eslint-disable-line
          >
            <LogOut color="white" />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}