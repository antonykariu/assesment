const covid19ImpactEstimator = (data) => {
  // challenge 1
  let Data = data;
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
      t -= ((t%3)+1);
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
