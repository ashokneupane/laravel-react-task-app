export default function FilterTab({status, setStatus}){
    return(
        <>
         <ul className="flex flex-wrap text-sm font-medium text-gray-500 justify-center">
                  <li className="me-4">
                    <button
                      onClick={() => setStatus('all')}
                      className={`p-2 inline-block ${
                        status == "" || status == "all"
                          ? "bg-gray-100 active text-blue-600"
                          : ""
                      }`}
                    >
                      All
                    </button>
                  </li>
                  <li className="me-4">
                    <button
                      onClick={() => setStatus('pending')}
                      className={`p-2 inline-block ${
                        status == "pending" ? "bg-gray-100 active text-blue-600" : ""
                      }`}
                    >
                      Pending
                    </button>
                  </li>
                  <li className="me-4">
                    <button
                      onClick={() => setStatus('completed')}
                      className={`p-2 inline-block ${
                        status == "completed" ? "bg-gray-100 active text-blue-600" : ""
                      }`}
                    >
                      Completed
                    </button>
                  </li>
                </ul>
        </>
    )
}