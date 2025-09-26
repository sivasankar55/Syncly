import { HashIcon,LockIcon,UsersIcon,PinIcon,VideoIcon } from "lucide-react"
import { useChannelStateContext } from "stream-chat-react"
import { useState } from "react"
import {useUser} from "@clerk/clerk-react";
import MembersModal from "./MembersModal";
import PinnedMessagesModal from "./PinnedMessagesModal";
import InviteModal from "./InviteModal";

const CustomChannelHeader = () => {

  const {channel} = useChannelStateContext();// to get the channel
  const {user} = useUser();// to get the user

  const memberCount = Object.keys(channel.state.members).length;// to get the member count

  const [showInvite, setShowInvite] = useState(false);// to show the invite modal
  const [showMembers, setShowMembers] = useState(false);// to show the members modal
  const [showPinnedMessages, setShowPinnedMessages] = useState(false);// to show the pinned messages modal
  const [pinnedMessages, setPinnedMessages] = useState([]);// to store the pinned messages

  const otherUser = Object.values(channel.state.members).find((member) => member.user.id !== user.id);// to get the other user

  const isDM = channel.data?.member_count === 2 && channel.data.id.includes("user_");// to check if the channel is a DM


const handleShowPinned = async () => {// to show the pinned messages
  const channelState = await channel.query();// to get the channel state
  setPinnedMessages(channelState.pinned_messages);// to set the pinned messages
  setShowPinnedMessages(true);
}

const handleVideoCall = async () => {// to start a video call
  if(channel) {
    const callUrl =`${window.location.origin}/call/${channel.id}`// to get the call url
    await channel.sendMessage({
      text:`I've started a video call. Join me here: ${callUrl}`
    })
  }
}
  return (
    <div className="h-14 border-b border-gray-200 flex items-center px-4 justify-between bg-white">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {channel.data?.private ?  (
            <LockIcon className="size-4 text-[#616061]"/>
          ):(
            <HashIcon className="size-4 text-[#616061]"/>
          )}

          {isDM && otherUser?.user.image && (
            <img
            src={otherUser.user.image}
            alt={otherUser.user.name || otherUser.user.id}
            className="size-7 rounded-full object-cover mr-1"
            />
          )}
           
          <span className="font-medium text-[#1D1C1D]">
            {isDM? otherUser?.user.name || otherUser?.user.id : channel.data?.name || channel.data?.id}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
         <button className="flex items-center gap-2 hover:bg-[#F8F8F8] py-1 px-2 rounded"
         onClick={() => setShowMembers(true)}>
               
           <UsersIcon className="size-4 text-[#616061]"/>
           <span className="text-sm  text-[#616061]">{memberCount}</span>
         </button>
         
         <button className="hover:bg-[#F8F8F8] py-1 rounded" onClick={handleVideoCall}
         title="Start Video Call">
          <VideoIcon className="size-5 text-[#1264A3]"/>
         </button>

        {channel.data?.private && (
          <button className="btn btn-primary" onClick={() => setShowInvite(true)}>
             Invite
          </button>
        )}

        <button className="hover:bg-[#F8F8F8] py-1 rounded" onClick={handleShowPinned}>
          <PinIcon className="size-4 text-[#616061]"/>
        </button>
      </div>

      {showMembers && (// to show the members modal
        <MembersModal
        members={Object.values(channel.state.members)}
        onClose={() => setShowMembers(false)}
        />
      )}

      {showPinnedMessages && (// to show the pinned messages modal
        <PinnedMessagesModal
        pinnedMessages={pinnedMessages}
        onClose={() => setShowPinnedMessages(false)}
        />
      )}

{showInvite && <InviteModal channel={channel} onClose={() => setShowInvite(false)} />}
    </div>
  );
};

export default CustomChannelHeader