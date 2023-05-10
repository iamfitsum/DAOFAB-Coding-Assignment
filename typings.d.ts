interface Parent {
  id: number;
  sender: string;
  receiver: string;
  totalAmount: number;
}
interface ParentData {
  id: number;
  sender: string;
  receiver: string;
  totalAmount: number;
  totalPaidAmount: number;
}
interface Child {
  id: number;
  parentId: string;
  paidAmount: number;
}
interface ChildData {
    id: number;
    sender: string;
    receiver: string;
    totalAmount: number;
    paidAmount: number;
}
