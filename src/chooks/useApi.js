import { useEffect, useRef, useReducer } from 'react'
export const useApi = (api) => {
  const cacheData = useRef({})
  const initialState = {
    status: 'idle',
    error: null,
    data: [],
  }

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'FETCHING':
        return { ...initialState, status: 'fetching' }
      case 'FETCHED':
        return { ...initialState, status: 'fetched', data: action.payload }
      case 'FETCH_ERROR':
        return { ...initialState, status: 'error', error: action.payload }
      default:
        return state
    }
  }, initialState)

  useEffect(() => {
    let revokeRequest = false
    if (!api || !api.trim()) return
    const renderData = async () => {
      dispatch({ type: 'FETCHING' })
      if (cacheData.current[api]) {
        const data = cacheData.current[api]
        dispatch({ type: 'FETCHED', payload: data })
      } else {
        try {
          // console.log(api)
          const res = await fetch(api)
          const data = await res.json()
          cacheData.current[api] = data
          if (revokeRequest) return
          dispatch({ type: 'FETCHED', payload: data })
        } catch (error) {
          if (revokeRequest) return
          dispatch({ type: 'FETCH_ERROR', payload: error.message })
        }
      }
    }
    renderData()
    return function cleanup() {
      revokeRequest = true
    }
  }, [api])
  return state
}