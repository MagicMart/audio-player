import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"

const NewsStyles = styled.div`
  max-width: 750px;
  margin: 0 auto;
  text-align: center;
`

export default function News() {
  return (
    <Layout>
      <NewsStyles>
        <h1>News Page</h1>
      </NewsStyles>
    </Layout>
  )
}
