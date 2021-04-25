import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import AudioPlayerCard from "../components/AudioPlayerCard"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <AudioPlayerCard />
  </Layout>
)

export default IndexPage
