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
import { HashIcon, PlusIcon, UserIcon } from "lucide-react";
import CreateChannelModal from "../components/CreateChannelModal";
import CustomChannelPreview from "../components/CustomChannelPreview";
import UsersList from "../components/UsersList";

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
                  <ChannelList
                  filters={{members: {$in:[chatClient?.user?.id]}}}
                  options={{state:true,watch:true,presence:true}}
                  Preview={({channel}) => (
                    <CustomChannelPreview
                    channel={channel}
                    activeChannel={activeChannel}
                    setActiveChannel={(channel) => setSearchParams({channel:channel.id})}/>
                  )}
                  List ={({children,loading,error}) => (
                    <div className="channel-sections">
                      <div className="section-header">
                        <div className="section-title"> 
                       <HashIcon className="size-4"/>
                       <span>Channels</span>
                      </div>
                      </div>

                      {loading && <div className="loading-message">Loading channels...</div>}
                      {error && <div className="error-message">Error loading channels</div>}

                      <div className="channels-list">
                        {children}
                        </div>

                        <div className="section-header direct-message">
                          <div className="section-title">
                            <UserIcon className="size-4" />
                            <span>Direct Messages</span>
                          </div>
                        </div>
                        <UsersList activeChannel={activeChannel}/>
                      </div>
                  )}
                   />
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
