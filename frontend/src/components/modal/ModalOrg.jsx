import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

export default function ModalOrg({ show, onClose, item }) {
  const [name, setName] = useState("");

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
          isLoading: false,
        });
        onClose();
      })
      .catch((err) => {
        console.log(err);
        toast.update(loadingToast, {
          render: err?.response?.data?.message ?? "Can't connect to server",
          type: "error",
          isLoading: false,
          autoClose: 5000,
          className: "custom",
        });
      });
  };

  // Function to handle modal closure
  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div
      className={`modal ${
        show ? "block" : "hidden"
      } fixed inset-0 z-50 overflow-auto bg-dark-brown/60 backdrop-blur-[8px] bg-opacity-50`}
    >
      <div
        className="mx-auto my-10 p-8 rounded-lg z-50"
      >
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black/10 bg-center">
          <div className="z-10 h-fit max-w-[600px] w-3/4 overflow-y-auto rounded-lg bg-white p-4">
            <div className="flex justify-end text-base">
              <button
                type="button"
                onClick={handleClose}
                className="text-black"
              >
                <IoClose className="text-[20px]" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
              className="flex flex-col space-y-4"
            >
              <h1 className="pb-6 pt-4 font-bold text-left text-black md:text-2xl lg:text-3xl">
                Create Organization
              </h1>

              <label className="md:text-md text-sm font-bold lg:text-lg text-left">Name
                <input
                  type="text"
                  className="h-[22px] w-full rounded-md bg-gray-200 p-3 text-left text-black text-xl py-5"
                  placeholder="Organization's Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              <button
                type="submit"
                className="font-semibold w-fit px-10 flex cursor-pointer space-x-2 rounded bg-green-edit py-2 text-xs text-white md:text-sm lg:text-base"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
