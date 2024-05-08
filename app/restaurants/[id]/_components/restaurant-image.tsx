"use client";

import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HeartIcon } from "lucide-react";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "name" | "imageUrl">;
}

const RestaurantImage = ({ restaurant }: RestaurantImageProps) => {
  const router = useRouter();
  const handleBackClick = () => router.back();
  return (
    <div>
      <div className="relative h-[215px] w-full">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
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

        <Button
          size="icon"
          className="absolute right-4 top-4 rounded-full bg-gray-700"
        >
          <HeartIcon size={20} className="fill-white" />
        </Button>
      </div>
    </div>
  );
};

export default RestaurantImage;
