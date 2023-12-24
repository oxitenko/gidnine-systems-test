const Filters = ({ companysList }) => {
  console.log(companysList);
  return (
    <>
      <div className="flex flex-col mb-10">
        <p className="font-semibold mb-2">Сортировать</p>
        <label>
          <input type="radio" name="sort" /> - по возрастанию цены
        </label>
        <label>
          <input type="radio" name="sort" /> - по убыванию цены
        </label>
        <label>
          <input type="radio" name="sort" /> - по времени в пути
        </label>
      </div>
      <div className="flex flex-col mb-7">
        <p className="font-semibold mb-2">Фильтровать</p>
        <label>
          <input type="checkbox" /> - 1 пересадка
        </label>
        <label>
          <input type="checkbox" /> - без пересадок
        </label>
      </div>
      <div className="flex flex-col mb-7">
        <p className="font-semibold mb-2">Цена</p>
        <label className="mb-5">
          От <input type="text" className="border border-gray-500" />
        </label>
        <label>
          До <input className="border border-gray-500" type="text" />
        </label>
      </div>
      <div className="flex flex-col mb-7">
        <p className="font-semibold mb-2">Авиакомпании</p>
        {[...companysList.entries()]?.map(([name, price]) => (
          <div className="flex">
            <label key={name}>
              <input type="checkbox" /> - {name}
            </label>
            <p className="ml-2">от {price}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Filters;
