import { createFileRoute } from "@tanstack/react-router";

import { PrivateData } from "@/components/private-data";
import { ChartAreaInteractive } from "./-components/chart-area-interactive";
import { SectionCards } from "./-components/section-cards";

export const Route = createFileRoute("/_main/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-10">
      <SectionCards />
      <div className="px-4 lg:px-6">
        <PrivateData />
      </div>
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      {/* <DataTable data={data} /> */}
    </div>
  );
}
