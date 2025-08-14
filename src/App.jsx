// src/App.jsx
import Header from "./components/Header";
import JobForm from "./components/JobForm";
import JobTable from "./components/JobTable";

export default function App() {
    return (
        <div className="App">
            <Header />
            <main>
                <section>
                    <h2>Add New Application</h2>
                    <JobForm />
                    {/* A little margin between sections */}
                    <hr />
                </section>
                <section>
                    <JobTable />
                </section>
            </main>
        </div>
    );
}
