import { httpService } from './httpService.js'

const KEY = 'post/'

export const postService = {
    query,
    remove,
    save,
    queryPost

}

function query(filter = null) {
    var query = '?'
    if (filter) query += 'q=' + filter + '&'
    // if (filter.sortBy) query += 's=' + filter.sortBy + '&'
    // if (filter.stockFilter) query += 'f=' + filter.stockFilter + '&'
    return httpService.get(KEY + query)
}

function queryPost(id) {
    var query = '?'
    return httpService.get(KEY + id + query)
}

function remove(id) {
    return httpService.delete(KEY + id)
}

function save(post) {
    if (post._id) {
        return httpService.put(KEY + post._id, post)
    }
     return httpService.post(KEY, post)
}