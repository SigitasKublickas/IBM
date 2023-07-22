import axios from "axios";
import { useEffect, useState } from "react";
import { api, Rate } from "../api";

type Props = {};

export const Rates = (props: Props) => {
  const [rates, setRates] = useState<Rate[]>([]);
  useEffect(() => {
    api(axios).getActiveRates().then(setRates);
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
          <tr>
            <td>Monday - Thursday {"(8am-5pm)"}</td>
            <td>0.5 Eur/h</td>
            <td>1 Eur/h</td>
            <td>2 Eur/h</td>
          </tr>
          <tr>
            <td>Friday {"(8am-8pm)"}</td>
            <td>1.5 Eur/h</td>
            <td>2 Eur/h</td>
            <td>3.5 Eur/h</td>
          </tr>
          <tr>
            <td>Saturday {"(Whole day)"}</td>
            <td>2 Eur/h</td>
            <td>4 Eur/h</td>
            <td>5 Eur/h</td>
          </tr>
          <tr>
            <td>Sunday {"(Whole day)"}</td>
            <td>Free</td>
            <td>Free</td>
            <td>Free</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
