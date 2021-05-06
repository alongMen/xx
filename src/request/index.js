import Vue from 'vue';
import axios from 'axios'
import { Message, Loading } from 'element-ui';
const ajax = axios.create()
const request = axios.create()
const Base64 = require("js-base64").Base64

let loading        //定义loading变量
function startLoading() {    //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}
function endLoading() {    //使用Element loading-close 方法
    loading.close()
}
let needLoadingRequestCount = 0
export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}

export  const  baseUrl= "http://192.168.1.6:8081/"
// export  const  baseUrl= "http://139.159.146.75:30000/"

request.interceptors.request.use(
    config => {
        let base = Base64.encode(Vue.prototype.$Authentication)
        config.headers.Authorization = "Basic "+base
        return config;
    },
    err => {
        return Promise.reject(err);
    });

request.interceptors.response.use(
    response => {
        if (response.status === 200) {
            //tryHideFullScreenLoading()

            return response.data;
        }
    },
    error => {
        console.log("error:"+error)
        if (error.response) {
            switch (error.response.status) {
                case 404:

                    this.$router({path:'/'})

            }
        }
        return Promise.reject(error.response.data)
    });

ajax.interceptors.request.use(
    config => {
        let token = window.sessionStorage.getItem('token')
          if (token) {  // 每次发送请求之前判断是否存在useName，如果存在，则统一在http请求的header都加上
            if (config.headers.Authorization==""||config.headers.Authorization==undefined){
                config.headers.Authorization = "Bearer "+token;
            }
          }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

ajax.interceptors.response.use(
    response => {
        if (response.status === 200) {
                return response.data;
        }
    },
    error => {
        console.log("error:"+error)
        if (error.response) {
            switch (error.response.status) {

                // case 401:
                // 这里写清除token的代码
                //   window.localStorage.removeItem('token')
                //   window.sessionStorage.removeItem('model')
                //   window.location.reload();
                case 404:
                // 这里写清除token的代码
                //   window.localStorage.removeItem('token')
                //   window.sessionStorage.removeItem('model')
                //   window.location.reload()
                this.$router({path:'/'})

            }
        }
        return Promise.reject(error.response.data)
    });
    //http response 拦截器
    ajax.interceptors.response.use(
    response => {
        tryHideFullScreenLoading()
        return response;
    },
    error => {
        return Promise.reject(error)
    }
)
//登录
export const loginByUserName = (data) => {
    return request.post(baseUrl + 'login', data)
}
//从Session中获取人员信息
export const getUserInfo = () => {
    return ajax.get(baseUrl + 'userInfo')
}
//修改密码
export const updatePassword = (data) => {
    return ajax.post(baseUrl + 'sysUser/users/password', data)
}
//查询当前登录用户
export const queryUser = () => {
    return ajax.get(baseUrl + "sysUser/users/current")
}
//查询用户列表
export const QueryUserList = (data) => {
    return ajax.get(baseUrl + "sysUser/users",data)
}
//通过id查询用户
export const QueryUserById = (data) => {
    return ajax.get(baseUrl + `sysUser/users/${data}`)
}
//保存或修改用户，传id为修改
export const saveUser = (data) => {
    return ajax.post(baseUrl + 'sysUser/users/saveOrUpdate', data)
}
//保存或修改用户信息
export const updateUser = (data) => {
    return ajax.post(baseUrl + 'sysUser/users/updateUser', data)
}
//删除用户
export const DeletUserById = (data) => {
    return ajax.delete(baseUrl + `sysUser/users/${data}`)
}
//查询角色列表
export const QueryRoleList = (data) => {
    return ajax.get(baseUrl + `sysRole/roles?page=${data.page}&limit=${data.limit}`)
}
//保存或修改角色，传id为修改
export const saveRole = (data) => {
    return ajax.post(baseUrl + 'sysRole/roles/saveOrUpdate', data)
}
//删除角色
export const DeletRoleById = (data) => {
    return ajax.delete(baseUrl + `sysRole/roles/${data}`)
}
//通过id查询角色
export const QueryRoleById = (data) => {
    return ajax.get(baseUrl + `sysRole/getOne/${data}`)
}
//通过角色id查询对应菜单
export const QueryMenuByRoleId = (data) => {
    return ajax.get(baseUrl + `/menus/${data}/menus`)
}
//查询菜单
export const QueryMenu = () => {
    return ajax.get(baseUrl + `/menus/findAlls`)
}
//新增菜单
export const AddMenu = (data) => {
    return ajax.post(baseUrl + 'menus/saveOrUpdate', data)
}
//通过id查询菜单详情
export const QueryMenuById = (data) => {
    return ajax.get(baseUrl + `menus/getOne/${data}`)
}
//角色分配菜单
export const GiveMenuByRole = (data) => {
    return ajax.post(baseUrl + 'menus/granted', data)
}
//删除菜单
export const DeletMenuById = (data) => {
    return ajax.delete(baseUrl + `menus/${data}`)
}

//删除附件
export const deleteFile = (id) => {
    return new Promise(function(resolve, reject){
        resolve(ajax.delete(baseUrl + `file/V01/files/${id}`))
    });
}
//删除文件
export const deleteFileByUrlAndBusinessType = (data) => {
    return ajax.post(baseUrl + 'file/V01/files/url/', data)
}
//查询附件
export const queryFileList = (data) => {
    return new Promise(function(resolve, reject){
        resolve(ajax.get(baseUrl + "file/V01/files",data))
    });
}
//退出登录
export const loginOut = (data) => {
    return new Promise(function(resolve, reject){
        resolve(ajax.get(baseUrl + "loginout",data))
    });
}
//查询字典类型列表
export const queryDictionaryTypeList = (data) => {
    return ajax.post(baseUrl + '/dictionaryType/list',data)
}
//添加字典类型
export const addDictionaryType = (data) => {
    return ajax.post(baseUrl + '/dictionaryType/save',data)
}
//id查询字典类型详情
export const queryDictionaryTypeById = (data) => {
    return ajax.get(baseUrl + `/dictionaryType/get/${data}`,data)
}
//根据id删除字典类型
export const deletDictionaryType = (data) => {
    return ajax.delete(baseUrl + `/dictionaryType/delete/${data}`,data)
}
//查询字典数据列表
export const queryDictionaryList = (data) => {
    return ajax.post(baseUrl + '/dictionary/list',data)
}
//添加字典数据
export const addDictionary = (data) => {
    return ajax.post(baseUrl + '/dictionary/save',data)
}
//id查询字典数据详情
export const queryDictionaryById = (data) => {
    return ajax.get(baseUrl + `/dictionary/get/${data}`,data)
}
//根据id删除字典数据
export const deletDictionary = (data) => {
    return ajax.delete(baseUrl + `/dictionary/delete/${data}`,data)
}
//通过字典类型查询字典
export const getDictionarysByDictType = (data) => {
    return ajax.get(baseUrl + `/dictionary/dictType/${data}`,data)
}
//查询所有字典类型
export const getAllDictionaryType = () => {
    return ajax.get(baseUrl + '/dictionaryType/findAllType')
};
//根据id删除栏目
export const deleteColumnInfo = (data) => {
    return ajax.delete(baseUrl + `/cms-column-info/delete/${data}`)
}
//保存修改栏目
export const saveColumnInfo= (data) => {
    return new Promise(function(resolve, reject){
        resolve(ajax.post(baseUrl + "/cms-column-info/save",data))
    });
}
//查询栏目
export const queryColumnInfo= (data) => {
    return new Promise(function(resolve, reject){
        resolve(ajax.post(baseUrl + "/cms-column-info/treeList",data))
    });
}
//批量添加智慧环保
export const addCmsArticleList = (data) => {
    return ajax.post(baseUrl + 'cms-article/saveList',data)
}
//添加智慧环保
export const addCmsAticle = (data) => {
    return ajax.post(baseUrl + 'cms-article/save',data)
}
//查询智慧环保分页列表
export const queryCmsArticleAll = (data) => {
    return ajax.post(baseUrl + 'cms-article/listAll',data)
}
//查询智慧环保列表
export const getArticleList = (data) => {
    return ajax.post(baseUrl + 'cms-column-info/first-list',data)
}
//查询智慧环保分页列表
export const queryCmsArticlePage = (data) => {
    return ajax.post(baseUrl + 'cms-article/list',data)
}
//根据id获取智慧环保对象
export const queryCmsArticleById = (data) => {
    return ajax.get(baseUrl + `cms-article/get/${data}`,data)
}
//根据id删除智慧环保对象
export const delCmsArticleById = (data) => {
    return ajax.delete(baseUrl + `cms-article/delete/${data}`,data)
}
//获取内网栏目列表
export const getInColumnList = (data) => {
    return ajax.get(baseUrl + 'cms-column-info/lan-list',data)
}
//同步智慧环保
export const syncArticle= (data) => {
    return ajax.get(baseUrl + `cms-article/sync/${data.cId}/${data.aId}`,data)
}
//撤回同步智慧环保
export const syncRecallArticle= (data) => {
    return ajax.get(baseUrl + `cms-article/sync/recall/${data}`,data)
}

//获取一级栏目列表
export const getFirstColumnList = (data) => {
    return ajax.post(baseUrl + 'cms-column-info/first-list',data)
}

//父级id获取子集栏目
export const getChildColumnListById = (id) => {
    return ajax.get(baseUrl + `cms-column-info/queryParentId/${id}`)
}

//获取一级栏目列表不分页
export const queryColumnLevelFirst = () => {
    return ajax.get(baseUrl + 'cms-column-info/queryLevelFirst')
}

//获取底部常用链接列表
export const getFooterLinkList = (data) => {
    return ajax.post(baseUrl + 'footer-common-link/list',data)
}
//添加底部常用链接
export const saveFooterLink = (data) => {
    return ajax.post(baseUrl + 'footer-common-link',data)
}
//获取底部常用链接详情
export const getFooterLinkById = (data) => {
    return ajax.get(baseUrl + `footer-common-link/${data}`,data)
}
//删除底部常用链接
export const deleteFooterLinkById = (data) => {
    return ajax.delete(baseUrl + `footer-common-link/${data}`,data)
}

//获取底部基本信息列表
export const getFooterInfoList = (data) => {
    return ajax.get(baseUrl + 'footer-basic-info/list',data)
}
//添加底部基本信息
export const saveFooterInfo = (data) => {
    return ajax.post(baseUrl + 'footer-basic-info',data)
}
//获取底部基本信息详情
export const getFooterInfoById = (data) => {
    return ajax.get(baseUrl + `footer-basic-info/${data}`,data)
}
//删除底部基本信息
export const deleteFooterInfoById = (data) => {
    return ajax.delete(baseUrl + `footer-basic-info/${data}`,data)
}


// 新增商品
//添加底部基本信息
export const saveShop = (data) => {
    return ajax.post(baseUrl + 'commodity/saveOrUpdate',data)
}
//获取商品列表
export const getShopList = (data) => {
    return ajax.post(baseUrl + 'commodity/findList',data)
}
// 删除商品
export const delShopList = (data) => {
    return ajax.delete(baseUrl + `commodity/${data}`)
}
//获取订单列表
export const getOrderList = (data) => {
    return ajax.post(baseUrl + 'order/findList',data)
}
//获取动态列表
export const getDynamicList = (data) => {
    return ajax.post(baseUrl + 'dynamic-info/findList',data)
}

