import { Button } from "@/components/ui/button";
import DraggableNumberInput from "@/components/ui/draggable-number-input";
import type { T_Mesh } from "@/lib/types/mesh.types";
import { cn } from "@/lib/utils";
import { useSceneStore } from "@/store/scene.store";
import { Link2, Link2Off } from "lucide-react";
import { useCallback, useState } from "react";
import TabSectionWrapper from "./section-wrapper";

const TRANSFORM_TYPES = ["translation", "rotation", "scale"] as const;
const TRANSFORM_AXIS = ["x", "y", "z"] as const;

type T_TransformType = (typeof TRANSFORM_TYPES)[number];
type T_TransformAxis = (typeof TRANSFORM_AXIS)[number];

function TransformControls({ mesh }: { mesh: T_Mesh }) {
  const updateMesh = useSceneStore((state) => state.updateMesh);

  const [linkedTransforms, setLinkedTransforms] = useState<
    Record<T_TransformType, boolean>
  >({
    translation: false,
    rotation: false,
    scale: false,
  });
  const getAxisIndex = (axis: T_TransformAxis): 0 | 1 | 2 => {
    return axis === "x" ? 0 : axis === "y" ? 1 : 2;
  };
  const transformBinding = useCallback(
    (args: { type: T_TransformType; axis: T_TransformAxis }) => {
      const { type, axis } = args;
      const axisIndex = getAxisIndex(axis);

      const prop = {
        translation: "position",
        rotation: "rotation",
        scale: "scale",
      }[type] as keyof T_Mesh;

      const meshProp = mesh[prop] as [number, number, number];
      const currentValue = meshProp?.[axisIndex];
      if (typeof currentValue !== "number") return null;

      const isLinked = linkedTransforms[type];
      return {
        value: currentValue,
        onChange: (val: number) => {
          const updatedArray = [...meshProp] as number[];

          if (isLinked) {
            updatedArray[0] = val;
            updatedArray[1] = val;
            updatedArray[2] = val;
          } else {
            updatedArray[axisIndex] = val;
          }

          updateMesh({
            meshId: mesh.id,
            payload: {
              ...mesh,
              [prop]: updatedArray,
            },
          });
        },
      };
    },
    [mesh, updateMesh, linkedTransforms]
  );

  const toggleLink = (type: T_TransformType) => {
    setLinkedTransforms((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return TRANSFORM_TYPES.map((type) => (
    <TabSectionWrapper key={`tc-${type}`}>
      <div className="flex items-center justify-between">
        <p className="capitalize font-semibold text-sm">{type}</p>
        <Button
          variant={linkedTransforms[type] ? "default" : "outline"}
          size="icon"
          onClick={() => toggleLink(type)}
        >
          {linkedTransforms[type] ? (
            <Link2 className="w-4 h-4" />
          ) : (
            <Link2Off className="w-4 h-4" />
          )}
        </Button>
      </div>
      <div className="flex items-center">
        {TRANSFORM_AXIS.map((axis, axisIdx) => {
          const binding = transformBinding({ type, axis });
          if (!binding) return null;

          return (
            <div className="flex flex-col gap-1" key={`tc-${type}-a-${axis}`}>
              <span className="text-xs font-medium">{axis}</span>
              <DraggableNumberInput
                className={cn({
                  "border-l-0 rounded-tl-none rounded-bl-none": axisIdx === 2,
                  "border-r-0 rounded-tr-none rounded-br-none": axisIdx === 0,
                  "rounded-none": axisIdx === 1,
                })}
                value={binding.value}
                onChange={binding.onChange}
              />
            </div>
          );
        })}
      </div>
    </TabSectionWrapper>
  ));
}

export default TransformControls;
