import { Button } from "@/components/ui/button";
import MorphyLogo from "@/components/ui/logo";
import AppInfoDialog from "../dialogs/app-info.dialog";

function Header() {
  return (
    <AppInfoDialog>
      <Button size="icon" className="size-12" variant="secondary">
        <MorphyLogo className="size-8" />
      </Button>
    </AppInfoDialog>
  );
}

export default Header;
