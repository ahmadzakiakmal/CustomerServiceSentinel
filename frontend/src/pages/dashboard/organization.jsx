import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import { useState } from "react";
import Modal from "@/components/modal/Modal";
import ModalOrg from "@/components/modal/ModalOrg";

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
  const [showModal, setShowModal] = useState(false);
  const [showOrgModal, setShowOrgModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    try {
      e.preventDefault();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <main className="min-h-screen relative bg-white-bg p-10">
        <div className="">
          <h1 className="text-[24px] font-medium mb-[50px]">Organization</h1>
          <div className="mt-8">
            <div>
              <form className="max-w-lg">
                <div className="flex flex-row items-center gap-4">
                  <div>
                  <Dropdown />
                  </div>
                  <div class="">
                      
                      <button
                          type="button"
                          className="flex items-center justify-center rounded bg-blue-500 hover:bg-blue-700 px-4 py-2 text-white font-medium"
                          onClick={() => setShowOrgModal(true)}
                        >
                          {/* <IoColorWandSharp className="mr-2" /> */}
                          Add Organization
                        </button>
                        {showOrgModal && (
                          <ModalOrg
                            show={showOrgModal}
                            onClose={() => setShowOrgModal(false)}
                          />
                        )}
                      </div>
                </div>
              </form>
              <form className="mt-4 mx-3">
                <label for="password">Edit Organization Name:</label>

                <input
                  type="text"
                  className="border-b-2 mx-2"
                  placeholder="Organization's Name"
                  required
                />

                <button
                  type="submit"
                  className="text-green-edit"
                >
                  Save
                </button>
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
                  <tr
                    key={index}
                    className="font-bold text-black"
                  >
                    <td className="py-4 pl-3 text-center">{index + 1}</td>
                    <td className="py-2 pl-3 text-left">{data.name}</td>
                    <td className="py-2 pl-3 text-left">{data.position}</td>
                    <td className="py-2 pl-3 text-left">{data.organization}</td>
                    <td className="py-2 pl-3 text-center">
                      <div className="flex justify-center items-center h-full">
                        <button
                          type="button"
                          className="flex items-center justify-center rounded bg-green-edit px-4 py-2 text-white font-medium"
                          onClick={() => setShowModal(true)}
                        >
                          {/* <IoColorWandSharp className="mr-2" /> */}
                          Edit
                        </button>
                        {showModal && (
                          <Modal
                            show={showModal}
                            onClose={() => setShowModal(false)}
                          />
                        )}
                      </div>
                    </td>
                    <td className="py-2 pl-3 text-center">
                      <div className="flex justify-center items-center h-full">
                        <button
                          type="button"
                          className="flex items-center justify-center rounded bg-red-delete px-4 py-2 text-white font-medium"
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
        </div>
      </main>
    </Layout>
  );
}

