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
import { Home, LogOut, Menu, Star, User } from "react-feather";
import { Link, useLocation } from "wouter";

type Props = {
  showFavorites?: boolean,
  showHome?: boolean,
};

export default function Header(props: Props = {
  showFavorites: false,
  showHome: false,
}) {
  const resetFavoriteDogs = useDogStore(state => state.resetFavoriteDogs);
  const { email, name, resetUser } = useUserStore();
  const [, setLocation] = useLocation();

  return (
    <header className="flex items-start justify-between">
      <div >
        <Link to="/">
          <div className="bg-black flex h-[24rem] pl-[1rem] pr-[1rem] items-end w-[8rem]">
            <img alt="Logo" className="bottom-[3rem] relative" src={logo} />
          </div>
        </Link>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Menu
            className="hover:cursor-pointer relative top-[4rem]"
            color="black"
            size={36}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-none w-56">
          <DropdownMenuLabel>
            <div className="flex gap-4 items-center">
              <User color="white" size={40} />
              <div className="flex flex-col gap-2">
                <span className="block">{name}</span>
                <span className="block">{email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
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