import type { T_MeshType } from "@/store/scene.store";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import {
  Box,
  Circle,
  Cylinder,
  Square,
  Triangle,
  type LucideProps,
} from "lucide-react";

type T_Mesh = {
  type: T_MeshType;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};
export const MESHES: T_Mesh[] = [
  {
    type: "plane",
    label: "Plane",
    icon: Square,
  },
  {
    type: "cylinder",
    label: "Cylinder",
    icon: Cylinder,
  },
  {
    type: "sphere",
    label: "Sphere",
    icon: Circle,
  },
  {
    type: "cone",
    label: "Cone",
    icon: Triangle,
  },
  {
    type: "cube",
    label: "Cube",
    icon: Box,
  },
];
