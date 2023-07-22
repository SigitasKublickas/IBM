import { Period } from "../api";
import { getFormatedPeriod } from "./functions";

describe(getFormatedPeriod, () => {
  it("returns correct string for one full day", () => {
    const period: Period = {
      id: "",
      startDay: "Sunday",
      startHour: 0,
      endDay: "Sunday",
      endHour: 24,
      rates: [],
    };

    expect(getFormatedPeriod(period)).toBe("Sunday (Whole day)");
  });

  it("returns correct string for one not full day", () => {
    const period: Period = {
      id: "",
      startDay: "Sunday",
      startHour: 8,
      endDay: "Sunday",
      endHour: 17,
      rates: [],
    };

    expect(getFormatedPeriod(period)).toBe("Sunday (8-17)");
  });

  it("returns correct string for several not full days", () => {
    const period: Period = {
      id: "",
      startDay: "Monday",
      startHour: 8,
      endDay: "Thursday",
      endHour: 17,
      rates: [],
    };

    expect(getFormatedPeriod(period)).toBe("Monday-Thursday (8-17)");
  });
});
