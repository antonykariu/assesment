import covid19ImpactEstimator from './estimator.js';

let mydata = {
    region: {
      name: "Africa",
      avgAge: 19.7,
      avgDailyIncomeInUSD: 5,
      avgDailyIncomePopulation: 0.71
    },
    periodType: "",
    timeToElapse: 0,
    reportedCases: 0,
    population: 0,
    totalHospitalBeds: 0
}
  
  document.getElementById("submit").addEventListener("click", (event)=>{
    event.preventDefault();
    let d = document;
    let pop = d.getElementById("population").value;
    let time = d.getElementById("timeToElapse").value;
    let cases = d.getElementById("reportedCases").value;
    let beds = d.getElementById("totalHospitalBeds").value;
    let period = d.getElementById("periodType").value;
  
    mydata.periodType = period;
    mydata.timeToElapse = time;
    mydata.reportedCases = cases;
    mydata.population = pop;
    mydata.totalHospitalBeds = beds;
    let data = covid19ImpactEstimator(mydata);
    
    let infected = d.getElementsByClassName(`infected`);
    let severe = d.getElementsByClassName(`severe-cases`);
    let icu = d.getElementsByClassName(`icu`);
    let ventilators = d.getElementsByClassName(`ventilators`);
    let dollars = d.getElementsByClassName(`dollars`);
  
    infected[0].children[1].innerHTML = data.impact.currentlyInfected;
    severe[0].children[1].innerHTML = data.impact.severeCasesByRequestedTime;
    icu[0].children[1].innerHTML = data.impact.casesForICUByRequestedTime;
    ventilators[0].children[1].innerHTML = data.impact.casesForVentilatorsByRequestedTime;
    dollars[0].children[1].innerHTML = data.impact.dollarsInFlight;
  
    infected[1].children[1].innerHTML = data.severeImpact.currentlyInfected;
    severe[1].children[1].innerHTML = data.severeImpact.severeCasesByRequestedTime;
    icu[1].children[1].innerHTML = data.severeImpact.casesForICUByRequestedTime;
    ventilators[1].children[1].innerHTML = data.severeImpact.casesForVentilatorsByRequestedTime;
    dollars[1].children[1].innerHTML = data.severeImpact.dollarsInFlight;
  });
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('../serviceWorker.js');
    });
  }