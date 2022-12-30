const storage = {
    saveUserToStorage(user) {
        localStorage.setItem('loggedinUser', JSON.stringify(user))
    },
    loadUserFromStorage() {
        return JSON.parse(localStorage.getItem('loggedinUser'))
    },
    saveThemeToStorage(theme) {
        localStorage.setItem('theme', JSON.stringify(theme))
    },
    loadThemeFromStorage() {
        if (!JSON.parse(localStorage.getItem('theme'))) return 'light'
        return JSON.parse(localStorage.getItem('theme'))
    },
    
}

function makeId(length = 11) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}
function makeGuestName(length = 5) {
    var txt = ''
    var possible = '0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function getGuestUser () {
    return {
        _id: makeId(),
        firstName: 'Guest #' + makeGuestName(),
        lastName: '',
        password: '',
        image: '',
        friends: [],
        messages: [],
        email: '',
        likes: 0,
        social: '',
        posts: [],
        location: 'Israel',
        occupation: '',
    }
}


export const utilService = {
    storage,
    makeId,
    getGuestUser
    
}

