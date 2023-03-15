//Using body fat % example from pdf 
const bodyFatPercent = 30;
//Converting percent to decimal 
const bodyFat = bodyFatPercent / 100;
//Finding current fat mass from overall mass
const currentFatMass = bodyFat*currentWeightKG;


//NEED TO ASK PATIENTS THIS!!! 
const targetWeightLossPercent = 7.0;
//Converting percent to decimal 
const temp = targetWeightLossPercent/100;
//Formula to find target weight loss in KG
const targetWeightLossKG = temp * currentWeightKG;
//Formula to find target body weight 
const targetBodyWeight = currentWeightKG - targetWeightLossKG;
//Formula to create a new fat mass 
const newFatmass = currentFatMass-targetWeightLossKG;
//Formula to get target body fat % to plug into formula 
const targetBodyFatPercent = newFatmass/targetBodyWeight;

//if Male THEN 
const steps_KG_Male = 39377.34/targetBodyFatPercent**1.3405;
const male_steps = steps_KG_Male * currentFatMass;
//if Female THEN
const steps_KG_Female = 261425.4/targetBodyFatPercent**1.8797;
const female_steps = steps_KG_Female * currentFatMass;
