import DraggableNumberInput from "@/components/ui/draggable-number-input";
import { cn } from "@/lib/utils";
import { useSceneStore, type T_Mesh } from "@/store/scene.store";
import { useCallback, useState } from "react";
import { Link, Link2Off } from "lucide-react";
import { Button } from "@/components/ui/button";

const TRANSFORM_TYPES = ["translation", "rotation", "scale"] as const;
const TRANSFORM_AXIS = ["x", "y", "z"] as const;

type T_TransformType = (typeof TRANSFORM_TYPES)[number];
type T_TransformAxis = (typeof TRANSFORM_AXIS)[number];

function SidePanel() {
  const [linkedTransforms, setLinkedTransforms] = useState<
    Record<T_TransformType, boolean>
  >({
    translation: false,
    rotation: false,
    scale: false,
  });
  const updateMesh = useSceneStore((state) => state.updateMesh);
  const selectedMesh = useSceneStore(
    (state) => state.meshes.find((m) => m.id === state.selectedMeshId) || null
  );

  const getAxisIndex = (axis: T_TransformAxis): 0 | 1 | 2 => {
    return axis === "x" ? 0 : axis === "y" ? 1 : 2;
  };

  const transformBinding = useCallback(
    (args: { type: T_TransformType; axis: T_TransformAxis }) => {
      if (!selectedMesh) return null;

      const { type, axis } = args;
      const axisIndex = getAxisIndex(axis);

      const prop = {
        translation: "position",
        rotation: "rotation",
        scale: "scale",
      }[type] as keyof T_Mesh;

      const currentValue = selectedMesh[prop]?.[axisIndex];
      if (typeof currentValue !== "number") return null;

      const isLinked = linkedTransforms[type];
      return {
        value: currentValue,
        onChange: (val: number) => {
          const updatedArray = [...selectedMesh[prop]] as number[];

          if (isLinked) {
            updatedArray[0] = val;
            updatedArray[1] = val;
            updatedArray[2] = val;
          } else {
            updatedArray[axisIndex] = val;
          }

          updateMesh({
            meshId: selectedMesh.id,
            payload: {
              ...selectedMesh,
              [prop]: updatedArray,
            },
          });
        },
      };
    },
    [selectedMesh, updateMesh, linkedTransforms]
  );

  const toggleLink = (type: T_TransformType) => {
    setLinkedTransforms((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  if (!selectedMesh) return null;

  return (
    <aside className="bg-neutral-800 max-w-60 p-2 px-3 rounded-lg text-white flex flex-col gap-6">
      {TRANSFORM_TYPES.map((type) => (
        <div className="flex flex-col gap-1" key={`tc-${type}`}>
          <div className="flex items-center justify-between">
            <p className="capitalize font-semibold text-sm">{type} </p>
            <Button
              variant={linkedTransforms[type] ? "default" : "outline"}
              size="icon"
              onClick={() => toggleLink(type)}
            >
              {linkedTransforms[type] ? (
                <Link className="w-4 h-4" />
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
                <div
                  className="flex flex-col gap-1"
                  key={`tc-${type}-a-${axis}`}
                >
                  <span className="text-xs font-medium">{axis}</span>
                  <DraggableNumberInput
                    className={cn({
                      "border-l-0 rounded-tl-none rounded-bl-none":
                        axisIdx === 2,
                      "border-r-0 rounded-tr-none rounded-br-none":
                        axisIdx === 0,
                      "rounded-none": axisIdx === 1,
                    })}
                    value={binding.value}
                    onChange={binding.onChange}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </aside>
  );
}

export default SidePanel;
