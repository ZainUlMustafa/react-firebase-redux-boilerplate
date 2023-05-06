import { storage } from '../config/firebaseConfig';
import { useEffect, useRef, useReducer } from 'react'

export const useGenerateSignedUrl = (filepath) => {
    const cacheData = useRef({})
    const initialState = {
        status: 'idle',
        error: null,
        data: null,
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
        if (!filepath || !filepath.trim()) return
        const renderData = async () => {
            dispatch({ type: 'FETCHING' })
            if (cacheData.current[filepath]) {
                const data = cacheData.current[filepath]
                dispatch({ type: 'FETCHED', payload: data })
            } else {
                try {
                    // const res = await fetch(filepath)
                    // const data = await res.json()
                    const storageRef = storage.ref(filepath);
                    const data = await storageRef.getDownloadURL()

                    cacheData.current[filepath] = data
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
    }, [filepath])
    return state
}