type Home = {
    value: number;
    movedInMonthsAgo: number;
    isRenting: boolean;
  };
  
  function filterHomes(homes: Home[]): Home[] {
    return homes.filter(home => 
      home.value > 700000 &&
      home.movedInMonthsAgo <= 12 &&
      !home.isRenting
    );
  }
  
  const homes: Home[] = [
    { value: 750000, movedInMonthsAgo: 10, isRenting: false },
    { value: 600000, movedInMonthsAgo: 5, isRenting: false },
    { value: 800000, movedInMonthsAgo: 14, isRenting: false },
    { value: 950000, movedInMonthsAgo: 8, isRenting: true },
    { value: 1000000, movedInMonthsAgo: 6, isRenting: false }
  ];
  
  const filteredHomes = filterHomes(homes);
  console.log(filteredHomes);
  