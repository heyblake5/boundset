import { messageMarkdown } from '../../lib/messagingStrategy'
export const dynamic = 'force-static'
export function GET() {
  return new Response(messageMarkdown(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8', Link: '<https://boundset.com/messaging-strategy>; rel="canonical"' } })
}
