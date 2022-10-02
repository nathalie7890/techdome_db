const Table = ({ data }) => {
  return (
    <div>
      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Event
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                School/Organization
              </th>
              <th scope="col" className="px-6 py-3">
                IC Number
              </th>

              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Contact Number
              </th>
              <th scope="col" className="px-6 py-3">
                Age
              </th>
              {/* <th scope="col" className="px-6 py-3">
                  
                </th> */}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((participant, i) => {
                return (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={i}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {participant.Event}
                    </th>
                    <td className="px-6 py-4">{participant.Name}</td>
                    <td className="px-6 py-4">
                      {participant["School/Organisation"]}
                    </td>
                    <td className="px-6 py-4">{participant["IC Number"]}</td>
                    <td className="px-6 py-4">{participant["Email"]}</td>
                    <td className="px-6 py-4">
                      {participant["Contact number"]}
                    </td>
                    <td className="px-6 py-4">{participant["age"]}</td>
                    {/* <td className="px-6 py-4 text-right">
                      <button>Edit</button>
                    </td> */}
                  </tr>
                );
              })
            ) : (
              
                <h1 className="w-full p-6 text-4xl font-medium text-slate-700">
                  No Participant
                </h1>
            
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
