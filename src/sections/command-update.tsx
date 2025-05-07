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
import { typeData } from "@/data/type-data";
import { useRouter } from "@tanstack/react-router";
import { Pencil } from "lucide-react";
import { type ChangeEvent, useState, type FC } from "react";
import { toast } from "sonner";
import type { CommandI } from "types/global";

interface Props {
  command: CommandI;
}
const CommandUpdate: FC<Props> = ({ command }) => {
  const [commandUpdate, setCommandUpdate] = useState(command);
  const router = useRouter();

  const handleChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = evt.target;
    setCommandUpdate((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setCommandUpdate((prev) => ({ ...prev, type: value }));
  };

  const handleUpdate = async () => {
    try {
      await window.api.updateData(commandUpdate);
      toast.success("Comando actualizado correctamente");
      router.invalidate();
    } catch (error) {
      toast.error("Error al actualizar el comando");
      console.log(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="outline" className="cursor-pointer">
          <Pencil className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border border-neutral-400 bg-white dark:bg-neutral-900 dark:text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center mb-3">
            Actualizar Comando!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-zinc-500 mb-5">
            Actualiza el comando seleccionado.
          </AlertDialogDescription>
          <form className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                name="name"
                value={commandUpdate.name}
                onChange={handleChange}
                className="dark:bg-zinc-950/40"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                name="description"
                className="resize-none dark:bg-zinc-950/40"
                onChange={handleChange}
                id="description"
                value={commandUpdate.description}
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="command">Comando</Label>
              <Textarea
                className="font-mono resize-none dark:bg-zinc-950/40"
                onChange={handleChange}
                id="command"
                name="command"
                value={commandUpdate.command}
                required
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <div className="flex gap-2">
                <Select
                  value={commandUpdate.type}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger className="flex-1 dark:bg-zinc-950 cursor-pointer">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-zinc-950 bg-white">
                    {typeData.map((type) => (
                      <SelectItem
                        key={type.id}
                        value={type.value}
                        className="dark:text-white cursor-pointer"
                      >
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-foreground">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleUpdate}>
            Actualizar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CommandUpdate;
