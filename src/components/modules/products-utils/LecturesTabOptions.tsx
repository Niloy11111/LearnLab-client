"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cleanParams } from "@/lib/utils";
import { FiltersState, setFilters } from "@/redux/features/globalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { ILecture } from "@/types/lecture";
import { debounce } from "lodash";
import { usePathname, useRouter } from "next/navigation";

interface TabOptionsProps {
  lectures: ILecture[];
}

const LecturesTabOptions = ({ lectures }: TabOptionsProps) => {
  const filters = useAppSelector((state) => state.global.filters);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const updateURL = debounce((newFilters: FiltersState) => {
    const cleanFilters = cleanParams(newFilters);
    const updatedSearchParams = new URLSearchParams();

    Object.entries(cleanFilters).forEach(([key, value]) => {
      updatedSearchParams.set(
        key,
        Array.isArray(value) ? value.join(",") : value.toString()
      );
    });

    router.push(`${pathname}?${updatedSearchParams.toString()}`);
  }, 300);

  const handleFilterChange = (key: string, value: any) => {
    const newValue = value === "any" ? "any" : value;
    const newFilters = { ...filters, [key]: newValue };

    dispatch(setFilters(newFilters));
    updateURL(newFilters);
  };

  const uniqueModules = Array.from(
    new Map(lectures?.map((lec) => [lec?.module?._id, lec?.module])).values()
  );

  const uniqueCourses = Array.from(
    new Map(
      lectures?.map((lec) => [lec?.module?.course?._id, lec?.module?.course])
    ).values()
  );

  return (
    <div className="my-7 flex gap-4">
      {/* Module Filter */}
      <Select
        value={filters?.moduleTitle || "any"}
        onValueChange={(value) => handleFilterChange("moduleTitle", value)}
      >
        <SelectTrigger className="w-48 rounded-sm border-primary-400">
          <SelectValue placeholder="Select Module" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="any">All Modules</SelectItem>
          {uniqueModules?.map((module) => (
            <SelectItem key={module?._id} value={module?.moduleTitle}>
              <span>{module?.moduleTitle}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Course Filter */}
      <Select
        value={filters?.courseTitle || "any"}
        onValueChange={(value) => handleFilterChange("courseTitle", value)}
      >
        <SelectTrigger className="w-48 rounded-sm border-primary-400">
          <SelectValue placeholder="Select Course" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="any">All Courses</SelectItem>
          {uniqueCourses?.map((course) => (
            <SelectItem key={course?._id} value={course?.title}>
              <span>{course.title}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LecturesTabOptions;
