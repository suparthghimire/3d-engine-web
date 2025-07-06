import { Canvas } from "@react-three/fiber";
import FlipAbleGrid from "./components/flip-able-grid";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useSceneStore } from "@/store/scene.store";
function Scene() {
  const initialPosition = useSceneStore((state) => state.orbitPosition);
  return (
    <Canvas camera={{ position: initialPosition, fov: 50 }}>
      <ambientLight intensity={0.2} />
      <directionalLight
        castShadow
        position={[5, 10, 5]}
        intensity={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <FlipAbleGrid />
      <OrbitControls
        makeDefault
        mouseButtons={{ MIDDLE: THREE.MOUSE.ROTATE }}
      />
    </Canvas>
  );
}

export default Scene;
