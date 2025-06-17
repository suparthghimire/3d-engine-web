import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Scene from "./components/3d/scene";
import * as THREE from "three";
import { useState } from "react";
import AddMeshDialog from "./components/3d/add-mesh-dialog";
import { useHotkeys } from "react-hotkeys-hook";
import { v4 as uuidv4 } from "uuid";
import type { MeshObject } from "./lib/types/mesh";
import { HelpDialog } from "./components/help-dialog";
import { Button } from "./components/ui/button";
import { Box, InfoIcon } from "lucide-react";

const initialMesh: MeshObject = {
  id: uuidv4(),
  type: "box",
  position: [0, 0, 0],
  color: "white",
};

export default function App() {
  const [addMeshDialogOpen, setAddMeshDialogOpen] = useState(false);
  const [helpDialogOpen, setHelpDialogOpen] = useState(true);

  const [meshes, setMeshes] = useState<MeshObject[]>([initialMesh]);

  const [selectedMeshId, setSelectedMeshId] = useState<string | null>(
    meshes[0]?.id ?? null
  );

  useHotkeys("shift+a", () => setAddMeshDialogOpen((pv) => !pv));
  useHotkeys("shift+x", () => {
    if (selectedMeshId) {
      setMeshes((meshes) =>
        meshes.filter((mesh) => mesh.id !== selectedMeshId)
      );
      setSelectedMeshId(null);
    }
  });

  return (
    <div className="flex h-screen w-screen">
      <div className="flex-1">
        <Canvas
          onPointerMissed={(e) => {
            if (e.button === 0) {
              setSelectedMeshId(null);
            }
          }}
          gl={{ antialias: true }}
          camera={{ position: [5, 5, 5], fov: 60 }}
        >
          <ambientLight intensity={0.2} /> {/* Just a soft fill */}
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
          <Scene
            selectedMeshId={selectedMeshId}
            setSelectedMeshId={setSelectedMeshId}
            meshes={meshes}
            setMeshes={setMeshes}
          />
          <OrbitControls
            makeDefault
            mouseButtons={{
              MIDDLE: THREE.MOUSE.ROTATE,
            }}
          />
        </Canvas>
        <div className="flex items-center gap-2 w-full absolute justify-center bottom-2">
          <Button onClick={() => setHelpDialogOpen(true)}>
            <InfoIcon />
            Help
          </Button>
          <Button onClick={() => setAddMeshDialogOpen(true)}>
            <Box />
            Add Mesh
          </Button>
        </div>
        <AddMeshDialog
          open={addMeshDialogOpen}
          onOpenChange={setAddMeshDialogOpen}
          onMeshSelect={(type) => {
            const id = uuidv4();
            setMeshes((pv) => [
              ...pv,
              {
                id: id,
                color: "white",
                position: [0, 0, 0],
                type: type,
              },
            ]);
            setSelectedMeshId(id);
          }}
        />
        <HelpDialog open={helpDialogOpen} onOpenChange={setHelpDialogOpen} />
      </div>
    </div>
  );
}
