import Shell from '../../components/c2/Shell'
import Tool from '../../components/teardown/Tool'
import { BOOK_CALL_URL } from '../../components/site'
import { modelStatus } from '../../lib/teardown/model'
import { emailEnabled } from '../../lib/teardown/email'
import { TEARDOWNS } from '../../lib/teardowns'
import { COPY } from '../../components/teardown/copy'
// ISR: prerendered (metadata stays in <head>), availability re-read from env every 5 minutes.
export const revalidate = 300
export const metadata = { title: 'Positioning teardown | Boundset', description: COPY.h1, alternates: { canonical: '/teardown' } }
export default function Page() {
  return <Shell><Tool available={modelStatus().available} emailOn={emailEnabled()} bookUrl={BOOK_CALL_URL} samples={TEARDOWNS.slice(0, 3)} /></Shell>
}
