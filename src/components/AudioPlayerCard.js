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

const PlayerCardStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  padding: 1.45rem;
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
      <h2>title</h2>
      <ControlStyles>
        <IconContext.Provider
          value={{
            color: "white",
            size: "50px",
          }}
        >
          <FaStepBackward />
          <FaPlay />
          <FaStepForward />
        </IconContext.Provider>
      </ControlStyles>
      <input type="range" />
    </PlayerCardStyles>
  )
}
