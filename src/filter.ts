// filter.ts
import location from './resources/fake_data.json';

interface FilterCriteria {
  minIncome?: number;
  maxIncome?: number;
  minHousePrice?: number;
  maxHousePrice?: number;
  moveInDate?: string;
}

export interface Location {
  name: string;
  latitude: number;
  longitude: number;
  income: number;
  house_price: number;
  move_in_date: string;
}

const filterHomes = (criteria: FilterCriteria): Location[] => {
  return location.filter(home => {
    const matchesIncome = (!criteria.minIncome || home.income >= criteria.minIncome) &&
                          (!criteria.maxIncome || home.income <= criteria.maxIncome);
    const matchesHousePrice = (!criteria.minHousePrice || home.house_price >= criteria.minHousePrice) &&
                              (!criteria.maxHousePrice || home.house_price <= criteria.maxHousePrice);
    const matchesMoveInDate = !criteria.moveInDate ||
                              (new Date(home.move_in_date) >= new Date(criteria.moveInDate) && 
                               new Date(home.move_in_date) <= new Date());

    return matchesIncome && matchesHousePrice && matchesMoveInDate;
  });
};

export { filterHomes, FilterCriteria };