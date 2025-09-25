import {StreamChat} from "stream-chat";
import {ENV} from "./env.js";

const streamClient = StreamChat.getInstance(
    ENV.STREAM_API_KEY,
    ENV.STREAM_API_SECRET,
  );

  //to save the user to stream
export const upsetStreamUser = async (userData) => {
    try {
        await streamClient.upsertUser(userData)
        console.log("Stream user upserted successfully",userData.name);
    } catch(error) {
     console.error("Error upserting stream user:", error);
    }
};

// to delete the user account

export const deleteStreamUser = async (userId) => {
    try {
        await streamClient.deleteUser(userId);
        console.log("Stream user deleted successfully",userId);
    } catch (error) {
        console.error("Error deleting stream user:", error);
    }
};
// to generate the stream token
export const generateStreamToken = (userId) => {
    try{
        const userIdString = userId.toString();
        return streamClient.createToken(userIdString);
    } catch (error) {
        console.error("Error generating stream token:", error);
        return null;
    }
};
// to add the user to the public channels
export const addUserToPublicChannels = async (newUserId) => {
    const publicChannels = await streamClient.queryChannels({discoverable: true});
    for(const channel of publicChannels) {
        await channel.addMembers([newUserId]);
    }
};
