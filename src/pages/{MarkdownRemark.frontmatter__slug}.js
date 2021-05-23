import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import styled from "styled-components"
import Seo from "../components/seo"

const PageStyles = styled.div`
  max-width: 750px;
  margin: 0 auto;
  padding: 10px;
  h1 {
    color: red;
  }
  img {
    width: 100%;
  }
`

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <Seo title={frontmatter.title} />
      <PageStyles>
        <div className="blog-post">
          <time>{frontmatter.date}</time>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </PageStyles>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`
