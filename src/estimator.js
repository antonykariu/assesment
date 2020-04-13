const covid19ImpactEstimator = (data) => {
  const input = data;
  const impacts = [10, 50];
  const outcome = (d, impact) => {
    let timeInDays = d.timeToElapse;
    if (d.periodType == "days" && timeInDays % 3 != 0){
      timeInDays = timeInDays - (timeInDays % 3);
    }
    if(d.periodType == "weeks"){
      if(timeInDays % 3 != 0){
        timeInDays = timeInDays * 7 - ((timeInDays * 7) % 3);
      }
      else{
      timeInDays = timeInDays * 7;
      }
    }
    if(d.periodType == "months"){
      timeInDays *= 30;
    }
    const currentlyInfected = impact * d.reportedCases;
    const infectionsByRequestedTime = currentlyInfected * (2 ** (timeInDays / 3));
    const severeCasesByRequestedTime = infectionsByRequestedTime * 0.15;
    const hospitalBedsByRequestedTime = Math.trunc(d.totalHospitalBeds * 0.35 - severeCasesByRequestedTime);
    const casesForICUByRequestedTime = infectionsByRequestedTime * 0.05;
    const casesForVentilatorsByRequestedTime = infectionsByRequestedTime * 0.02;
    const dollarsInFlight = infectionsByRequestedTime * d.region.avgDailyIncomePopulation
    * d.region.avgDailyIncomeInUSD * timeInDays;

    return {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFlight
    };
  };

  return {
    data: input,
    impact: outcome(input, impacts[0]),
    severeImpact: outcome(input, impacts[1])
  };
};

export default covid19ImpactEstimator;
