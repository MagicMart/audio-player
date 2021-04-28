import React from "react"

export default function InputRange({ audioSrc, isPlaying, changeTrack }) {
  const [trackProgress, setTrackProgress] = React.useState("0")
  //   const [time, setTime] = React.useState(0)
  const timerId = React.useRef()

  React.useEffect(() => {
    timerId.current = setInterval(() => {
      setTrackProgress(audioSrc.currentTime)
    }, 1000)
    return () => clearInterval(timerId.current)
  }, [])

  React.useEffect(() => {
    if (audioSrc.ended) {
      changeTrack(1)
    }
  }, [trackProgress, changeTrack, audioSrc])

  function handleRangeChange(e) {
    const { value } = e.target
    setTrackProgress(value)
    audioSrc.currentTime = value
    console.log(value)
  }

  return (
    <input
      type="range"
      min="0"
      max={audioSrc.duration}
      step="0.1"
      value={trackProgress}
      onChange={handleRangeChange}
    />
  )
}
