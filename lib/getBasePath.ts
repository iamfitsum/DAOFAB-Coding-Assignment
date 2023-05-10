// Define a function called getBasePath that returns the base URL of the API based on the environment
const getBasePath = () => {
  // If the environment is development, set the base_url to http://localhost:3000
  // Otherwise, set it to https://<VERCEL_URL>, where <VERCEL_URL> is the value of the VERCEL_URL environment variable
  let base_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : `https://${process.env.VERCEL_URL}`;

  // Return the base_url
  return base_url;
};

// Export the getBasePath function as the default export of this module
export default getBasePath;
