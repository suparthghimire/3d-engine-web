import { type DialogProps } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Box, Cylinder, Cone, Circle } from "lucide-react";
import type { MeshType } from "@/lib/types/mesh";
import { Card, CardContent } from "../ui/card";

const meshOptions = [
  {
    type: "box" satisfies MeshType,
    label: "Box",
    icon: Box,
    description: "Rectangular cuboid mesh",
  },
  {
    type: "sphere" satisfies MeshType,
    label: "Sphere",
    icon: Circle,
    description: "Spherical mesh",
  },
  {
    type: "cone" satisfies MeshType,
    label: "Cone",
    icon: Cone,
    description: "Conical mesh",
  },
  {
    type: "cylinder" satisfies MeshType,
    label: "Cylinder",
    icon: Cylinder,
    description: "Cylindrical mesh",
  },
];

function AddMeshDialog(
  props: DialogProps & {
    onMeshSelect: (type: MeshType) => void;
  }
) {
  const handleMeshSelect = (meshType: MeshType) => {
    props.onMeshSelect(meshType);
    props.onOpenChange?.(false);
  };

  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Mesh</DialogTitle>
          <DialogDescription>
            Select a mesh type to add to your scene.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          {meshOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <Card
                key={option.type}
                className="cursor-pointer transition-colors duration-200 hover:bg-accent/50 active:bg-accent/70"
                onClick={() => handleMeshSelect(option.type as MeshType)}
              >
                <CardContent className="flex flex-col items-center justify-center p-6 aspect-square">
                  <IconComponent className="h-8 w-8 mb-3 text-primary" />
                  <h3 className="font-semibold text-sm mb-1">{option.label}</h3>
                  <p className="text-xs text-muted-foreground text-center leading-tight">
                    {option.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddMeshDialog;
