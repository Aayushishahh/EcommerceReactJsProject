import { method } from "lodash";
import { useSelector } from "react-redux";
import client, { METHODS } from "./client";
export const api = {
  auth: {
    login: (params) =>
      client({
        url: "user/signin",
        data: params,
        method: METHODS.POST,
      }),
    register: (params) =>
      client({
        url: "/user/signup",
        data: params,
        method: METHODS.POST,
      }),
    forgotpassword:(params)=>
      client({
        url:"/user/forgot_password",
        data:params,
        method:METHODS.POST,
      }),
    resetpassword:(params)=>
    client({
      url:"/user/reset_password",
      data:params,
      method:METHODS.POST,
    })
  },
  search: {
    get: (params) =>
      client({
        url: `/product/searchproduct?q=${params}`,
        method: METHODS.GET,
      }),
  },

  product: {
    get: (data) =>
      client({
        url: "/product/getallProduct",
        method: METHODS.GET,
        ...data,
      }),
    getProductById: (id) =>
      client({
        url: `/product/getproductbyid/${id}`,
        method: METHODS.GET,
      }),
    getProductByCategory: (category) =>
      client({
        url: `/product/getbycategory/${category}`,
        method: METHODS.GET,
      }),

    getBestSeller: (data) =>
      client({
        url: "/product/getbestseller",
        method: METHODS.GET,
        ...data,
      }),

    post: (params) =>
      client({
        url: "/product",
        data: params,
        method: METHODS.POST,
      }),
    patch: ({ _id, ...params }) =>
      client({
        url: `/product/${_id}`,
        data: params,
        method: METHODS.PATCH,
      }),
    delete: (params) =>
      client({
        url: `/product/${params}`,
        method: METHODS.DELETE,
      }),
  },

  cart: {
    add: (params) =>
      client({
        url: `/product/addtocart/`,
        data: params,
        method: METHODS.POST,
        headers: params?.token
          ? { Authorization: `Bearer ${params?.token}` }
          : {},
      }),
    get: (data) =>
      client({
        url: `/product/getusercart/`,
        method: METHODS.GET,
        headers: { Authorization: `Bearer ${data.token}` },
      }),

    remove: (params) =>
      client({
        url: `/product/removefromcart/${params?.id}`,
        method: METHODS.DELETE,
        headers: params?.token
          ? { Authorization: `Bearer ${params?.token}` }
          : {},
      }),

    update: (params) =>
      client({
        url: `/product/updatecart/${params?.id}`,
        data: params,
        method: METHODS.PUT,
        headers: params?.token
          ? { Authorization: `Bearer ${params?.token}` }
          : {},
      }),
  },

  profile: {
    get: (data) =>
      client({
        url: `/user/profile/`,
        method: METHODS.GET,
        headers: { Authorization: `Bearer ${data.token}` },
      }),
    patch: (params) =>
      client({
        url: `/user/profile_update`,
        data: params,
        method: METHODS.PATCH,
        headers: { Authorization: `Bearer ${params.token}` },
      }),
  },

  order: {
    create: (params) =>
      client({
        url: `/product/createorder`,
        data: params,
        method: METHODS.POST,
        headers: { Authorization: `Bearer ${params.token}` },
      }),
    get: (data) =>
      client({
        url: `/product/getusersorder`,
        method: METHODS.GET,
        headers: { Authorization: `Bearer ${data.token}` },
      }),
  },
};
