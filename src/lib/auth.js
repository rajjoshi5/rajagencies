import { supabase } from "./supabase"

// Login
export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

// Logout
export async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// Get current session
export function getSession() {
  return supabase.auth.getSession()
}

// Listen to auth changes
export function onAuthChange(callback) {
  return supabase.auth.onAuthStateChange(callback)
}
