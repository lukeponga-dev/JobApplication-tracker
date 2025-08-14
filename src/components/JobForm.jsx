import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";


export default function JobForm() {
    const submit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = {
            title: form.title.value,
            company: form.company.value,
            applied: new Date(form.applied.value),
            status: form.status.value,
            type: form.type.value,
            source: form.source.value,
            contact: form.contact.value,
            followUp: new Date(form.followUp.value),
            notes: form.notes.value,
            createdAt: serverTimestamp()
        };
        await setDoc(doc(db, "applications", `${Date.now()}`), data);
        form.reset();
    };

    return (
        <form onSubmit={submit}>
            <input name="title" placeholder="Job Title" required />
            <input name="company" placeholder="Company" required />
            <input type="date" name="applied" required />
            <select name="status">
                <option>Applied</option>
                <option>Reviewed</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
            </select>
            <input name="type" placeholder="Full‑time / Part‑time" />
            <input name="source" placeholder="SEEK / LinkedIn" />
            <input name="contact" placeholder="Name; email" />
            <input type="date" name="followUp" />
            <textarea name="notes" placeholder="Notes" />
            <button type="submit">Add Application</button>
        </form>
    );
}
