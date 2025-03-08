import { ICategoryAndTags } from "@/types";
import Link from "next/link";
import React from "react";

interface Props extends ICategoryAndTags {
  type: "categories" | "tags";
}

function CategTagsCard(item: Props) {
  return (
    <Link
      href={`/${item.type}/${item.slug}`}
      className="bg-secondary p-2 md:p-4 rounded-md shadow-xl flex items-center gap-4 justify-center hover:bg-secondary/80"
    >
      {item.type === "tags" ? "#" : ""}
      <h1 className="text-2xl ">{item.name}</h1>
    </Link>
  );
}

export default CategTagsCard;
