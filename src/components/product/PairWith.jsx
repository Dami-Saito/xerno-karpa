import { useEffect, useState } from 'react';
import { supabase } from '../../lib/Supabase.js';

const SOUND_TYPES = ['speaker', 'soundbar', 'headphones', 'earbuds']; 
const FIXED_ORDER = ['smartphones', 'watch', 'laptop', 'accessories', 'sound'];
const WILDCARD_EXCLUDES = [...FIXED_ORDER];

const usePairWithProducts = (product) => { 
  const [pairWithProducts, setPairWithProducts] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    if (!product) return;

    const fetchPairWith = async () => {
      setLoading(true);
      const productType = product.type?.toLowerCase();
      const productBrand = product.brand?.toLowerCase();

      const { data: allProducts, error } = await supabase
        .from('products')
        .select('*')
        .neq('id', product.id)
        .limit(150);

      if (error) {
        console.error('PairWith error:', error);
        setLoading(false);
        return;
      }

      const pickFirstMatch = (items, condition) => {
        const shuffled = [...items].sort(() => 0.5 - Math.random());
        return shuffled.find(condition);
      };

      const smartphone = pickFirstMatch(allProducts, (p) => {
        if (p.category?.toLowerCase() !== 'smartphones') return false;
        const t = p.type?.toLowerCase();
        return productType === 'iphone' ? t === 'android' : t === 'iphone';
      });

      const watch = pickFirstMatch(allProducts, (p) => {
        return p.type?.toLowerCase() === 'watch' && p.brand?.toLowerCase() !== productBrand;
      });

      const laptop = pickFirstMatch(allProducts, (p) => {
        if (p.category?.toLowerCase() !== 'laptop') return false;
        const t = p.type?.toLowerCase();
        return productType === 'macbook' ? t === 'windows' : t === 'macbook';
      });

      const powerbank = pickFirstMatch(allProducts, (p) => p.type?.toLowerCase() === 'powerbank');

      const sound = pickFirstMatch(allProducts, (p) => 
        p.category?.toLowerCase() === 'sound' && SOUND_TYPES.includes(p.type?.toLowerCase())
      );

      const usedIds = new Set([smartphone?.id, watch?.id, laptop?.id, powerbank?.id, sound?.id]);

      const wildcardPool = allProducts.filter(
        (p) => !WILDCARD_EXCLUDES.includes(p.category?.toLowerCase()) && !usedIds.has(p.id)
      );

      const wildcards = [];
      const shuffledWildcardPool = [...wildcardPool].sort(() => 0.5 - Math.random());
      for (const item of shuffledWildcardPool) {
        if (!usedIds.has(item.id)) {
          wildcards.push(item);
          usedIds.add(item.id);
        }
        if (wildcards.length === 2) break;
      }

      const finalList = [smartphone, watch, laptop, powerbank, sound, ...wildcards].filter(Boolean);
      setPairWithProducts(finalList);
      setLoading(false);
    };

    fetchPairWith();
  }, [product]);

  return { pairWithProducts, loading }; 
};

export default usePairWithProducts;
