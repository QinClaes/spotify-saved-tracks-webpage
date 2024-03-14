const client_id = import.meta.env.VITE_CLIENT_ID;
const client_secret = import.meta.env.VITE_CLIENT_SECRET;

const getAccessToken = async () => {
  const params = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: client_id,
    client_secret: client_secret,
  });

  const url = "https://accounts.spotify.com/api/token";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    return json.access_token;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getPlaylist = async (id) => {
  const accessToken = await getAccessToken();

  const url = `https://api.spotify.com/v1/playlists/${id}?market=BE&fields=name%2Ctracks(total%2Citems(track(album(name%2Cimages)%2Cartists(name)%2Cduration_ms%2Cname%2Cpreview_url%2Cexternal_urls(spotify))))`;

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
