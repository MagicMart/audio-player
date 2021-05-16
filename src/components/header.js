import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"

const HeaderStyles = styled.header`
  background: whitesmoke;
  padding: 10px 0;
  .logo {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }
  .inner {
    /* display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center; */
    margin: 0 auto;
    max-width: 750px;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  li {
    padding: 0.25em;
    /* padding-right: 0.5em; */
    font-size: 2.5rem;
  }
  img {
    border-radius: 25%;
  }
  .active {
    background: yellow;
    color: black;
  }
`

const Header = ({ siteTitle }) => (
  <HeaderStyles>
    <div className="inner">
      <div className="logo">
        <StaticImage
          src="../images/updatelogo.png"
          width={40}
          quality={100}
          formats={["AUTO", "WEBP", "AVIF"]}
          alt=""
        />
      </div>
      <ul>
        <li>
          <Link to="/" activeClassName="active">
            update
          </Link>
        </li>
        <li>
          <Link to="/audio/" activeClassName="active">
            listen
          </Link>
        </li>
        <li>
          <Link to="/news/" activeClassName="active">
            news
          </Link>
        </li>
        <li>
          <Link to="/about/" activeClassName="active">
            about
          </Link>
        </li>
      </ul>
    </div>
  </HeaderStyles>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
