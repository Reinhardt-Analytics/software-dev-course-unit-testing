const { calculateDiscount, filterProducts, sortInventory } = require("../src/sharedCodebase");

// calculateDiscount
describe("calculateDiscount(price, discountRate)", () => {
  test("applies a valid discount rate", () => {
    expect(calculateDiscount(100, 0.1)).toBe(90);
    expect(calculateDiscount(19.99, 0.1)).toBe(17.99);
  });
  test("edge: 0% and 100%", () => {
    expect(calculateDiscount(50, 0)).toBe(50);
    expect(calculateDiscount(50, 1)).toBe(0);
  });
  test("edge: price of 0", () => {
    expect(calculateDiscount(0, 0.2)).toBe(0);
  });
  test("invalid types", () => {
    expect(calculateDiscount("100", 0.1)).toBeNull();
    expect(calculateDiscount(100, "0.1")).toBeNull();
  });
  test("invalid range", () => {
    expect(calculateDiscount(100, -0.1)).toBeNull();
    expect(calculateDiscount(100, 1.1)).toBeNull();
  });
});

// filterProducts
describe("filterProducts(products, callback)", () => {
  const products = [
    { id: 1, name: "Apple",  category: "Fruit",  price: 1.5, stock: 10 },
    { id: 2, name: "Banana", category: "Fruit",  price: 0.99, stock: 0  },
    { id: 3, name: "Bread",  category: "Bakery", price: 3.49, stock: 5  },
    { id: 4, name: "Milk",   category: "Dairy",  price: 2.99, stock: 2  },
  ];
  test("filters by predicate", () => {
    const out = filterProducts(products, p => p.stock > 0);
    expect(out.map(p => p.name).sort()).toEqual(["Apple","Bread","Milk"].sort());
  });
  test("invalid inputs yield []", () => {
    expect(filterProducts(null, () => true)).toEqual([]);
    expect(filterProducts(products, null)).toEqual([]);
  });
});

// sortInventory
describe("sortInventory(inventory, key)", () => {
  const inv = [
    { name: "Milk",   price: 2.99, stock: 2 },
    { name: "apple",  price: 1.2,  stock: 10 },
    { name: "Bread",  price: 3.5,  stock: 5 },
    { name: "Yogurt", price: 0.99, stock: 0 },
    { name: "Cheese",              stock: 8 },
  ];
  test("sorts by name (case-insensitive)", () => {
    const out = sortInventory(inv, "name");
    expect(out.map(x => x.name)).toEqual(["apple","Bread","Cheese","Milk","Yogurt"]);
  });
  test("sorts by price asc, undefined last", () => {
    const out = sortInventory(inv, "price");
    expect(out.map(x => x.name)).toEqual(["Yogurt","apple","Milk","Bread","Cheese"]);
  });
  test("invalid input returns []", () => {
    expect(sortInventory(null, "name")).toEqual([]);
    expect(sortInventory(inv, 123)).toEqual([]);
  });
  test("does not mutate original", () => {
    const copy = [...inv];
    sortInventory(inv, "name");
    expect(inv).toEqual(copy);
  });
});
