function calculateDiscount(price, discountRate) {
  if (typeof price !== 'number' || typeof discountRate !== 'number') return null;
  if (discountRate < 0 || discountRate > 1) return null;
  const result = price * (1 - discountRate);
  return Math.round(result * 100) / 100;
}

function filterProducts(products, callback) {
  if (!Array.isArray(products) || typeof callback !== 'function') return [];
  const out = [];
  for (let i = 0; i < products.length; i++) {
    if (callback(products[i], i, products)) out.push(products[i]);
  }
  return out;
}

function sortInventory(inventory, key) {
  if (!Array.isArray(inventory) || typeof key !== 'string') return [];
  const arr = [...inventory];
  const val = o => (o && o[key] !== undefined ? o[key] : undefined);
  arr.sort((a, b) => {
    let va = val(a), vb = val(b);
    const aU = va === undefined || va === null;
    const bU = vb === undefined || vb === null;
    if (aU && !bU) return 1;
    if (!aU && bU) return -1;
    if (aU && bU) return 0;
    if (typeof va === 'string' || typeof vb === 'string') {
      const sa = String(va).toLowerCase();
      const sb = String(vb).toLowerCase();
      if (sa < sb) return -1;
      if (sa > sb) return 1;
      return 0;
    }
    const na = Number(va), nb = Number(vb);
    if (na < nb) return -1;
    if (na > nb) return 1;
    return 0;
  });
  return arr;
}

module.exports = { calculateDiscount, filterProducts, sortInventory };
