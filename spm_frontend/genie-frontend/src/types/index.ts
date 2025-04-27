// Auth types
export interface User {
    email: string;
  }
  
  export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
  }
  
  // Search types
  export interface SearchResult {
    id: string;
    title: string;
    url: string;
    publishedDate: string;
    author?: string;
    image?: string;
    favicon?: string;
  }
  
  export interface SearchResponse {
    requestId: string;
    autopromptString: string;
    resolvedSearchType: string;
    results: SearchResult[];
  }
  
  // Chat types
  export interface ChatMessage {
    role: 'user' | 'bot';
    content: string;
  }
  
  export interface ChatResponse {
    candidates: {
      content: {
        parts: {
          text: string;
        }[];
        role: string;
      };
      finishReason: string;
    }[];
  }