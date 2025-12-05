import { useQuery } from '@tanstack/react-query'

const BASE_URL = 'https://responserift.dev'

export type User = {
  id: string
  name: string
  avatar: string
  email: string
  phone: string
  timestamp?: string
}

// Query key factory for user-related queries
export const userKeys = {
  all: ['users'] as const,
  detail: (userId: string) => [...userKeys.all, userId] as const,
}

/**
 * Fetch a single user by ID
 */
export async function fetchUser(userId: string): Promise<User | null> {
  const res = await fetch(`${BASE_URL}/api/users`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) throw new Error('Failed to fetch user')

  const json = await res.json()
  const users: User[] = json.results ?? []
  
  // Find the user with matching ID
  const user = users.find((u) => String(u.id) === String(userId))
  
  return user ?? null
}

/**
 * Hook to fetch a single user profile
 */
export function useUser(userId: string | undefined) {
  return useQuery<User | null>({
    queryKey: userKeys.detail(userId ?? ''),
    queryFn: () => fetchUser(userId!),
    enabled: !!userId,
    staleTime: 60000, // 1 minute - user data doesn't change often
    refetchOnWindowFocus: false,
  })
}

/**
 * Legacy hook for random user (kept for backwards compatibility)
 */
async function fetchRandomUser(): Promise<{ name: { first: string; last: string }; email: string }> {
  const res = await fetch('https://randomuser.me/api/')
  if (!res.ok) throw new Error('Network response was not ok')
  const data = await res.json()
  return data.results[0]
}

export function useRandomUser() {
  return useQuery({
    queryKey: ['random-user'],
    queryFn: fetchRandomUser,
    staleTime: 1000 * 60,
  })
}
