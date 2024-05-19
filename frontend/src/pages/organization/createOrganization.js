import { useRouter } from "next/navigation";
import { useState } from "react";
// import { IoSaveSharp } from 'react-icons/io5'

export function CreateOrg() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  // Function to handle form submission for adding a new recipe
  const handleSubmit = async (e) => {};

  return (
    <div className="bg-white">
      <div className="relative flex min-h-screen">
        <div className="w-1/6 flex-none" />
        <div className="w-2/3 flex-grow bg-white">
          <div className="text-md pb-6 pt-8 font-bold text-black md:text-xl lg:text-3xl">
            Create Organization
          </div>

          <div className="md:text-md mt-2 text-sm font-bold lg:text-lg">
            Name
          </div>
          <div className="pb-4">
            <input
              type="text"
              className="h-[22px]  w-3/4 
            rounded-md bg-gray-200 
            p-3 text-xs
            text-black
            md:h-[44px] md:text-sm
            lg:h-[44px] lg:text-base"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Organization's name"
            />
          </div>

          <div className="md:text-md mt-2 text-sm font-bold lg:text-lg">
            Description
          </div>
          <div className="pb-4">
            <textarea
              className="w-3/4 min-h-22 rounded-md bg-gray-200 p-3 text-xs text-black overflow-y-auto md:text-sm lg:text-base"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Organization's description"
            />
          </div>

          <div className="white relative w-1/6 flex-none mt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="font-semibold bottom-0 right-0 mb-2 mr-2 flex cursor-pointer items-center justify-end space-x-2 rounded bg-green-edit px-4 py-2 text-xs text-white md:text-sm lg:text-base"
            >
              {" "}
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateOrg;
