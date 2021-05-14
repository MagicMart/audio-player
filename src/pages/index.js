import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

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

  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2.5rem;
    letter-spacing: 1.5px;
  }
  .update {
    font-size: 3rem;
    line-height: 1.5;
    font-weight: bold;
    margin-bottom: 1.5rem;
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
        <p className="update">
          <mark>Update</mark>
        </p>
        <h1>
          <mark>Stoke's innovative talking newspaper</mark>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to="/audio/">
                <mark>Listen</mark>
              </Link>
            </li>
            <li>
              <Link to="/news/">
                <mark>News</mark>
              </Link>
            </li>
            <li>
              <Link to="/about/">
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
