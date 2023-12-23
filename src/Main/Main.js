import { useEffect } from 'react';
import data from '../flights.json';

import _ from 'lodash';

const Main = () => {
  const flightResults = _.cloneDeep(data.result);

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
    updateStopsInFlightResults(
      flightResults.bestPrices.ONE_CONNECTION,
      flightResults.flights,
    );

    // flightResults.flights.forEach((flight) => {
    //   flight.flight.legs.forEach((leg) => {
    //     leg.segments.forEach((segment) => {
    //       console.log(
    //         `Carrier: ${flight.flight.carrier.uid}, Amount: ${flight.flight.price.passengerPrices[0].total.amount}, Stops: ${segment.stops}`,
    //       );
    //     });
    //   });
    // });
  }, [flightResults.bestPrices.ONE_CONNECTION, flightResults.flights]);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%' }}>Filters</div>
      <div style={{ width: '50%' }}>Results</div>
    </div>
  );
};

export default Main;
