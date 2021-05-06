import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const SecondPage = () => (
  <Layout>
    <Seo title="menu" />
    <h1>Menu</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the Audio Player</Link>
  </Layout>
)

export default SecondPage
