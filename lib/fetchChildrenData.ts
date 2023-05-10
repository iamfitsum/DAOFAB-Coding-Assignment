// Import the getBasePath function from the getBasePath module
import getBasePath from "./getBasePath";

// Define a function called fetchChildrenData that accepts a parentId number and returns a Promise of an array of ChildData objects
export default async function fetchChildrenData(
  parentId: number
): Promise<ChildData[]> {
  // Make an HTTP GET request to the /api/child endpoint with the parentId as a query parameter using the fetch() function
  const res = await fetch(`${getBasePath()}/api/child?parentId=${parentId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  // Parse the response as JSON and store it in a variable called childData
  const childData = await res.json();
  // Return the childData array
  return childData;
}
