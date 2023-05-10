// Import the getBasePath function from the getBasePath module
import getBasePath from "./getBasePath";

// Define a function called fetchParentData that accepts a page number and returns a Promise of an array of ParentData objects
export default async function fetchParentData(
  page: number
): Promise<ParentData[]> {
  // Make an HTTP GET request to the /api/parent endpoint with the page number as a query parameter using the fetch() function
  const res = await fetch(`${getBasePath()}/api/parent?page=${page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  // Parse the response as JSON and store it in a variable called parentData
  const parentData = await res.json();
  // Return the parentData array
  return parentData;
}
