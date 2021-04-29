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
    "https://8leyxwecz7.execute-api.eu-west-2.amazonaws.com/"
  )
  const s3keys = await res.json()
  console.log(s3keys)
  s3keys.slice(1).forEach((s3keyRaw, i) => {
    s3key =
      "https://s3.eu-west-2.amazonaws.com/martintudor.net/" +
      s3keyRaw.replace(" ", "+")
    const nodeMeta = {
      id: createNodeId(`key-${s3key}`),
      parent: null,
      children: [],
      internal: {
        type: "S3key",
        mediaType: "application/json",
        contentDigest: createContentDigest(s3key),
      },
    }
    actions.createNode({
      s3key,
      ...nodeMeta,
    })
  })
}

exports.sourceNodes = async params => {
  await Promise.all([fetchS3ObjectKeysAndTurnIntoNodes(params)])
}
