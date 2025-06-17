export type MeshType = "box" | "sphere" | "cone" | "cylinder";

export type MeshObject = {
  id: string;
  type: MeshType;
  position: [number, number, number];
  color: string;
};
