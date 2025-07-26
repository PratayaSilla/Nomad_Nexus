'use client'

import { useEffect, useState } from "react";
import baseAPI from "../baseApi";


export const useGetData = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    baseAPI
      .get<{data: T }>(url)
      .then((res) => setData(res.data.data))
      .catch((err) =>{ throw new Error(err) })  
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading };
};
