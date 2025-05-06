import { type FC, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import type { CommandI } from "types/global";
import CommandDelete from "./command-delete";
import CommandUpdate from "./command-update";

interface Props {
  command: CommandI;
  onEdit: (command: CommandI) => void;
  onDelete: (id: number) => void;
}
const CommandCard: FC<Props> = ({ command, onEdit, onDelete }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="dark:bg-neutral-950/40 border-1 dark:border-neutral-4000">
      <CardHeader>
        <div>
          <CardTitle className="capitalize">{command.name}</CardTitle>
          <CardDescription className="mt-2 dark:text-neutral-500 capitalize">
            {command.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <pre className="bg-zinc-950 p-2 rounded-md overflow-x-auto text-sm scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
          <code>{command.command}</code>
        </pre>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <CommandUpdate command={command} onEdit={onEdit} />
          <CommandDelete id={command.id} onDelete={onDelete} />
        </div>
        <Button
          className="cursor-pointer"
          variant="outline"
          size="sm"
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-1" />
              Copiado
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1" />
              Copiar
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CommandCard;
