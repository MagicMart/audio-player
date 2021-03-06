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
import { graphql, useStaticQuery } from "gatsby"
// import { setItem, getItem } from "../utils/localStorage"

const PlayerCardStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  padding: 2rem;
  margin: 0 auto;
  border-radius: 10%;
  background: black;
  color: white;
  border: 10px solid red;
  img {
    border-radius: 50%;
  }
  input[type="range"] {
    height: 0.5rem;
    -webkit-appearance: none;
    width: 100%;
    margin-bottom: 2.5rem;
    border-radius: 8px;
    background: #3b7677;
    cursor: pointer;
  }
  .input-space {
    height: 0.5rem;
    margin-bottom: 2.5rem;
  }
  .track-number {
    background: yellow;
    color: black;
    font-size: 2.5rem;
    font-weight: bold;
    margin: 0 0 2.5rem;
  }
`

const H1 = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
`

const ControlStyles = styled.div`
  width: inherit;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 3rem;
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
    case "UPDATE_AUDIO_ELEMENT":
      // check if there is a next element in the audioUrlList array
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
      // if there are no more elements got to first element
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
        // if (state.isPlaying) state.audioElement.currentTime = 0
        return {
          ...state,
          audioElement: new Audio(state.audioUrlList[0]),
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
          endpoint
        }
      }
    }
  `)
  const [state, dispatch] = React.useReducer(reducer, {
    isPlaying: false,
    trackProgress: 0,
    currentTrackNum: 0,
    audioUrlList: allS3Key.nodes.map(node => node.endpoint),
    audioElement: null,
  })
  const togglePlay = React.useCallback(() => {
    if (!state.audioElement || state.audioElement.readyState !== 4) return
    dispatch({ type: "TOGGLE_PLAY" })
  }, [state.audioElement])

  const forward = React.useCallback(() => {
    if (!state.audioElement) return
    // state.audioElement.pause()
    dispatch({ type: "UPDATE_AUDIO_ELEMENT" })
  }, [state.audioElement])

  const previous = React.useCallback(() => {
    if (!state.audioElement) return
    // if (state.currentTrackNum === 0) {
    //   state.audioElement.currentTime = 0
    //   return
    // }
    dispatch({ type: "PREVIOUS" })
  }, [state.audioElement])

  React.useEffect(() => {
    let lastListenedTo

    const localStorage =
      JSON.parse(window.localStorage.getItem("updatestoke")) || {}
    const { storedAudioURL, storedTrackNum = 0 } = localStorage

    if (
      storedAudioURL &&
      storedAudioURL === state.audioUrlList[storedTrackNum]
    ) {
      lastListenedTo = new Audio(state.audioUrlList[storedTrackNum])
    }

    dispatch({
      type: "INITIAL_AUDIO",
      payload: {
        audioElement: lastListenedTo || new Audio(state.audioUrlList[0]),
        currentTrackNum: lastListenedTo ? storedTrackNum : 0,
      },
    })
  }, [state.audioUrlList])

  React.useEffect(() => {
    function updateTrack() {
      if (state.audioElement.ended) {
        dispatch({ type: "UPDATE_AUDIO_ELEMENT" })
      } else {
        dispatch({
          type: "UPDATE_TRACKPROGRESS",
          payload: state.audioElement.currentTime,
        })
      }
    }
    state.audioElement?.addEventListener("timeupdate", updateTrack)
    return () => {
      state.audioElement?.pause()
      state.audioElement?.removeEventListener("timeupdate", updateTrack)
    }
  }, [state.audioElement])

  React.useEffect(() => {
    if (!state.audioElement) return
    if (state.isPlaying) {
      state.audioElement.play().catch(err => console.log(err))
    } else {
      state.audioElement.pause()
    }
  }, [state.isPlaying, state.audioElement])

  React.useEffect(() => {
    if (!state.audioUrlList) return
    window.localStorage.setItem(
      "updatestoke",
      JSON.stringify({
        storedAudioURL: state.audioUrlList[state.currentTrackNum],
        storedTrackNum: state.currentTrackNum,
      })
    )
  }, [state.audioUrlList, state.currentTrackNum])

  React.useEffect(() => {
    const controls = e => {
      // console.log(e)
      if (e.code === "Space") togglePlay()
      if (e.code === "ArrowLeft") previous()
      if (e.code === "ArrowRight") forward()
    }
    window.document.addEventListener("keydown", controls)
    return () => window.document.removeEventListener("keydown", controls)
  }, [togglePlay, previous, forward])

  function handleRangeInput(e) {
    if (!state.audioElement) return
    const { value } = e.target
    state.audioElement.currentTime = Number(value)
    dispatch({ type: "UPDATE_TRACKPROGRESS", payload: value })
  }

  return (
    <>
      <H1>Update Audio News</H1>
      <PlayerCardStyles>
        <StaticImage
          src="../images/headphones.jpg"
          width={150}
          formats={["AUTO", "WEBP", "AVIF"]}
          alt="Headphones on a desk"
          style={{ marginBottom: `2.5rem` }}
        />
        <p className="track-number">
          Track {state.currentTrackNum + 1} of {state.audioUrlList.length}
        </p>
        <ControlStyles>
          <IconContext.Provider
            value={{
              color: "white",
              size: "50px",
            }}
          >
            <FaStepBackward
              onClick={previous}
              tabIndex="0"
              aria-label="previous track"
            />
            {state.audioElement?.paused ? (
              <FaPlay
                onClick={togglePlay}
                tabIndex="0"
                aria-label="play audio"
              />
            ) : (
              <FaPauseCircle
                onClick={togglePlay}
                tabIndex="0"
                aria-label="pause audio"
              />
            )}

            <FaStepForward
              onClick={forward}
              tabIndex="0"
              aria-label="next track"
            />
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
    </>
  )
}
