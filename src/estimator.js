<<<<<<< HEAD
=======
>>>>>>> 58eb1b577570583059d38aa099696d6b9f8c490d
/* 
data structure 
-----------------------------------------------------
{
  region: {
  name: "Africa",
  avgAge: 19.7,
  avgDailyIncomeInUSD: 5,
  avgDailyIncomePopulation: 0.71
  },
  periodType: "days",
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
  }
-----------------------------------------------------
*/
const covid19ImpactEstimator = (data) => {
  // challenge 1
  let Data = data;
<<<<<<< HEAD
=======

  let period = Data.periodType,
  time = Data.timeToElapse,
  cases = Data.reportedCases,
  beds = Data.totalHospitalBeds,
  pop = Data.region.avgDailyIncomePopulation,
  usd = Data.region.avgDailyIncomeInUSD;

  let timeInDays = () => {
    let value;
    if(period == "weeks"){value = time * 7;}
    else if(period == "months"){value = time * 30;}
    else{value = time;}
    return value;
  };

  const impact = (num) =>{
    let t = timeInDays();
    if(t % 3 != 0){
      t -= (t%3);
    }
    let cur = cases * num;
    let ibrt =  Math.trunc(cur * (2 ** ( t / 3)));
    // challenge 2
    let scbrt = Math.trunc(ibrt * 0.15);
    let hbbrt = Math.trunc(beds * 0.35 - scbrt);
    // challenge 3
    let cfibrt = Math.trunc(ibrt * 0.05);
    let cfvbrt = Math.trunc(ibrt * 0.02);
    let dif = Math.trunc((ibrt * pop * usd) / t);
    
    return {
      currentlyInfected: cur,
      infectionsByRequestedTime: ibrt,
      severeCasesByRequestedTime: scbrt,
      hospitalBedsByRequestedTime: hbbrt,
      casesForICUByRequestedTime: cfibrt,
      casesForVentilatorsByRequestedTime: cfvbrt,
      dollarsInFlight: dif
    }
  };
  
  return{
    impact: impact(10),
    severeImpact: impact(50)
  };
}
>>>>>>> 58eb1b577570583059d38aa099696d6b9f8c490d

  let period = Data.periodType,
  time = Data.timeToElapse,
  cases = Data.reportedCases,
  beds = Data.totalHospitalBeds,
  pop = Data.region.avgDailyIncomePopulation,
  usd = Data.region.avgDailyIncomeInUSD;

  let timeInDays = () => {
    let value;
    if(period == "weeks"){value = time * 7;}
    else if(period == "months"){value = time * 30;}
    else{value = time;}
    return value;
  };

  const impact = (num) =>{
    let t = timeInDays();
    if(t % 3 != 0){
      t -= (t%3);
    }
    let cur = cases * num;
    let ibrt =  Math.trunc(cur * (2 ** ( t / 3)));
    // challenge 2
    let scbrt = Math.trunc(ibrt * 0.15);
    let hbbrt = Math.trunc(beds * 0.35 - scbrt);
    // challenge 3
    let cfibrt = Math.trunc(ibrt * 0.05);
    let cfvbrt = Math.trunc(ibrt * 0.02);
    let dif = Math.trunc((ibrt * pop * usd) / t);

    return {
      currentlyInfected: cur,
      infectionsByRequestedTime: ibrt,
      severeCasesByRequestedTime: scbrt,
      hospitalBedsByRequestedTime: hbbrt,
      casesForICUByRequestedTime: cfibrt,
      casesForVentilatorsByRequestedTime: cfvbrt,
      dollarsInFlight: dif
    }
  };

  return{
    impact: impact(10),
    severeImpact: impact(50)
  };
}

export default covid19ImpactEstimator;