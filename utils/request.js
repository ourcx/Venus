// 请求基础配置
const BASE_URL = 'http://mobileback8.hmcs2025.com/mobile'; // 基础 API URL
// 请求队列，用于拦截器
let requestQueue = [];
// 设置请求头
const setRequestHeaders = () => {
    const token = uni.getStorageSync('token');
    if (token) {
        return { Authorization: `Bearer ${token}` };
    }
    return {};
};
// 请求和响应拦截器
const requestAndResponseInterceptor = () => {
    uni.addInterceptor('request', {
        invoke(options) {
            options.header = {
                ...options.header,
                ...setRequestHeaders(),
            };
            requestQueue.push(options);
            return options;
        },
        success(res) {
            if (res.statusCode === 200) {
                return res.data;
            } else {
                //handleError(res);
                return Promise.reject(res);
            }
        },
        fail(err) {
            uni.showToast({
                title: '网络请求失败',
                icon: 'none',
            });
            return Promise.reject(err);
        },
    });
};

// 调用请求拦截器和响应拦截器
requestAndResponseInterceptor();

// 封装网络请求
export const request = (options) => {
    const { url, method = 'GET', data = {}, headers = {} } = options;
    // 合并配置
    const config = {
        url: options.url.startsWith('http') ? options.url : BASE_URL + options.url,
        method: options.method || 'GET',
        data: options.data || {},
        header: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer',
            ...options.header, // 允许自定义header
        },
        timeout: 10000, // 超时时间（ms）
    }
    return new Promise((resolve, reject) => {
        uni.request({
            ...config,
            success: (res) => {
                if (res.statusCode === 200) {
                    resolve(res.data); // 请求成功，返回数据
                } else {
                    reject(res); // 请求失败，返回错误信息
                }
            },
            fail: (err) => {
                reject(err); // 网络失败，返回错误信息
            },
        });
    });
};


export const http = {
    get(url, data, options = {}) {
        return request({
            url,
            method: 'GET',
            data,
            ...options,
        })
    },
    post(url, data, options = {}) {
        return request({
            url,
            method: 'POST',
            data,
            ...options,
        })
    },
    put(url, data, options = {}) {
        return request({
            url,
            method: 'PUT',
            data,
            ...options,
        })
    },
    delete(url, data, options = {}) {
        return request({
            url,
            method: 'DELETE',
            data,
            ...options,
        })
    },
}
