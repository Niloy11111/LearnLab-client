import { getAllCourseModules } from "@/services/CourseModules";
import { getAllLectures } from "@/services/Lecture";
import { getAllProducts, getSingleProduct } from "@/services/Product";
import { getAllUsers } from "@/services/User";
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

export const useAllUsers = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getAllUsers();
        setData(res.data);
      } catch (err: any) {
        setIsError(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // const reFetch = async () => {
  //   setIsLoading(true);
  //   try {
  //     const { data: users } = await getAllUsers();
  //     const activeUsers = users?.filter((user) => user?.isActive === true);

  //     setData(activeUsers);
  //   } catch (err) {
  //     setIsError(err);
  //   }
  //   setIsLoading(false);
  // };

  return { data, isError, isLoading, setData };
};

// export const useAllApplication = () => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const res = await getAllApplications(undefined, undefined);
//         setData(res.data);
//       } catch (err: any) {
//         setIsError(err);
//       }
//       setIsLoading(false);
//     };
//     fetchData();
//   }, []);

//   return { data, isError, isLoading, setData };
// };
