const supertest = require("supertest");
const server = require("../server");
const data = require("../data/data.json");

const request = supertest(server);

describe("Lizzo's Juicy Juice Bar", () => {
  describe("GET /api", () => {
    test("Responds with 'ok' in message", async () => {
      const { body } = await request.get("/api").expect(200);
      expect(body.message).toBe("ok");
    });
  });

  describe("GET /api/recipes", () => {
    test("Responds with an array of expected length", async () => {
      const { body } = await request.get("/api/recipes").expect(200);
      expect(body.recipes).toHaveLength(data.length);
    });
    test("Objects in array have expected properties", async () => {
      const { body } = await request.get("/api/recipes").expect(200);
      body.recipes.forEach((recipe) => {
        expect(recipe).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            imageUrl: expect.any(String),
            instructions: expect.any(String),
            ingredients: expect.any(Object),
          })
        );
      });
    });
    test("Accepts a query to exclude recipes", async () => {
      const { body } = await request
        .get("/api/recipes?exclude_ingredients=banana,flax")
        .expect(200);
      body.recipes.forEach((recipe) => {
        const ingredients = recipe.ingredients.map((i) => i.name);
        expect(ingredients).not.toContain("banana");
        expect(ingredients).not.toContain("flax");
      });
    });
  });

  describe("GET /api/recipes:id", () => {
    test("Accepts parametric id to respond with given recipe", async () => {
      const { body } = await request.get("/api/recipes/59").expect(200);
      expect(body.recipe).toEqual(
        expect.objectContaining({
          id: "recipe-59",
          imageUrl: "http://www.images.com/18",
          instructions:
            "60 seconds on the highest setting your blender has, or until a smooth paste has formed",
          ingredients: [
            { name: "demerara sugar", grams: 25 },
            { name: "flax", grams: 66 },
            { name: "apple juice", grams: 44 },
            { name: "oat milk", grams: 198 },
          ],
        })
      );
    });
    test("Responds with 404 and message if recipe ID out of range", async () => {
      const { body } = await request.get("/api/recipes/59000").expect(404);
      expect(body.message).toBe("Recipe not found");
    });
  });
});
