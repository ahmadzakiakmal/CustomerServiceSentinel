import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import { useState } from "react";

export default function Dashboard() {
  const [dropdownValue, setDropdownValue] = useState("");
  return(
    <main>
      <Layout>
        <main className="text-dark-brown flex min-h-screen">
          <section className="min-w-[340px] border-r border-[#CACACA] p-10">
            <h1 className="text-[24px] font-medium mb-[50px]">Testing</h1>
            <Dropdown className="w-full" state={dropdownValue} setState={setDropdownValue} />
            <label className="flex flex-col gap-2 font-medium mt-4">
              Name
              <input type="text" className="w-full rounded-md outline outline-1 outline-light-brown px-3 py-2 lg:py-2.5 font-medium text-black" />
            </label>
            <label className="flex flex-col gap-2 font-medium mt-4">
              Instructions
              {/* <input type="text" className="w-full rounded-md outline outline-1 outline-light-brown px-3 py-2 lg:py-2.5 font-medium text-black" /> */}
              <textarea className="w-full min-h-[150px] rounded-md outline outline-1 outline-light-brown px-3 py-2 lg:py-2.5 font-medium text-black"></textarea>
            </label>
            <label className="flex flex-col gap-2 font-medium mt-4">
              Additional Data
              <input type="file" className="hidden" />
              <div className="w-full py-5 cursor-pointer text-light-brown rounded-md outline-1 outline-light-brown outline-dashed px-3 lg:py-2.5 font-medium">
                File
              </div>
            </label>
          </section>

          <section>
            <h1 className="text-[24px] font-medium p-10">Chat</h1>
          </section>
        </main>
      </Layout>
    </main>
  );
}