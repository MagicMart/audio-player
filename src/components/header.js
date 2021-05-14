import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"

const HeaderStyles = styled.header`
  background: whitesmoke;
  padding: 10px 0;
  .inner {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: center;
    align-items: center;
    grid-column-gap: 10px;
    margin: 0 auto;
    max-width: 300px;
  }
  p {
    margin: 0;
    font-size: 4rem;
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
        quality={100}
        formats={["AUTO", "WEBP", "AVIF"]}
        alt=""
      />{" "}
      <Link to="/">
        <p>
          <mark>{siteTitle}</mark>
        </p>
      </Link>
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
