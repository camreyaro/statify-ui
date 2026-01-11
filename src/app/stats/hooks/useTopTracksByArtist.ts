import { useState, useEffect } from "react";
import { TopTracksByArtist } from "../interfaces/interfaces";

export function useTopTracksByArtist() {
    const [tracksByArtist, setTopTracksByArtist] = useState<TopTracksByArtist>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTracksByArtist = async () => {
            try {
                const res = await fetch("http://127.0.0.1:8000/top-tracks-by-artist", {
                    credentials: "include",
                });
                if (!res.ok) throw new Error(`Error: ${res.status}`);
                const data: TopTracksByArtist = await res.json();
                setTopTracksByArtist(data); 
            } catch (err: any) {
                setError(err.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchTracksByArtist();
    }, []);

    return { tracksByArtist, loading, error };
}