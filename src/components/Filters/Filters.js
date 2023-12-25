const Filters = ({
  companysList,
  handleChangeRadio,
  handleChangePrice,
  handleChangeName,
  price,
}) => {
  return (
    <div className="text-sm">
      <div className="flex flex-col mb-10">
        <p className="font-semibold mb-2">Сортировать</p>
        <label>
          <input
            type="radio"
            name="sort"
            value="ask"
            onChange={handleChangeRadio}
          />{' '}
          - по возрастанию цены
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value="desc"
            onChange={handleChangeRadio}
          />{' '}
          - по убыванию цены
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value="duration"
            onChange={handleChangeRadio}
          />{' '}
          - по времени в пути
        </label>
      </div>
      <div className="flex flex-col mb-7">
        <p className="font-semibold mb-2">Фильтровать</p>
        <label>
          <input
            type="radio"
            name="sort"
            value="one"
            onChange={handleChangeRadio}
          />{' '}
          - 1 пересадка
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value="without"
            onChange={handleChangeRadio}
          />{' '}
          - без пересадок
        </label>
      </div>
      <div className="flex flex-col mb-7">
        <p className="font-semibold mb-2">Цена</p>
        <label className="mb-5">
          От{' '}
          <input
            type="text"
            name="minPrice"
            value={price.minPrice || ''}
            onChange={handleChangePrice}
            className="border border-gray-500"
          />
        </label>
        <label>
          До{' '}
          <input
            type="text"
            name="maxPrice"
            value={price.maxPrice || ''}
            onChange={handleChangePrice}
            className="border border-gray-500"
          />
        </label>
      </div>
      <div className="flex flex-col mb-7">
        <p className="font-semibold mb-2">Авиакомпании</p>
        {[...companysList.entries()]?.map(([name, price]) => (
          <div className="flex" key={name}>
            <label className="w-[50%] truncate ...">
              <input type="checkbox" value={name} onChange={handleChangeName} />{' '}
              - {name}
            </label>
            <p className="ml-2">от {price} р</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
