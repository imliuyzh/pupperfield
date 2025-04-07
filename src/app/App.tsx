import { ThemeProvider } from "@/app/Provider";
import Router from "@/app/Router";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <ThemeProvider>
      <Router />
      <Toaster closeButton />
    </ThemeProvider>
  );
}