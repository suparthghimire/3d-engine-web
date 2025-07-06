import { createStore } from "zustand";

export type T_MeshType = "cube" | "sphere" | "cone" | "cylinder";

export type T_Mesh = {
  id: string;
  type: T_MeshType;
};
type T_SceneStore = {
  selectedMesh: T_Mesh | null;
  setSelectedMesh: (mesh: T_Mesh | null) => void;
  meshes: T_Mesh[];
  setMeshes: (meshes: T_Mesh[]) => void;
  addMesh: (meshType: T_Mesh) => void;
  removeMesh: (meshId: string) => void;
  updateMesh: (args: { meshId: string; payload: Omit<T_Mesh, "id"> }) => void;
};

export const useSceneStore = createStore<T_SceneStore>((set) => {
  return {
    selectedMesh: null,
    setSelectedMesh: (mesh: T_Mesh | null) => set({ selectedMesh: mesh }),
    meshes: [],
    setMeshes: (newMeshes) => set({ meshes: newMeshes }),
    addMesh: (newMesh) =>
      set((pv) => ({
        meshes: [...pv.meshes, newMesh],
      })),
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
