import { httpService } from './httpService.js'

const KEY = 'user/'

export const userService = {
    query,
    remove,
    save,
    update,
    queryUser

}

function query(filter = null) {
    var query = '?'
    if (filter) query += 'q=' + filter + '&'
    return httpService.get(KEY + query)
}

function queryUser(id) {
    var query = '?'
    return httpService.get(KEY + id + query)
}

function remove(id) {
    return httpService.delete(KEY + id)
}

function save(user) {
     return httpService.post(KEY, user)
}

function update(user) { 
    return httpService.put(KEY + user._id, user)
}