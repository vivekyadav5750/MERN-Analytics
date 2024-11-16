import Chart from "./components/Chart";
import LogForm from "./components/LogForm";
import AccessLogList from "./components/AccessLogList";
import DateFilter from "./components/DateFilter";

function App() {
  return (
    <>
      <div className="p-2 w-full">
        <h1 className="font-mono text-3xl font-bold  flex justify-center items-center underline">
          Energy Analytics
        </h1>

        <div className="flex-row md:flex w-full mt-5">
          <Chart />
          <LogForm />
        </div>
        <div className="mx-8 flex">
          <DateFilter />
          <AccessLogList />
        </div>
      </div>
    </>
  );
}

export default App;
