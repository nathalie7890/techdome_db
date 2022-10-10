// const TableHead = ({ checked, setChecked, data, setAllCheck, allCheck }) => {
//   const checkHandler = (data) => {
//     if (allCheck) {
//       setAllCheck(false);
//       setChecked([])
//     } else {
//       data.map((person) => checked.push({ id: person._id }));
//       setAllCheck(true);
//     }
//   };

//   return (
//     <thead className="text-xs text-gray-700 uppercase bg-gray-200">
//       <tr>
//         <th scope="col" className="px-6 py-3">
//           <input type="checkbox" onClick={() => checkHandler(data)} />
//         </th>
//         <th scope="col" className="px-6 py-3">
//           Event
//         </th>
//         <th scope="col" className="px-6 py-3">
//           Name
//         </th>
//         <th scope="col" className="px-6 py-3">
//           School/Organisation
//         </th>
//         <th scope="col" className="px-6 py-3">
//           IC Number
//         </th>
//         <th scope="col" className="px-6 py-3">
//           Email
//         </th>
//         <th scope="col" className="px-6 py-3">
//           Conact Number
//         </th>
//         <th scope="col" className="px-6 py-3">
//           Age
//         </th>
//         <th scope="col" className="px-6 py-3"></th>
//       </tr>
//     </thead>
//   );
// };

// export default TableHead;
