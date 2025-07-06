import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MESHES } from "@/data/mesh";

import type { PropsWithChildren } from "react";
import { useSceneStore } from "@/store/scene.store";

function MeshSelectorDropdown({ children }: PropsWithChildren) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <MeshSelectorDropdownContent />
    </DropdownMenu>
  );
}

function MeshSelectorDropdownContent() {
  const addMesh = useSceneStore((state) => state.addMesh);

  return (
    <DropdownMenuContent>
      {MESHES.map((mesh) => (
        <DropdownMenuItem key={mesh.type} onClick={() => addMesh(mesh.type)}>
          <mesh.icon /> {mesh.label}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );
}

export { MeshSelectorDropdown, MeshSelectorDropdownContent };
