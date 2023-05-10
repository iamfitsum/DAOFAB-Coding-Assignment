// Import the NextApiHandler interface from the next module and fs from the fs module
import { NextApiHandler } from "next";
import fs from "fs";

// Define a Next.js API route handler function to handle incoming requests to the /api/child endpoint
const handler: NextApiHandler = async (req, res) => {
  // Check if the HTTP request method is GET
  if (req.method === "GET") {
    try {
      // Parse the parent ID query parameter from the request URL
      const parentId = parseInt(String(req.query.parentId), 10);
      // Check if the parent ID is a valid number
      if (isNaN(parentId)) {
        throw new Error("Parent ID must be a number");
      }

      // Read the contents of the Child.json file and parse it as JSON to an array of Child objects
      const childrenData = fs.readFileSync("data/Child.json", "utf-8");
      const children: Child[] = JSON.parse(childrenData).data;

      // Read the contents of the Parent.json file and parse it as JSON to an array of Parent objects
      const parentData = fs.readFileSync("data/Parent.json", "utf-8");
      const parents: Parent[] = JSON.parse(parentData).data;

      // Filter the children array to get only the children that belong to the specified parent ID
      const filteredChildren = children.filter(
        (child) => parseInt(child.parentId, 10) === parentId
      );

      // Find the parent object that corresponds to the specified parent ID
      const parent = parents.find((parent) => parent.id === parentId);
      // Throw an error if no parent object is found
      if (!parent) {
        throw new Error(`No parent found with ID ${parentId}`);
      }

      // Map the filteredChildren array to a new array of ChildData objects
      const childData = filteredChildren.map((child) => {
        return {
          id: child.id,
          sender: parent.sender,
          receiver: parent.receiver,
          totalAmount: parent.totalAmount,
          paidAmount: child.paidAmount,
        };
      });

      // Send a HTTP response with the childData array as the response body
      res.status(200).json(childData);
    } catch (error: any) {
      // Send a HTTP response with a 500 Internal Server Error status code and an error message
      res.status(500).json({ message: error.message });
    }
  } else {
    // Send a HTTP response with a 405 Method Not Allowed status code and an error message
    res.status(405).json({ message: "Method not allowed" });
  }
};

// Export the handler function as the default module export
export default handler;
