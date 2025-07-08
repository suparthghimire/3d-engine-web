export type T_MeshType = "plane" | "cube" | "sphere" | "cone" | "cylinder";

export const MeshMaterialTypes = [
  "standard",
  "physical",
  "phong",
  "toon",
  "basic",
  "lambert",
] as const;

export type T_MaterialType = (typeof MeshMaterialTypes)[number];

export type T_Mesh = {
  id: string;
  type: T_MeshType;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];

  color: string;
  materialType: T_MaterialType;

  roughness?: number;
  metalness?: number;
  transmission?: number;
  transparent?: boolean;
  thickness?: number;
  ior?: number;
  opacity?: number;
  shininess?: number;
};
