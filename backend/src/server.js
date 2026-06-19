import  "../instrument.mjs";
import express from "express";
import {ENV} from "./config/env.js"
import {connectDB} from "./config/db.js";
import {clerkMiddleware} from "@clerk/express";
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";
import chatRoutes from "./routes/chat.route.js";
import cors from "cors";
import * as Sentry from "@sentry/node";

const app = express();
app.use(express.json());// JSON middleware to process incoming JSON POST payloads.
app.use(cors({origin: ENV.CLIENT_URL, credentials: true}));// Enable CORS
app.use(clerkMiddleware()); // req.auth will be available in the request object.

app.get("/debug-sentry", (req,res) => {
  throw new Error("My first Sentry error!");
});

app.get("/", (req,res) => {
  res.send("Hello World");
});


app.use("/api/inngest", serve({ client: inngest, functions }));// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use("/api/chat", chatRoutes);
Sentry.setupExpressErrorHandler(app);

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