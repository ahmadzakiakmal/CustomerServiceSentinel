import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function ModalOrg({ show, onClose, item }) {
  const [name, setName] = useState("");

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

  // Function to handle modal closure
  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div
      className={`modal ${show ? "block" : "hidden"} fixed inset-0 z-50 overflow-auto bg-dark-brown/60 backdrop-blur-[8px] bg-opacity-50`}
    >
      <div
        className="modal-content mx-auto my-10 p-8 rounded-lg z-50"
        style={{ maxWidth: "calc(100% - 250px)" }}
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
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div className="pb-6 pt-4 font-bold text-left text-black md:text-2xl lg:text-3xl">
                Create Organization
              </div>

              <div className="flex flex-col">
                <label className="md:text-md text-sm font-bold lg:text-lg text-left">
                  Name
                </label>
                <input
                  type="text"
                  className="h-[22px] w-full rounded-md bg-gray-200 p-3 text-left text-black text-xl py-5"
                  placeholder="Organization's Name"
                />
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="font-semibold bottom-0 right-0 mb-2 mr-2 flex cursor-pointer items-center justify-end space-x-2 rounded bg-green-edit px-4 py-2 text-xs text-white md:text-sm lg:text-base"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
