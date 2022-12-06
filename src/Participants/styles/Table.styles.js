export const styles = {
  mainContainer: "flex md:w-[calc(100vw-80px)] w-[calc(100vw-1px)]",
  eventName: "text-2xl font-semibold text-blue-400 sm:text-5xl sm:my-6",
  //add, download and delete
  addBtn:
    "hidden px-3.5 py-3.5 bg-blue-500 rounded-full shadow-md md:block hover:bg-blue-600",
  downloadBtn:
    "px-3.5 py-3.5 bg-purple-500 rounded-full hover:bg-purple-600 shadow-md",
  deleteBtn:
    "px-3.5 py-3.5 bg-red-500 rounded-full hover:bg-red-600 shadow-md",

  //table
  noResult:
    "flex flex-col items-center justify-center p-12 font-semibold text-center border rounded-tr-md border-t-lightBlue rounded-tl-md",

  tableContainer:
    "max-w-full overflow-x-auto border-t rounded-t-lg rounded-b-lg shadow-md",

  table: "max-w-full text-sm text-left text-gray-500 bg-white",
  tHead: "text-xs text-gray-700 uppercase bg-blue-50",
  tr: "border-b hover:bg-gray-100",
  th: "px-6 py-4 font-medium text-gray-900 whitespace-normal",
};
