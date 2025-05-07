import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CommandCard from "./command-card";
import type { CommandI } from "types/global";
import type { FC } from "react";

interface Props {
  commands: CommandI[];
  onDelete: (id: number) => void;
}
const CommandList: FC<Props> = ({ commands, onDelete }) => {
  if (commands.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No hay comandos guardados. ¡Agrega tu primer comando con el botón
          "Nuevo Comando"!
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {commands.map((command) => (
        <CommandCard
          key={command.id}
          command={command}
          onDelete={() => onDelete(command.id)}
        />
      ))}
    </div>
  );
};

export default CommandList;
