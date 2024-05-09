import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import { useState } from "react";

export default function LoginPage({}) {
  const tableData = [
    {
      id: 1,
      name: "Sarah",
      position: "Human Resource Development",
      organization: "Organization A",
    },
    {
      id: 2,
      name: "John",
      position: "Finance Manager",
      organization: "Organization B",
    },
    {
      id: 3,
      name: "Emily",
      position: "Marketing Specialist",
      organization: "Organization C",
    },
    {
      id: 4,
      name: "Michael",
      position: "Operations Supervisor",
      organization: "Organization A",
    },
    {
      id: 5,
      name: "David",
      position: "IT Director",
      organization: "Organization B",
    },
    {
      id: 6,
      name: "Jessica",
      position: "Sales Representative",
      organization: "Organization C",
    },
    {
      id: 7,
      name: "Daniel",
      position: "Customer Service Manager",
      organization: "Organization A",
    },
    {
      id: 8,
      name: "Jennifer",
      position: "Product Development Specialist",
      organization: "Organization B",
    },
    {
      id: 9,
      name: "Matthew",
      position: "Supply Chain Coordinator",
      organization: "Organization C",
    },
    {
      id: 10,
      name: "Amanda",
      position: "Public Relations Officer",
      organization: "Organization A",
    },
    {
      id: 11,
      name: "Ryan",
      position: "Business Analyst",
      organization: "Organization B",
    },
  ];

  const [filteredData, setFilteredData] = useState(tableData);

  return (
    <Layout>
      <main className="min-h-screen relative bg-white-bg p-10">
        <div className="">
          <h1 className="text-[24px] font-medium mb-[50px]">Organization</h1>
          <div className="mt-8">
            <div>
              <form className="max-w-lg">
                <div className="flex">
                  <Dropdown />
                </div>
              </form>
            </div>
            <table className="mt-16 table w-3/4 text-center">
              <thead>
                <tr className="font-poppins bg-light-yellow text-dark-brown">
                  <th className="py-2 pl-3">id</th>
                  <th className="py-2 pl-3">Name</th>
                  <th className="py-2 pl-3">Position</th>
                  <th className="py-2 pl-3">Organization</th>
                  <th className="py-2 pl-3">Edit</th>
                  <th className="py-2 pl-3">Delete</th>
                </tr>
              </thead>
              <tbody className="w-full border">
                {filteredData.map((data, index) => (
                  <tr key={index} className="font-bold text-black">
                    <td className="py-4 pl-3 text-center">{index + 1}</td>
                    <td className="py-2 pl-3 text-left">{data.name}</td>
                    <td className="py-2 pl-3 text-left">{data.position}</td>
                    <td className="py-2 pl-3 text-left">{data.organization}</td>
                    <td className="py-2 pl-3 text-center">
                      <div className="flex justify-center items-center h-full">
                        <button
                          type="button"
                          className="flex items-center justify-center rounded bg-green-edit px-4 py-2 text-white-bg"
                        >
                          {/* <IoColorWandSharp className="mr-2" /> */}
                        Edit
                        </button>
                      </div>
                    </td>
                    <td className="py-2 pl-3 text-center">
                      <div className="flex justify-center items-center h-full">
                        <button
                          type="button"
                          className="flex items-center justify-center rounded bg-red-delete px-4 py-2 text-white-bg"
                        >
                          {/* <IoTrashBinSharp className="mr-2" /> */}
                        Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex mt-4">
            <div className="flex h-full px-2 py-4">
              <button
                type="button"
                className="flex font-bold items-center justify-center rounded bg-green-edit px-4 py-2 text-white-bg"
              >
                {/* <IoColorWandSharp className="mr-2" /> */}
              Edit Organization
              </button>
            </div>
            <div className="flex h-full px-2 py-4">
              <button
                type="button"
                className="flex font-bold items-center justify-center rounded bg-red-delete px-4 py-2 text-white-bg"
              >
                {/* <IoTrashBinSharp className="mr-2" /> */}
              Delete Organization
              </button>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
