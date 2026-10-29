import ToolPage, { toolMeta } from '../ToolPage'
import Tool from '../_c/Statement'
import t from '../tools.module.css'
export const metadata = toolMeta('positioning-statement-generator')
export default function Page() {
  return (
    <ToolPage slug="positioning-statement-generator" after={(
      <p className={t.prose}>The line this page writes is an internal check, not homepage copy. <a href="https://www.aprildunford.com/post/a-product-positioning-exercise">April Dunford</a> argues that a fill-in-the-blank positioning statement assumes one right answer, and that the sentence it produces is awkward and rarely used again. Make the <a href="/answers/how-to-write-a-positioning-statement">positioning decisions</a> first. Then write what customers see.</p>
    )}><Tool /></ToolPage>
  )
}
