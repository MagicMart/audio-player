import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"

const HeaderStyles = styled.header`
  background: wheat;
  margin-bottom: 1.45rem;
  .inner {
    display: flex;
    margin: 0 auto;
    max-width: 300px;
    /* padding: 1.45rem 1.0875rem; */
  }
  a {
    color: darkblue;
    text-decoration: none;
    font-size: 1.75rem;
  }
  img {
    border-radius: 10%;
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
        alt="Headphones on a desk"
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
