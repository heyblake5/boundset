import test from 'node:test'
import assert from 'node:assert/strict'
import { REDESIGN_CHECK, redesignRoute } from '../lib/redesignCheck.js'
import { WAVE7 } from '../lib/answers-wave7.js'
import { CAL } from '../app/design/_shared/data.js'
import { withParams } from '../lib/bookHref.js'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const yes = (map) => Object.fromEntries(REDESIGN_CHECK.questions.map((q) => [q.id, map[q.id] || 'no']))

test('redesign check routes a positioning pattern to the call', () => {
  const answers = Object.fromEntries(REDESIGN_CHECK.questions.map((q) => [q.id, q.repositionWhen]))
  assert.equal(redesignRoute(answers), 'book')
})

test('redesign check routes a layout pattern to the teardown', () => {
  const answers = Object.fromEntries(REDESIGN_CHECK.questions.map((q) => [q.id, q.repositionWhen === 'yes' ? 'no' : 'yes']))
  assert.equal(redesignRoute(answers), 'teardown')
})

test('redesign check uses a majority, and waits until every question is answered', () => {
  const bookish = Object.fromEntries(REDESIGN_CHECK.questions.map((q) => [q.id, q.repositionWhen]))
  const ids = REDESIGN_CHECK.questions.map((q) => q.id)
  bookish[ids[0]] = bookish[ids[0]] === 'yes' ? 'no' : 'yes'
  bookish[ids[1]] = bookish[ids[1]] === 'yes' ? 'no' : 'yes'
  assert.equal(redesignRoute(bookish), 'book')
  bookish[ids[2]] = bookish[ids[2]] === 'yes' ? 'no' : 'yes'
  assert.equal(redesignRoute(bookish), 'teardown')
  assert.equal(redesignRoute({}), null)
  assert.equal(redesignRoute(null), null)
  const partial = { ...yes({}), [ids[0]]: undefined }
  delete partial[ids[0]]
  assert.equal(redesignRoute(partial), null)
})

test('features-are-free document title is 60 characters or fewer', () => {
  const a = WAVE7.find((x) => x.slug === 'how-to-differentiate-when-features-are-free')
  const full = `${a.title} | Boundset`
  assert.ok(full.length <= 60, `${full.length}: ${full}`)
  assert.equal(a.title, 'How to differentiate when features are free')
})

test('discovery booking link is the existing cal.com url', () => {
  const site = readFileSync(new URL('../components/site.js', import.meta.url), 'utf8')
  assert.match(site, new RegExp(`BOOK_CALL_URL = '${CAL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'`))
  assert.equal(CAL, 'https://cal.com/heyblake/positioning')
})

test('booking href stays on the cal.com positioning url and keeps existing notes', () => {
  const notes = 'Teardown: attio.com'
  const book = `${CAL}?notes=${encodeURIComponent(notes)}`
  const href = withParams(book, { src: 'teardown-result' })
  const url = new URL(href)
  assert.equal(`${url.origin}${url.pathname}`, 'https://cal.com/heyblake/positioning')
  assert.equal(url.searchParams.get('notes'), notes)
  assert.equal(url.searchParams.get('src'), 'teardown-result')
  assert.equal(href.split('?').length, 2)

  const bare = withParams(CAL, { src: 'redesign-check' })
  const bareUrl = new URL(bare)
  assert.equal(`${bareUrl.origin}${bareUrl.pathname}`, 'https://cal.com/heyblake/positioning')
  assert.equal(bareUrl.searchParams.get('src'), 'redesign-check')
  assert.equal(bare.split('?').length, 2)

  const already = withParams(`${CAL}?notes=${encodeURIComponent(notes)}&utm=guide`, { src: 'redesign-check' })
  const alreadyUrl = new URL(already)
  assert.equal(`${alreadyUrl.origin}${alreadyUrl.pathname}`, 'https://cal.com/heyblake/positioning')
  assert.equal(alreadyUrl.searchParams.get('notes'), notes)
  assert.equal(alreadyUrl.searchParams.get('utm'), 'guide')
  assert.equal(alreadyUrl.searchParams.get('src'), 'redesign-check')
  assert.equal(already.split('?').length, 2)
})

test('book call clicks use the Book call event and pass src as a prop', () => {
  const files = [
    'components/teardown/Tool.js',
    'app/teardown/r/[id]/page.js',
    'components/guide/RedesignCheck.js',
  ]
  for (const file of files) {
    const src = readFileSync(join(root, file), 'utf8')
    assert.equal(src.includes('Teardown Book Click'), false, file)
    assert.equal(src.includes('Book call click'), false, file)
    assert.match(src, /event="Book call"/, file)
    assert.match(src, /props=\{\{ src: /, file)
    assert.match(src, /withParams\(/, file)
  }
})
