
//create class to exports and extend React.Component
//Need to create buttons for OnClick to route to 
//Add Goal
<button id= "addGoal" onClick={this.interface}>Add Goal</button>
//Delete Goal
<button id= "DeleteGoal" onClick={this.interface}>Delete Goal</button>
//UpDate Goal
<button id= "UpdateGoal" onClick={this.interface}>Update Goal</button>


interface(event){
    const id = event.target.id;

    if(id=='addGoal'){
        this.insertData();
    }
    else if(id=='UpdateGoal'){
        //thi.updateData();
    }

    else if(id=='DeleteGoal'){
        //this.deleteData();
    }

   getAllInputs(){
    return{
       //Goals
    }
}

insertData(){
const db = this.state.db;
const data = this. getAllInputs();

}

//ERROR: .catch((error)=>{alert("there was an error, details: " +error)});
