import type { T_Mesh } from "@/store/scene.store";
import * as THREE from "three";

function Mesh(mesh: T_Mesh) {
  return (
    <mesh position={mesh.position} rotation={mesh.rotation} scale={mesh.scale}>
      {mesh.type === "cone" && <coneGeometry args={[1, 1, 1]} />}
      {mesh.type === "sphere" && <sphereGeometry args={[1, 32, 32]} />}
      {mesh.type === "cylinder" && <cylinderGeometry args={[1, 1, 1]} />}
      {mesh.type === "cube" && <boxGeometry args={[1, 1, 1]} />}
      {mesh.type === "plane" && <planeGeometry args={[1, 1, 1]} />}
      <meshStandardMaterial
        side={THREE.DoubleSide}
        color={mesh.color || "white"}
      />
    </mesh>
  );
}

export default Mesh;
