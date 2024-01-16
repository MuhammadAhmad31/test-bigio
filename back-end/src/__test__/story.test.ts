import request from "supertest";
import app from "..";
import { generateToken } from "../utils/generateToken";

describe("Story Controller Tests", () => {
  let authToken: string;
  let server: any;

  beforeAll((done) => {
    server = app.listen(0, (error: any) => {
      if (error) {
        console.error("Error starting server:", error);
        done(error);
      } else {
        const testUser = {
          email: "simuh@mail.com",
          id: "3",
        };
        authToken = generateToken(testUser);

        done();
      }
    });
  });

  afterAll((done) => {
    if (server) {
      server.close((error: any) => {
        if (error) {
          console.error("Error closing server:", error);
          done(error);
        } else {
          console.log("Server closed successfully");
          done();
        }
      });
    } else {
      console.warn("No server instance to close");
      done();
    }
  });
  

  test("GET / should return a list of stories", async () => {
    const response = await request(app)
      .get("/story")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("GET story success");
    expect(response.body.data).toBeDefined();
  });

  test("GET /:id should return a story", async () => {
    const response = await request(app)
      .get("/story/16")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("GET story by id success");
    expect(response.body.data).toBeDefined();
  });

  test("POST /story should create a new story", async () => {
    const newStory = {
      title: "New Test Story",
      author: "Test Author",
      synopsis: "Test Synopsis",
      category: "Test Category",
      status: "Test Status",
      tags: ["tag1", "tag2"],
    };

    const response = await request(app)
      .post("/story")
      .set("Authorization", `Bearer ${authToken}`)
      .send(newStory);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("POST story success");
    expect(response.body.data).toEqual(newStory);
  });

  test("PATCH /story/:id should update a story", async () => {
    const updatedStory = {
      title: "Updated Test Story",
      author: "Updated Test Author",
      synopsis: "Updated Test Synopsis",
      category: "Updated Test Category",
      status: "Updated Test Status",
      tags: ["tag1", "tag2"],
    };

    const response = await request(app)
      .patch("/story/16")
      .set("Authorization", `Bearer ${authToken}`)
      .send(updatedStory);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("PUT story success");
    expect(response.body.data).toEqual({ id: "16", ...updatedStory });
  });

  // test("DELETE /story/:id should delete a story", async () => {
  //   const response = await request(app)
  //     .delete("/story/15") 
  //     .set("Authorization", `Bearer ${authToken}`);

  //   expect(response.status).toBe(200);
  //   expect(response.body.message).toBe("DELETE story success");
  //   expect(response.body.data).toEqual({ id: "15" });
  // });
});
