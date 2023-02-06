/* const clientId = "df9f0dfca639497797bd9c6c764fe4b3";
const redirectUri = "https://localhost:3000/";
let accessToken;

const Spotify = {
    getAccessToken() {
        if(accessToken) {
            return accessToken;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if(accessTokenMatch && expiresInMatch) {
            accessToken=accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => (accessToken=""), expiresIn * 1000);
            window.history.pushState("Access Token", null, "/");
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_url=${redirectUri}`;
            window.location = accessUrl;
        }
    },
    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&g=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        })
        .then(jsonResonse => {
            return jsonResonse();
        })
        .then(jsonResonse => {
            if(!jsonResonse.tracks) {
                return [];
            }
            return jsonResonse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artist.name,
                album: track.album.artist,
                uri: track.uri
            }));
        });
    },
    savePlayList(name, trackUris) {
        if(!name || !trackUris.length) {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer${accessToken}` };
        let userId;

        return fetch(`https://api.spotify.com/v1/me`, { headers: headers })
        .then(response => response.json())
        .then(jsonResonse => {
            userId: jsonResonse.id;
            return fetch(`https//api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: "POST",
                body: JSON.stringify({ name: name })
            })
            .then(response => response.json())
            .then(jsonResonse => {
                const playListId = jsonResonse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playListId}/tracks`, {
                    headers: headers,
                    method: "POST",
                    body: JSON.stringify({ uris: trackUris })
                });
            });
        });
    }
};

export default Spotify; */