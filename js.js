
const imgArray = ["baggage.png","vacation.png","kebab.png", "watermelon.png","travel.png","ticket.png"];


function Main() {
    return(
        <div>
            <Info/>
            <Table/>
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

function Info() {
    const flightDate = new Date(localStorage.getItem("flightDate"));
    const currentDate = new Date();
    let daysLeft = Math.ceil((flightDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

    function getSquers() {
        const UpdatedDaysLeft = localStorage.getItem("updatedDaysLeft");

        if (UpdatedDaysLeft == daysLeft) {
            alert("No more days to update. Wait patiently for tomorrow");
        } else if (daysLeft==0) {
            main.render(<FlightArrived />);
        } else {
            const initalDaysLeft = localStorage.getItem("initalDaysLeft");
            const squaresToUpdate = [];
            for (let i = initalDaysLeft; i >= daysLeft; i--) {
                let squre = document.getElementById(`squre${i}`)
                squaresToUpdate.push(squre)
            }
            update(squaresToUpdate);
        }

    }

    function update(squaresToUpdate) {
        localStorage.setItem("updatedDaysLeft", daysLeft);
        
        const updateSquareWithDelay = (index) => {
            if (index < squaresToUpdate.length) {
                const key = squaresToUpdate[index];
                const square = document.getElementById(`square${key}`);
                if (square) {
                    const imgElement = document.createElement("img");
                    imgElement.className = "imglogo";
                    imgElement.src = imgArray[Math.floor(Math.random() * imgArray.length)];
        
                    square.innerHTML = ""; 
                    square.appendChild(imgElement);
                    square.className = "squareX"; 

                    setTimeout(() => {
                        updateSquareWithDelay(index + 1);
                    }, 300);  
                }

            }
        };
    
        updateSquareWithDelay(0);
        window.location.reload();

    }

    return (
        <>
        <div className="info" id="info">
            <h1>Flight Countdown App</h1>
            <button className="button" onClick={changeTripDate}>Change trip date</button>
            <h2> You have {daysLeft} days left until your trip </h2>
            <button className="button" onClick={getSquers}>Update days left</button>
        </div>
        </>
    ); 
}


function Table() {
    let squres = [] 
    const initalDaysLeft = localStorage.getItem("initalDaysLeft");
    parseInt(initalDaysLeft, 10)
    let updatedDaysLeft = localStorage.getItem("updatedDaysLeft");
    for (let i=0; i <= initalDaysLeft; i++) {
        let dayMark = initalDaysLeft-i;
        let looplimit= initalDaysLeft - updatedDaysLeft;
        if (updatedDaysLeft !== null && updatedDaysLeft !== undefined) {
            if (dayMark == 0) {
                squres.push(<div className="endflight" key={dayMark} id={`squre${dayMark}`}>
                Flight
                </div>) 
            } else if(i <= looplimit ) {
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
        main.render(<Inputs />);
    } else {
        main.render(<Main />);
}  

