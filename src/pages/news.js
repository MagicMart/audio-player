import { graphql } from "gatsby"
import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"

const NewsStyles = styled.div`
  max-width: 750px;
  margin: 0 auto;
  padding: 10px;
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
    news: markdownRemark(frontmatter: { slug: { eq: "news" } }) {
      html
      frontmatter {
        date
        title
      }
    }
  }
`
