import { useEffect, useState } from 'react';
import data from '../flights.json';

import _ from 'lodash';
import Card from '../Card/Card';

const Main = () => {
  const deepCopy = _.cloneDeep(data.result);
  const [flightResults, setFlightResults] = useState();

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

  useEffect(() => {
    const updated = updateStopsInFlightResults(
      deepCopy.bestPrices.ONE_CONNECTION,
      deepCopy.flights,
    );
    setFlightResults(updated);
  }, []);

  return (
    <div className="flex max-w-[1100px] m-auto mt-7">
      <div className="w-2/5">Filters</div>
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
