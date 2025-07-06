import { useSceneStore, type T_Mesh } from "@/store/scene.store";
import { forwardRef, useImperativeHandle, useRef } from "react";
import * as THREE from "three";

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
    >
      {mesh.type === "cone" && <coneGeometry args={[1, 1, 1]} />}
      {mesh.type === "sphere" && <sphereGeometry args={[1, 32, 32]} />}
      {mesh.type === "cylinder" && <cylinderGeometry args={[1, 1, 1]} />}
      {mesh.type === "cube" && <boxGeometry args={[1, 1, 1]} />}
      {mesh.type === "plane" && <planeGeometry args={[1, 1, 1]} />}
      <meshStandardMaterial color={mesh.color} side={THREE.DoubleSide} />
    </mesh>
  );
});

export default Mesh;
