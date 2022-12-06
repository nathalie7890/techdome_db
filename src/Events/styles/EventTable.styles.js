export const styles = {
  mainContainer: "flex w-full min-h-screen",
  pageTitle: "mb-8 text-4xl font-semibold text-blue-400 sm:text-5xl",

  //sort, add, delete
  sortContainer: "py-6 space-y-6 bg-white rounded-t-lg",
  sortInnerContainer: "flex items-end justify-start sm:justify-between",
  addBtn:
    "px-3 py-3 text-center bg-blue-500 rounded-full shadow-md hover:bg-blue-600",
  addIcon: "text-white",
  downloadBtn:
    "px-3 py-3 bg-purple-500 rounded-full shadow-md hover:bg-purple-600",
  deleteBtn: "px-3 py-3 bg-red-500 rounded-full shadow-md hover:bg-red-600",

  //event table
  tableContainer:
    "relative overflow-x-auto shadow-md rounded-b-lg bg-white max-w-full",
  noResult:
    "flex flex-col items-center justify-center p-12 font-semibold text-center border rounded-tr-md border-t-lightBlue rounded-tl-md",
  table: "w-full text-sm text-left text-gray-500",
  tHead: "text-xs text-gray-700 uppercase bg-blue-50",
  tr: "border-b hover:bg-gray-100",
  th: "px-6 py-4 font-medium text-gray-900 whitespace-normal",
  editBtn: "font-medium text-blue-600 hover:underline",

  //right drawer for edit event
  rightDrawer: "bg-gradient-to-br from-[#3f51b5]  to-purple-500 shadow-lg",
};
