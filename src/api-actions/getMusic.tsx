export async function getMusic() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/music`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Disable caching
    });

    if (!response.ok) {
      throw new Error("Failed to fetch music");
    }

    const music = await response.json();
    console.log("Fetched music:", music); // Debugging line
    return music;
  } catch (error) {
    console.error("Error fetching music:", error);
    throw error;
  }
}