import { create } from "zustand";

export type T_MeshType = "plane" | "cube" | "sphere" | "cone" | "cylinder";

export type T_Mesh = {
  id: string;
  type: T_MeshType;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];

  color: string;
};

// Constants
export const DEFAULT_ORBIT_POSITION = [10, 10, 10] as [number, number, number];

export type T_SceneStore = {
  // CANVAS
  orbitPosition: [number, number, number];
  setOrbitPosition: (position: [number, number, number]) => void;

  // MESHES
  selectedMesh: T_Mesh | null;
  setSelectedMesh: (mesh: T_Mesh | null) => void;
  meshes: T_Mesh[];
  setMeshes: (meshes: T_Mesh[]) => void;
  addMesh: (meshType: T_MeshType) => void;
  removeMesh: (meshId: string) => void;
  updateMesh: (args: { meshId: string; payload: Omit<T_Mesh, "id"> }) => void;
};

export const useSceneStore = create<T_SceneStore>((set) => {
  return {
    // Scene
    orbitPosition: DEFAULT_ORBIT_POSITION,
    setOrbitPosition: (position) => set({ orbitPosition: position }),

    // Mesh
    selectedMesh: null,
    setSelectedMesh: (mesh: T_Mesh | null) => set({ selectedMesh: mesh }),
    meshes: [],
    setMeshes: (newMeshes) => set({ meshes: newMeshes }),
    addMesh: (meshType) =>
      set((pv) => {
        const newMesh: T_Mesh = {
          color: "white",
          id: "#", // TODO: Use cuid,
          position: [0, 0, 0], // Todo: Use marker position in future
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
          type: meshType,
        };
        return {
          meshes: [...pv.meshes, newMesh],
        };
      }),
    removeMesh: (meshId: string) =>
      set((pv) => ({
        meshes: pv.meshes.filter((mesh) => mesh.id !== meshId),
      })),
    updateMesh: ({ meshId, payload }) => {
      set((state) => ({
        meshes: state.meshes.map((mesh) =>
          mesh.id === meshId ? { ...mesh, ...payload } : mesh
        ),
      }));
    },
  };
});
