'use client';

import { useMood } from "./hooks/useMood";
import { CircularProgress, Typography, Card, CardContent, Grid, Container } from "@mui/material";
import {
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    TooltipContentProps
} from "recharts";
import { MoodSong } from "./interfaces/interfaces";

const COLORS = ["#ee6794", "#ffbdff", "#FFD93D", "#6dd8e2", "#d58cf5", "#00BFFF", "#7dc693"];

const CustomTooltip = ({ active, payload }: TooltipContentProps<string | number, string>) => {
    if (!active || !payload || !payload.length) return null;
    const data = payload[0].payload as { name: string; artist: string; date: string, value: number };

    return (
        <div style={{ backgroundColor: "white", padding: 8, border: "1px solid #ccc" }}>
            <div>
                <strong>{data.name}</strong><br />
                {data.artist}<br /><br />
                {new Date(data.date).toLocaleString(undefined, {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </div>
        </div>
    );
};

export default function MoodPage() {
    const { mood, loading, error } = useMood();

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <Typography color="error" variant="h6" align="center" style={{ marginTop: 50 }}>
                {error}
            </Typography>
        );
    }

    if (!mood || mood.songs.length === 0) {
        return (
            <Typography variant="h6" align="center" style={{ marginTop: 50 }}>
                No mood data available
            </Typography>
        );
    }

    const lineData = mood.songs
        .map(song => ({
            date: song.played_at,
            emotionValue: song.emotion_value,
            name: song.name,
            artist: song.artist
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const groupCounts: Record<string, number> = {};
    mood.songs.forEach((song: MoodSong) => {
        groupCounts[song.emotion] = (groupCounts[song.emotion] || 0) + 1;
    });

    const pieData = Object.entries(groupCounts).map(([name, count]) => ({
        name,
        value: count,
    }));

    const total = mood.songs.length;

    return (
        <Container maxWidth="lg" sx={{ mb: 20 }}>
            <Typography variant="h4" gutterBottom>
                Your Mood Songs
            </Typography>

            {/* Emotion distribution */}
            <Typography variant="h6" gutterBottom style={{ marginTop: 20 }}>
                Emotion Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        labelLine={false}
                        label={({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
                            if (
                                cx === undefined ||
                                cy === undefined ||
                                midAngle === undefined ||
                                innerRadius === undefined ||
                                outerRadius === undefined
                            )
                                return null;

                            const RADIAN = Math.PI / 180;
                            const radius = innerRadius + (outerRadius - innerRadius) / 2;
                            const x = cx + radius * Math.cos(-midAngle * RADIAN);
                            const y = cy + radius * Math.sin(-midAngle * RADIAN);

                            const percentage = ((pieData[index].value / total) * 100).toFixed(0);

                            return (
                                <text
                                    x={x}
                                    y={y}
                                    fill="white"
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    fontSize={12}
                                >
                                    {percentage}%
                                </text>
                            );
                        }}
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>

            {/* Emotion time evolution */}
            <Typography variant="h6" gutterBottom style={{ marginTop: 40 }}>
                Emotion Evolution Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip content={CustomTooltip} />
                    <Legend />
                    <Line type="monotone" dataKey="emotionValue" stroke="#00BFFF" name="Emotion Value" />
                </LineChart>
            </ResponsiveContainer>
        </Container>
    );
}
