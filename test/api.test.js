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
});
