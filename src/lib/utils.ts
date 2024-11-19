import { CartItem } from "@/components"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function currencyTransform(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })
}

export function totalPrice(cart: CartItem[]){
  return cart.reduce((total, item) => total + item.quantity * item.price, 0)
}

export function totalQuantity(cart: CartItem[]){
  return cart.reduce((total, item) => total + item.quantity, 0)
}