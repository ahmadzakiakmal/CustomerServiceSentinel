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
  state,
  setState,
  className,
}) {
  const [value, setValue] = useState(options[0]?.value);
  const [label, setLabel] = useState(options[0]?.label);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setValue(options[0]?.value);
    setLabel(options[0]?.label);
  }, [options]);

  useEffect(() => {
    if(value) setState(value);
  }, [value, setState]);

  if (!Array.isArray(options)) throw Error("options params must be an array");
  return (
    <div className={`w-fit relative ${className}`}>
      <div
        className={`px-[12px] py-3 outline-1 outline w-full rounded-[8px] cursor-pointer flex items-center justify-between min-w-[200px] select-none hover:bg-slate-400/20 ${!options[0]?.value || !options[0]?.label ? "opacity-60 bg-slate-400/20 cursor-not-allowed" : ""}`}
        onClick={() => {
          if (!options[0]?.value || !options[0]?.label) return;
          setIsOpen(!isOpen);
        }}
      >
        <h1>{label ?? "No Options"}</h1>
        <RxCaretDown className={`text-[24px] transition ${isOpen ? "-rotate-180" : ""}`} />
      </div>

      <div
        className={`grid transition-[grid-template-rows,outline] w-full rounded-[8px] outline absolute top-[calc(100%+5px)] ${
          isOpen ? "grid-rows-[1fr] outline-1" : "grid-rows-[0fr] outline-0"
        }`}
      >
        <div className="overflow-hidden w-full bg-white">
          {options.map((option, index) => {
            return (
              <DropdownItem
                key={index}
                label={option.label}
                value={option.value}
                setValue={setValue}
                setLabel={setLabel}
                setIsOpen={setIsOpen}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DropdownItem({ label, value, setValue, setLabel, setIsOpen }) {
  return (
    <div
      className="hover:bg-slate-400/20 p-2 cursor-pointer"
      onClick={() => {
        setValue(value);
        setLabel(label);
        setIsOpen(false);
      }}
    >
      {label}
    </div>
  );
}
