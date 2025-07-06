import { Button } from "@/components/ui/button";
import MorphyLogo from "@/components/ui/logo";
import AppInfoDialog from "../dialogs/app-info.dialog";
import { MeshSelectorDropdown } from "@/components/scene/components/mesh/mesh-selector-dropdown";
import { BoxIcon } from "lucide-react";

function Header() {
  return (
    <div className="flex items-center gap-2">
      <AppInfoDialog>
        <Button size="icon" className="size-12" variant="secondary">
          <MorphyLogo className="size-8" />
        </Button>
      </AppInfoDialog>

      <MeshSelectorDropdown>
        <Button variant="secondary">
          Add Mesh <BoxIcon />
        </Button>
      </MeshSelectorDropdown>
    </div>
  );
}

export default Header;
