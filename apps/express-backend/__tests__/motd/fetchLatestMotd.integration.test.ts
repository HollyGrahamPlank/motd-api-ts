import { faker } from "@faker-js/faker";
import { MessageOfTheDay } from "@motd-ts/models";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import TestApp from "../utils/testApp";

describe("Fetch Latest MOTD via GET `/`", () => {
  let testApp: TestApp;
  beforeEach(async () => {
    testApp = new TestApp();
    await testApp.setup({ defaultAudience: "/motd" });
  });
  afterEach(async () => {
    await testApp.teardown();
  });

  //
  //  Tests
  //

  it("200 when MOTD exists", async () => {
    const message = faker.hacker.phrase();
    const token = testApp.jwt({ is: "valid", permissions: ["motd:create"] });
    const createResponse = await testApp.api.createMotd({ token }).send({ message }).expect(200);
    const motd = createResponse.body as MessageOfTheDay;

    const getLatestResponse = await testApp.api.getLatestMotd().expect(200);

    const transformedMotd = JSON.parse(JSON.stringify(motd)) as MessageOfTheDay;
    const foundMotd: MessageOfTheDay = getLatestResponse.body;
    expect(transformedMotd._id).toEqual(foundMotd._id);
    expect(transformedMotd.message).toEqual(foundMotd.message);
    expect(transformedMotd.createdAt).toEqual(foundMotd.createdAt);
    expect(transformedMotd.updatedAt).toEqual(foundMotd.updatedAt);
  });

  it("404 when no MOTDs", async () => {
    await testApp.api.getLatestMotd().expect(404);
  });
});
