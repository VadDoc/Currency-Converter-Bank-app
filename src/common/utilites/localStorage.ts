// save to Local Storage
export function saveToLocalStorage<T>(key: string, state: T) {
  const stateAsString = JSON.stringify(state)
  localStorage.setItem(key, stateAsString)
}

// get from Local Storage
export function getFromLocalStorage<T>(key: string, defaultState: T) {
  let state = defaultState
  const stateAsString = localStorage.getItem(key)
  if (stateAsString !== null) state = JSON.parse(stateAsString) as T
  return state
}

