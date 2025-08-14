// src/App.jsx
import { useEffect } from "react";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
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
                    <hr />
                </section>
                <section>
                    <JobTable />
                </section>
            </main>
        </div>
    );
}