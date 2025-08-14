// src/components/JobForm.jsx
import { useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function JobForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState(""); // success / error message

    const submit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFeedback("");

        const form = e.target;
        const data = {
            title: form.title.value.trim(),
            company: form.company.value.trim(),
            applied: new Date(form.applied.value),
            status: form.status.value,
            type: form.type.value.trim(),
            source: form.source.value.trim(),
            contact: form.contact.value.trim(),
            followUp: form.followUp.value ? new Date(form.followUp.value) : null,
            notes: form.notes.value.trim(),
            createdAt: serverTimestamp(),
        };

        try {
            // let Firestore generate a stable ID
            await setDoc(doc(db, "applications", `${Date.now()}`), data);
            form.reset(); // clears UI
            setFeedback("✅ Application successfully added!");
        } catch (err) {
            console.error(err);
            setFeedback(`❌ Something went wrong: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={submit} id="form">
            {feedback && <p className="feedback">{feedback}</p>}
            <fieldset disabled={isSubmitting}>
                <label>
                    Job Title<span className="required">*</span>
                    <input name="title" placeholder="Job Title" required />
                </label>

                <label>
                    Company<span className="required">*</span>
                    <input name="company" placeholder="Company" required />
                </label>

                <label>
                    Date Applied<span className="required">*</span>
                    <input type="date" name="applied" required />
                </label>

                <label>
                    Status
                    <select name="status">
                        <option>Applied</option>
                        <option>Reviewed</option>
                        <option>Interview</option>
                        <option>Offer</option>
                        <option>Rejected</option>
                    </select>
                </label>

                <label>
                    Position Type
                    <input name="type" placeholder="Full‑time / Part‑time" />
                </label>

                <label>
                    Source
                    <input name="source" placeholder="SEEK / LinkedIn" />
                </label>

                <label>
                    Contact Person
                    <input name="contact" placeholder="Name; email or phone" />
                </label>

                <label>
                    Follow‑up
                    <input type="date" name="followUp" />
                </label>

                <label>
                    Notes
                    <textarea name="notes" placeholder="Notes" />
                </label>

                <button type="submit">
                    {isSubmitting ? "Saving…" : "Add Application"}
                </button>
            </fieldset>
        </form>
    );
}
