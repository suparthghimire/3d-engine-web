import type { T_Mesh } from "@/lib/types/mesh.types";
import { useSceneStore } from "@/store/scene.store";
import { forwardRef, useImperativeHandle, useRef } from "react";
import * as THREE from "three";

const MeshMaterial = (props: { mesh: T_Mesh }) => {
  const { mesh } = props;
  const commonMaterialProps = {
    color: mesh.color,
    side: THREE.DoubleSide,
  };
  switch (mesh.materialType) {
    case "physical":
      return (
        <meshPhysicalMaterial
          {...commonMaterialProps}
          transmission={mesh.transmission ?? 0}
          roughness={mesh.roughness ?? 0.5}
          thickness={mesh.thickness ?? 1}
          ior={mesh.ior ?? 1.5}
          transparent={mesh.transparent ?? false}
          opacity={mesh.opacity ?? 1}
        />
      );
    case "phong":
      return (
        <meshPhongMaterial
          {...commonMaterialProps}
          shininess={mesh.shininess ?? 30}
        />
      );
    case "toon":
      return <meshToonMaterial {...commonMaterialProps} />;
    case "lambert":
      return <meshLambertMaterial {...commonMaterialProps} />;
    case "basic":
      return <meshBasicMaterial {...commonMaterialProps} />;
    case "standard":
    default:
      return <meshStandardMaterial {...commonMaterialProps} />;
  }
};

const Mesh = forwardRef<THREE.Mesh, T_Mesh>((mesh, ref) => {
  const setSelectedMeshId = useSceneStore((state) => state.setSelectedMeshId);
  const internalRef = useRef<THREE.Mesh>(null);
  useImperativeHandle(ref, () => internalRef.current!, []);

  return (
    <mesh
      ref={internalRef}
      position={mesh.position}
      rotation={mesh.rotation}
      scale={mesh.scale}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedMeshId(mesh.id);
      }}
      castShadow
      receiveShadow
    >
      {mesh.type === "sphere" && <sphereGeometry args={[1, 32, 32]} />}
      {mesh.type === "cylinder" && <cylinderGeometry args={[1, 1, 1]} />}
      {mesh.type === "cube" && <boxGeometry args={[1, 1, 1]} />}
      {mesh.type === "plane" && <planeGeometry args={[1, 1, 1]} />}
      {/* <meshStandardMaterial color={mesh.color} side={THREE.DoubleSide} /> */}
      <MeshMaterial mesh={mesh} />
    </mesh>
  );
});

export default Mesh;
