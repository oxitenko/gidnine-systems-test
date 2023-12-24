import { useEffect, useState } from 'react';
import data from '../flights.json';

import _ from 'lodash';
import Card from '../Card/Card';
import Filters from '../Filters/Filters';

const Main = () => {
  const deepCopy = _.cloneDeep(data.result);
  const [flightResults, setFlightResults] = useState();
  const [companysNameAndMinPrices, setCompanysNameAndMinPrices] = useState();

  function updateStopsInFlightResults(oneConnection, flights) {
    for (const flight of flights) {
      for (const bestFlight of oneConnection.bestFlights) {
        if (
          bestFlight.carrier.uid === flight.flight.carrier.uid &&
          bestFlight.price.amount ===
            flight.flight.price.passengerPrices[0].total.amount
        ) {
          flight.flight.legs.forEach((leg) =>
            leg.segments.forEach((segment) => (segment.stops = 1)),
          );
        }
      }
    }
    return flights;
  }

  function findCompanysAndMinPrices(flights) {
    const сompanysAndMinPrices = flights.reduce((result, flight) => {
      const currentMinPrice = result.get(flight.flight.carrier.caption);
      if (
        currentMinPrice === undefined ||
        flight.flight.price.passengerPrices[0].total.amount < currentMinPrice
      ) {
        result.set(
          flight?.flight?.carrier?.caption,
          flight.flight.price.passengerPrices[0].total.amount,
        );
      }
      return result;
    }, new Map());

    return сompanysAndMinPrices;
  }

  useEffect(() => {
    const updated = updateStopsInFlightResults(
      deepCopy.bestPrices.ONE_CONNECTION,
      deepCopy.flights,
    );
    setFlightResults(updated);

    const companysList = findCompanysAndMinPrices(deepCopy.flights);
    setCompanysNameAndMinPrices(companysList);
  }, []);

  //   console.log(companysNameAndMinPrices);

  return (
    <div className="flex max-w-[1100px] m-auto mt-7">
      <div className="w-2/5">
        <Filters companysList={companysNameAndMinPrices} />
      </div>
      <div className="w-3/5">
        <ul>
          {flightResults?.map((item, index) => (
            <Card card={item} key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Main;
