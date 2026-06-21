import { supabase } from "../lib/supabase.ts";

interface AuthCredentials {
  email: string;
  password: string;
  name: string;
  location: string;
}

export const signup = async (authdata: AuthCredentials) => {
  const { email, password, name, location } = authdata;

  if (!email || !password || !name || !location) {
    throw new Error("All fields are required");
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        location,
      },
    },
  });

  if (error) {
    throw error;
  }

  return data;
};

export const login = async (authdata: AuthCredentials) => {
  const { email, password } = authdata;

  if (!email || !password) {
    throw new Error("email password is requird");
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
};


export const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
        throw error;
    }
};