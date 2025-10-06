export interface ExtendedRequestInit extends RequestInit {
  params?: Record<string, string>;
}