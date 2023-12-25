import { useEffect, useState } from 'react';
import data from '../../flights.json';

import _ from 'lodash';
import Card from '../../components/Card/Card';
import Filters from '../../components/Filters/Filters';

const Main = () => {
  const deepCopy = _.cloneDeep(data.result);
  const [flightResults, setFlightResults] = useState([]);
  const [companysNameAndMinPrices, setCompanysNameAndMinPrices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [price, setPrice] = useState({});
  const [nameFilter, setNameFilter] = useState([]);
  const [pagination, setPagination] = useState(2);
  const initPaginationValue = 0;

  //------------------Добавляем в исходные данные инфу о пересадках----------------------------
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

  // ------------------------Находим компании и самую низкую цену-------------------------------
  function findCompanysAndMinPrices(flights) {
    const companysAndMinPrices = flights.reduce((result, flight) => {
      const currentMinPrice = result.get(flight.flight.carrier.caption);
      if (
        currentMinPrice === undefined ||
        flight.flight.price.passengerPrices[0].total.amount < currentMinPrice
      ) {
        result.set(
          flight.flight.carrier.caption,
          flight.flight.price.passengerPrices[0].total.amount,
        );
      }
      return result;
    }, new Map());

    return companysAndMinPrices;
  }

  //---------------------Хендлер для радиокнопок-------------------------
  const handleChangeRadio = (event) => {
    setSelectedCategory(event.target.value);
  };

  //---------------------------Хэндлер для цены--------------------------
  const handleChangePrice = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setPrice({ ...price, [name]: value });
  };

  //-----------------------Хэндлер для выбора авиакомпаний-------------------------
  const handleChangeName = (event) => {
    const selected = event.target.value;
    if (nameFilter.includes(selected)) {
      setNameFilter(nameFilter.filter((name) => name !== selected));
    } else {
      setNameFilter([...nameFilter, selected]);
    }
  };

  //-----------------------Сортировка-----------------------------
  function filteredData(flights, selected, price, name) {
    let filteredFlights = flights;

    //---------------------Фильтрация по возрастанию, убыванию, пересадкам---------------------
    switch (selected) {
      case 'ask':
        filteredFlights = filteredFlights.sort(
          (a, b) => a.flight.price.total.amount - b.flight.price.total.amount,
        );
        break;
      case 'desc':
        filteredFlights = filteredFlights.sort(
          (a, b) => b.flight.price.total.amount - a.flight.price.total.amount,
        );
        break;
      case 'duration':
        filteredFlights = filteredFlights.sort(
          (a, b) =>
            a.flight.legs.reduce((acc, leg) => acc + leg.duration, 0) -
            b.flight.legs.reduce((acc, leg) => acc + leg.duration, 0),
        );
        break;
      case 'one':
        filteredFlights = filteredFlights.filter((flight) =>
          flight.flight.legs.every((leg) =>
            leg.segments.every((segment) => segment.stops === 1),
          ),
        );
        break;
      case 'without':
        filteredFlights = filteredFlights.filter((flight) =>
          flight.flight.legs.every((leg) =>
            leg.segments.every((segment) => segment.stops === 0),
          ),
        );
        break;
      default:
    }

    //----------------------------Фильтрация по мин и макс цене-----------------------
    if (price.minPrice && price.maxPrice) {
      filteredFlights = filteredFlights.filter(
        (flight) =>
          flight.flight.price.total.amount >= parseInt(price.minPrice) &&
          flight.flight.price.total.amount <= parseInt(price.maxPrice),
      );
    }

    //------------------------Фильтрация по авиакомпании-------------------------------
    if (name.length > 0) {
      filteredFlights = filteredFlights.filter((flight) =>
        name.includes(flight.flight.carrier.caption),
      );
    }

    //----------------------------Возвращает отфильтрованный список----------------------
    return filteredFlights
      ?.slice(initPaginationValue, pagination)
      .map((item, index) => <Card card={item} key={index} />);
  }

  useEffect(() => {
    const updated = updateStopsInFlightResults(
      deepCopy.bestPrices.ONE_CONNECTION,
      deepCopy.flights,
    );
    setFlightResults(updated);
  }, []);

  useEffect(() => {
    const companysList = findCompanysAndMinPrices(deepCopy.flights);
    setCompanysNameAndMinPrices(companysList);
  }, []);

  //------------------------Вызов функции для фильтрации-----------------------
  const result = filteredData(
    flightResults,
    selectedCategory,
    price,
    nameFilter,
  );

  return (
    <div className="flex max-w-[1100px] m-auto mt-7">
      <div className="w-[30%]">
        <Filters
          companysList={companysNameAndMinPrices}
          handleChangeRadio={handleChangeRadio}
          handleChangePrice={handleChangePrice}
          handleChangeName={handleChangeName}
          price={price}
        />
      </div>
      <div className="w-[70%] flex flex-col items-center">
        <ul className="w-full">{result}</ul>
        {initPaginationValue <= pagination ? (
          <button
            className="w-72 border border-black bg-slate-200 mb-10"
            onClick={() => setPagination((state) => state + 2)}
            type="button"
          >
            Показать ещё
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Main;
