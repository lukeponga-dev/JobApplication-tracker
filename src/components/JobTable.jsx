// src/components/JobTable.jsx
import { useState, useEffect } from "react";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    doc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export default function JobTable() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const q = query(
            collection(db, "applications"),
            orderBy("applied", "desc")
        );
        const unsubscribe = onSnapshot(
            q,
            (snapshot) =>
                setJobs(
                    snapshot.docs.map((d) => ({
                        id: d.id,
                        ...d.data(),
                    }))
                ),
            (error) => console.error("Firestore listen error:", error)
        );

        return unsubscribe; // cleanup on unmount
    }, []);


    /* eslint-disable no-restricted-globals */
    const deleteApplication = async (id) => {
        if (!confirm("Are you sure you want to delete this entry?")) return;
        try {
            await deleteDoc(doc(db, "applications", id));
            // no need to update state — the snapshot listener will reflect the change
        } catch (err) {
            console.error("Delete error:", err);
            alert("Could not delete record. Check console.");
        }
    };
    /* eslint-enable no-restricted-globals */

    return (
        <section id="list">
            <h2>My Applications</h2>

            {jobs.length === 0 ? (
                <p>No applications found. Add a new one above.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Company</th>
                            <th>Applied</th>
                            <th>Status</th>
                            <th>Notes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job) => (
                            <tr key={job.id}>
                                <td>{job.title}</td>
                                <td>{job.company}</td>
                                <td>
                                    {job.applied
                                        ? new Date(job.applied.toDate()).toLocaleDateString()
                                        : "n/a"}
                                </td>
                                <td>{job.status}</td>
                                <td>{job.notes}</td>
                                <td>
                                    <button
                                        className="btn--sm"
                                        onClick={() => deleteApplication(job.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
}
