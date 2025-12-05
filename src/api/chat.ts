const BASE_URL = 'https://responserift.dev'

export type Conversation = {
  id: string
  name: string
  avatar: string
  timestamp: string
  phone: string
  email: string
}

// Fetch conversations using GET
export async function fetchConversations(): Promise<Conversation[]> {
    const res = await fetch(`${BASE_URL}/api/users`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (!res.ok) throw new Error('Failed to fetch conversations');
  
    const json = await res.json();

    console.log('API response:', json);

  return json.results ?? [];

  }
  
