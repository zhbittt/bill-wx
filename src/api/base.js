import request from '@/utils/request'

/**
 * @method Login 登录
 * @param username
 * @param password
 * @constructor
 */
export function login (username, password) {
  return request({
    url: '/customer/login/',
    method: 'post',
    data: {
      username: username,
      password: password
    }
  })
}

/**
 * @method logout
 * @constructor
 */
export function logout () {
  return request({
    url: '/customer/logout/',
    method: 'delete'
  })
}

/**
 * @method GetBills 账单信息
 * @param page
 * @param limit
 */
export function GetBills (page = 1, limit = 20) {
  return request({
    url: `/cost/bills/`,
    method: 'get',
    params: {
      page: page,
      limit: limit
    }
  })
}

/**
 * @method GetBillsAnalysis 账单信息
 * @param page
 * @param limit
 */
export function GetBillsAnalysis (page = 1, limit = 20) {
  return request({
    url: `/cost/bills/analysis/`,
    method: 'get',
    params: {
      page: page,
      limit: limit
    }
  })
}

/**
 * @method AddBills 新建账单信息
 * @param data
 * @constructor
 */
export function AddBills (data) {
  return request({
    url: `/cost/bills/`,
    method: 'post',
    data
  })
}

/**
 * @method UpdateBillDetail 修改账单详细
 * @param id
 * @param data
 * @constructor
 */
export function UpdateBillDetail (id, data) {
  return request({
    url: `/cost/bill_details/${id}/`,
    method: 'patch',
    data
  })
}
