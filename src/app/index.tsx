import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col bg-white dark:bg-zinc-900 px-5 rounded-md w-full lg:w-[80%] min-h-[95%] pt-3">
      <h2 className="my-0 pb-3 font-semibold dark:text-white text-lg text-center">
        Proyectos
      </h2>
    </div>
  );
}
