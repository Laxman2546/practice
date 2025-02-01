const clientId = "c3772f86f6414d939383071cb0f08b55";
const clientSecret = "d1801fdfd0554fce948afabf58c33452";

const tracknames = document.querySelector(".trackname");
const trackimage = document.querySelector(".trackimage");
const searchBar = document.querySelector(".searchBar");
const searchButton = document.querySelector(".searchButton");
const audio = document.querySelector(".audio");
async function getSpotifyToken() {
  const credentials = btoa(`${clientId}:${clientSecret}`);
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${credentials}`,
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
}

async function searchSong(track) {
  const token = await getSpotifyToken();
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${track}&type=track`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  trackdetails(data);
}

searchButton.addEventListener("click", () => {
  let title = searchBar.value;
  searchSong(title);
  clearBar();
});

const clearBar = () => {
  searchBar.value = "";
};

const trackdetails = (data) => {
  const songscontainer = document.querySelector(".songsdiv");
  songscontainer.innerHTML = "";

  data.tracks.items.forEach((item) => {
    const tracklist = document.createElement("div");
    tracklist.className = "songslist";

    const tracklistName = document.createElement("div");
    tracklistName.className = "songsName";
    songscontainer.appendChild(tracklistName);
    const songImage = document.createElement("img");
    songImage.src = item.album.images[1].url;
    tracklist.appendChild(songImage);
    const para = document.createElement("p");
    para.innerText = item.album.name;
    tracklist.appendChild(para);
    songscontainer.appendChild(tracklist);
  });
};
