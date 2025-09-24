import { UserButton } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { useStreamChat } from "../hooks/useStreamChat";
import PageLoader from "../components/PageLoader";
import "../styles/stream-chat-theme.css";
import {
  Chat,
  Channel,
  ChannelList,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import { PlusIcon } from "lucide-react";
import CreateChannelModal from "../components/CreateChannelModal";

const HomePage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // to open the create channel modal
  const [activeChannel, setActiveChannel] = useState(null); // to store the active channel
  const [searchParams, setSearchParams] = useSearchParams(); // to get the search params

  const { chatClient, error, isLoading } = useStreamChat(); // to get the stream chat client

  //set active channel from URL params
  useEffect(() => {
    if (chatClient) {
      const channelId = searchParams.get("channel"); // get the channel id from the URL
      if (channelId) {
        const channel = chatClient.channel("messaging", channelId); // connect to the channel
        setActiveChannel(channel);
      }
    }
  }, [chatClient, searchParams]);

  if (error) return <div>{error.message}</div>;
  if (isLoading || !chatClient) return <PageLoader />;

  return (
    <div className="chat-wrapper">
      <Chat client={chatClient}>
        <div className="chat-container">
          {/* LEFT SIDEBAR */}
          <div className="str-chat_channel-list">
            <div className="team-channel-list">
              {/*HEADER*/}
              <div className="team-channel-list__header gap-4">
                <div className="brand-container">
                  <img src="/logo.png" alt="Logo" className="brand-logo" />
                  <span className="brand-name">Syncly</span>
                </div>
                <div className="user-button-wrapper">
                  <UserButton />
                </div>
              </div>
               {/* CHANNELS LIST */}
               <div className="team-channel-list__content"> {/* coming from stream chat bem class names */}
                <div className="create-channel-section">
                  <button onClick={ () => setIsCreateModalOpen(true)}className="create-channel-btn"><PlusIcon className="size-4" /><span>Create Channel</span></button>
                </div>
                {/* CHANNEL LIST */}

               </div>
            </div>
          </div>
          {/* RIGHT CONTAINER */}  
          <div className="chat-main">
            <Channel channel={activeChannel}> {/*to render the active channel*/}
              <Window>
              {/* <CustomChannelHeader /> */}
              <MessageList />
              <MessageInput />
              </Window>
              <Thread />
            </Channel>
          </div>
        </div>
        
        {isCreateModalOpen && <CreateChannelModal onClose={() => setIsCreateModalOpen(false)} />}
      </Chat>
    </div>
  );
};

export default HomePage;
