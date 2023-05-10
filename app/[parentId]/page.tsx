"use client";

// Import the fetchChildrenData function and the necessary React hooks.
import fetchChildrenData from "@/lib/fetchChildrenData";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Defining the type of the "props" object passed to the component
type Props = {
  params: {
    parentId: number;
  };
};

// Defining the ChildTable component
function ChildTable({ params: { parentId } }: Props) {
  // Initializing state using the "useState" hook.
  const [childData, setChildData] = useState<ChildData[]>([]);

  // Accessing the router object using the "useRouter" hook
  const router = useRouter();

  // Fetching the child data when the component mounts using the "useEffect" hook.
  useEffect(() => {
    // If no parent ID is provided, return early.
    if (!parentId) {
      return;
    }

    // Fetch the child data using the "fetchChildrenData" function
    fetchChildrenData(parentId).then((data) => setChildData(data));
  }, []);

  // Function to navigate back to the parent table.
  const goBack = () => {
    router.back();
  };

  // Rendering the component
  return (
    <div className="w-full h-full">
      {/* Title */}
      <div className="text-center text-2xl font-bold my-8">
        Child Table of Parent {parentId}
      </div>
      {/* Table */}
      <table className="w-full table-fixed">
        <thead className="bg-gray-100">
          <tr>
            <th className="w-1/5 py-3 px-4 text-left">ID</th>
            <th className="w-1/5 py-3 px-4 text-left">Sender</th>
            <th className="w-1/5 py-3 px-4 text-left">Receiver</th>
            <th className="w-1/5 py-3 px-4 text-left">Total Amount</th>
            <th className="w-1/5 py-3 px-4 text-left">Paid Amount</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping over the child data and rendering each row */}
          {childData.map((child: any) => (
            <tr key={child.id} className="bg-white">
              <td className="border px-4 py-2 text-sm">{child.id}</td>
              <td className="border px-4 py-2 text-sm">{child.sender}</td>
              <td className="border px-4 py-2 text-sm">{child.receiver}</td>
              <td className="border px-4 py-2 text-sm">{child.totalAmount}</td>
              <td className="border px-4 py-2 text-sm">{child.paidAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Button to go back to the parent table */}
      <div className="flex justify-center mt-8">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          onClick={goBack}
        >
          &lt;- Go Back
        </button>
      </div>
    </div>
  );
}

// Exporting the ChildTable component as the default export of the module
export default ChildTable;
