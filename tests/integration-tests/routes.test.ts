import request from "supertest";
import "jest-date";

import server from "../../src/bin/www";

const apiKey = process.env.API_KEY || "api key";

describe("| route Testing | GET /metricsbydaterange", () => {
  test("should respond with a 401 status code no auth", async () => {
    const response: request.Response = await request(server)
      .get("/metricsbydaterange")
      .send();

    expect(response.status).toBe(401);
    expect(response.text).toBe("You are not authorized to do this");
  });
  test("should respond with a 400 status code", async () => {
    const response: request.Response = await request(server)
      .get("/metricsbydaterange")
      .set("api-key", apiKey);

    expect(response.status).toBe(400);
    expect(response.text).toBe(`"pairAdress" is required`);
  });
  test("should respond with a 400 status code", async () => {
    const response: request.Response = await request(server)
      .get("/metricsbydaterange")
      .set("api-key", apiKey)
      .query({ pairAdress: "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc" });

    expect(response.status).toBe(400);
    expect(response.text).toBe(`"fromDate" is required`);
  });
  test("should respond with a 400 status code", async () => {
    const currentDate = new Date();
    const response: request.Response = await request(server)
      .get("/metricsbydaterange")
      .set("api-key", apiKey)
      .query({ pairAdress: "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc" })
      .query({ fromDate: currentDate });

    expect(response.status).toBe(400);
    expect(response.text).toBe(`"toDate" is required`);
  });
  test("should respond with a 400 status code", async () => {
    const currentDate = new Date();
    const response: request.Response = await request(server)
      .get("/metricsbydaterange")
      .set("api-key", apiKey)
      .query({ pairAdress: "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc" })
      .query({ toDate: currentDate });

    expect(response.status).toBe(400);
    expect(response.text).toBe(`"fromDate" is required`);
  });

  test("should respond with a 200 status code and correct object structure", async () => {
    const currentDate = new Date();
    const response: request.Response = await request(server)
      .get("/metricsbydaterange")
      .set("api-key", apiKey)
      .query({ pairAdress: "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc" })
      .query({ toDate: currentDate })
      .query({ fromDate: currentDate });

    expect(response.status).toBe(200);

    expect(response.body).toEqual([
      {
        _id: "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
        name: "USDC/WETH",
        token0: {
          name: "USD//C",
          id: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          symbol: "USDC",
        },
        token1: {
          name: "Wrapped Ether",
          id: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          symbol: "WETH",
        },
        snapshots: [],
      },
    ]);
  });
  test("should respond with a 200 status code and correct snapshots amount and orientation", async () => {
    const currentDate = new Date();
    const fromDate = new Date();
    const snapshotsAmount = 5;
    fromDate.setHours(fromDate.getHours() - snapshotsAmount);
    const response: request.Response = await request(server)
      .get("/metricsbydaterange")
      .set("api-key", apiKey)
      .query({ pairAdress: "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc" })
      .query({ toDate: currentDate })
      .query({ fromDate: fromDate });

    expect(response.status).toBe(200);

    const pair = response.body[0];
    const snapshots = pair.snapshots;

    expect(snapshots.length).toBe(snapshotsAmount);

    interface ss {
      date: string;
    }

    let testDate = new Date();
    testDate.setHours(testDate.getHours() + 1);
    snapshots.reverse().map((ss: ss) => {
      const ssDate: Date = new Date(ss.date);
      expect(ssDate).toBeBefore(testDate);
      testDate = ssDate;
    });
  });
});
