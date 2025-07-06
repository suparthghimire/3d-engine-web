import { useThree, useFrame } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function FlipAbleGrid() {
  const gridRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (!gridRef.current) return;
    gridRef.current.rotation.x = camera.position.y < 0 ? Math.PI : 0;
  });

  return (
    <>
      <Grid
        ref={gridRef}
        args={[10, 10]}
        cellSize={1}
        cellThickness={0.5}
        sectionSize={5}
        sectionThickness={1.5}
        sectionColor={"#444"}
        fadeDistance={999}
        fadeStrength={1}
        infiniteGrid
      />
      <Axes /> {/* Length of X (red), Y (green), Z (blue) */}
    </>
  );
}

function Axes() {
  const axesRef = useRef<THREE.AxesHelper | null>(null);

  useEffect(() => {
    if (axesRef.current) {
      axesRef.current.setColors(
        new THREE.Color("red"),
        new THREE.Color("green"),
        new THREE.Color("blue")
      );
    }
  }, []);

  return <primitive object={new THREE.AxesHelper(10)} ref={axesRef} />;
}
