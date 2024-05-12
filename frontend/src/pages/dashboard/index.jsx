import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";

export default function Dashboard() {
  return (
    <main>
      <Layout>
        <main className="text-dark-brown p-10 font-rubik ">
          <h1 className="text-[24px] font-medium">Dashboard</h1>
        </main>
        <div className="flex justify-start md:px-8">
          <Dropdown></Dropdown>
        </div>
        {/* Template Only */}
        <div class="flex flex-col items-start justify-start gap-[8px] md:px-8 md:py-32">
          <div class="relative font-medium inline-block min-w-[45px]">Name</div>
          <div class="relative text-sm inline-block min-w-[91px]">
            CoolAssistant
          </div>
          <div class="relative font-medium inline-block min-w-[95px]">
            Instructions
          </div>
          <div class="relative text-sm">
            <ul class="m-0 font-inherit text-inherit pl-[19px]">
              <li class="mb-1">
                You are a customer service for companies in the financial sector
              </li>
              <li class="mb-1">Act like a Gen Z and use Gen Z slang words</li>
              <li>Phone number of HRD is 010-1234-5678</li>
            </ul>
          </div>
          <div class="relative font-medium inline-block min-w-[95px] mt-12">
            Additional Data
          </div>
          <button className="cursor-pointer rounded-lg flex flex-row items-start justify-start border-[1px] border-solid border-darkslategray">
            <div className="h-[45px] w-[191px] relative rounded-lg box-border hidden border-[1px] border-solid border-darkslategray" />
            <div className="relative text-sm font-rubik text-left z-[1]">
              {/*Template*/}
              organization-structure.txt
            </div>
          </button>
        </div>
        <div class="fixed bottom-0 right-0 flex justify-end mr-8 mb-8">
          <Button>Manage Data</Button>
        </div>
      </Layout>
    </main>
  );
}
