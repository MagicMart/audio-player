import { graphql } from "gatsby"
import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"

const NewsStyles = styled.div`
  max-width: 750px;
  margin: 0 auto;
  h2,
  time {
    background: yellow;
    color: black;
    width: fit-content;
    padding: 2px;
  }
`

export default function News({ data }) {
  const {
    html,
    frontmatter: { date },
  } = data.news
  return (
    <Layout>
      <NewsStyles>
        <time>{date}</time>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </NewsStyles>
    </Layout>
  )
}

export const query = graphql`
  {
    news: markdownRemark {
      html
      frontmatter {
        date
        title
      }
    }
  }
`
