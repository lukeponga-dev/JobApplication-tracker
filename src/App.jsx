import JobForm from "./components/JobForm";
import JobTable from "./components/JobTable";

function App() {
    return (
        <div className="App">
            <h1>Job Application Tracker</h1>
            <JobForm />
            <JobTable />
        </div>
    );
}

export default App;
