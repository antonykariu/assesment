const covid19ImpactEstimator = (data) => {
  const input = data;
  const impacts = [10, 50];
  const outcome = (d, impact) => {
  
    let timeInDays = d.timeToElapse;
    if(d.periodType == "weeks"){
      timeInDays = timeInDays * 7;
    }
    if(d.periodType == "months"){
      timeInDays *= 30;
    }
    const currentlyInfected = impact * d.reportedCases;
    const infectionsByRequestedTime = Math.trunc(currentlyInfected * (2 ** (timeInDays / 3)));
    const severeCasesByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.15);
    const hospitalBedsByRequestedTime = Math.trunc(d.totalHospitalBeds * 0.35 - severeCasesByRequestedTime);
    const casesForICUByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.05);
    const casesForVentilatorsByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.02);
    const dollarsInFlight = Math.trunc(infectionsByRequestedTime * d.region.avgDailyIncomePopulation
    * d.region.avgDailyIncomeInUSD * timeInDays);

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
