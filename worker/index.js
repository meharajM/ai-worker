import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

async function handleRequest(event) {
  const options = {}

  try {
    return await getAssetFromKV(event, options)
  } catch (e) {
    // If not found, fall back to index.html for SPA routing
    try {
      let notFoundResponse = await getAssetFromKV(event, {
        mapRequestToAsset: req => {
          const url = new URL(req.url)
          return new Request(`${url.origin}/index.html`, req)
        },
      })

      return new Response(notFoundResponse.body, {
        ...notFoundResponse,
        status: 200,
      })
    } catch (e) {
      return new Response("Not found", { status: 404 })
    }
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})
