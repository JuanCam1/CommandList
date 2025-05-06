import { createFileRoute } from "@tanstack/react-router";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { readCommands } from "@/services/command-service";
import CommandList from "@/sections/command-list";
import ModalCreate from "@/components/shared/modal-create";
import Search from "../components/shared/search";
import { typeData } from "@/data/type-data";
import { TabsContent } from "@radix-ui/react-tabs";
import useCommand from "@/hooks/use-command";
import { ModeToggle } from "@/components/shared/mode-toggle";

export const Route = createFileRoute("/")({
  component: Index,
  loader: async () => {
    const commands = await readCommands();
    return { commands };
  },
});

const categories = [
  {
    id: 4,
    name: "Todos",
    value: "todos",
  },
  ...typeData,
];

function Index() {
  const { commands } = Route.useLoaderData();
  const {
    setIsFormOpen,
    setSearchQuery,
    handleEditCommand,
    handleDeleteCommand,
    filteredCommands,
    searchQuery,
    isFormOpen,
  } = useCommand(commands);

  return (
    <div className="dark:text-white flex flex-col bg-white dark:bg-zinc-900 px-5 rounded-md w-full min-h-screen lg:w-[90%] pt-3">
      <main className="relative container mx-auto py-6 px-4 w-full">
        <div className="absolute top-0 right-0">
          <ModeToggle />
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center">
          Lista de Comandos
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Button
            onClick={() => {
              setIsFormOpen(true);
            }}
            variant="secondary"
            className="w-full md:w-auto cursor-pointer "
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Comando
          </Button>
        </div>

        <Tabs defaultValue="todos" className="mb-6 w-full ">
          <div className="w-full flex justify-end mb-6">
            <TabsList className="w-[400px] overflow-x-auto">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.value}
                  className="capitalize"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <TabsContent value="todos" className="w-full">
            <CommandList
              commands={filteredCommands}
              onEdit={handleEditCommand}
              onDelete={handleDeleteCommand}
            />
          </TabsContent>
          <TabsContent value="template">
            <CommandList
              commands={filteredCommands.filter(
                (cmd) => cmd.type === "template",
              )}
              onEdit={handleEditCommand}
              onDelete={handleDeleteCommand}
            />
          </TabsContent>
          <TabsContent value="so">
            <CommandList
              commands={filteredCommands.filter((cmd) => cmd.type === "so")}
              onEdit={handleEditCommand}
              onDelete={handleDeleteCommand}
            />
          </TabsContent>
          <TabsContent value="command">
            <CommandList
              commands={filteredCommands.filter(
                (cmd) => cmd.type === "command",
              )}
              onEdit={handleEditCommand}
              onDelete={handleDeleteCommand}
            />
          </TabsContent>
        </Tabs>
        <ModalCreate open={isFormOpen} setIsOpen={setIsFormOpen} />
      </main>
    </div>
  );
}
