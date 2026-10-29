'use client'
import { UrlForm } from './UrlForm'
import { track } from './track'
// Inline tool on /teardowns/*: hands the URL to /teardown (which runs the bot checks and the stream).
export default function RunYours({ slug }) {
  return <UrlForm onSubmit={(u) => { track('Teardown page CTA', { slug }); window.location.href = `/teardown?url=${encodeURIComponent(u.replace(/^https:\/\//, '').replace(/\/$/, ''))}` }} />
}
