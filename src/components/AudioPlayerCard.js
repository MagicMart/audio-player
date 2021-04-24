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
`

const ControlStyles = styled.div`
  width: inherit;
  display: flex;
  justify-content: space-evenly;
`

export default function AudioPlayerCard() {
  return (
    <PlayerCardStyles>
      <h2>Update</h2>
      <StaticImage
        src="../images/headphones.jpg"
        width={150}
        quality={95}
        formats={["AUTO", "WEBP", "AVIF"]}
        alt="Headphones on a desk"
        style={{ marginBottom: `1.45rem` }}
      />

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
    </PlayerCardStyles>
  )
}
