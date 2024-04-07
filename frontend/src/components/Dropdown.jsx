import { useEffect, useState } from "react";
import { RxCaretDown } from "react-icons/rx";

export default function Dropdown({
  options = [
    {
      label: "Organization A",
      value: "Organization A",
    },
    {
      label: "Organization B",
      value: "Organization B",
    },
    {
      label: "Organization C",
      value: "Organization C",
    },
  ],
}) {
  const [value, setValue] = useState(null);
  const [display, setDisplay] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [value]);

  if (!Array.isArray(options)) throw Error("options params must be an array");
  return (
    <div className="w-fit relative">
      <div
        className="px-[12px] py-3 outline-1 outline w-fit rounded-[8px] cursor-pointer flex items-center justify-between min-w-[200px] select-none hover:bg-slate-400/20"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h1>{value ?? "Select..."}</h1>
        <RxCaretDown className={`text-[24px] transition ${isOpen ? "-rotate-180" : ""}`} />
      </div>

      <div
        className={`grid transition-[grid-template-rows,outline] w-full rounded-[8px] outline absolute top-[calc(100%+5px)] ${
          isOpen ? "grid-rows-[1fr] outline-1" : "grid-rows-[0fr] outline-0"
        }`}
      >
        <div className="overflow-hidden w-full">
          {options.map((option) => {
            return (
              <DropdownItem
                key={option.value}
                label={option.label}
                value={option.value}
                setValue={setValue}
                setDisplay={setDisplay}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DropdownItem({ label, value, setValue, setDisplay }) {
  return (
    <div
      className="hover:bg-slate-400/20 p-2 cursor-pointer"
      onClick={() => {
        setValue(value);
        setDisplay(label);
      }}
    >
      {label}
    </div>
  );
}
