/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const fetch = require("isomorphic-fetch")

async function fetchS3ObjectKeysAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  const res = await fetch(
    "https://8leyxwecz7.execute-api.eu-west-2.amazonaws.com/update"
  )
  const s3keys = await res.json()

  s3keys.forEach((s3key, i) => {
    endpoint = "https://d30v8sqsz26dxk.cloudfront.net/" + s3key
    const nodeMeta = {
      id: createNodeId(`key-${endpoint}`),
      parent: null,
      children: [],
      internal: {
        type: "S3key",
        mediaType: "application/json",
        contentDigest: createContentDigest(endpoint),
      },
    }
    actions.createNode({
      endpoint,
      ...nodeMeta,
    })
  })
}

exports.sourceNodes = async params => {
  await Promise.all([fetchS3ObjectKeysAndTurnIntoNodes(params)])
}
