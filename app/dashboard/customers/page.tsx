import { fetchFilteredCustomers } from "@/app/lib/data";
import CustomersTable from "@/app/ui/customers/table";
import { SearchParams } from "next/dist/server/request/search-params";
import { Suspense } from "react";
import { TableRowSkeleton } from "@/app/ui/skeletons";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const customers = await fetchFilteredCustomers(query);
  return (
    <Suspense key={query} fallback={<TableRowSkeleton />}>
      <CustomersTable customers={customers} />
    </Suspense>
  );
}
