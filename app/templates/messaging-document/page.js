import { DocPage } from '../../../components/guide/GuideLayout'
import { pageLd, meta } from '../../../components/Content'
import { withOg } from '../../../components/guide/docMeta'
import { msgDoc } from '../../../lib/docs'
const d = msgDoc()
export const metadata = withOg(meta(d.raw), d.route)
export default function Page() { return <DocPage p={d} data={pageLd(d.raw, 'HowTo')} rel={d.related} /> }
