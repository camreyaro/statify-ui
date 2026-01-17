'use client';

import { useState, useEffect } from "react";
import { Mood } from "../interfaces/interfaces";

export function useMood() {
  const [mood, setMood] = useState<Mood>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMood = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/mood", {
          credentials: "include",
        });
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data: Mood = await res.json();
        setMood(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchMood();
  }, []);

  return { mood, loading, error };
}
