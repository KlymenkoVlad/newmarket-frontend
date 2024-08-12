import React from "react";
import type { Metadata } from "next";
import InfinitiveScrollNew from "@/components/Common/Scroll/InfinitiveScrollNew";

export const metadata: Metadata = {
  title: "All Products",
  description: "",
};

function page() {
  return (
    <main className="mb-16 flex">
      <div className="group m-auto px-4 py-4">
        <div className="mb-6">
          <div className="mb-6 flex items-center">
            <div className="h-[40px] w-[20px] rounded-[10%] bg-red-500"></div>
            <p className="ml-5 font-medium text-red-500">Find what you need</p>
          </div>
          <div className="flex">
            <h3 className="text-2xl font-semibold">Explore Our Products</h3>
          </div>
        </div>
        <InfinitiveScrollNew type="all" />
      </div>
    </main>
  );
}

export default page;
