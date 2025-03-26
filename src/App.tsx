import { ThemeProvider } from "@components/ThemeProvider/ThemeProvider";
import ErrorPage from "@pages/ErrorPage/ErrorPage";
import FavoritesPage from "@pages/FavoritesPage/FavoritesPage";
import HomePage from "@pages/HomePage/HomePage";
import LoginPage from "@pages/LoginPage/LoginPage";
import { Route, Router, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router hook={useHashLocation}>
        <Switch>
          <Route component={FavoritesPage} path="/favorites" />
          <Route component={LoginPage} path="/login" />
          <Route component={HomePage} path="/" />
          <Route component={ErrorPage} path="*" />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}