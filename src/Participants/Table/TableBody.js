// import { useState } from "react";
// import { deleteParticipant } from "../../api/participants";
// import { useMutation, useQueryClient } from "react-query";
// import React from "react";

// const TableBody = ({ data, checked, setChecked, allCheck, setAllCheck }) => {
//   const [check, setCheck] = useState(false);
//   const queryClient = useQueryClient();
//   const mutation = useMutation(
//     async (id) => {
//       await deleteParticipant(id);
//     },
//     {
//       onSuccess: () => {
//         alert("deleted");
//         queryClient.invalidateQueries("participants");
//       },
//     }
//   );

//   const deleteHandler = (id) => {
//     if (window.confirm()) {
//       mutation.mutate(id);
//     } else return;
//   };

//   const checkHandler = (id) => {
    
//     if (checked.length <= 0) setChecked([...checked, { id }]);
//     let found = checked.find((check) => {
//       if (check.id === id) return true;
//     });

//     if (found) {
//       setChecked(checked.filter((person) => person.id !== id));
//     } else {
//       setChecked([...checked, { id }]);
//     }
//     setAllCheck(false)
//   };

//   return (
//     <tbody>
//       {data.map((person) => {
//       // if (checked.length > 0) {
//       //   console.log('yes')
//       //   console.log(allCheck || checked.some((user) => user.id === person._id));
//       // }
//         return (
//           <tr
//             className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
//             key={person._id}
//           >
//             <td className="px-6 py-4">
//               <input
//                 key={person._id}
//                 type="checkbox"
//                 value={person._id}
//                 onChange={() => checkHandler(person._id)}
//                 checked={checked.some((user) => user.id === person._id)}
//               />
//             </td>
//             <th
//               scope="row"
//               className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//             >
//               {person.Event}
//             </th>
//             <td className="px-6 py-4">{person.Name}</td>
//             <td className="px-6 py-4">{person["School/Organisation"]}</td>
//             <td className="px-6 py-4">{person["IC Number"]}</td>
//             <td className="px-6 py-4">{person["Contact number"]}</td>
//             <td className="px-6 py-4">{person["Email"]}</td>
//             <td className="px-6 py-4">{person["age"]}</td>
//             <td className="px-6 py-4">
//               <button>Edit</button>
//               <button onClick={() => deleteHandler(person._id)}>Delete</button>
//             </td>
//           </tr>
//         );
//       })}
//     </tbody>
//   );
// };

// export default TableBody;
