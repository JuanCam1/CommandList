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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";
import { type ChangeEvent, useState, type FC } from "react";
import type { CommandI } from "types/global";

interface Props {
  command: CommandI;
  onEdit: (command: CommandI) => void;
}
const CommandUpdate: FC<Props> = ({ command, onEdit }) => {
  const [commandUpdate, setCommandUpdate] = useState(command);

  const handleChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCommandUpdate({
      ...commandUpdate,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSelectChange = (value: string) => {
    setCommandUpdate({
      ...commandUpdate,
      type: value,
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="outline" className="cursor-pointer">
          <Pencil className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="dark:text-white">
            Actualizar Comando!
          </AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col gap-3">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={commandUpdate.name}
                onChange={handleChange}
                placeholder="Ej: Actualizar paquetes en Ubuntu"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="command">Comando</Label>
              <Textarea
                className="font-mono resize-none"
                onChange={handleChange}
                id="command"
                value={commandUpdate.command}
                placeholder="Ej: sudo apt update && sudo apt upgrade -y"
                required
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción (opcional)</Label>
              <Textarea
                className="resize-none"
                onChange={handleChange}
                id="description"
                value={commandUpdate.command}
                placeholder="Describe para qué sirve este comando..."
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <div className="flex gap-2">
                <Select
                  value={commandUpdate.type}
                  onValueChange={handleSelectChange}
                >
                  {" "}
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="command">Comando</SelectItem>
                    <SelectItem value="so">SO</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-foreground">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => onEdit(commandUpdate)}>
            Actualizar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CommandUpdate;
