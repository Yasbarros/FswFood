"use client";

import { Product } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductImageProps {
  product: Pick<Product, "name" | "imageUrl">;
}

const ProductImage = ({ product }: ProductImageProps) => {
  const router = useRouter();
  const handleBackClick = () => router.back();
  return (
    <div>
      <div className="relative h-[360px] w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
        <Button
          className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
          size="icon"
          onClick={handleBackClick}
        >
          <ChevronLeftIcon />
        </Button>
      </div>
    </div>
  );
};

export default ProductImage;
