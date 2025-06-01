import { serve } from "inngest/next";
import { inngest } from "../../../lib/inngest/client"; // ✅ updated

const testFunction = inngest.createFunction(
  { id: "test-function" },
  { event: "test/debug" },
  async ({ event }) => {
    console.log("Test event triggered:", event);
    return { message: "Test successful" };
  }
);

export const { GET, POST } = serve({
  client: inngest,
  functions: [testFunction],
});
