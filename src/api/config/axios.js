import axios from "axios";
import { debounce } from "../../helpers/utils";
/* eslint-disable */
import { Message, MessageBox, Loading } from "element-ui";

const baseURL =
  process.env.mode === "development" ? "/api" : process.env.VUE_HTTP_PREFIX;

const instance = axios.create({
  baseURL,
  timeout: 8000,
});

let loadinginstace;
let needLoadingRequestCount = 0;

function showLoading(isShow = true, text) {
  if (isShow) {
    if (needLoadingRequestCount === 0) {
      loadinginstace = Loading.service({
        lock: true,
        text: text || "拼命加载中",
        background: "rgba(0, 0, 0, 0.7)",
      });
    }
    needLoadingRequestCount++;
  }
}

function _showError(message, isShow = true) {
  if (isShow) {
    Message.error({
      message,
    });
  }
}

function tryHideLoading(isShow = true) {
  if (isShow) {
    if (needLoadingRequestCount <= 0) return;
    needLoadingRequestCount--;
    debounce(() => {
      if (needLoadingRequestCount === 0) {
        loadinginstace.close();
      }
    }, 300)();
  }
}

// 5xx
function handleServerError() {
  _showError("服务器错误，联系管理员。");
}

// 401 403
function handleExpires(status) {
  const message = {
    401: "登陆信息过期，请重新登陆",
    403: "您的账号已在别处登陆",
  };
  MessageBox({
    title: "提示",
    message: message[status],
    confirmButtonText: "确定",
    callback: (action) => {
      // 调用清除信息
      // 跳转登陆页面
      // store.dispatch("user/remove_login_info").then(() => {
      //   router.push("/login");
      // });
    },
  });
}

// 200下错误
function handleSuccessError(message) {
  _showError(message);
}

instance.interceptors.request.use(
  (config) => {
    // 请求是否需要开启Loading ?
    showLoading(config.showLoading, config.loadingText);
    return config;
  },
  (error) => {
    _showError("网络错误");
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    tryHideLoading(response.config.showLoading);
    const {
      data: { message, errno, data },
    } = response;
    if (errno === -1) {
      // 正常请求
      handleSuccessError(message);
      return Promise.reject(message);
    }
    return Promise.resolve(data);
  },
  (error) => {
    const { status, data, message } = error.response;
    const statusList = {
      401: handleExpires,
      500: handleServerError,
    };
    statusList[status](status, message, data);
    return Promise.reject(error);
  }
);

instance.interceptors.request;

export default instance;
