import { type PropsWithChildren } from "react";

function TabSectionWrapper(props: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-neutral-900 rounded-xl border">
      {props.children}
    </div>
  );
}

export default TabSectionWrapper;
