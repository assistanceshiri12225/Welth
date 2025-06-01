export const inngest = new Inngest({
  id: "finance-platform",
  name: "Finance Platform",
  eventKey: process.env.INNGEST_SIGNING_KEY,  // <- Add this line
  retryFunction: async (attempt) => ({
    delay: Math.pow(2, attempt) * 1000,
    maxAttempts: 2,
  }),
});
