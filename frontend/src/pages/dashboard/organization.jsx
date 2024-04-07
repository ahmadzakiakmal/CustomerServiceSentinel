import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import { useState } from "react";

export default function Dashboard() {
  const options = [
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
  ];
  const [dropdownValue, setDropdownValue] = useState(options[0].value);
  return(
    <main>
      <Layout>
        <main className="text-dark-brown">
          <h1 className="text-[24px] font-medium mb-[50px]">Organization</h1>
          <Dropdown state={dropdownValue} setState={setDropdownValue} />
          <div className="mt-10">
            Value test: {dropdownValue}
          </div>
        </main>
      </Layout>
    </main>
  );
}