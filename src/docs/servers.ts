export const docServers = [
  {
    url: "http://localhost:8000", // url
    description: "Local server", // name
  },
  {
    url: process.env.BACKEND_BASE_URL, // url
    description: "Remote server", // name
  },
];
