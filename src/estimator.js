const covid19ImpactEstimator = (data) => {
  const input = data;
  const impacts = [10, 50];
  const outcome = (d, impact) => {
    const currentlyInfected=impact * d.reportedCases;
    const infectionsByRequestedTime=currentlyInfected * 2 ** (d.timeToElapse / 3);
    const severeCasesByRequestedTime=infectionsByRequestedTime * 0.15;
    const hospitalBedsByByRequestedTime=d.totalHospitalBeds * 0.35 - severeCasesByRequestedTime;
    const casesForICUByRequestedTime=infectionsByRequestedTime * 0.05;
    const casesForVentilatorsByRequestedTime=infectionsByRequestedTime * 0.02;
    const dollarsInFlight =infectionsByRequestedTime * d.region.avgDailyIncomePopulation * d.region.avgDailyIncomeInUSD * d.timeToElapse;

    return {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByByRequestedTime,
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
