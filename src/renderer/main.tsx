import {
  RouterProvider,
  createMemoryHistory,
  createRouter,
} from "@tanstack/react-router";

import { routeTree } from "../routeTree.gen";
import { ThemeProvider } from "@/context/theme-provider";
import { Toaster } from "sonner";

const memoryHistory = createMemoryHistory({
  initialEntries: ["/"],
});

const router = createRouter({ routeTree, history: memoryHistory });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function Main() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="command-theme">
      <RouterProvider router={router} />
      <Toaster duration={2000} richColors />
    </ThemeProvider>
  );
}
