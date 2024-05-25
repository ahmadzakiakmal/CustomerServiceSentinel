import cutMessage from "@/utilities/cutMessage";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
// import { IoSaveSharp } from 'react-icons/io5'

export function CreateOrg() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  // Function to handle form submission for adding a new recipe
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Organization must have a name", { className: "custom" });
    }
    const loadingToast = toast.loading("Saving...", { className: "custom" });
    axios
      .post(
        process.env.NEXT_PUBLIC_API_URL + "/organization/create",
        {
          organizationName: name,
        },
        { withCredentials: true }
      )
      .then(() => {
        toast.update(loadingToast, {
          render: "Organization created",
          autoClose: 5000,
          className: "custom",
          type: "success",
          isLoading: false
        });
        router.replace("/dashboard/testing");
      })
      .catch((err) => {
        toast.update(loadingToast, {
          render: cutMessage(err?.response?.data?.message) ?? "Can't connect to server",
          type: "error",
          isLoading: false,
          autoClose: 5000,
          className: "custom",
        });
      });
  };

  return (
    <div className="bg-white">
      <div className="relative flex min-h-screen justify-center items-center">
        <form onSubmit={handleSubmit} className="flex-grow bg-white max-w-[80%] lg:max-w-[600px]">
          <div className="pb-6 pt-8 font-bold text-black text-xl lg:text-2xl">Create Organization</div>

          <div className="mt-2 font-bold text-lg">Name</div>
          <div className="pb-4">
            <input
              type="text"
              className="w-full
            rounded-md bg-gray-200 
            p-3 
            text-black
            text-base"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Organization's name"
            />
          </div>

          <div className="white relative w-1/6 flex-none mt-4">
            <button
              type="submit"
              className="font-semibold bottom-0 right-0 mb-2 mr-2 flex cursor-pointer items-center justify-end space-x-2 rounded bg-green-edit px-4 py-2 text-white text-base"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateOrg;

