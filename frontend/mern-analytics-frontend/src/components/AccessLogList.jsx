import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogs } from "../redux/logSlice";

const AccessLogList = () => {
  const dispatch = useDispatch();
  const { logs, status } = useSelector((state) => state.log);

  useEffect(() => {
    dispatch(fetchLogs());
  }, [dispatch]);

  if (status === "loading") return <p>Loading logs...</p>;
  if (status === "failed") return <p>Error loading logs!</p>;

  return (
    <div className="max-w-lg mx-auto mt-8 w-full">
      <h2 className="text-2xl font-bold mb-4 underline">Access Logs</h2>
      <ul className="space-y-4">
        {/* check if logs length is 0 , then show no logs */}
        {logs.length === 0 && <p>No logs to show</p>}
        {logs.map((log, index) => (
          <li key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <p>
              <strong>Time:</strong> {log.accessTime}
            </p>
            <p>
              <strong>Date:</strong> {log.accessDate}
            </p>
            <p>
              <strong>Employee:</strong> {log.employeeName}
            </p>
            <p>
              <strong>Mode:</strong> {log.algoStatus}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccessLogList;
