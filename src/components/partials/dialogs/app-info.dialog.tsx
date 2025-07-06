import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, StarIcon } from "lucide-react";
import { APP_INFO } from "@/data/app-info";
import MorphyLogo from "@/components/ui/logo";
import type { DialogProps } from "@radix-ui/react-dialog";
import { Switch } from "@/components/ui/switch";

type T_AppInfoDialogProps = DialogProps & {
  showOnStartup?: boolean;
  onShowOnStartupChange?: (v: boolean) => void;
};
function AppInfoDialog({
  children,
  showOnStartup,
  onShowOnStartupChange,
  ...rest
}: T_AppInfoDialogProps) {
  return (
    <Dialog {...rest}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <DialogHeader className="text-center p-6  border-b">
          <div className="flex justify-center">
            <MorphyLogo withText className="w-40 h-20" />
          </div>
          <div>
            <DialogDescription className="text-sm mt-2 text-center">
              {APP_INFO.description}
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-6">
          <div className="space-y-2 px-6">
            <h4 className="text-sm font-medium">Features</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {APP_INFO.features.map((feature, index) => (
                <li key={index}>• {feature}</li>
              ))}
            </ul>
          </div>

          <Separator />

          <div className="space-y-3 text-xs px-6">
            <div className="flex items-center justify-between">
              <span className="font-medium text-muted-foreground">Version</span>
              <Badge variant="secondary" className="text-xs">
                v{APP_INFO.version}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-muted-foreground">
                Created by
              </span>
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-xs font-normal"
                onClick={() =>
                  window.open(APP_INFO.developer.website, "_blank")
                }
              >
                {APP_INFO.developer.name}
                <ExternalLink className="h-2 w-2 ml-1" />
              </Button>
            </div>
            {onShowOnStartupChange && (
              <div className="flex items-center justify-between">
                <span className="font-medium text-muted-foreground">
                  Show on startup
                </span>
                <Switch
                  checked={showOnStartup}
                  onCheckedChange={onShowOnStartupChange}
                />
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex sm:justify-between gap-2 p-6 border-t">
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 bg-transparent"
            >
              Close
            </Button>
          </DialogClose>
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 bg-transparent text-xs"
            onClick={() => window.open(APP_INFO.links.github, "_blank")}
          >
            <StarIcon />
            Star on Github
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AppInfoDialog;
