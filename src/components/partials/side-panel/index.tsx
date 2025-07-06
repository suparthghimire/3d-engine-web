import DraggableNumberInput from "@/components/ui/draggable-number-input";
import { useState } from "react";

function SidePanel() {
  const [number1, setNumber1] = useState<number>(0);
  const [number2, setNumber2] = useState<number>(0);
  const [number3, setNumber3] = useState<number>(0);
  return (
    <aside className="bg-neutral-800 max-w-60 p-2 px-3 rounded-lg text-white flex flex-col gap-6">
      <div className="flex items-center">
        <div className="flex flex-col gap-2">
          <p>x</p>
          <DraggableNumberInput
            className="rounded-tr-none rounded-br-none border-r-0"
            onChange={setNumber1}
            value={number1}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>y</p>
          <DraggableNumberInput
            className="rounded-tl-none rounded-bl-none rounded-tr-none rounded-br-none"
            onChange={setNumber2}
            value={number2}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>z</p>
          <DraggableNumberInput
            className="rounded-tl-none rounded-bl-none border-l-0"
            onChange={setNumber3}
            value={number3}
          />
        </div>
      </div>
    </aside>
  );
}

export default SidePanel;
