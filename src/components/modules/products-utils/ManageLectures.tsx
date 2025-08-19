"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { NMTable } from "@/components/ui/core/NMTable";
import TablePagination from "@/components/ui/core/NMTable/TablePagination";
import { ILecture } from "@/types/lecture";
import { IMeta } from "@/types/meta";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useState } from "react";
import DiscountModal from "../shop/product/DiscountModal";
import LecturesTabOptions from "./LecturesTabOptions";

const ManageLectures = ({
  lectures,
  meta,
}: {
  lectures: ILecture[];
  meta: IMeta;
}) => {
  console.log("lectures sdfs", lectures);

  const [selectedIds, setSelectedIds] = useState<string[] | []>([]);

  const columns: ColumnDef<ILecture>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          // checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && ("indeterminate" as CheckedState))}

          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            if (value) {
              setSelectedIds((prev) => [...prev, row.original._id]);
            } else {
              setSelectedIds(
                selectedIds.filter((id) => id !== row.original._id)
              );
            }
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "thumbnail",
      header: "Course Thumbnail",
      cell: ({ row }) => (
        <div className=" flex items-center space-x-3">
          <Image
            src={row?.original?.module?.course?.thumbnail}
            alt={row?.original?.module?.course?.title}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row?.original?.lectureTitle}</span>
        </div>
      ),
    },
    {
      accessorKey: "module",
      header: "Module Name",
      cell: ({ row }) => <span>{row?.original?.module?.moduleTitle}</span>,
    },
    {
      accessorKey: "course",
      header: "Course Title",
      cell: ({ row }) => <span>{row?.original?.module?.course?.title}</span>,
    },
    {
      accessorKey: "videoURL",
      header: "Video Lesson",
      cell: ({ row }) => (
        <a
          href={row?.original?.videoURL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:text-green-800 underline"
        >
          Watch Tutorial
        </a>
      ),
    },
    {
      accessorKey: "lectureNumber",
      header: "Lecture number",
      cell: ({ row }) => <span>Lecture {row.original?.lectureNumber}</span>,
    },
    {
      accessorKey: "pdfUrls",
      header: "PDF URLs",
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          {row.original?.pdfUrls?.map((url: string, index: number) => (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-800 underline"
            >
              PDF-{index + 1}
            </a>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white px-6 py-3 rounded">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold mb-1">Lectures Overview</h2>
          <p className="text-sm text-gray-500">
            Manage and view all properties.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DiscountModal />
        </div>
      </div>

      <LecturesTabOptions lectures={lectures} />

      <hr className=" border-t border-input" />
      <NMTable columns={columns} data={lectures || []} />
      <hr className=" border-t border-input" />
      <TablePagination totalPage={meta?.totalPage} />
    </div>
  );
};

export default ManageLectures;
