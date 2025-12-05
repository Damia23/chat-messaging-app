// src/api/messages.ts
const BASE_URL = 'https://responserift.dev'

export type Message = {
  id: string
  userId: string
  text: string
  createdAt: string
  username?: string
}

export type SendMessagePayload = {
  userId: string   // conversation ID / recipient
  title: string
  body: string
}

export type SendMessageResponse = {
    id: number
    userId: number
    title: string
    slug: string
    body: string
    tags: string[]
    category: string
    createdAt: string
}

// Fetch messages filtered by userId (conversation ID)
export async function fetchMessages(userId: string): Promise<Message[]> {
  // Explicitly specify GET
  const res = await fetch(`${BASE_URL}/api/posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) throw new Error('Failed to fetch messages')

  const data = await res.json()

  // API returns { results: [...] }
  const results = Array.isArray(data.results) ? data.results : []

  // Filter messages for this specific user ID
  const filteredResults = results
    .filter((msg: any) => msg.userId == userId)
    .map((msg: any) => ({
      id: String(msg.id),
      userId: String(msg.userId),
      text: msg.body ?? msg.text ?? '',
      createdAt: msg.createdAt ?? new Date().toISOString(),
      username: msg.username ?? 'User',
    }))

    console.log(`filteredResults`, filteredResults)

    return filteredResults
}

export async function sendMessage(payload: SendMessagePayload): Promise<SendMessageResponse> {
  const fetchResp = await fetch(`${BASE_URL}/api/posts`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    }
  })

  // 4xx-5xx
  // if (!fetchResp.ok) {
  //   console.warn(fetchResp)
  //    TODO: handle error: {"error": "Missing field: title"}
  //   throw new Error(`Send message failed: not ok`)
  // }

  // if (fetchResp.status != 201 && fetchResp.status != 200) {
  //   console.warn(`Send message HTTP code: ${fetchResp.status} ${fetchResp.statusText}`)
  //   throw new Error(`Send message failed`)
  // }

  const respBody = await fetchResp.json() as any as SendMessageResponse

  console.log(respBody)

  return respBody
}

