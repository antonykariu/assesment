const covid19ImpactEstimator = (data) => {

    impacts = [10,50];
    const outcome = (data,impact) =>{
        const currentlyInfected = impact * data.reportedCases;
        const infectionsByRequestedTime = currentlyInfected * (2 ** (data.timeToElapse/3));
        const severeCasesByRequestedTime = infectionsByRequestedTime * 0.15;
        const hospitalBedsByByRequestedTime = (data.totalHospitalBeds * 0.35) - severeCasesByRequestedTime;
        const casesForICUByRequestedTime = infectionsByRequestedTime * 0.05;
        const casesForVentilatorsByRequestedTime = infectionsByRequestedTime * 0.02;
        const dollarsInFlight = (infectionsByRequestedTime * data.region.avgDailyIncomePopulation) * data.region.avgDailyIncomeInUSD * data.timeToElapse;

        return {
            currentlyInfected,
            infectionsByRequestedTime,
            severeCasesByRequestedTime,
            hospitalBedsByByRequestedTime,
            casesForICUByRequestedTime,
            casesForVentilatorsByRequestedTime,
            dollarsInFlight
        }
    }    

    return{
        data,
        impact: outcome(data, impacts[0]),
        severeImpact: outcome(data, impacts[1])
    }
}

export default covid19ImpactEstimator;
