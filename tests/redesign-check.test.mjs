import test from 'node:test'
import assert from 'node:assert/strict'
import { REDESIGN_CHECK, redesignRoute } from '../lib/redesignCheck.js'
import { WAVE7 } from '../lib/answers-wave7.js'
import { CAL } from '../app/design/_shared/data.js'
import { readFileSync } from 'node:fs'

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
