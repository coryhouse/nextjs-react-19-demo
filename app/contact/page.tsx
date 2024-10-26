"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useOptimistic } from "react";
import { submitContact } from "./actions";

export default function ContactPage() {
  const [optimisticMessage, setOptimisticMessage] = useState("");
  const [error, setError] = useState("");

  const [optimisticState, addOptimisticState] = useOptimistic(
    { message: "" },
    (state, newMessage: string) => ({ ...state, message: newMessage })
  );

  const handleSubmit = async (formData: FormData) => {
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    if (!subject || !message) {
      setError("Please fill out all fields");
      return;
    }

    setError("");
    addOptimisticState(message);

    try {
      await submitContact(formData);
      setOptimisticMessage("Message sent successfully!");
    } catch (error) {
      setError("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <form action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="subject" className="block mb-2">
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a subject</option>
            <option value="support">Support</option>
            <option value="feature">Feature Request</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="w-full p-2 border rounded"
            rows={4}
            required
          ></textarea>
        </div>
        <SubmitButton />
        {error && <p className="text-red-500">{error}</p>}
        {optimisticMessage && (
          <p className="text-green-500">{optimisticMessage}</p>
        )}
        {optimisticState.message && (
          <p className="text-blue-500">Sending: {optimisticState.message}</p>
        )}
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
      disabled={pending}
    >
      {pending ? "Sending..." : "Send Message"}
    </button>
  );
}
