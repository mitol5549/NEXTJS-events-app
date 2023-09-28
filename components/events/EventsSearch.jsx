import { useState } from 'react';
import { months, years } from '../../helpers/calendar';

import { Select, SelectItem, Button } from '@nextui-org/react';

export const EventsSearch = props => {
  const [selectedYear, setSelectedYear] = useState('2021');
  const [selectedMonth, setSelectedMonth] = useState('1');

  const yearHandler = year => {
    setSelectedYear(year.anchorKey);
  };

  const monthHandler = month => {
    setSelectedMonth(month.anchorKey);
  };

  const submitHandler = () => {
    props.onSearch(selectedYear, selectedMonth);
  };

  return (
    <div className="flex flex-col justify-between w-4/5 max-w-2xl p-4 my-8 mx-auto md:flex-row gap-4 items-center">
      <div className="flex flex-col w-full gap-4 md:w-4/5 md:flex-row ">
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 justify-center">
          <Select
            defaultSelectedKeys={['2021']}
            label="Year"
            className="max-w-xs"
            size="sm"
            onSelectionChange={yearHandler}
          >
            {years.map(year => (
              <SelectItem key={year.value} value={year.value}>
                {year.value}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 justify-center">
          <Select
            defaultSelectedKeys={['1']}
            label="Month"
            className="max-w-xs"
            size="sm"
            onSelectionChange={monthHandler}
          >
            {months.map(month => (
              <SelectItem key={month.value} value={month.value}>
                {month.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <Button
        className="flex gap-4 md:flex-row bg-primary-200 w-full max-w-xs md:w-32"
        size="lg"
        onClick={submitHandler}
      >
        Find Events
      </Button>
    </div>
  );
};
