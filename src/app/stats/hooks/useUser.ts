// hooks/useUser.ts
import { useState, useEffect } from "react";

export interface UserData {
  name: string;
  photo: string;
}

export function useUser() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8000/user-data", {
          credentials: "include",
        });
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data: UserData = await res.json();
        setUser(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
}
