import { create } from "zustand";
import { createId } from "@paralleldrive/cuid2";
import type { T_Mesh, T_MeshType } from "@/lib/types/mesh.types";

// Constants
export const DEFAULT_ORBIT_POSITION = [10, 10, 10] as [number, number, number];

export type T_SceneStore = {
  // CANVAS
  orbitPosition: [number, number, number];
  setOrbitPosition: (position: [number, number, number]) => void;

  // MESHES
  selectedMeshId: string | null;
  setSelectedMeshId: (meshId: string | null) => void;
  // selectedMesh: T_Mesh | null;
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
    selectedMeshId: null,
    setSelectedMeshId: (meshId) =>
      set((pv) => {
        if (meshId === null) {
          return {
            ...pv,
            selectedMeshId: null,
            selectedMesh: null,
          };
        }
        const selectedMesh = pv.meshes.find((mesh) => mesh.id === meshId);

        if (!selectedMesh) return pv;
        return {
          ...pv,
          selectedMeshId: meshId,
          selectedMesh: selectedMesh,
        };
      }),
    meshes: [],
    setMeshes: (newMeshes) => set({ meshes: newMeshes }),
    addMesh: (meshType) =>
      set((pv) => {
        const newMesh: T_Mesh = {
          color: "white",
          id: createId(), // TODO: Use cuid,
          position: [0, 0, 0], // Todo: Use marker position in future
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
          type: meshType,
          materialType: "standard",
        };
        return {
          ...pv,
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
