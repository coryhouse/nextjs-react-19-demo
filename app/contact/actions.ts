"use server";

import { revalidatePath } from "next/cache";

export async function submitContact(formData: FormData) {
  const subject = formData.get("subject");
  const message = formData.get("message");

  const response = await fetch("http://localhost:3001/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ subject, message }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit contact form");
  }

  revalidatePath("/contact");
}
