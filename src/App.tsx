import { ThemeProvider } from "@components/ThemeProvider/ThemeProvider";
import HomePage from "@pages/HomePage/HomePage";
import LoginPage from "@pages/LoginPage/LoginPage";
import { useHashLocation } from "wouter/use-hash-location";
import { Route, Router } from "wouter";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router hook={useHashLocation}>
        <Route component={LoginPage} path="/login" />
        <Route component={HomePage} />
      </Router>
    </ThemeProvider>
  );
}