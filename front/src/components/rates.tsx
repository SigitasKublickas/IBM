import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { api, Period, Rate } from "../api";
import {
  compareRatesByVehicleType,
  getFormatedPeriod,
} from "../helpers/functions";
import { RateInput } from "./rateInput";

type Props = {};

export const Rates = (props: Props) => {
  const { getActivePeriods, updateRate, createRate } = useMemo(
    () => api(axios),
    [axios]
  );
  const [periods, setPeriods] = useState<Period[]>([]);
  useEffect(() => {
    getActivePeriods().then(setPeriods);
  }, []);
  const alert = () => {
    let text = "Do you want to change price?\nEither OK or Cancel.";
    return window.confirm(text);
  };
  const onEnter = (value: number, rate: Rate) => {
    const hasAgreed = alert();
    if (hasAgreed) {
      updateRate({ id: rate.id, isActive: false });
      createRate({
        vehicleType: rate.vehicleType,
        amount: value,
        periodId: rate.periodId,
      });
    }
  };

  return (
    <div className="price-chart">
      <table>
        <thead>
          <tr>
            <th>Daytime / Type</th>
            <th>Motocycle</th>
            <th>Car</th>
            <th>Bus / Track</th>
          </tr>
        </thead>
        <tbody>
          {periods.map((period) => {
            return (
              <tr key={period.id}>
                <td>{getFormatedPeriod(period)}</td>
                {period.rates.sort(compareRatesByVehicleType).map((rate) => {
                  return (
                    <td key={rate.id}>
                      <RateInput
                        value={rate.amount}
                        onEnter={(value: number) => {
                          onEnter(value, rate);
                        }}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
