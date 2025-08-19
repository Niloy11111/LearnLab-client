import ManageLectures from "@/components/modules/products-utils/ManageLectures";
import Header from "@/components/ui/form/Header";
import { getAllLectures } from "@/services/Lecture";

const ManageLecturesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  // const { page } = await searchParams;
  const query = await searchParams;
  const { data: lectures, meta } = await getAllLectures(
    undefined,
    undefined,
    query
  );

  // console.log("here sdf", meta);
  return (
    <div>
      <Header title={"Manage Courses"} subtitle="" />
      <ManageLectures lectures={lectures} meta={meta} />
    </div>
  );
};

export default ManageLecturesPage;
