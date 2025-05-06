import { useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { CommandI } from "types/global";

const useCommand = (commands: CommandI[]) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const filteredCommands = commands.filter((cmd) => {
    const matchesSearch =
      cmd.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      cmd.command.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      cmd.description
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase());

    return matchesSearch;
  });

  const handleEditCommand = (command: CommandI) => {
    try {
      window.api.updateData(command);
      console.log("updated");
    } catch (error) {
      console.log(error);
      return "error";
    }
  };

  const handleDeleteCommand = (id: number) => {
    try {
      window.api.deleteData(id);
      toast.success("Comando eliminado correctamente");
      router.invalidate();
    } catch (error) {
      toast.error("Error al eliminar el comando");
      console.log(error);
    }
  };
  return {
    isFormOpen,
    setIsFormOpen,
    searchQuery,
    setSearchQuery,
    debouncedSearchQuery,
    setDebouncedSearchQuery,
    filteredCommands,
    handleEditCommand,
    handleDeleteCommand,
  };
};
export default useCommand;
