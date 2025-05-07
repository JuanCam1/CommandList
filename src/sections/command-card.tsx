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
  onDelete: (id: number) => void;
}
const CommandCard: FC<Props> = ({ command, onDelete }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="dark:bg-neutral-950/40 border-1 border-neutral-400">
      <CardHeader>
        <div>
          <CardTitle className="capitalize">{command.name}</CardTitle>
          <CardDescription className="mt-2 dark:text-neutral-500 capitalize text-neutral-700">
            {command.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <pre
          className="
          dark:bg-zinc-950 bg-zinc-200/70 p-2 rounded-md overflow-x-auto text-sm
          scrollbar-thin
          scrollbar-thumb-zinc-400
          scrollbar-track-zinc-200
          dark:scrollbar-thumb-zinc-600
          dark:scrollbar-track-zinc-900
        "
        >
          <code>{command.command}</code>
        </pre>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <CommandUpdate command={command} />
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
