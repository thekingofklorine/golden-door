// Step 2: Import the JSON data
import homes from './resources/fake_data.json';

interface FilterCriteria {
  minIncome?: number;
  maxIncome?: number;
  minHousePrice?: number;
  maxHousePrice?: number;
  moveInDate?: string;
}

type Home = {
  name: string;
  latitude: number;
  longitude: number;
  income: number;
  house_price: number;
  move_in_date: string;
};

// Step 3: Use the imported data in the filterHomes function
const filterHomesWithCriteria = (criteria: FilterCriteria) => {
  return homes.filter(home => {
    const matchesIncome = (!criteria.minIncome || home.income >= criteria.minIncome) &&
                          (!criteria.maxIncome || home.income <= criteria.maxIncome);
    const matchesHousePrice = (!criteria.minHousePrice || home.house_price >= criteria.minHousePrice) &&
                              (!criteria.maxHousePrice || home.house_price <= criteria.maxHousePrice);
    const matchesMoveInDate = !criteria.moveInDate || new Date(home.move_in_date) >= new Date(criteria.moveInDate);

    return matchesIncome && matchesHousePrice && matchesMoveInDate;
  });
};

// At the end of filter.ts
const filterHomes = (criteria: FilterCriteria): Home[] => {
  return homes.filter(home => {
    const matchesIncome = (!criteria.minIncome || home.income >= criteria.minIncome) &&
                          (!criteria.maxIncome || home.income <= criteria.maxIncome);
    const matchesHousePrice = (!criteria.minHousePrice || home.house_price >= criteria.minHousePrice) &&
                              (!criteria.maxHousePrice || home.house_price <= criteria.maxHousePrice);
    const matchesMoveInDate = !criteria.moveInDate || new Date(home.move_in_date) >= new Date(criteria.moveInDate);

    return matchesIncome && matchesHousePrice && matchesMoveInDate;
  });
};

export { filterHomesWithCriteria, filterHomes, FilterCriteria };