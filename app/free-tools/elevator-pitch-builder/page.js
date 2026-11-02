import ToolPage, { toolMeta } from '../ToolPage'
import Tool from '../_c/Pitch'
import t from '../tools.module.css'
export const metadata = toolMeta('elevator-pitch-builder')
export default function Page() {
  return (
    <ToolPage slug="elevator-pitch-builder" after={(
      <p className={t.prose}>The one-sentence pitch has the same job as <a href="/answers/what-is-a-one-liner">what is a one-liner</a>: say what the product is and who it is for.</p>
    )}><Tool /></ToolPage>
  )
}
