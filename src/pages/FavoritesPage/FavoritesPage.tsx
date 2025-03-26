import Header from "@/components/Header/Header";
import useDogStore from "@/stores/DogStore/DogStore";
import useUserStore from "@/stores/UserStore/UserStore";
import { Redirect } from "wouter";

export default function FavoritesPage() {
  const {
    favoriteDogs,
    removeFavoriteDog,
    resetFavoriteDogs
  } = useDogStore();
  const email = useUserStore(state => state.email), name = useUserStore(state => state.name);
  if (email === null || name === null) {
    return <Redirect replace to="/login" />;
  }
  return (
    <Header showHome={true} />
  );
}