import { ElMessage, ElMessageBox, FormInstance } from "element-plus";
import Axios from "axios";
import moment from "moment";
import { getCurrentInstance } from "vue";

const axiosAction = async (
  method: string,
  url: string,
  data?: any,
  headers?: any
): Promise<any> => {
  try {
    let config: any = { method, url, data, timeout: 10000 };
    if (headers) {
      config = { headers, ...config };
    }
    let result: any = await Axios.request(config);

    if (!result.data || !result.data.code) {
      return new Promise((resolve) => {
        resolve({
          success: false,
          message: "执行HTTP请求失败。返回信息不正确。",
        });
      });
    }
    return new Promise((resolve) => {
      resolve(result.data);
    });
  } catch (e: any) {
    console.log("Error happened when calling Axios-" + method);
    console.log(e);
    const ret = { success: false, message: "执行HTTP请求失败。" };
    if (e.status) {
      ret.message = ret.message + "HTTP返回码：" + e.status;
    }
    return new Promise((resolve) => {
      resolve(ret);
    });
  }
};
export async function validateForm(thisForm: FormInstance | undefined) {
  console.log({ thisForm });
  if (!thisForm) return;
  let promise = new Promise((resolve, reject) => {
    thisForm
      .validate((valid: boolean) => {
        if (valid) {
          resolve(valid);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return promise;
}
// 清空element表单校验信息
export function clearValidateForm(formObj: any) {
  if (formObj) {
    formObj.clearValidate();
  }
}

export async function doPost(url: string, data?: any) {
  let result = await axiosAction("POST", url, data);
  return result;
}

export async function doGet(url: string) {
  let result = await axiosAction("GET", url);
  return result;
}

export async function doDelete(url: string, data?: any) {
  let result = await axiosAction("DELETE", url, data);
  return result;
}

export async function doPut(url: string, data?: any) {
  let result = await axiosAction("PUT", url, data);
  return result;
}
export async function showWarning(message: string, title?: string) {
  if (!title) {
    title = "警告";
  }
  ElMessage({ type: "warning", message });
}

const showSuccess = async (message: string, title?: string) => {
  if (!title) {
    title = "通知";
  }
  ElMessage({ type: "success", message });
};

const showError = async (message: string, title?: string) => {
  if (!title) {
    title = "错误";
  }
  ElMessage({ type: "error", message });
};
// 时间格式化相关
export function formatDateString(source: Date) {
  var format = "YYYY-MM-DD HH:mm:ss";
  if (source) {
    return moment(source).format(format);
  } else {
    return "";
  }
}
//格式化查询表单
export function queryFormWrapper(queryForm: any) {
  let param = "";
  for (let key in queryForm) {
    if (queryForm[key] || queryForm[key] === 0) {
      param = `${param}&${key}=${encodeURI(queryForm[key])}`;
    }
  }
  return param;
}
// 阻止Promise抛出reject但是没有写catch
// window.onunhandledrejection = (event: any) => {
//   // 不兼容ie
//   console.warn(event.reason);
//   event.preventDefault();
// };
