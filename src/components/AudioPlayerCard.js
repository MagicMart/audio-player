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
import { setItem, getItem } from "../utils/localStorage"

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
  border: 10px solid red;
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
    case "INITIAL_AUDIO":
      const { audioElement, currentTrackNum } = action.payload
      return { ...state, audioElement, currentTrackNum }
    case "TOGGLE_PLAY":
      return { ...state, isPlaying: !state.isPlaying }
    case "UPDATE_TRACKPROGRESS":
      return { ...state, trackProgress: action.payload }
    case "UPDATE_TRACK":
      if (state.audioUrlList[state.currentTrackNum + 1]) {
        return {
          ...state,
          audioElement: new Audio(
            state.audioUrlList[state.currentTrackNum + 1]
          ),
          currentTrackNum: state.currentTrackNum + 1,
          trackProgress: 0,
        }
      }
      return {
        ...state,
        isPlaying: false,
        audioElement: new Audio(state.audioUrlList[0]),
        currentTrackNum: 0,
      }
    case "PREVIOUS":
      if (state.audioUrlList[state.currentTrackNum - 1]) {
        return {
          ...state,
          audioElement: new Audio(
            state.audioUrlList[state.currentTrackNum - 1]
          ),
          currentTrackNum: state.currentTrackNum - 1,
          trackProgress: 0,
        }
      } else {
        if (state.isPlaying) state.audioElement.currentTime = 0
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
  const [state, dispatch] = React.useReducer(reducer, {
    isPlaying: false,
    trackProgress: 0,
    currentTrackNum: 0,
    audioUrlList: allS3Key.nodes.map(node => node.s3key),
    audioElement: null,
    localStorage: typeof window !== "undefined" && getItem(),
  })
  const intervalID = useRef()

  function togglePlay() {
    if (!state.audioElement) return
    dispatch({ type: "TOGGLE_PLAY" })
  }

  function forward() {
    if (!state.audioElement) return
    if (state.isPlaying) state.audioElement.pause()
    dispatch({ type: "UPDATE_TRACK" })
  }

  function previous() {
    if (!state.audioElement) return
    if (state.isPlaying) state.audioElement.pause()
    dispatch({ type: "PREVIOUS" })
  }

  React.useEffect(() => {
    let lastListenedTo
    const { storedAudioURL, storedTrackNum = 0 } = state.localStorage
    if (
      storedAudioURL &&
      storedAudioURL === state.audioUrlList[storedTrackNum]
    ) {
      lastListenedTo = new Audio(state.audioUrlList[storedTrackNum])
    } else {
      lastListenedTo = new Audio(state.audioUrlList[0])
    }
    // lastListenedTo = new Audio(state.audioUrlList[0])
    // const storedTrackNum = 0
    dispatch({
      type: "INITIAL_AUDIO",
      payload: {
        audioElement: lastListenedTo,
        currentTrackNum: storedTrackNum,
      },
    })
  }, [state.audioUrlList, state.localStorage])

  React.useEffect(() => {
    if (!state.audioElement) return
    if (state.isPlaying) {
      intervalID.current = setInterval(() => {
        if (state.audioElement.ended) {
          clearInterval(intervalID.current)
          dispatch({
            type: "UPDATE_TRACK",
          })
        }
        dispatch({
          type: "UPDATE_TRACKPROGRESS",
          payload: state.audioElement.currentTime,
        })
      }, 500)
    } else {
      clearInterval(intervalID.current)
    }
    return () => {
      state.audioElement.pause()
      clearInterval(intervalID.current)
    }
  }, [state.isPlaying, state.audioElement])

  React.useEffect(() => {
    if (!state.audioElement) return
    if (state.isPlaying) {
      state.audioElement.play()
    } else {
      state.audioElement.pause()
    }
  }, [state.isPlaying, state.audioElement])

  React.useEffect(() => {
    if (!state.audioUrlList) return
    setItem({
      storedAudioURL: state.audioUrlList[state.currentTrackNum],
      storedTrackNum: state.currentTrackNum,
    })
  }, [state.audioUrlList, state.currentTrackNum])

  function handleRangeInput(e) {
    if (!state.audioElement) return
    const { value } = e.target
    state.audioElement.currentTime = Number(value)
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
        Track {state.currentTrackNum + 1} of {state.audioUrlList.length}
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
      {!state.audioElement ||
      isNaN(state.audioElement.duration) ||
      state.audioElement.duration === +Infinity ? (
        <div className="input-space"></div>
      ) : (
        <input
          type="range"
          min="0"
          max={state.audioElement.duration}
          step="1"
          value={state.trackProgress}
          onChange={handleRangeInput}
        />
      )}
    </PlayerCardStyles>
  )
}
