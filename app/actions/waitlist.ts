"use server"

export type WaitlistResult = { ok: true; duplicate?: boolean } | { error: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export async function joinWaitlist(
  _prev: WaitlistResult | null,
  formData: FormData
): Promise<WaitlistResult> {
  const email = (formData.get("email") ?? "").toString().trim()

  if (!EMAIL_RE.test(email)) {
    return { error: "Enter a valid email address." }
  }

  // Uncomment once .env.local has NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY
  // const { createClient } = await import("@supabase/supabase-js")
  // const supabase = createClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  // )
  // const { error } = await supabase.from("waitlist").insert({ email })
  // if (error) {
  //   if (error.code === "23505") return { ok: true, duplicate: true }
  //   return { error: "Something broke. Try again in a minute." }
  // }

  return { ok: true }
}
