import type { PropsWithChildren } from "react";

function MainLayout(props: PropsWithChildren) {
  return (
    <main className="h-dvh bg-background text-foreground">
      {props.children}
    </main>
  );
}

export default MainLayout;
