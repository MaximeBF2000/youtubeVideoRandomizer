// youtube data API key (make it secret for github)
let yt_apiKey = ""

async function getApiKey(){
  let yt_apiKey_brut = await fetch("./apikey.json")
  yt_apiKey_brut = await yt_apiKey_brut.json()
  yt_apiKey = yt_apiKey_brut.key
}
getApiKey()

let channel_id = ""
let req_url = ""


// Handle input prepare the var 'req_url' to be ready to request the correct youtube channel

function handleInput(){
  const input = document.querySelector("#channelLink")
  const value = input.value

  req_url = `https://www.googleapis.com/youtube/v3/search?order=relevance&part=snippet&q=${value}&key=${yt_apiKey}` // (get the 5 most relevant yt channel compared to the value of input)

}


function generateRandomVid(){
  const player = document.querySelector("#vid")


  // Request the youtube channel (url request handle on top with the function 'handleInput')

  let ajax_channel = new XMLHttpRequest()
  ajax_channel.open("GET", req_url, true)
  ajax_channel.send()
  ajax_channel.onload = () => {
    if(ajax_channel.status == 200){
      let response = JSON.parse(ajax_channel.responseText).items
      channel_id = response[0].snippet.channelId


      // Request a random video from this channel

      req_url = `https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&maxResults=50&channelId=${channel_id}&key=${yt_apiKey}` // (get 50 videos from the selected channel)

      let ajax_video = new XMLHttpRequest()

      ajax_video.open("GET", req_url, true)
      ajax_video.send()

      ajax_video.onload = () => {
        if(ajax_video.status == 200){
          let response = JSON.parse(ajax_video.responseText).items
          let randomNum = Math.floor(Math.random() * response.length)
          let randomVideo = response[randomNum]
          let video_id = randomVideo.id.videoId 

          // Insert the video in HTML
          player.src = "https://www.youtube.com/embed/"+video_id
        }
      }

    }
  }

}