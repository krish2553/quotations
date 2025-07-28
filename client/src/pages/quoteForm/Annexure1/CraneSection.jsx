// import React from "react";

// const CraneSection = ({ title, data, onUpdate, onAdd, onRemove }) => {
//   const handleInputChange = (index, subIndex, value) => {
//     const updatedData = [...data];
//     updatedData[index][subIndex] = value;
//     onUpdate(updatedData);
//   };

//   return (
//     <div className="p-4 border rounded-md shadow-sm">
//       <div className="flex justify-between items-center mb-2">
//         <h4 className="font-semibold">{title}</h4>
//         <button
//           type="button"
//           onClick={onAdd}
//           className="text-sm bg-blue-500 text-white px-2 py-1 rounded"
//         >
//           Add Row
//         </button>
//       </div>
//       <div className="space-y-2">
//         {data.map((item, index) => (
//           <div key={index} className="grid grid-cols-3 gap-2 items-center">
//             <input
//               type="text"
//               value={item[0]}
//               onChange={(e) => handleInputChange(index, 0, e.target.value)}
//               className="border p-1 rounded col-span-1"
//               placeholder="Label"
//             />
//             <input
//               type="text"
//               value={item[1]}
//               onChange={(e) => handleInputChange(index, 1, e.target.value)}
//               className="border p-1 rounded col-span-1"
//               placeholder="Value"
//             />
//             <button
//               type="button"
//               onClick={() => onRemove(index)}
//               className="text-sm bg-red-500 text-white px-2 py-1 rounded"
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CraneSection; // This line ensures the component is exported correctly.
