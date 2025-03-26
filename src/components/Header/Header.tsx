import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useDogStore from "@/stores/DogStore/DogStore";
import useUserStore from "@/stores/UserStore/UserStore";
import logo from "@assets/images/logo.svg";
import { Home, LogOut, Star, User } from "react-feather";
import { Link, useLocation } from "wouter";

type Props = {
  showHome?: boolean,
  showFavorites?: boolean,
};

export default function Header(props: Props) {
  const resetFavoriteDogs = useDogStore(state => state.resetFavoriteDogs);
  const { email, name, resetUser } = useUserStore();
  const [, setLocation] = useLocation();
  return (
    <header className="flex items-center justify-between">
      <div >
        <Link to="/">
          <div className="bg-black flex h-[14rem] pl-[1rem] pr-[1rem] place-content-center w-[8rem]">
            <img alt="Logo" src={logo} />
          </div>
        </Link>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <User className="hover:cursor-pointer" color="black" size={36} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-none w-56">
          <DropdownMenuLabel className="font-semibold">{name}</DropdownMenuLabel>
          <DropdownMenuLabel className="font-semibold">{email}</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-neutral-800" />
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
            onClick={() => {
              resetFavoriteDogs();
              resetUser();
              setLocation("/login", { replace: true });
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