// utils/fetchAppleMusicId.ts
export const fetchAppleMusicId = async (
  searchTerm: string
): Promise<string | null> => {
  try {
    const iTunesResponse = await fetch(
      `https://itunes.apple.com/search?term=${searchTerm}&media=music&explicit=Y&entity=album`
    );
    const iTunesData = await iTunesResponse.json();

    if (iTunesData.results && iTunesData.results.length > 0) {
      const result = iTunesData.results[0];
      if (result.collectionId) {
        return result.collectionId;
      }
    }

    throw new Error("No Apple Music ID found");
  } catch (error) {
    console.error("Error fetching Apple Music ID:", error);
    return null;
  }
};
