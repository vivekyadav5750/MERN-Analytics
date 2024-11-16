import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchChartDataByDate } from "../redux/chartSlice";

const DateFilter = () => {
  const dispatch = useDispatch();
  const [dates, setDates] = useState({ startDate: "", endDate: "" });

  const handleChange = (e) => {
    setDates({ ...dates, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchChartDataByDate(dates));
    setDates({ startDate: "", endDate: "" });
  };

  return (
    <div>
      <h1 className="font-mono text-3xl font-bold  flex justify-center items-center underline">
        Date Filter
      </h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
        <div className="flex space-x-4">
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={dates.startDate}
              onChange={handleChange}
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={dates.endDate}
              onChange={handleChange}
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Apply Filter
        </button>
      </form>
    </div>
  );
};

export default DateFilter;
