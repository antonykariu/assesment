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
    const cif = () => {impact * d.reportedCases};
    const ibrt = () =>{cif() * (2 ** (timeInDays / 3));};
    const scbrt = () => {ibrt() * 0.15;};
    const hbbrt = () => {Math.trunc(d.totalHospitalBeds * 0.35 - scbrt());};
    const cfibrt = () => {Math.trunc(ibrt() * 0.05);};
    const cfvbrt = () => {ibrt() * 0.02;};
    const dif = () =>{ 
      let r = d.region;
      return Math.trunc(ibrt() * r.avgDailyIncomePopulation
    * r.avgDailyIncomeInUSD * timeInDays);
  };

    return {
      currentlyInfected: cif(),
      infectionsByRequestedTime: ibrt(),
      severeCasesByRequestedTime: scbrt(),
      hospitalBedsByRequestedTime: hbbrt(),
      casesForICUByRequestedTime: cfibrt(),
      casesForVentilatorsByRequestedTime: cfvbrt(),
      dollarsInFlight: dif()
    };
  };

  return {
    data: input,
    impact: outcome(input, impacts[0]),
    severeImpact: outcome(input, impacts[1])
  };
};

export default covid19ImpactEstimator;
