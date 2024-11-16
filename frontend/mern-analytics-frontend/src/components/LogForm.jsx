import { useState } from "react";
import { useDispatch } from "react-redux";
import { submitLog } from "../redux/logSlice";

const LogForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    accessTime: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    }), // 12:00 AM
    accessDate: new Date().toISOString().slice(0, 10),
    employeeName: "",
    algoStatus: "OFF"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitLog(formData));
    setFormData({
      accessTime: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
      }),
      accessDate: new Date().toISOString().slice(0, 10),
      employeeName: "",
      algoStatus: "OFF"
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 m-8 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Log Chart Access
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium mb-2">
            Access Time
            {/* not mandatory in small in red */}
            <sup className="text-red-500 text-sm ">* not mandatory</sup>
          </label>
          <input
            type="time"
            name="accessTime"
            value={formData.accessTime}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-2">
            Access Date
            <sup className="text-red-500 text-sm">* not mandatory</sup>
          </label>
          <input
            type="date"
            name="accessDate"
            value={formData.accessDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-2">
            Employee Name
          </label>
          <input
            type="text"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-2">
            Energy Saving Mode
          </label>
          <select
            name="algoStatus"
            value={formData.algoStatus}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="OFF">OFF</option>
            <option value="ON">ON</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>

      {/* {status === "loading" && <p className="mt-4 text-gray-500">Loading...</p>}
      {status === "succeeded" && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">
            Filtered Chart Data:
          </h3>
          <ul className="mt-4 space-y-2">
            {chartData.map((data, index) => (
              <li key={index} className="p-2 border rounded-lg bg-gray-100">
                {`Date: ${data.createdAt}, Energy: ${data.total_kwh}`}
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default LogForm;
