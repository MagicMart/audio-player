import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"
import "normalize.css"
import GlobalStyles from "../styles/GlobalStyles"
import Typography from "../styles/Typography"

const MenuStyles = styled.main`
  /* max-width: 300px;
  margin: 0 auto; */
  li {
    font-size: 2.5rem;
    margin-bottom: 1.2rem;
    font-weight: bold;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .menu {
    position: absolute;
    top: calc(100vh / 4);
    left: calc(100vw / 6);
  }
  p {
    font-size: 2rem;
    line-height: 1.5;
    font-weight: bold;
  }
`

const Menu = ({ data }) => (
  <>
    <GlobalStyles />
    <Typography />
    <Seo title="Menu" />
    <MenuStyles>
      <StaticImage
        src="../images/matt-botsford-OKLqGsCT8qs-unsplash.png"
        alt=""
        placeholder="blurred"
        layout="fullWidth"
      />
      <div className="menu">
        <h1>
          <mark>Update Stoke</mark>
        </h1>
        <p>
          <mark>Talking newspaper for those with sightloss</mark>
        </p>
        <nav>
          <ul>
            <li>
              <Link to="/audio">
                <mark>Audio Player</mark>
              </Link>
            </li>
            <li>
              <Link to="/news">
                <mark>News</mark>
              </Link>
            </li>
            <li>
              <Link to="/about">
                <mark>About</mark>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </MenuStyles>
  </>
)

export default Menu
