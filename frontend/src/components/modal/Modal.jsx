import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Modal({ show, onClose, item }) {
  if (show === false) null;

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
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black/10 bg-center">
      <div className="z-10 h-fit max-h-[80vh] w-3/4 overflow-y-auto rounded-lg bg-white p-4 md:mx-72">
        <div className="flex justify-end text-base">
          <button type="button" onClick={handleClose} className="text-black">
            X
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="text-md pb-6 pt-4 font-bold text-left text-black md:text-xl lg:text-3xl">
            Update Staff
          </div>

          <div className="flex flex-col">
            <label className="md:text-md text-sm font-bold lg:text-lg text-left">
              Name
            </label>
            <input
              type="text"
              className="h-[22px] w-full rounded-md bg-gray-200 p-3 text-xs text-left text-black md:h-[44px] md:text-sm lg:h-[66px] lg:text-base"
              placeholder="Staff's Name"
            />
          </div>

          <div className="flex flex-col">
            <label className="md:text-md text-sm font-bold lg:text-lg text-left">
              Position
            </label>
            <input
              type="text"
              className="h-[22px] w-full rounded-md bg-gray-200 p-3 text-xs text-left text-black md:h-[44px] md:text-sm lg:h-[66px] lg:text-base"
              placeholder="Staff's Position"
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
  );
}
