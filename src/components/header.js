import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"

const HeaderStyles = styled.header`
  background: whitesmoke;
  /* margin-bottom: 1.45rem; */
  .inner {
    display: flex;
    margin: 0 auto;
    max-width: 300px;
    /* padding: 1.45rem 1.0875rem; */
    padding: 10px 0;
  }
  a {
    color: black;
    font-weight: normal;
    letter-spacing: 1.4px;
    text-decoration: none;
    font-size: 1.5rem;
    margin-left: 20px;
  }
  img {
    border-radius: 25%;
  }
`

const Header = ({ siteTitle }) => (
  <HeaderStyles>
    <div className="inner">
      <StaticImage
        src="../images/updatelogo.png"
        width={50}
        quality={95}
        formats={["AUTO", "WEBP", "AVIF"]}
        alt=""
      />
      <h1 style={{ margin: 0 }}>
        <Link to="/">{siteTitle}</Link>
      </h1>
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
