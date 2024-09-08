import React from "react";
import { Product } from "@/types/types";

import Categories from "@/app/_components/Categories";
import Featured from "@/app/_components/Featured";
import Benefits from "@/app/_components/Benefits";
import Slider from "@/components/Common/Slider/Slider";
import Link from "next/link";
import ItemPreview from "@/components/Common/ItemPreview/ItemPreview";
import Image from "next/image";
import { getSortedItems } from "@/actions/itemActions";
import AnimationItem from "@/components/Common/AnimationItem";

interface ProductData {
  product: Product[];
}

interface RecommendationsProps {
  name: string;
  items: Product[];
}

function Recommendations({ name, items }: RecommendationsProps) {
  return (
    <section className="relative mx-6 sm:mx-24">
      <div className="mb-6">
        <div className="mb-6 flex items-center">
          <div className="h-[40px] w-[20px] rounded-[10%] bg-red-500"></div>
          <p className="ml-5 font-medium text-red-500">{name}</p>
        </div>
        <div className="flex">
          <h3 className="text-2xl font-semibold">Flash Sales</h3>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
        {items &&
          items.map((item) => <ItemPreview product={item} key={item._id} />)}
      </div>
      <div className="mb-12 flex justify-center">
        <Link href="/all">
          <button
            type="button"
            className="mb-2 mr-2 h-[56px] w-[234px] rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            View All Products
          </button>
        </Link>
      </div>

      <div className="mb-12 h-px bg-gray-400"></div>
    </section>
  );
}

const ItemPromo = () => {
  return (
    <section className="mb-10 px-12">
      <div className="hidden h-[400px] w-full items-center justify-between bg-gradient-to-r from-black to-slate-500 px-10 text-white lg:flex">
        <AnimationItem animationType="translate">
          <p className="mb-7 text-green-600">Categories</p>
          <p className="text-4xl font-medium">Enhance Your </p>
          <p className="text-4xl font-medium">Music Experience</p>

          <button
            className="mt-8 h-[56px] w-[171px] rounded-md bg-green-600"
            type="submit"
          >
            <Link href="/product/64a01e675904d6a0b0773e65-Jbl">Buy now!</Link>
          </button>
        </AnimationItem>
        <AnimationItem animationType="fade">
          <Image
            className=""
            width={568}
            height={330}
            src="/banners/jbl.png"
            alt="item for sale"
          />
        </AnimationItem>
      </div>
    </section>
  );
};

const page = async ({}) => {
  const { product: cheapItems }: ProductData = await getSortedItems("price");
  const { product: newItems }: ProductData = await getSortedItems("-date");
  const { product: slideItems }: ProductData = await getSortedItems(
    "sort=-rating,price",
    10,
  );

  return (
    <main className="mx-auto max-w-[1700px]">
      <section className="space-y-3 text-center text-2xl font-semibold">
        <h1 className="">
          Welcome to the best place to find everything that you need
        </h1>
        <h2 className="animate-gradient bg-gradient-to-r from-orange-400 via-red-500 to-purple-500 bg-300% bg-clip-text text-4xl font-bold text-transparent">
          Newmarket
        </h2>
      </section>
      <div className="m-auto mb-16 h-[500px] w-[300px] px-4 py-4 xs:w-[340px] ms:w-[460px] sm:w-[600px] md:w-[700px] xl:w-[1000px]">
        <Slider slideItems={slideItems} />
      </div>
      <Recommendations name="The cheapest" items={cheapItems} />
      <Categories />
      <ItemPromo />
      <Recommendations name="Interesting New" items={newItems} />
      <Featured />
      <Benefits />
    </main>
  );
};

export default page;
