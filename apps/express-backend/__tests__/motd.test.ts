import { faker } from "@faker-js/faker";
import { MessageOfTheDay } from "@motd-ts/models";
import mongoose from "mongoose";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { createMotd, fetchMotd } from "../src/services/motd.services";
import TestApp from "./utils/testApp";

describe("Message of the Day", () => {
  describe("Service", () => {
    let testApp: TestApp;
    beforeEach(async () => {
      testApp = new TestApp();
      await testApp.setup();
    });
    afterEach(async () => {
      await testApp.teardown();
    });

    //
    //  Tests
    //

    describe("creates", () => {
      test("new MOTD", async () => {
        const message = "An example message!";
        const motd = await createMotd(message);

        expect(motd).toBeTruthy();
        expect(motd?.message).toEqual(message);
        expect(motd?._id).toBeTypeOf("string");
        expect(motd?.createdAt).toBeTruthy();
        expect(motd?.updatedAt).toBeTruthy();
      });

      test("empty string MOTD", async () => {
        const motd = await createMotd("");
        expect(motd).toBeFalsy();
      });
    });

    describe("get specific", () => {
      test("empty ID", async () => {
        const motd = await fetchMotd("");
        expect(motd).toBeFalsy();
      });

      test("invalid ID", async () => {
        const motd = await fetchMotd("GARBAGE");
        expect(motd).toBeFalsy();
      });

      test("valid ID of non-existing motd", async () => {
        const motd = await fetchMotd(new mongoose.Types.ObjectId());
        expect(motd).toBeFalsy();
      });

      test("valid motd", async () => {
        const message = faker.company.catchPhrase();
        const newMotd = (await createMotd(message)) as MessageOfTheDay;
        const foundMotd = await fetchMotd(newMotd._id);
        expect(foundMotd).toBeTruthy();
        expect(foundMotd?._id).toEqual(newMotd._id);
        expect(foundMotd?.message).toEqual(newMotd.message);
        expect(foundMotd?.createdAt).toEqual(newMotd.createdAt);
        expect(foundMotd?.updatedAt).toEqual(newMotd.updatedAt);
      });
    });
  });
});
