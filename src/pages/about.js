import { graphql } from "gatsby"
import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"

const AboutStyles = styled.div`
  max-width: 750px;
  margin: 0 auto;
  padding: 10px;
  h2 {
    color: red;
  }
`

export default function About({ data }) {
  const {
    html,
    frontmatter: { date },
  } = data.news
  return (
    <Layout>
      <AboutStyles>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </AboutStyles>
    </Layout>
  )
}

export const query = graphql`
  {
    news: markdownRemark(frontmatter: { slug: { eq: "about" } }) {
      html
      frontmatter {
        date
        title
      }
    }
  }
`
