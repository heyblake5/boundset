import { readFileSync } from 'fs'
import path from 'path'
// Inline lockup (concept 02 "Bound corners"), background rect stripped, viewBox cropped to the ink.
const raw = readFileSync(path.join(process.cwd(), 'app/design/c2/brand/lockup.svg'), 'utf8')
const inner = raw.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/<rect width="100%" height="100%"[^>]*\/>/, '')
export default function Logo({ className }) {
  return <svg className={className} viewBox="700 690 9760 1500" role="img" aria-label="Boundset" dangerouslySetInnerHTML={{ __html: inner }} />
}
