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
  });
});

// 1 - GET /api/recipes
// Write a GET endpoint that responds with a list of all recipes.

// Include a query (?exclude_ingredients=apples,bananas,carrots) to exclude recipes that contain specific ingredients.
