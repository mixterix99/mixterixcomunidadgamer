
const API_KEY = 'AIzaSyA7wcAsh4TQAWz0MSjydq6eRS-WD2j7CL0';
const CHANNEL_ID = 'UCbfCDLM_aLGDD1OCZ_IXQkg';

// Función para obtener datos del canal
function fetchChannelData() {
    $.getJSON(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`, function(data) {
        const stats = data.items[0].statistics;
        $('#subscribers-count').text(stats.subscriberCount + ' Suscriptores');
        $('#views-count').text(stats.viewCount + ' Vistas');
    });
}

function fetchVideoCount() {
    $.getJSON(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`, function(data) {
        const uploadsPlaylistId = data.items[0].contentDetails.relatedPlaylists.uploads;
        $.getJSON(`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${uploadsPlaylistId}&key=${API_KEY}&maxResults=1`, function(data) {
            const videoCount = data.pageInfo.totalResults;
            $('#videos-count').text(videoCount + ' Videos');
        });
    });
}

// Llama a la función para obtener datos
$(document).ready(function() {
    fetchChannelData();
    fetchVideoCount();
});

