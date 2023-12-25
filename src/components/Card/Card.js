import { DateTime } from 'luxon';
import { FaRegClock } from 'react-icons/fa6';

const Card = ({ card }) => {
  function formatDuration(durationInMinutes) {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours} ч ${minutes} мин`;
  }

  return (
    <li className="mb-8 w-full text-sm">
      <div className="flex justify-between h-min bg-sky-600 text-white p-2 items-center text-base">
        <p>{card.flight.carrier.caption}</p>
        <div className="flex flex-col justify-end w-[60%] items-end">
          <p>{card.flight.price.total.amount} ₽</p>
          <p className="text-xs">Стоимость для одного взрослого пассажира</p>
        </div>
      </div>

      <div className="w-[95%] m-auto">
        {card.flight.legs.map((leg, index) => (
          <div key={index}>
            {leg.segments.map((segment, index) => (
              <div key={index}>
                <div className="flex w-max font-semibold border-b border-b-stone-200 h-8 my-3">
                  <p>
                    {segment.departureCity?.caption},{' '}
                    {segment.departureAirport?.caption}
                    <span className="text-sky-600 ml-1">
                      ({segment.departureAirport?.uid})
                    </span>
                  </p>
                  <span className="mx-1 text-sky-600">&rarr;</span>
                  <p>
                    {segment.arrivalCity?.caption},{' '}
                    {segment.arrivalAirport?.caption}
                    <span className="text-sky-600 ml-1">
                      ({segment.departureAirport?.uid})
                    </span>
                  </p>
                </div>
                <div className="flex w-full justify-between">
                  <div className="flex items-end">
                    <p className="font-semibold mr-2">
                      {DateTime.fromISO(segment?.departureDate)
                        .setLocale('ru')
                        .toFormat('HH:mm')}
                    </p>
                    <p className="text-sky-600 text-sm">
                      {DateTime.fromISO(segment?.departureDate)
                        .setLocale('ru')
                        .toFormat('d LLL EEE.')}
                    </p>
                  </div>
                  <p className="flex items-center">
                    <FaRegClock style={{ marginRight: '5px' }} />
                    {formatDuration(segment?.travelDuration)}
                  </p>

                  <div className="flex items-end">
                    <p className="font-semibold mr-2">
                      {DateTime.fromISO(segment?.arrivalDate)
                        .setLocale('ru')
                        .toFormat('HH:mm')}
                    </p>
                    <p className="text-sky-600 text-sm">
                      {DateTime.fromISO(segment?.arrivalDate)
                        .setLocale('ru')
                        .toFormat('d LLL EEE.')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center w-11/12 m-auto mt-2 mb-4 h-6">
                  {segment?.stops === 0 ? (
                    <div className="flex-1 h-0.5 border-t border-t-stone-400"></div>
                  ) : (
                    <>
                      <div className="flex-1 h-0.5 border-t border-t-stone-400"></div>
                      <span className="mx-2 text-orange-400">
                        {segment?.stops} пересадка
                      </span>
                      <div className="flex-1 h-0.5 border-t border-t-stone-400"></div>
                    </>
                  )}
                </div>
                <p className="block border-b-2 border-b-sky-700 pb-2">
                  Рейс выполняет: {segment?.airline.caption}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <button
        type="button"
        className="w-full bg-orange-300 text-white h-10 mt-4"
      >
        ВЫБРАТЬ
      </button>
    </li>
  );
};

export default Card;
