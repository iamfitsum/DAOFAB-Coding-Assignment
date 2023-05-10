// Import the NextApiHandler interface from the next module and fs from the fs module
import { NextApiHandler } from "next";
import fs from "fs";

// Define a Next.js API route handler function to handle incoming requests to the /api/parent endpoint
const handler: NextApiHandler = async (req, res) => {
  // Check if the request method is GET
  if (req.method === "GET") {
    try {
      // Read parent and child data from JSON files
      const parentData = fs.readFileSync("data/Parent.json", "utf-8");
      const parentJsonData = JSON.parse(parentData);
      const parents: Parent[] = parentJsonData.data;

      const childData = fs.readFileSync("data/Child.json", "utf-8");
      const childJsonData = JSON.parse(childData);
      const children: Child[] = childJsonData.data;

      // implementation of server-side pagination
      const page = parseInt(String(req.query.page), 10) || 1; // Current page number
      const pageSize = 2; // Number of items per page
      const start = (page - 1) * pageSize; // Starting index of the page
      const end = start + pageSize; // Ending index of the page

      // Sort parents by id
      const sortedParents = parents.sort((a: Parent, b: Parent) => a.id - b.id);

      // Get paginated parents
      const paginatedParents = sortedParents.slice(start, end);

      // For each parent, get its corresponding children and calculate total paid amount
      const result = paginatedParents.map((parent: Parent) => {
        const parentChildren = children.filter(
          (child: Child) => parseInt(child.parentId, 10) === parent.id
        );
        const totalPaidAmount = parentChildren.reduce(
          (acc: number, child: Child) => acc + child.paidAmount,
          0
        );
        return { ...parent, totalPaidAmount };
      });

      // Send the paginated and enriched data as a response
      res.status(200).json(result);
    } catch (error: any) {
      // If there's an error, send a 500 error response with the error message
      res.status(500).json({ message: error.message });
    }
  } else {
    // If the request method is not GET, send a 405 Method Not Allowed error response
    res.status(405).json({ message: "Method not allowed" });
  }
};

// Export the handler function as the default export of this module
export default handler;
