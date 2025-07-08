import { useSceneStore } from "@/store/scene.store";
import { useMemo, useState } from "react";
import {
  Box,
  Circle,
  Cylinder,
  Move3D,
  Palette,
  Settings,
  Square,
  Triangle,
} from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import type { DialogProps } from "@radix-ui/react-dialog";
import TransformControls from "./tabs/transform-control";
import MaterialControl from "./tabs/material-control";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const TabsConfig = [
  {
    id: "transform",
    label: "Transform",
    icon: Move3D,
    component: TransformControls,
  },
  {
    id: "material",
    label: "Material",
    icon: Palette,
    component: MaterialControl,
  },
] as const;

type T_TabsConfig = (typeof TabsConfig)[number];

function SidePanel(props: DialogProps) {
  return (
    <Sheet {...props}>
      <SheetContent
        hideOverlay
        className="rounded-2xl bg-secondary/50 backdrop-blur-lg w-[500px] mt-10 border  me-2"
      >
        <SidePanelContent />
      </SheetContent>
    </Sheet>
  );
}

function SidePanelContent() {
  const [activeTab, setActiveTab] = useState<T_TabsConfig["id"]>("transform");
  const selectedMesh = useSceneStore(
    (state) => state.meshes.find((m) => m.id === state.selectedMeshId) || null
  );

  const IconByMeshType = useMemo(() => {
    if (!selectedMesh) return Settings;

    switch (selectedMesh.type) {
      case "cone":
        return Triangle;
      case "cube":
        return Box;
      case "sphere":
        return Circle;
      case "cylinder":
        return Cylinder;
      case "plane":
        return Square;
      default:
        return Settings;
    }
  }, [selectedMesh]);

  if (!selectedMesh) return null;

  return (
    <aside className="flex flex-col">
      <div className="p-4 border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <IconByMeshType className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold capitalize">
              {selectedMesh.type}
            </h3>
            <p className="text-xs text-neutral-400">Object Properties</p>
          </div>
        </div>
      </div>
      <Tabs
        value={activeTab}
        onValueChange={(tab) => setActiveTab(tab as T_TabsConfig["id"])}
        className="flex flex-col h-full"
      >
        <ScrollArea className="w-full whitespace-nowrap">
          <ScrollBar orientation="horizontal" />
          <TabsList className="inline-flex gap-2 h-auto bg-transparent rounded-lg p-4">
            {TabsConfig.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="cursor-pointer hover:bg-neutral-700"
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-md font-light leading-none">
                    {tab.label}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </ScrollArea>
        <div className="overflow-hidden flex-1">
          <ScrollArea className="h-full">
            <div className="px-4">
              {TabsConfig.map((tabConfig) => (
                <TabsContent
                  value={tabConfig.id}
                  key={tabConfig.id}
                  className="mt-0 space-y-4"
                >
                  <tabConfig.component mesh={selectedMesh} key={tabConfig.id} />
                </TabsContent>
              ))}
            </div>
          </ScrollArea>
        </div>
      </Tabs>
    </aside>
  );
}

export default SidePanel;
