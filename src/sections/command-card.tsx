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
import { Copy, Check, Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { CommandI } from "types/global";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    <Card className="bg-background border-accent">
      <CardHeader>
        <div>
          <CardTitle className="capitalize">{command.name}</CardTitle>
          <CardDescription className="mt-2">
            {command.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <pre className="bg-muted p-2 rounded-md overflow-x-auto text-sm">
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
          variant="destructive"
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
