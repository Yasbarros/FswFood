"use client";

import DiscountBadge from "@/app/_components/discount-badge";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_lib/_helpers/price";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from "lucide-react";
import { useState } from "react";
import ProducList from "@/app/_components/Product-list";
import { Card } from "@/app/_components/ui/card";
import DeliveryInfo from "@/app/_components/delivery-info";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;

  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const [quantily, setQuantily] = useState(1);

  const handleIncreaseQuantilyClick = () =>
    setQuantily((currentState) => currentState + 1);
  const handleDecreaseQuantilyClick = () =>
    setQuantily((currentState) => {
      if (currentState === 1) {
        return 1;
      } else {
        return currentState - 1;
      }
    });

  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white">
      <div className="flex items-center gap-2 px-5 pt-5">
        <div className="relative h-6 w-6 ">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>

      <div className="px-5">
        <h1 className="mb-3 mt-1 text-xl font-semibold">{product.name}</h1>

        <div className="flex justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">
                {formatCurrency(calculateProductTotalPrice(product))}
              </h2>
              {product.discountPercentage > 0 && (
                <DiscountBadge product={product} />
              )}
            </div>
            {product.discountPercentage > 0 && (
              <p className="text-sm text-muted-foreground">
                De: {formatCurrency(Number(product.price))}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 text-center">
            <Button
              size="icon"
              variant="ghost"
              className="border border-solid border-muted-foreground hover:border-none hover:bg-primary hover:text-white"
              onClick={handleDecreaseQuantilyClick}
            >
              <ChevronLeftIcon />
            </Button>
            <span className="w-4">{quantily}</span>

            <Button
              size="icon"
              variant="ghost"
              className=" border border-solid border-muted-foreground hover:border-none hover:bg-primary hover:text-white"
              onClick={handleIncreaseQuantilyClick}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        <Card className="mt-6 flex justify-around py-3">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <BikeIcon size={14} />
            </div>
            {Number(product.restaurant.deliveryFee) > 0 ? (
              <p className="text-xs  font-semibold">
                {formatCurrency(Number(product.restaurant.deliveryFee))}
              </p>
            ) : (
              <p className="text-xs font-semibold">Grátis</p>
            )}
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <TimerIcon size={14} />
            </div>

            <p className="text-xs  font-semibold">
              {product.restaurant.deliveryTimeMinutes} min
            </p>
          </div>
        </Card>

        <div className="px-5">
          <DeliveryInfo restaurant={product.restaurant} />
        </div>

        <div className="mt-6 space-y-3">
          <h3 className="font-semibold">Sobre</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>
      </div>
      <div className="mb-5 mt-6 space-y-3">
        <h3 className="px-5 font-semibold">Sucos</h3>
        <ProducList products={complementaryProducts} />
      </div>

      <div className="my-5 px-5">
        <Button className="w-full font-semibold">Adicionar à sacola</Button>
      </div>
    </div>
  );
};

export default ProductDetails;
