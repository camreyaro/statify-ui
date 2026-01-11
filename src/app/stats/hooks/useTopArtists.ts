'use client';

import { useState, useEffect } from "react";
import { Artist } from "../interfaces/interfaces";

export function useTopArtists() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopArtists = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/top-artists", {
          credentials: "include",
        });
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data: Artist[] = await res.json();
        setArtists(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchTopArtists();
  }, []);

  return { artists, loading, error };
}
