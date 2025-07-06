import { Button } from "@/components/ui/button";
import MorphyLogo from "@/components/ui/logo";
import AppInfoDialog from "../dialogs/app-info.dialog";
import { ArrowLeftRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DEFAULT_ORBIT_POSITION, useSceneStore } from "@/store/scene.store";

function Header() {
  const setOrbitPosition = useSceneStore((state) => state.setOrbitPosition);
  return (
    <div className="flex items-center gap-2">
      <AppInfoDialog>
        <Button size="icon" className="size-12" variant="secondary">
          <MorphyLogo className="size-8" />
        </Button>
      </AppInfoDialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              onClick={() => setOrbitPosition(DEFAULT_ORBIT_POSITION)}
            >
              <ArrowLeftRight />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Goto Center</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default Header;
