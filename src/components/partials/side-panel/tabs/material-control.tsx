import { Button } from "@/components/ui/button";
import DraggableNumberInput from "@/components/ui/draggable-number-input";
import { HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MATERIAL_CONFIG } from "@/data/mesh";
import {
  MeshMaterialTypes,
  type T_MaterialType,
  type T_Mesh,
} from "@/lib/types/mesh.types";
import { useSceneStore } from "@/store/scene.store";
import { HoverCard } from "@radix-ui/react-hover-card";
import { ExternalLink } from "lucide-react";
import TabSectionWrapper from "./section-wrapper";

function MaterialControl({ mesh }: { mesh: T_Mesh }) {
  const updateMesh = useSceneStore((state) => state.updateMesh);

  return (
    <>
      <TabSectionWrapper>
        <div className="gap-1 flex flex-col">
          <p className="capitalize font-semibold text-sm">Material</p>
          <p className="capitalize font-extralight text-xs text-neutral-400">
            Hover for a while to get info about material
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {MeshMaterialTypes.map((materialType) => {
            const config = MATERIAL_CONFIG[materialType];
            return (
              <HoverCard key={materialType} openDelay={500} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <Button
                    size="sm"
                    className="rounded-full capitalize"
                    variant={
                      mesh.materialType === materialType
                        ? "default"
                        : "secondary"
                    }
                    onClick={() => {
                      updateMesh({
                        meshId: mesh.id,
                        payload: {
                          ...mesh,
                          materialType: materialType as T_MaterialType,
                        },
                      });
                    }}
                  >
                    {materialType}
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="flex flex-col gap-2">
                  <h4 className="font-semibold">Mesh{config.name}Material</h4>
                  <p className="text-sm">{config.description}</p>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-neutral-400">
                      Properties:
                    </p>
                    <p className="text-xs text-neutral-400">
                      {config.properties}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-neutral-400">
                      Best for:
                    </p>
                    <p className="text-xs text-neutral-400">{config.useCase}</p>
                  </div>
                  <div className="pt-2 border-t border-neutral-800">
                    <a
                      href={config.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-3 h-3" />
                      Three.js Docs
                    </a>
                  </div>
                </HoverCardContent>
              </HoverCard>
            );
          })}
        </div>
      </TabSectionWrapper>
      <TabSectionWrapper>
        <p className="capitalize font-semibold text-sm">Color</p>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={mesh.color}
            onChange={(e) => {
              updateMesh({
                meshId: mesh.id,
                payload: {
                  ...mesh,
                  color: e.target.value,
                },
              });
            }}
            className="w-12 h-12 rounded-lg border-2 border-neutral-700 bg-transparent cursor-pointer hover:border-neutral-600 transition-colors"
          />
          <Input
            type="text"
            value={mesh.color}
            onChange={(e) => {
              const color = e.target.value.startsWith("#")
                ? e.target.value
                : `#${e.target.value}`;
              updateMesh({
                meshId: mesh.id,
                payload: {
                  ...mesh,
                  color,
                },
              });
            }}
            placeholder="Enter hex color code"
            className="w-full font-mono tracking-wider"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="capitalize font-semibold text-sm">Quick Colors</p>
          <div className="flex gap-2">
            {[
              "#ffffff",
              "#000000",
              "#ff0000",
              "#00ff00",
              "#0000ff",
              "#ffff00",
              "#ff00ff",
              "#00ffff",
            ].map((color) => (
              <button
                key={color}
                onClick={() => {
                  updateMesh({
                    meshId: mesh.id,
                    payload: {
                      ...mesh,
                      color: color,
                    },
                  });
                }}
                className="w-8 h-8 rounded-full border-2 border-neutral-700 hover:border-neutral-500 transition-colors hover:scale-110"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
        {/* Material specific controls */}
      </TabSectionWrapper>
      {mesh.materialType === "physical" && (
        <TabSectionWrapper>
          <p className="capitalize font-semibold text-sm">
            Physical Material Properties
          </p>
          <PhysicalMaterialControls mesh={mesh} />
        </TabSectionWrapper>
      )}
      {mesh.materialType === "phong" && (
        <TabSectionWrapper>
          <p className="capitalize font-semibold text-sm">
            Phong Material Properties
          </p>
          <PhongMaterialControls mesh={mesh} />
        </TabSectionWrapper>
      )}
    </>
  );
}

function PhysicalMaterialControls({ mesh }: { mesh: T_Mesh }) {
  const updateMesh = useSceneStore((state) => state.updateMesh);
  const properties = [
    "transmission",
    "roughness",
    "thickness",
    "ior",
    "opacity",
  ] as const;
  const MATERIAL_PROPERTY_CONFIG: Record<
    (typeof properties)[number],
    {
      label: string;
      min: number;
      max: number;
      step: number;
    }
  > = {
    transmission: {
      label: "Transmission",
      min: 0,
      max: 1,
      step: 0.01,
    },
    roughness: { label: "Roughness", min: 0, max: 1, step: 0.01 },
    thickness: { label: "Thickness", min: 0, max: 5, step: 0.1 },
    ior: { label: "IOR", min: 1, max: 2.5, step: 0.01 },
    opacity: { label: "Opacity", min: 0, max: 1, step: 0.01 },
  };

  // Physical material can have following properties:
  /**
   * transmission
   * roughness
   * thickness
   * ior
   * transparent
   * opacity
   */

  return properties.map((property) => (
    <div className="flex gap-2 items-center">
      <div className="w-1/2">
        <Label className="capitalize w-full text-end">
          {MATERIAL_PROPERTY_CONFIG[property].label}
        </Label>
      </div>
      <DraggableNumberInput
        value={mesh[property] ?? 0}
        min={MATERIAL_PROPERTY_CONFIG[property].min}
        max={MATERIAL_PROPERTY_CONFIG[property].max}
        step={MATERIAL_PROPERTY_CONFIG[property].step}
        onChange={(value) => {
          updateMesh({
            meshId: mesh.id,
            payload: {
              ...mesh,
              [property]: value,
            },
          });
        }}
      />
    </div>
  ));
}
function PhongMaterialControls({ mesh }: { mesh: T_Mesh }) {
  const updateMesh = useSceneStore((state) => state.updateMesh);

  return (
    <div className="flex gap-2 items-center">
      <div className="w-1/2">
        <Label className="capitalize">Shininess</Label>
      </div>
      <DraggableNumberInput
        value={mesh.shininess ?? 0}
        min={0}
        max={100}
        onChange={(value) => {
          updateMesh({
            meshId: mesh.id,
            payload: {
              ...mesh,
              shininess: value,
            },
          });
        }}
      />
    </div>
  );
}

export default MaterialControl;
