import { StaticImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import {
  FaPlay,
  FaPauseCircle,
  FaStepBackward,
  FaStepForward,
} from "react-icons/fa"
import { IconContext } from "react-icons"

const urls = [
  "https://s3.eu-west-2.amazonaws.com/martintudor.net/audio/01-update.mp3",
  "https://s3.eu-west-2.amazonaws.com/martintudor.net/audio/02-update.mp3",
]

const PlayerCardStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  padding: 1.45rem;
  margin: 0 auto;
  border-radius: 10%;
  background: black;
  color: white;
  h2 {
    font-style: italic;
  }
  img {
    border-radius: 50%;
  }
  input[type="range"] {
    height: 5px;
    -webkit-appearance: none;
    width: 100%;
    margin-bottom: 10px;
    border-radius: 8px;
    background: #3b7677;
    cursor: pointer;
  }
`

const ControlStyles = styled.div`
  width: inherit;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 1.45rem;
`

export default function AudioPlayerCard() {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [rangeValue, setRangeValue] = React.useState("0")
  const tracks = React.useRef(urls)
  // const [nowPlaying, setNowPlaying] = React.useState(() => tracks.current[0])

  const [audioSrc, setAudioSrc] = React.useState(new Audio(tracks.current[0]))
  const timerId = React.useRef()
  console.log("Duration", audioSrc.duration)

  const togglePlay = () => {
    setIsPlaying(c => {
      c = !c
      if (c) {
        audioSrc.play()
      } else {
        audioSrc.pause()
      }
      return c
    })
  }

  React.useEffect(() => {
    if (isPlaying) {
      timerId.current = setInterval(() => {
        setRangeValue(audioSrc.currentTime)
      }, 1000)
    } else {
      clearInterval(timerId.current)
    }
    console.log("timerId", timerId.current)
    return () => clearInterval(timerId)
  }, [isPlaying])

  function handleRangeChange(e) {
    const value = e.target.value
    setRangeValue(value)
    audioSrc.currentTime = value
    console.log(value)
  }

  return (
    <PlayerCardStyles>
      <StaticImage
        src="../images/headphones.jpg"
        width={150}
        quality={95}
        formats={["AUTO", "WEBP", "AVIF"]}
        alt="Headphones on a desk"
        style={{ marginBottom: `1.45rem` }}
      />
      <h2>Track 1</h2>
      <ControlStyles>
        <IconContext.Provider
          value={{
            color: "white",
            size: "50px",
          }}
        >
          <FaStepBackward />
          {isPlaying ? (
            <FaPauseCircle onClick={togglePlay} />
          ) : (
            <FaPlay onClick={togglePlay} />
          )}

          <FaStepForward />
        </IconContext.Provider>
      </ControlStyles>
      {isNaN(audioSrc.duration) ? null : (
        <input
          type="range"
          min="0"
          max={audioSrc.duration}
          step="0.01"
          value={rangeValue}
          onChange={handleRangeChange}
        />
      )}
    </PlayerCardStyles>
  )
}
