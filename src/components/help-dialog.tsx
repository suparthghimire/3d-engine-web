"use client";

import { HelpCircle, Mouse, MousePointer, Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { DialogProps } from "@radix-ui/react-dialog";

const helpSections = [
  {
    title: "Camera Controls",
    icon: Mouse,
    items: [
      {
        icon: Mouse,
        title: "Rotate View",
        description:
          "Hold middle mouse button and drag to rotate around the scene",
      },
      {
        icon: Mouse,
        title: "Zoom",
        description:
          "Scroll wheel up to zoom in, scroll wheel down to zoom out",
      },
    ],
  },
  {
    title: "Mesh Management",
    icon: MousePointer,
    items: [
      {
        icon: Keyboard,
        title: "Add Mesh",
        description: "Open the add mesh dialog",
        shortcut: "Shift + A",
      },
      {
        icon: MousePointer,
        title: "Select Mesh",
        description:
          "Left click on a mesh to select it. Only one mesh can be selected at a time.",
      },
      {
        icon: MousePointer,
        title: "Deselect",
        description:
          "Click outside of any mesh to deselect the current selection",
      },
    ],
  },
  {
    title: "Transform Tools",
    icon: Keyboard,
    items: [
      {
        icon: Keyboard,
        title: "Grab/Move",
        description: "Move the selected mesh around",
        shortcut: "G",
      },
      {
        icon: Keyboard,
        title: "Scale",
        description: "Resize the selected mesh",
        shortcut: "S",
      },
      {
        icon: Keyboard,
        title: "Rotate",
        description: "Rotate the selected mesh",
        shortcut: "R",
      },
    ],
  },
];

export function HelpDialog(props: DialogProps) {
  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Controls & Shortcuts
          </DialogTitle>
          <DialogDescription>
            Learn how to navigate and interact with the 3D scene
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {helpSections.map((section, sectionIndex) => {
            const SectionIcon = section.icon;
            return (
              <div key={sectionIndex} className="space-y-3">
                <div className="flex items-center gap-2">
                  <SectionIcon className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-sm">{section.title}</h3>
                </div>
                <div className="space-y-3 ml-6">
                  {section.items.map((item, itemIndex) => {
                    const ItemIcon = item.icon;
                    return (
                      <div key={itemIndex} className="flex items-start gap-3">
                        <ItemIcon className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">{item.title}</p>
                            {item.shortcut && (
                              <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border">
                                {item.shortcut}
                              </kbd>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {sectionIndex < helpSections.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={() => props.onOpenChange?.(false)}>
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
