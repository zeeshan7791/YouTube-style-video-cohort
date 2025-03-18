const videosContainers = document.getElementById("getVideo");
const searchInput = document.getElementById("searchInput");
let result=[]


// getting videos by calling random videos api
const getVideos = async () => {
  try {
    const response = await fetch(
      "https://api.freeapi.app/api/v1/public/youtube/videos"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    result = data.data.data;

    displayVideos(result)
    return result
  } catch (error) {
    console.log(error);
  }
};
getVideos();

// display videos to html


function displayVideos(result){
    // clear the container before displaying
    videosContainers.innerHTML = ""; 
    if(result.length<=0){
        
        videosContainers.innerHTML="<h3>No video found</h3>"
    }
    result.forEach((video) => {
        videosContainers.innerHTML += `<div >
         
         <a href="https://www.youtube.com/watch?v=${video.items.id}" target="_blank">
                  <img 
                      src="${video.items.snippet.thumbnails.medium.url}" 
                      width="${video.items.snippet.thumbnails.medium.width}" 
                      height="${video.items.snippet.thumbnails.medium.height}" 
                      alt="Video Thumbnail"
                      style="cursor: pointer; border-radius: 10px;">
              </a>
      <p><b>Title:</b> ${video.items.snippet.title}</p>
      <p>Channel Name: ${video.items.snippet.channelTitle}</p>
              
              
              <div>`;
      });
}

// Filter the videos based on title and channel
searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    console.log(query)
    const filteredVideos = result.filter(video => {
        const item = video.items;
        return (
            item.snippet.title.toLowerCase().includes(query) || 
            item.snippet.channelTitle.toLowerCase().includes(query)
        );
    });

   
    displayVideos(filteredVideos);
});
