import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"

const MenuStyles = styled.div`
  /* max-width: 300px;
  margin: 0 auto; */
  li {
    font-size: 1.5rem;
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
    left: calc(100vw / 4);
  }
  p {
    font-size: 1.5rem;
    line-height: 1.5;
  }
  a {
    text-decoration: underline;
    color: red;
  }
`

const Menu = ({ data }) => (
  <>
    <Seo title="Menu" />
    <MenuStyles>
      <StaticImage
        src="../images/matt-botsford-OKLqGsCT8qs-unsplash.png"
        alt=""
        placeholder="blurred"
        layout="fullWidth"
      />
      <div className="menu">
        <h2>
          <mark>Update Stoke</mark>
        </h2>
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
