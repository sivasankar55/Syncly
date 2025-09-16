import {StreamChat} from "stream-chat";
import {ENV} from "./env.js";

const streamClient = StreamChat.getInstance(
    ENV.STREAM_API_KEY,
    ENV.STREAM_API_SECRET,
  );

  //to save the user to stream
export const upsetStreamUser = async (userdata) => {
    try {
        await streamClient.upsertUser(userdata)
        console.log("Stream user upserted successfully",userdata.name);
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

export const generateStreamToken = (userId) => {
    try{
        const userIdString = userId.toString();
        return streamClient.createToken(userIdString);
    } catch (error) {
        console.error("Error generating stream token:", error);
        return null;
    }
};