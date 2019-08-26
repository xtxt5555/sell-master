import storage from 'good-storage'
const SELLER = '__seller__'

export function saveToLocal(id, key, val) {
  console.log(111)
  const seller = storage.get(SELLER, {})
  if (!seller[id]) {
    seller[id] = {}
  }
  seller[id][key] = val
  storage.set(SELLER, seller)
}

export function loadFromLocal(id, key, def) {
  console.log(222)
  const seller = storage.get(SELLER, {})
  if (!seller[id]) {
    return def
  }
  return seller[id][key] || def
}
