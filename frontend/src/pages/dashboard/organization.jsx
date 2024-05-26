import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import Modal from "@/components/modal/Modal";
import ModalOrg from "@/components/modal/ModalOrg";
import { IoColorWandSharp, IoTrashBinSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import cutMessage from "@/utilities/cutMessage";

export default function LoginPage({}) {
  const [activeOrganization, setActiveOrganization] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [orgName, setOrgName] = useState("");
  const [owner, setOwner] = useState("");
  const [user, setUser] = useState("");
  const [filteredData, setFilteredData] = useState([]);
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

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/organization", {
        withCredentials: true,
      })
      .then((res) => {
        const mapOwnedOrgs = res.data.owned.map((org) => {
          return {
            value: org._id.$oid,
            label: org.organization_name,
          };
        });
        const mapMemberOrgs = res.data.member.map((org) => {
          return {
            value: org._id.$oid,
            label: org.organization_name,
          };
        });
        if ([...mapOwnedOrgs, ...mapMemberOrgs].length === 0) {
          router.push("/organization/create"); // navigate to create org
          return toast.info("You don't have an organization yet, please create one", { className: "custom" });
        }
        setOrganizations([...mapOwnedOrgs, ...mapMemberOrgs]);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message ?? "Can't connect to server", {
          className: "custom",
        });
        if (err?.response?.status == 401) {
          router.replace("/auth/login");
        }
      });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (activeOrganization === "") return;
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/organization/member/" + activeOrganization, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setOrgName(res.data.organization);
        setOwner(res.data.owner);
        setUser(res.data.user);
        setFilteredData(res.data.members.map((member) => {
          return(member.email);
        }));
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Error occured", { className: "custom" });
      });
  }, [activeOrganization]);

  const verifyOwner = () => {
    if (user !== owner) return false;
    return true;
  };

  return (
    <Layout>
      <main className="min-h-screen relative bg-white-bg p-10 w-[100vw] overflow-hidden pb-[120px]">
        <h1 className="text-[24px] font-medium mb-[50px]">Organization</h1>
        <form className="w-fit">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Dropdown
              className="w-fit z-[1]"
              state={activeOrganization}
              setState={setActiveOrganization}
              options={organizations}
            />
            <button
              type="button"
              className="flex !w-max items-center justify-center rounded bg-blue-500 hover:bg-blue-700 px-4 py-2 text-white font-medium"
              onClick={() => setShowOrgModal(true)}
            >
              Create Organization
            </button>
          </div>
        </form>
        <ModalOrg show={showOrgModal} onClose={() => setShowOrgModal(false)} />
        <div className="mt-8">
          Owner: <span className="font-medium">{owner}</span>
        </div>
        <form className="mt-4 sm:mt-4 flex flex-col sm:flex-row w-fit gap-2 sm:gap-4 sm:items-center">
          <label>Edit Organization Name:</label>
          <div className="flex gap-4">
            <input
              type="text"
              className="border-b-2 py-1 px-2 focus:outline-none disabled:opacity-60"
              placeholder="Organization's Name"
              required
              value={orgName}
              disabled={!verifyOwner()}
              onChange={(e) => setOrgName(e.target.value)}
            />
            {verifyOwner() && (
              <button
                type="submit"
                className="text-green-edit hover:bg-green-edit/80 hover:text-white transition px-2 rounded-md active:bg-green-edit"
              >
                Save
              </button>
            )}
          </div>
        </form>

        <div className="overflow-y-auto overflow-x-auto md:max-w-[75%] mt-16 py-2">
          <table className="w-full text-center">
            <thead>
              <tr className="font-poppins bg-light-yellow text-dark-brown">
                <th className="py-2 px-4">id</th>
                <th className="py-2 text-left">Name</th>
                <th className="py-2 text-left">Position</th>
                <th className="py-2 text-left">Organization</th>
                <th className="py-2">Delete</th>
              </tr>
            </thead>
            <tbody className="w-full border">
              <tr
                className="font-medium text-black"
              >
                <td className="py-4 text-center">1</td>
                <td className="py-2 text-left w-max pr-5">{owner}</td>
                <td className="py-2 text-left">Owner</td>
                <td className="py-2 text-left pr-5">{orgName}</td>
                <td className="py-2 text-center">
                  <div className="flex justify-center items-center h-full">
                    <button
                      type="button"
                      className="flex items-center justify-center rounded bg-red-delete px-4 py-2 text-white font-medium disabled:opacity-60"
                      disabled={!verifyOwner()}
                    >
                      <IoTrashBinSharp />
                    </button>
                  </div>
                </td>
              </tr>
              {filteredData.map((data, index) => (
                <tr
                  key={index}
                  className="font-medium text-black"
                >
                  <td className="py-4 text-center">{index + 2}</td>
                  <td className="py-2 text-left w-max pr-5">{data}</td>
                  <td className="py-2 text-left">Member</td>
                  <td className="py-2 text-left pr-5">{orgName}</td>
                  <td className="py-2 text-center">
                    <button
                      type="button"
                      className="flex mx-auto items-center justify-center rounded bg-red-delete px-4 py-2 text-white font-medium disabled:opacity-60 disabled:!cursor-not-allowed"
                      disabled={!verifyOwner()}
                    >
                      <IoTrashBinSharp />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </Layout>
  );
}
