import axios from "axios";
import { useEffect, useState } from "react";
import { api, Period, Rate } from "../api";
import { getFormatedPeriod, getFormatedPrice } from "../helpers/functions";

type Props = {};

export const Rates = (props: Props) => {
  const [periods, setPeriods] = useState<Period[]>([]);
  useEffect(() => {
    api(axios).getActivePeriods().then(setPeriods);
  }, []);
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
              <tr>
                <td>{getFormatedPeriod(period)}</td>
                {period.rates.map((rate) => {
                  return <td>{getFormatedPrice(rate)}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
