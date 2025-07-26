'use client'

import axios, { AxiosInstance } from "axios";

const baseAPI: AxiosInstance = axios.create({
  withCredentials: true,
});

export default baseAPI;
