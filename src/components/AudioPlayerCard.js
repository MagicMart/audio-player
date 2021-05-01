import { StaticImage } from "gatsby-plugin-image"
import React, { useRef } from "react"
import styled from "styled-components"
import {
  FaPlay,
  FaPauseCircle,
  FaStepBackward,
  FaStepForward,
} from "react-icons/fa"
import { IconContext } from "react-icons"
import { graphql, useStaticQuery } from "gatsby"

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
  .input-space {
    height: 5px;
    margin-bottom: 10px;
  }
`

const ControlStyles = styled.div`
  width: inherit;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 1.45rem;
`

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_PLAY":
      return { ...state, isPlaying: !state.isPlaying }
    case "UPDATE_TRACKPROGRESS":
      return { ...state, trackProgress: state.audioSrc.currentTime }
    case "UPDATE_TRACK":
      if (state.isPlaying) state.audioSrc.currentTime = state.audioSrc.duration
      if (state.trackList[state.trackNum + 1]) {
        return {
          ...state,
          audioSrc: new Audio(state.trackList[state.trackNum + 1]),
          trackNum: state.trackNum + 1,
          trackProgress: 0,
        }
      }
      return {
        ...state,
        isPlaying: false,
        audioSrc: new Audio(state.trackList[0]),
        trackNum: 0,
      }
    case "PREVIOUS":
      if (state.trackList[state.trackNum - 1]) {
        if (state.isPlaying)
          state.audioSrc.currentTime = state.audioSrc.duration
        return {
          ...state,
          audioSrc: new Audio(state.trackList[state.trackNum - 1]),
          trackNum: state.trackNum - 1,
          trackProgress: 0,
        }
      } else {
        if (state.isPlaying) state.audioSrc.currentTime = 0
        return {
          ...state,
          trackProgress: 0,
        }
      }

    default:
      throw new Error()
  }
}

export default function AudioPlayerCard() {
  const { allS3Key } = useStaticQuery(graphql`
    query S3Keys {
      allS3Key {
        nodes {
          id
          s3key
        }
      }
    }
  `)
  const audioUrls = allS3Key.nodes.map(node => node.s3key)
  const [state, dispatch] = React.useReducer(reducer, {
    isPlaying: false,
    trackProgress: 0,
    trackNum: 0,
    trackList: audioUrls,
    audioSrc: typeof window !== "undefined" && new Audio(audioUrls[0]),
  })
  const intervalID = useRef()

  function togglePlay() {
    dispatch({ type: "TOGGLE_PLAY" })
  }

  function forward() {
    dispatch({ type: "UPDATE_TRACK" })
  }

  function previous() {
    dispatch({ type: "PREVIOUS" })
  }

  React.useEffect(() => {
    if (state.isPlaying) {
      intervalID.current = setInterval(() => {
        if (state.audioSrc.ended) {
          dispatch({
            type: "UPDATE_TRACK",
          })
        }
        dispatch({
          type: "UPDATE_TRACKPROGRESS",
        })
      }, 500)
    } else {
      clearInterval(intervalID.current)
    }
    return () => clearInterval(intervalID.current)
  }, [state.isPlaying, state.audioSrc])

  React.useEffect(() => {
    if (state.isPlaying) {
      state.audioSrc.play()
    } else {
      state.audioSrc.pause()
    }
  }, [state.isPlaying, state.audioSrc])

  function handleRangeInput(e) {
    const { value } = e.target
    state.audioSrc.currentTime = value
    dispatch({ type: "UPDATE_TRACKPROGRESS", payload: value })
  }

  return (
    <PlayerCardStyles>
      <StaticImage
        src="../images/headphones.jpg"
        width={150}
        formats={["AUTO", "WEBP", "AVIF"]}
        alt="Headphones on a desk"
        style={{ marginBottom: `1.45rem` }}
      />
      <h2 style={{ background: "yellow", color: "black", padding: "5px" }}>
        Track {state.trackNum + 1} of {state.trackList.length}
      </h2>
      <ControlStyles>
        <IconContext.Provider
          value={{
            color: "white",
            size: "50px",
          }}
        >
          <FaStepBackward onClick={previous} />
          {state.isPlaying ? (
            <FaPauseCircle onClick={togglePlay} />
          ) : (
            <FaPlay onClick={togglePlay} />
          )}

          <FaStepForward onClick={forward} />
        </IconContext.Provider>
      </ControlStyles>
      {isNaN(state.audioSrc.duration) ? (
        <div className="input-space"></div>
      ) : (
        <input
          type="range"
          min="0"
          max={state.audioSrc.duration}
          step="1"
          value={state.trackProgress}
          onChange={handleRangeInput}
        />
      )}
    </PlayerCardStyles>
  )
}
