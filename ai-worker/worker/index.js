import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  try {
    return await getAssetFromKV(event)
  } catch (e) {
    return new Response("Not found", { status: 404 })
  }
}
