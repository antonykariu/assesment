const covid19ImpactEstimator = (data) => {
  const input = data;
  const impacts = [10, 50];
  const outcome = (d, impact) => {
    let timeInDays = d.timeToElapse;
    let value = timeInDays % 3;

    if (d.periodType == "days" && value != 0){
      if(value == 2){
        timeInDays += 1;
      }
      timeInDays -= value;
    }
    if(d.periodType == "weeks"){
      if(value != 0){
        if(value == 2){
        timeInDays = timeInDays * 7 + 1;
        }
        timeInDays = timeInDays * 7 - 1;
      }
      timeInDays *= 7;
    }
    if(d.periodType == "months"){
      timeInDays *= 30;
    }
    const currentlyInfected = impact * d.reportedCases;
    const infectionsByRequestedTime = currentlyInfected * (2 ** (timeInDays / 3));
    const severeCasesByRequestedTime = infectionsByRequestedTime * 0.15;
    const hospitalBedsByRequestedTime = d.totalHospitalBeds * 0.35 - severeCasesByRequestedTime;
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
