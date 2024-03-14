import "./style.css";
import { getPlaylist } from "./spotify-connector.js";
import copyIcon from "/icons/copy.svg";
import externalLinkIcon from "/icons/external-link.svg";
import albumIcon from "/icons/album.svg";
import artistIcon from "/icons/artist.svg";
import durationIcon from "/icons/duration.svg";

const playlist_id = import.meta.env.VITE_PLAYLIST_ID;

const playlist = await getPlaylist(playlist_id);
const playlistName = playlist.name;
const playlistTotal = playlist.tracks.total;
const playlistTracks = playlist.tracks.items;

const millisToMinutesAndSeconds = (millis) => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

document.getElementById("playlistName").textContent = playlistName;
document.getElementById("playlistTotal").textContent =
  playlistTotal + " (max shown: 100)";
document.getElementById("tracks").innerHTML = playlistTracks
  .map((item) => {
    const track = item.track;

    return `
    <li>
      <div class="track-card">
        <img src="${track.album.images[0].url}" class="album-cover" alt="${
      track.album.name
    } album cover" />
        <div class="track-main">
          <h2 class="track-name text">${track.name}</h2>
          <div class="flex">
            <img class="icon" src="${artistIcon}" alt="artist icon" />
            <p class="track-artists text">${track.artists
              .map((item) => {
                return item.name;
              })
              .join(", ")}</p>
          </div>
          <div class="flex">
            <img class="icon" src="${albumIcon}" alt="album icon" />
            <p class="track-album text">${track.album.name}</p>
          </div>
        </div>
        <div>
          <div class="track-buttons">
            <button type="button" class="track-button copy-button" data-track-info="${
              track.name
            } ${track.artists[0].name}">
              <img class="icon" src="${copyIcon}" alt="copy button" />
            </button>
            <a href=${track.external_urls.spotify} target="_blank">
              <button type="button" class="track-button">
                <img class="icon" src="${externalLinkIcon}" alt="external link button" />
              </button>
            </a>
          </div>
          <div class="track-meta flex">
            <div class="flex">
              <img class="icon" src="${durationIcon}" alt="duration icon" />
              <p class="text">${millisToMinutesAndSeconds(
                track.duration_ms
              )}</p>
            </div>
            ${
              track.preview_url
                ? `<audio controls>
                  <source src="${track.preview_url}" type="audio/mp3">
                </audio>`
                : `<div>no preview available</div>`
            }
          </div>
        </div>
      </div>
    </li>`;
  })
  .join("");

document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const trackInfo = event.currentTarget.dataset.trackInfo.replace(
      /['"]/g,
      ""
    );
    navigator.clipboard
      .writeText(trackInfo)
      .then(() => {
        console.log("Track name copied to clipboard: " + trackInfo);
        //alert("Track name copied to clipboard: " + trackInfo);
      })
      .catch((error) => {
        console.error("Failed to copy track name: ", error);
        alert("Failed to copy track name. Please try again.");
      });
  });
});
