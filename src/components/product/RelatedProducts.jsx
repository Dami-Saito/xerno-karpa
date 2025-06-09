import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/Supabase.js";
import seedrandom from "seedrandom";

export function useRelatedProducts(currentProduct) {
  return useQuery({
    queryKey: ["related-products", currentProduct?.id],
    queryFn: async () => {
      if (!currentProduct) return [];

      const { data: products, error } = await supabase
        .from("products")
        .select("*");

      if (error) throw error;

      const sameType = products.filter(
        (p) =>
          p.id !== currentProduct.id &&
          p.type?.toLowerCase() === currentProduct.type?.toLowerCase()
      );

      const sameCategory = products.filter(
        (p) =>
          p.id !== currentProduct.id &&
          p.category?.toLowerCase() === currentProduct.category?.toLowerCase() &&
          !sameType.some((t) => t.id === p.id)
      );

      // 👇 Deterministic shuffle based on product ID
      function shuffleWithSeed(items, seed) {
        const rng = seedrandom(seed);
        return [...items].sort(() => rng() - 0.5);
      }

      const combined = [...sameType, ...sameCategory];
      const shuffled = shuffleWithSeed(combined, currentProduct.id);

      return shuffled.slice(0, 5); // always the same 5 for a given product
    },
    enabled: !!currentProduct?.id,
    staleTime: 5 * 60 * 1000,
  });
}
