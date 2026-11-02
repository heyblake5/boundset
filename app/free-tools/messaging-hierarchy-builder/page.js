import ToolPage, { toolMeta } from '../ToolPage'
import Tool from '../_c/Hierarchy'
import t from '../tools.module.css'
export const metadata = toolMeta('messaging-hierarchy-builder')
export default function Page() {
  return (
    <ToolPage slug="messaging-hierarchy-builder" after={(
      <p className={t.prose}>This is the same layout as a <a href="/answers/message-house-template">free message house template</a>: a core message, three pillars and proof points.</p>
    )}><Tool /></ToolPage>
  )
}
