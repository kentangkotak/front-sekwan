

export const setHeaderToken = token => setToken(token)
export const setLocalToken = token => localStorage.setItem('token', JSON.stringify(token))
export const getLocalToken = () => JSON.parse(localStorage.getItem('token'))
export const setUser = user => localStorage.setItem('user', JSON.stringify(user))
export const getUser = () => JSON.parse(localStorage.getItem('user'))
export const deleteHeaderToken = () => deleteToken()
export const deleteLocalToken = () => localStorage.removeItem('token')


export const clearStore = () => localStorage.clear()
