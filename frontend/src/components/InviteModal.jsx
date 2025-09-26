import { useEffect,useState } from "react";
import { useChatContext } from "stream-chat-react";
import { XIcon } from "lucide-react";

const InviteModal = ({channel,onClose}) => {
    const {client} = useChatContext();// to get the stream chat client

    const [users,setUsers] = useState([]);// to store the users
    const [selectedMembers,setSelectedMembers] = useState([]);// to store the selected members
    const [isLoadingUsers,setIsLoadingUsers] = useState(true);// to show the loading spinner while fetching the users from stream
    const [error,setError] = useState("");// to show the error message
    const [isInviting,setInviting] = useState(false);// to show the loading spinner while inviting the members

    useEffect(() => {// to fetch the users
        const fetchUsers = async () => {
            setIsLoadingUsers(true);
            setError("")

            try {
                const members = Object.keys(channel.state.members)// to get the members
                const res = await client.queryUsers({id: {$nin:members}}, {name:1}, {limit:30})
                setUsers(res.users)
            } catch (error) {
                console.log("Error fetching users",error);
                setError("Failed to load users");
            }finally{
                setIsLoadingUsers(false);
            }
        };
        fetchUsers();
    },[channel,client]);

    const handleInvite = async () => {
        if(selectedMembers.length === 0) return;

        setInviting(true);
        setError("");   

        try {
            await channel.addMembers(selectedMembers)
            onClose();
        } catch (error) {
            setError("Failed to invite users");
            console.log("Error inviting users",error);
        }finally {
            setInviting(false);
        }
    };

  return (
    <div className="create-channel-modal-overlay">
        <div className="create-channel-modal">  
            {/* HEADER */}
            <div className="create-channel-modal__header">
          <h2>Invite Users</h2>
          <button onClick={onClose} className="create-channel-modal__close">
            <XIcon className="size-4" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="create-channel-modal__form">
        {isLoadingUsers && <p>Loading users...</p>}
          {error && <p className="form-error">{error}</p>}
          {users.length === 0 && !isLoadingUsers && <p>No users found</p>}

          {users.length > 0  && users.map(user => {
            const isChecked = selectedMembers.includes(user.id);// to check if the user is selected

            return (
                <label key={user.id}  className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all shadow-sm bg-white hover:bg-[#f5f3ff] border-2 ${
                    isChecked ? "border-[#611f69] bg-[#f3e6fa]" : "border-gray-200"
                  }`}
                  >
                      <input
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-sm accent-[#611f69]"
                    value={user.id}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedMembers([...selectedMembers, user.id]);
                      else setSelectedMembers(selectedMembers.filter((id) => id !== user.id));
                    }}
                  />
                     
                     {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="size-9 rounded-full object-cover border border-gray-300"
                    />
                  ) : (
                    <div className="size-9 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-lg">
                      {(user.name || user.id).charAt(0).toUpperCase()}
                    </div>
                  )}

                  <span className="font-medium text-[#611f69] text-base">
                    {user.name || user.id}
                  </span>
                </label>
            )
          })}

           {/* ACTIONS */}
           <div className="create-channel-modal__actions mt-4">
            <button className="btn btn-secondary" onClick={onClose} disabled={isInviting}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleInvite}
              disabled={!selectedMembers.length || isInviting}// to disable the button if no members are selected or loading in state
            >
              {isInviting ? "Inviting..." : "Invite"}
            </button>
          </div>
        </div>
        </div>
    </div>
  )
};

export default InviteModal;