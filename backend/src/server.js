import express from "express";
import {ENV} from "./config/env.js"
import {connectDB} from "./config/db.js";
import {clerkMiddleware} from "@clerk/express";
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";

const app = express();
app.use(express.json());// Important: ensure you add JSON middleware to process incoming JSON POST payloads.

app.use(clerkMiddleware()); // req.auth will be available in the request object.

app.use("/api/inngest", serve({ client: inngest, functions }));// Set up the "/api/inngest" (recommended) routes with the serve handler


app.get("/", (req,res) => {
    res.send("Hello World");
});

const startServer = async () => {
  try {
    await connectDB();
    if(ENV.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => {
        console.log("Server running on port:",ENV.PORT);
      });
    }
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);// exit the process with a failure code
  }
}

startServer();

export default app;