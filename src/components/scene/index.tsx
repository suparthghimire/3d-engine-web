import { Canvas } from "@react-three/fiber";
import FlipAbleGrid from "./components/flip-able-grid";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useSceneStore } from "@/store/scene.store";
import Mesh from "./components/mesh";
import { EffectComposer, Outline } from "@react-three/postprocessing";
import { useRef } from "react";

function Scene() {
  const setSelectedMeshId = useSceneStore((state) => state.setSelectedMeshId);
  const {
    orbitPosition: initialPosition,
    meshes,
    selectedMeshId,
  } = useSceneStore((state) => state);

  const meshRefs = useRef<Record<string, THREE.Mesh | null>>({});

  const selectedRef = selectedMeshId ? meshRefs.current[selectedMeshId] : null;

  return (
    <Canvas
      camera={{ position: initialPosition, fov: 50 }}
      onPointerMissed={() => {
        setSelectedMeshId(null);
      }}
    >
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
      {meshes.map((mesh) => (
        <Mesh
          ref={(el) => {
            meshRefs.current[mesh.id] = el;
          }}
          {...mesh}
        />
      ))}
      <EffectComposer multisampling={8} autoClear={false}>
        <Outline
          selection={selectedRef ? [selectedRef] : []}
          blur
          width={500}
          edgeStrength={5}
          visibleEdgeColor={new THREE.Color("#ca7832").getHex()}
          hiddenEdgeColor={new THREE.Color("#ca7832").getHex()}
        />
      </EffectComposer>
    </Canvas>
  );
}

export default Scene;
