"use client";

// Import the fetchParentData function and the necessary React hooks.
import fetchParentData from "@/lib/fetchParentData";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Defining the type of the "props" object passed to the component
type Props = {};

// Define the ParentTable component.
function ParentTable({}: Props) {
  // Declare state variables to keep track of the current page and the parent data.
  const [page, setPage] = useState(1);
  const [parentData, setParentData] = useState<ParentData[]>([]);
  // Get the router from the useRouter hook.
  const router = useRouter();

  // Use the useEffect hook to fetch parent data when the page number changes.
  useEffect(() => {
    fetchParentData(page).then((data) => setParentData(data));
  }, []);

  // Define a function to handle clicking the "Next Page" button.
  const handleNextPage = () => {
    setPage(page + 1);
    fetchParentData(page + 1).then((data) => setParentData(data));
  };

  // Define a function to handle clicking the "Previous Page" button.
  const handlePrevPage = () => {
    setPage(page - 1);
    fetchParentData(page - 1).then((data) => setParentData(data));
  };

  // Define a function to handle clicking the total paid amount for a parent.
  const handleTotalPaidAmountClick = (parentId: number) => {
    // Use the router to navigate to the child table page for the selected parent.
    router.push(`/${parentId}`);
  };

  // Render the ParentTable component.
  return (
    <div className="w-full h-full">
      {/* Title */}
      <div className="text-center text-2xl font-bold my-8">Parent Table</div>
      <div className="overflow-x-auto">
        {/* Table */}
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Sender</th>
              <th className="px-4 py-3">Receiver</th>
              <th className="px-4 py-3">Total Amount</th>
              <th className="px-4 py-3">Total Paid Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-sm font-normal">
            {/* Map over the parentData array and render a row for each parent. */}
            {parentData.map((parent: any) => (
              <tr key={parent.id}>
                <td className="px-4 py-3 border">{parent.id}</td>
                <td className="px-4 py-3 border">{parent.sender}</td>
                <td className="px-4 py-3 border">{parent.receiver}</td>
                <td className="px-4 py-3 border">{parent.totalAmount}</td>
                <td
                  className="px-4 py-3 border cursor-pointer text-blue-500 hover:text-blue-700"
                  onClick={() => handleTotalPaidAmountClick(parent.id)}
                >
                  {parent.totalPaidAmount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 flex justify-center">
        {/* "Previous Page" button */}
        <button
          onClick={handlePrevPage} // Calls handlePrevPage function on click
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          disabled={page === 1} // Disables button if user is on the first page
        >
          Previous Page
        </button>
        {/* "Next Page" button */}
        <button
          onClick={handleNextPage} // Calls handleNextPage function on click
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={parentData.length === 0} // Disables button if there is no data for the next page
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

// Exporting the ParentTable component as the default export of the module
export default ParentTable;