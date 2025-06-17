import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import FlippableGrid from "./flippable-grid";
import { SelectableMesh } from "./mesh";
import * as THREE from "three";
import type { MeshObject } from "@/lib/types/mesh";
import { EffectComposer, Outline } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { TransformControls } from "@react-three/drei";
import { useHotkeys } from "react-hotkeys-hook";
import { TransformControls as ThreeTransformControls } from "three-stdlib";

type SceneProps = {
  meshes: MeshObject[];
  setMeshes: Dispatch<SetStateAction<MeshObject[]>>;
  setSelectedMeshId: Dispatch<SetStateAction<string | null>>;
  selectedMeshId: string | null;
};

export default function Scene(props: SceneProps) {
  const { selectedMeshId, setSelectedMeshId, meshes, setMeshes } = props;
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [transformMode, setTransformMode] = useState<
    "translate" | "rotate" | "scale"
  >("translate");

  const transformRef = useRef<ThreeTransformControls>(null);

  // ✅ Store a ref for each mesh
  const meshRefs = useRef<Map<string, THREE.Mesh>>(new Map());
  const hoveredMesh = hoveredId ? meshRefs.current.get(hoveredId) : null;

  const updatePosition = (newPos: THREE.Vector3) => {
    setMeshes((prev) =>
      prev.map((mesh) =>
        mesh.id === selectedMeshId
          ? { ...mesh, position: [newPos.x, newPos.y, newPos.z] }
          : mesh
      )
    );
  };

  const selectedMesh = selectedMeshId
    ? meshRefs.current.get(selectedMeshId)
    : null;

  useHotkeys("g", () => setTransformMode("translate"));
  useHotkeys("r", () => setTransformMode("rotate"));
  useHotkeys("s", () => setTransformMode("scale"));

  return (
    <>
      <FlippableGrid />

      {meshes.map((mesh) => {
        const isSelected = mesh.id === selectedMeshId;

        return (
          <SelectableMesh
            key={mesh.id}
            ref={(el) => {
              if (el) {
                meshRefs.current.set(mesh.id, el);
              } else {
                meshRefs.current.delete(mesh.id);
              }
            }}
            isHovered={hoveredId === mesh.id}
            position={mesh.position}
            color={mesh.color}
            type={mesh.type}
            isSelected={isSelected}
            onClick={() => !selectedMeshId && setSelectedMeshId(mesh.id)}
            onHover={(hovering) => setHoveredId(hovering ? mesh.id : null)}
          />
        );
      })}

      <EffectComposer multisampling={4} autoClear={false}>
        <Outline
          selection={
            [selectedMesh, hoveredMesh].filter(Boolean) as THREE.Object3D[]
          }
          visibleEdgeColor={new THREE.Color("orange").getHex()}
          hiddenEdgeColor={new THREE.Color("black").getHex()}
          edgeStrength={2}
          width={1000}
          blur
          blendFunction={BlendFunction.SCREEN}
        />
      </EffectComposer>

      {selectedMesh && (
        <TransformControls
          ref={transformRef}
          object={selectedMesh}
          mode={transformMode}
          onObjectChange={() => {
            updatePosition(selectedMesh.position);
          }}
        />
      )}
    </>
  );
}
