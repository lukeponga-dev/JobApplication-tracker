// src/components/JobTable.jsx
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase"; // adjust path if needed

export default function JobTable() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "applications"), orderBy("applied", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setJobs(
                snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            );
        });
        return unsubscribe;
    }, []);

    return (
        <section>
            <h2>My Applications</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Company</th>
                        <th>Date Applied</th>
                        <th>Status</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job) => (
                        <tr key={job.id}>
                            <td>{job.title}</td>
                            <td>{job.company}</td>
                            <td>{job.applied ? new Date(job.applied.toDate()).toLocaleDateString() : ""}</td>
                            <td>{job.status}</td>
                            <td>{job.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}
