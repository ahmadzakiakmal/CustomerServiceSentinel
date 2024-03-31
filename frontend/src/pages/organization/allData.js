import { useState } from "react";

export default function LoginPage({}) {
  const categories = ["Organization A", "Organization B", "Organization C", "Organization D"];
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

  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredData, setFilteredData] = useState(tableData);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    // Filter data berdasarkan kategori yang dipilih
    if (category === null || category === "All Organizations") {
      // Jika kategori "All Organizations" dipilih, tampilkan semua data
      setFilteredData(tableData);
    } else {
      // Jika kategori tertentu dipilih, filter data berdasarkan organisasi yang sesuai
      const filtered = tableData.filter(
        (item) => item.organization === category,
      );
      setFilteredData(filtered);
    }

    // Sembunyikan dropdown setelah kategori dipilih
    toggleDropdown();
  };

  const toggleDropdown = () => {
    const dropdown = document.getElementById("dropdown");
    dropdown.classList.toggle("hidden");
  };

  return (
    <div className="min-h-screen relative bg-white-bg">
      <div className="ml-8 pt-4 ">
        <div className="text-xl md:text-2xl lg:text-3xl font-semibold text-light-brown">
          Organization Data
        </div>
        <div className="mt-8">
          <div>
            <form className="max-w-lg">
              <div className="flex">
                <div id="dropdown-button">
                  <label
                    htmlFor="search-dropdown"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >
                    Your Email
                  </label>
                  <button
                    id="dropdown-button"
                    onClick={toggleDropdown}
                    className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                    type="button"
                  >
                    {selectedCategory || "All Organizations"}
                    <svg
                      className="w-2.5 h-2.5 ms-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  <div
                    id="dropdown"
                    className="z-10 hidden bg-white-bg divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                  >
                    <ul
                      className="py-2 text-sm w-44 text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdown-button"
                    >
                      {/* Menambahkan satu li untuk "All Organizations" */}
                      <li
                        className="inline-flex w-44 px-4 py-2 hover:bg-light-gray dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => handleCategoryChange(null)}
                      >
                        All Organizations
                      </li>
                      {/* Looping untuk menampilkan kategori yang ada */}
                      {categories.map((category) => (
                        <li
                          key={category}
                          className="inline-flex w-44 px-4 py-2 hover:bg-light-gray dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={() => handleCategoryChange(category)}
                        >
                          {category}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
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
    </div>
  );
}
