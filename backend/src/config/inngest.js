import { connectDB } from "./db.js";
import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "Syncly" });

const syncUser = inngest.createFunction(
    {id: "sync-user"},
    {event:"clerk/user.created"},
    async({event}) => {
        await connectDB();

        const {id, email_address, first_name, last_name,image_url} = event.data;

        const newUser = {
            clerkId: id,
            email: email_address[0]?.email_address,
            name: `${first_name || ""} ${last_name || ""}`,
            image: image_url,
        }

        await User.create(newUser);
        // more in later
    }
);

 const deleteUserFromDB = inngest.createFunction(
    {id:"delete-user-from-db"},
    {event:"clerk/user.deleted"},
    async({event}) => {
        const {id} = event.data;
        await User.deleteOne({clerkId: id});
        await deleteStreamUser(id,toString());
        //more in later
    }
 );
// Create an empty array where we'll export future Inngest functions
export const functions = [syncUser, deleteUserFromDB];