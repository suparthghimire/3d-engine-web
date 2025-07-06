import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { HoverCardArrow } from "@radix-ui/react-hover-card";

type T_NavButtonProps = {
  type: "add-mesh" | "render" | "export" | "reset-scene";
  icon: React.ReactNode;
};

function NavButton(props: T_NavButtonProps) {
  return (
    <HoverCard openDelay={0} closeDelay={20}>
      <HoverCardTrigger asChild>
        <Button size="icon">{props.icon}</Button>
      </HoverCardTrigger>
      <HoverCardContent side="right" className="min-w-80">
        <div className="flex justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="text-muted-foreground text-xs">
              Joined December 2021
            </div>
          </div>
        </div>
        <HoverCardArrow />
      </HoverCardContent>
    </HoverCard>
  );
}

export default NavButton;
