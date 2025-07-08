import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { Box, Circle, Cylinder, Square, type LucideProps } from "lucide-react";
import type { T_MeshType } from "@/lib/types/mesh.types";

type T_Mesh = {
  type: T_MeshType;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};
export const MESHES: T_Mesh[] = [
  {
    type: "plane",
    label: "Plane",
    icon: Square,
  },
  {
    type: "cylinder",
    label: "Cylinder",
    icon: Cylinder,
  },
  {
    type: "sphere",
    label: "Sphere",
    icon: Circle,
  },

  {
    type: "cube",
    label: "Cube",
    icon: Box,
  },
];

export const MATERIAL_CONFIG = {
  standard: {
    name: "Standard",
    description:
      "A standard physically based material, using Metallic-Roughness workflow.",
    properties:
      "Supports albedo, metalness, roughness, and normal maps. Uses physically based rendering (PBR) for realistic lighting calculations.",
    useCase:
      "Best for most realistic materials like metals, plastics, wood, and stone.",
    docsUrl: "https://threejs.org/docs/#api/en/materials/MeshStandardMaterial",
  },
  physical: {
    name: "Physical",
    description:
      "An extension of MeshStandardMaterial that provides more advanced physically-based rendering properties.",
    properties:
      "Includes clearcoat, physical transmission, thickness, and advanced reflection properties. Supports glass-like materials with refraction.",
    useCase:
      "Perfect for glass, water, soap bubbles, and other transparent or translucent materials.",
    docsUrl: "https://threejs.org/docs/#api/en/materials/MeshPhysicalMaterial",
  },
  phong: {
    name: "Phong",
    description:
      "A material for shiny surfaces with specular highlights using the Phong shading model.",
    properties:
      "Uses ambient, diffuse, and specular components. Supports shininess, specular color, and emissive properties.",
    useCase:
      "Good for plastic, ceramic, polished metal, or any glossy surface that needs sharp highlights.",
    docsUrl: "https://threejs.org/docs/#api/en/materials/MeshPhongMaterial",
  },
  toon: {
    name: "Toon",
    description:
      "A material implementing toon shading for cartoon-like appearance.",
    properties:
      "Uses gradient maps to create flat, stylized lighting. Can use custom gradient textures for different toon effects.",
    useCase:
      "Ideal for cartoon-style games, architectural visualization, or stylized 3D illustrations.",
    docsUrl: "https://threejs.org/docs/#api/en/materials/MeshToonMaterial",
  },
  lambert: {
    name: "Lambert",
    description:
      "A material for non-shiny surfaces, without specular highlights using Lambert shading model.",
    properties:
      "Only calculates diffuse lighting, creating soft, matte surfaces. No specular reflections or highlights.",
    useCase:
      "Perfect for fabric, paper, unfinished wood, concrete, or any matte surface.",
    docsUrl: "https://threejs.org/docs/#api/en/materials/MeshLambertMaterial",
  },
  basic: {
    name: "Basic",
    description:
      "A material that is not affected by lights. Renders the geometry in a simple shaded way.",
    properties:
      "Ignores all lighting calculations. Color remains constant regardless of scene lighting. Very performant.",
    useCase:
      "Useful for UI elements, skyboxes, unlit effects, or when you need consistent color appearance.",
    docsUrl: "https://threejs.org/docs/#api/en/materials/MeshBasicMaterial",
  },
};
