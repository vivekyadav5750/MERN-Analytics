import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChartData } from "../redux/chartSlice";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";
import { LoaderCircle } from "lucide-react";

const Chart = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.chart);
  
  const [showOn, setShowOn] = useState(true); // State for "Energy Saving Mode ON"
  const [showOff, setShowOff] = useState(true); // State for "Energy Saving Mode OFF"

  // Handle the "Both" toggle logic
  const handleBothChange = (checked) => {
    setShowOn(checked);
    setShowOff(checked);
  };

  useEffect(() => {
    dispatch(fetchChartData());
  }, [dispatch,showOn,showOff]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen w-full">
          <LoaderCircle size={80} className="animate-spin"/>...
      </div>
    );
  }
  

  // Preprocess data
  const processedData = data.reduce((acc, curr) => {
    const date = new Date(curr.createdAt).toLocaleDateString(); // Group by date
    const mode = curr.algo_status === "ON" ? "on" : "off";

    let existing = acc.find((item) => item.date === date);
    if (!existing) {
      existing = { date, on: 0, off: 0 };
      acc.push(existing);
    }

    existing[mode] += curr.total_kwh;
    return acc;
  }, []);

  return (
    <div className=" p-2">
      {/* Checkbox Controls */}
      <div style={{ marginBottom: "1rem" }}>
        <label>
          <input
            type="checkbox"
            checked={showOn && showOff}
            onChange={(e) => handleBothChange(e.target.checked)}
          />
          Both
        </label>
        <label style={{ marginLeft: "1rem" }}>
          <input
            type="checkbox"
            checked={showOn}
            onChange={(e) => setShowOn(e.target.checked)}
          />
          Energy Saving Mode ON
        </label>
        <label style={{ marginLeft: "1rem" }}>
          <input
            type="checkbox"
            checked={showOff}
            onChange={(e) => setShowOff(e.target.checked)}
          />
          Energy Saving Mode OFF
        </label>
      </div>

      {/* Chart */}
      <BarChart width={800} height={400} data={processedData}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {showOn && (
          <Bar
            dataKey="on"
            stackId="a"
            fill="#82ca9d"
            name="Energy Saving Mode ON"
          />
        )}
        {showOff && (
          <Bar
            dataKey="off"
            stackId="a"
            fill="#8884d8"
            name="Energy Saving Mode OFF"
          />
        )}
      </BarChart>
    </div>
  );
};

export default Chart;
