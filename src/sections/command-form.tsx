import {
  type ChangeEvent,
  useState,
  type FC,
  type FormEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CommandI } from "types/global";
import { typeData } from "@/data/type-data";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const CommandForm: FC<Props> = ({ setIsOpen }) => {
  const router = useRouter();
  const [commandNew, setCommandNew] = useState({
    name: "",
    description: "",
    type: "",
    command: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await window.api.createData(commandNew);
      toast.success("Comando creado correctamente");
      setIsOpen(false);
      router.invalidate();
    } catch (error) {
      toast.error("Error al crear el comando");
      console.log(error);
      return "error";
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setCommandNew((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeType = (value: string) => {
    setCommandNew((prev) => ({ ...prev, type: value }));
  };

  return (
    <Card className=" border-accent">
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Título</Label>
            <Input
              id="name"
              name="name"
              value={commandNew.name}
              onChange={handleChange}
              placeholder="Ej: Actualizar paquetes en Ubuntu"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción (opcional)</Label>
            <Textarea
              id="description"
              name="description"
              value={commandNew.description}
              onChange={handleChange}
              placeholder="Describe para qué sirve este comando..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="command">Comando</Label>
            <Textarea
              id="command"
              name="command"
              value={commandNew.command}
              onChange={handleChange}
              placeholder="Ej: sudo apt update && sudo apt upgrade -y"
              required
              className="font-mono"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <div className="flex gap-2">
              <Select
                name="type"
                value={commandNew.type}
                onValueChange={handleChangeType}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {typeData.map((type) => (
                    <SelectItem key={type.id} value={type.value}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center mt-3">
          <Button type="submit">Guardar</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CommandForm;
