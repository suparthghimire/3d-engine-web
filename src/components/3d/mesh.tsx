import { forwardRef } from "react";
import * as THREE from "three";

export type MeshType = "box" | "sphere" | "cone" | "cylinder";

export type MeshProps = {
  position: [number, number, number];
  color: string;
  type: MeshType;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHover: (hovering: boolean) => void;
};

const getGeometry = (type: MeshType) => {
  switch (type) {
    case "box":
      return <boxGeometry args={[1, 1, 1]} />;
    case "sphere":
      return <sphereGeometry args={[0.5, 32, 32]} />;
    case "cone":
      return <coneGeometry args={[0.5, 1, 32]} />;
    case "cylinder":
      return <cylinderGeometry args={[0.5, 0.5, 1, 32]} />;
    default:
      return <boxGeometry args={[1, 1, 1]} />;
  }
};

export const SelectableMesh = forwardRef<THREE.Mesh, MeshProps>(
  ({ position, color, type, onClick, onHover }, ref) => {
    const geometry = getGeometry(type);

    return (
      <mesh
        ref={ref}
        position={position}
        castShadow
        receiveShadow
        onPointerDown={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(true);
        }}
        onPointerOut={() => onHover(false)}
      >
        {geometry}
        <meshStandardMaterial color={color} />
      </mesh>
    );
  }
);

SelectableMesh.displayName = "SelectableMesh";
