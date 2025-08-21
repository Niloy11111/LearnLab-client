import { getAllCourseModules } from "@/services/CourseModules";
import { getAllLectures } from "@/services/Lecture";
import { getAllProducts, getSingleProduct } from "@/services/Product";
import { getAllUserProgress } from "@/services/user-progress";
import { IProduct } from "@/types";
import { ICourseModule } from "@/types/course-module";
import { ILecture } from "@/types/lecture";
import { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppStore, RootState } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export const useSingleProduct = (productId: string) => {
  const [data, setData] = useState<IProduct | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getSingleProduct(productId);
        setData(res.data);
      } catch (err: any) {
        setIsError(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [productId]);

  const reFetch = async () => {
    setIsLoading(true);
    try {
      const res = await getSingleProduct(productId);
      setData(res.data);
    } catch (err) {
      setIsError(err);
    }
    setIsLoading(false);
  };

  return { data, isError, isLoading, reFetch };
};

//  as {
//     data: IProduct;
//     isError: boolean;
//     isLoading: boolean;
//   };

export const useAllProduct = (page, limit, query) => {
  const [data, setData] = useState<IProduct[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        console.log("from useAllProduct", query);
        const res = await getAllProducts(page, limit, query);
        console.log("from res sdkjf", res);
        setData(res.data);
      } catch (err: any) {
        setIsError(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [JSON.stringify(query)]);

  // const reFetch = async () => {
  //   setIsLoading(true);
  //   try {
  //     const res = await getAllProducts("ksdjf", undefined, memoQuery);
  //     setData(res.data);
  //   } catch (err) {
  //     setIsError(err);
  //   }
  //   setIsLoading(false);
  // };

  return { data, isError, isLoading };
};
export const useAllCourseModules = (courseId) => {
  const [data, setData] = useState<ICourseModule[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getAllCourseModules(courseId);
        setData(res.data);
      } catch (err: any) {
        setIsError(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const reFetch = async () => {
    setIsLoading(true);
    try {
      const res = await getAllCourseModules(courseId);
      setData(res.data);
    } catch (err) {
      setIsError(err);
    }
    setIsLoading(false);
  };

  return { data, isError, isLoading, reFetch };
};
export const useAllLectures = (page, limit, query) => {
  const [data, setData] = useState<ILecture[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getAllLectures(page, limit, query);
        setData(res.data);
      } catch (err: any) {
        setIsError(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const reFetch = async () => {
    setIsLoading(true);
    try {
      const res = await getAllLectures(page, limit, query);
      setData(res.data);
    } catch (err) {
      setIsError(err);
    }
    setIsLoading(false);
  };

  return { data, isError, isLoading, reFetch };
};
export const useAllUserProgress = (query) => {
  const [data, setData] = useState<ILecture[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getAllUserProgress(query);
        setData(res.data);
      } catch (err: any) {
        setIsError(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const reFetch = async () => {
    setIsLoading(true);
    try {
      const res = await getAllUserProgress(query);
      setData(res.data);
    } catch (err) {
      setIsError(err);
    }
    setIsLoading(false);
  };

  return { data, isError, isLoading, reFetch };
};
