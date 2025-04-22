export const RevenueTable = ({
  order,
  headers,
  rows,
}: {
  order: number;
  headers: string[];
  rows: {
    id: number;
    col1: string;
    col2: string | number;
    col3: string | number;
  }[];
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <colgroup>
            <col className="w-[90px]" />
            <col className="w-[150px]" />
            <col className="w-auto" />
          </colgroup>

          <thead className="bg-blue-500 text-white">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`px-4 py-2 font-bold border-b border-gray-200 ${
                    index < headers.length - 1
                      ? "border-r border-gray-200 text-center"
                      : "text-right"
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.id || index}
                className={`
                    border-b border-gray-200 
                    ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    hover:bg-gray-100 transition-colors h-[37px]
                  `}
              >
                <td className="px-4 py-2 border-r border-gray-200 text-black text-center truncate">
                  {row.col1}
                </td>
                <td className="px-4 py-2 border-r border-gray-200 text-black text-center truncate">
                  {row.col2}
                </td>
                <td
                  className={
                    "px-4 py-2 text-right font-bold" +
                    ` ${
                      {
                        1: "text-green-500",
                        2: "text-red-500",
                        3: "text-purple-500",
                        4: "text-orange-500",
                      }[order]
                    }`
                  }
                >
                  {row.col3}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
