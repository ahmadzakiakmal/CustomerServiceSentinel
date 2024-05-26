import Button from "@/components/Button";
import ChatPage from "@/components/ChatPage";
import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import cutMessage from "@/utilities/cutMessage";
import axios from "axios";
import { MdContentCopy } from "react-icons/md";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Dashboard() {
  const conversations = [
    [
      {
        isSender: true,
        content: "Hi, I have a question about my order status.",
        time: "10:00 AM",
        isError: false,
        image: null,
      },
      {
        isSender: false,
        content: "Sure, can you please provide me with your order number?",
        time: "10:01 AM",
        isError: false,
        image: null,
      },
      { isSender: true, content: "It's 123456.", time: "10:02 AM", isError: false, image: null },
      {
        isSender: false,
        content:
          "Thank you. Let me check that for you. Your order is currently being processed and should be shipped out by tomorrow.",
        time: "10:03 AM",
        isError: false,
        image: null,
      },
      { isSender: true, content: "Great, thank you!", time: "10:04 AM", isError: false, image: null },
    ],
    [
      { isSender: true, content: "What is your return policy?", time: "11:00 AM", isError: false, image: null },
      {
        isSender: false,
        content:
          "We have a 30-day return policy. You can return any item within 30 days of purchase for a full refund.",
        time: "11:01 AM",
        isError: false,
        image: null,
      },
      {
        isSender: true,
        content: "Do I need to pay for return shipping?",
        time: "11:02 AM",
        isError: false,
        image: null,
      },
      {
        isSender: false,
        content: "No, we provide a prepaid shipping label for all returns.",
        time: "11:03 AM",
        isError: false,
        image: null,
      },
      { isSender: true, content: "Thanks for the information!", time: "11:04 AM", isError: false, image: null },
    ],
    [
      { isSender: true, content: "How can I reset my password?", time: "12:00 PM", isError: false, image: null },
      {
        isSender: false,
        content:
          "You can reset your password by clicking on the 'Forgot Password' link on the login page. An email with reset instructions will be sent to you.",
        time: "12:01 PM",
        isError: false,
        image: null,
      },
      { isSender: true, content: "What if I don't receive the email?", time: "12:02 PM", isError: false, image: null },
      {
        isSender: false,
        content:
          "Please check your spam folder. If it's not there, you can contact us again and we will assist you further.",
        time: "12:03 PM",
        isError: false,
        image: null,
      },
      { isSender: true, content: "Okay, I'll try that. Thanks!", time: "12:04 PM", isError: false, image: null },
    ],
    [
      { isSender: true, content: "Are there any ongoing promotions?", time: "1:00 PM", isError: false, image: null },
      {
        isSender: false,
        content: "Yes, we currently have a 20% off sale on all summer clothing.",
        time: "1:01 PM",
        isError: false,
        image: null,
      },
      {
        isSender: true,
        content: "Do I need a code to avail the discount?",
        time: "1:02 PM",
        isError: false,
        image: null,
      },
      {
        isSender: false,
        content: "No code is needed. The discount will be automatically applied at checkout.",
        time: "1:03 PM",
        isError: false,
        image: null,
      },
      { isSender: true, content: "Awesome, thank you!", time: "1:04 PM", isError: false, image: null },
    ],
    [
      {
        isSender: true,
        content: "Can I change the delivery address for my order?",
        time: "2:00 PM",
        isError: false,
        image: null,
      },
      {
        isSender: false,
        content:
          "Yes, you can change the delivery address as long as the order has not been shipped. Please provide me with the new address.",
        time: "2:01 PM",
        isError: false,
        image: null,
      },
      {
        isSender: true,
        content: "The new address is 456 New Street, New City.",
        time: "2:02 PM",
        isError: false,
        image: null,
      },
      {
        isSender: false,
        content: "Thank you. I have updated the delivery address for your order.",
        time: "2:03 PM",
        isError: false,
        image: null,
      },
      { isSender: true, content: "Thanks for your help!", time: "2:04 PM", isError: false, image: null },
    ],
  ];

  const [activeOrganization, setActiveOrganization] = useState("");
  const [organizatons, setOrganizations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [botImage, setBotImage] = useState("");
  const [host, setHost] = useState("");

  const [convoIndex, setConvoIndex] = useState(0);
  const [botBubbleColor, setBotBubbleColor] = useState("#EBEBEB");
  const [botTextColor, setBotTextColor] = useState("#000000");
  const [userBubbleColor, setUserBubbleColor] = useState("#FFF3D9");
  const [userTextColor, setUserTextColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [errorColor, setErrorColor] = useState("#B12525");

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
      })
      .catch((err) => {
        console.log(err);
        toast.error(cutMessage(err?.response?.data?.message) ?? "Can't connect to server", {
          className: "custom",
        });
      });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {}, 100);
    console.log(activeOrganization);
    if (!activeOrganization) return;

    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/assistant-data/" + activeOrganization, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (!res.data.user_bubble_color) {
          setUserBubbleColor("#FFF3D9");
          setUserTextColor("#000000");
          setBackgroundColor("#FFFFFF");
          setBotBubbleColor("#EBEBEB");
          setBotTextColor("#000000");
          setErrorColor("#B12525");
          return;
        }
        setUserBubbleColor(res.data.user_bubble_color);
        setUserTextColor(res.data.user_text_color);
        setBackgroundColor(res.data.background_color);
        setBotBubbleColor(res.data.bot_bubble_color);
        setBotTextColor(res.data.bot_text_color);
        setErrorColor(res.data.error_text_color);
        setBotImage(
          res.data.image ? process.env.NEXT_PUBLIC_API_URL + "/assistant-data/image/" + activeOrganization : ""
        );
      })
      .catch((err) => {
        console.log(err);
        if (activeOrganization) {
          toast.error(cutMessage(err?.response?.data?.message) ?? "Can't connect to server", {
            className: "custom",
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [activeOrganization]);

  useEffect(() => {
    setHost(window.location.host);
  }, []);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.info("Link copied", { className: "custom" });
    } catch (err) {
      toast.error("Failed to copy link", { className: "custom" });
    }
  };

  return (
    <main>
      {isLoading && (
        <div className="w-full  h-full bg-dark-brown/60 backdrop-blur-[8px] fixed left-0 top-0 z-[10] flex justify-center items-center z-[20]">
          <h1 className="text-[25px] font-semibold animate-pulse text-white">Loading...</h1>
        </div>
      )}
      <Layout>
        <main className="text-dark-brown p-10">
          <h1 className="text-[24px] font-medium mb-[50px]">Appearance</h1>
          <Dropdown
            className="z-[1]"
            state={activeOrganization}
            setState={setActiveOrganization}
            options={organizatons}
          />
          <div className="flex flex-col lg:flex-row lg:gap-[100px] mt-4">
            <div>
              <label className="flex items-center gap-4 w-fit">
                <span className="w-[140px] font-medium">User Bubble Color</span>
                <input
                  type="color"
                  value={userBubbleColor}
                  onChange={(e) => {
                    setUserBubbleColor(e.target.value);
                  }}
                />
                {userBubbleColor}
              </label>
              <label className="flex items-center gap-4 w-fit">
                <span className="w-[140px] font-medium">User Text Color</span>
                <input
                  type="color"
                  value={userTextColor}
                  onChange={(e) => {
                    setUserTextColor(e.target.value);
                  }}
                />
                {userTextColor}
              </label>
              <label className="flex items-center gap-4 w-fit">
                <span className="w-[140px] font-medium">Background Color</span>
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => {
                    setBackgroundColor(e.target.value);
                  }}
                />
                {backgroundColor}
              </label>
            </div>
            <div>
              <label className="flex items-center gap-4 w-fit">
                <span className="w-[140px] font-medium">Bot Bubble Color</span>
                <input
                  type="color"
                  value={botBubbleColor}
                  onChange={(e) => {
                    setBotBubbleColor(e.target.value);
                  }}
                />
                {botBubbleColor}
              </label>
              <label className="flex items-center gap-4 w-fit">
                <span className="w-[140px] font-medium">Bot Text Color</span>
                <input
                  type="color"
                  value={botTextColor}
                  onChange={(e) => {
                    setBotTextColor(e.target.value);
                  }}
                />
                {botTextColor}
              </label>
              <label className="flex items-center gap-4 w-fit">
                <span className="w-[140px] font-medium">Error Text Color</span>
                <input
                  type="color"
                  value={errorColor}
                  onChange={(e) => {
                    setErrorColor(e.target.value);
                  }}
                />
                {errorColor}
              </label>
            </div>
          </div>
          <div className="flex gap-4 mt-1">
            <Button
              className="!text-[14px] !py-1 !bg-green-edit/90 hover:!bg-green-edit"
              onClick={() => {
                const loadingToast = toast.loading("Saving...", { className: "custom" });
                axios
                  .patch(
                    process.env.NEXT_PUBLIC_API_URL + "/assistant-data/colors/" + activeOrganization,
                    {
                      user_bubble_color: userBubbleColor,
                      user_text_color: userTextColor,
                      background_color: backgroundColor,
                      bot_bubble_color: botBubbleColor,
                      bot_text_color: botTextColor,
                      error_text_color: errorColor,
                    },
                    { withCredentials: true }
                  )
                  .then((res) => {
                    console.log(res);
                    toast.update(loadingToast, {
                      render: "Success",
                      type: "success",
                      isLoading: false,
                      autoClose: 5000,
                      className: "custom",
                    });
                  })
                  .catch((err) => {
                    toast.update(loadingToast, {
                      render: err?.response?.data?.message ?? "Can't connect to server",
                      type: "error",
                      isLoading: false,
                      autoClose: 5000,
                      className: "custom",
                    });
                  });
              }}
            >
              Save
            </Button>
            <Button
              className="!text-[14px] !py-1"
              onClick={() => {
                setUserBubbleColor("#FFF3D9");
                setUserTextColor("#000000");
                setBackgroundColor("#FFFFFF");
                setBotBubbleColor("#EBEBEB");
                setBotTextColor("#000000");
                setErrorColor("#B12525");
              }}
            >
              Reset
            </Button>
          </div>
          <h1 className="text-xl font-medium mt-8">Preview</h1>
          <div className="flex flex-row justify-between sm:items-center mb-2 mt-2">
            <p>
              Your chatbot is publicly accessible here: <br />{" "}
              <button
                title="Click to copy"
                className="font-medium text-yellow bg-dark-brown/95 hover:bg-dark-brown px-2 py-1 rounded-md underline flex gap-2 items-center"
                onClick={() => copyToClipboard(`http://${host}/chat/${activeOrganization}`)}
              >
                https://{host}/chat/{activeOrganization} <MdContentCopy />
              </button>
            </p>
            <Button
              className="!text-[14px] !py-1 !mt-0"
              onClick={() => {
                setConvoIndex(convoIndex == 4 ? 0 : convoIndex + 1);
              }}
            >
              Change Preview
            </Button>
          </div>
          <ChatPage
            botImage={botImage}
            messages={[
              ...conversations[convoIndex],
              {
                isSender: true,
                content: "Example error message",
                time: "10:00 AM",
                isError: true,
                image: null,
              },
            ]}
            colors={{
              bot: botBubbleColor,
              botTxt: botTextColor,
              user: userBubbleColor,
              userTxt: userTextColor,
              background: backgroundColor,
              error: errorColor,
            }}
          />
        </main>
      </Layout>
    </main>
  );
}
