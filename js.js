
const imgArray = ["baggage.png","vacation.png","kebab.png", "watermelon.png","travel.png","ticket.png"];


function Main() {
    return(
        <div>
            <Page/>
        </div>
    )
}

function Inputs() {
    const currentDate = new Date();

        function saveInputs() {
        let flightDateValue =document.getElementById("dateInput").value;
        const flightDate = new Date(flightDateValue);
        const InitialdDaysLeft = Math.ceil((flightDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
            if (flightDate < currentDate) {
                    alert("Please select a future date")
            } else {
                localStorage.setItem("flightDate", flightDateValue);
                localStorage.setItem("initalDaysLeft", InitialdDaysLeft);
                main.render(<Main/>);
            }
        }
    return (
        <>
            <div className="other" id="info">
                <h1>Flight Countdown App</h1>
                <h2>Select your trip date: </h2>
                <input type="date" id="dateInput" />
                <button onClick={saveInputs} className="button">Submit</button>
            </div>
        </>
        ); 
}

function changeTripDate() {
    localStorage.removeItem("flightDate");
    localStorage.removeItem("updatedDaysLeft");
    localStorage.removeItem("initalDaysLeft");
    window.location.reload();
}



function Page() {
    let squres = [] 
    const flightDate = new Date(localStorage.getItem("flightDate"));
    const currentDate = new Date();
    let daysLeft = Math.ceil((flightDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
    const initalDaysLeft = parseInt(localStorage.getItem("initalDaysLeft"), 10);
    const [updatedDaysLeft, setUpdatedDaysLeft] = React.useState(localStorage.getItem("updatedDaysLeft"))
    
        function Update() {
            if (updatedDaysLeft == daysLeft) {
                alert("No more days to update. Wait patiently for tomorrow");
            } else if (daysLeft==0) {
                main.render(<FlightArrived/>);
            } else {
                setUpdatedDaysLeft(daysLeft)
                localStorage.setItem("updatedDaysLeft", daysLeft);        
            }}

    for (let i=0; i <= initalDaysLeft; i++) {
        let dayMark = initalDaysLeft-i;
        if (updatedDaysLeft !== null) {
            let looplimit= initalDaysLeft - updatedDaysLeft;
            if (dayMark == 0) {
                squres.push(<div className="endflight" key={dayMark} id={`squre${dayMark}`}>
                Flight
                </div>) 
            } else if (i<= looplimit) {
                const randomIndex = Math.floor(Math.random() * imgArray.length);
                squres.push(<div className="squreX" key={dayMark} id={`squre${dayMark}`}>
                <img className="imglogo" src={imgArray[randomIndex]} />
                </div>) 
            } else {
                squres.push(<div className="squre" key={dayMark} id={`squre${dayMark}`}>
                {dayMark}
                </div>)
            }
            
        } else {
            if (dayMark == 0) {
                squres.push(<div className="endflight" key={dayMark} id={`squre${dayMark}`}>
                Flight
                </div>) 
            } else {
                squres.push(<div className="squre" key={dayMark} id={`squre${dayMark}`}>
                {dayMark}
                </div>)
            }
        }
    }

    return (
        <>
        <div className="info" id="info">
            <h1>Flight Countdown App</h1>
            <button className="button" onClick={changeTripDate}>Change trip date</button>
            <h2> You have {daysLeft} days left until your trip </h2>
            <button className="button" onClick={Update}>Update days left</button>
        </div>
            <div className="table" id="table">
            {squres}
            </div>
        </>
    )
 }

 function FlightArrived() {
    const mainDiv = document.getElementById("main")
    mainDiv.style.backgroundImage = "url('plan.jpg')"    
    return (
        <>
        <div className="other" id="info">
            <h1>Desperation table</h1>
            <h2>Your day as come!!!!!!!</h2>
            <h2>Enjoy you flight</h2>
            <h2>Until next time</h2>
            <button className="button" onClick={changeTripDate}>Change trip date</button>

        </div>
        </>
    )
}

const flightDateValue = localStorage.getItem("flightDate");
const main = ReactDOM.createRoot(document.getElementById("main"));

if (flightDateValue == null && flightDateValue == undefined) {
        main.render(<Inputs/>);
    } else {
        main.render(<Main/>);
}  
