import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"

const HeaderStyles = styled.header`
  background: whitesmoke;
  /* margin-bottom: 1.45rem; */
  padding: 10px 0;
  .inner {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 0 auto;
    max-width: 750px;
    /* padding: 1.45rem 1.0875rem; */
  }
  h1 {
    margin: 0;
  }
  a {
    /* display: flex;
    align-items: center;
    color: black;
    letter-spacing: 1.4px;
    text-decoration: none; */
    font-size: 3rem;
  }
  img {
    border-radius: 25%;
  }
`

const Header = ({ siteTitle }) => (
  <HeaderStyles>
    <div className="inner">
      <h1 style={{ display: "flex", alignItems: "center" }}>
        <Link to="/">
          <mark>{siteTitle}</mark>
        </Link>
      </h1>
      <StaticImage
        src="../images/updatelogo.png"
        width={50}
        quality={100}
        formats={["AUTO", "WEBP", "AVIF"]}
        alt=""
      />
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
