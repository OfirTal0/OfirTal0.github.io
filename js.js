const currentDate = new Date();
const currentDay = currentDate.getDate();
const flightDate = new Date(localStorage.getItem("tripdate"));
const imgArray = ["baggage.png","vacation.png","kebab.png", "watermelon.png","travel.png","ticket.png"];

function update() {
    const squaresToUpdate = [];
    const flightDate = new Date(localStorage.getItem("tripdate"));
    const currentDate = new Date();
    const daysLeft = Math.ceil((flightDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
    const UpdatedDaysLeft = localStorage.getItem("UpdatedDaysLeft");

    function updateSquareWithDelay(index) {
        if (index < squaresToUpdate.length) {
            const square = squaresToUpdate[index];
            square.innerHTML = "";
            const imgElement = document.createElement("img");
            const randomIndex = Math.floor(Math.random() * imgArray.length);
            imgElement.src = imgArray[randomIndex];
            imgElement.className = "imglogo";
            square.appendChild(imgElement);
            square.className = "squreX";

            setTimeout(() => {
                updateSquareWithDelay(index + 1);
            }, 300);
        } else {
            if (daysLeft === 0) {
                main.render(<FlightArrived />);
            }
        }
    }

    if (UpdatedDaysLeft == daysLeft) {
        alert("No more days to update. Wait patiently for tomorrow");
    }

    if (UpdatedDaysLeft == null || UpdatedDaysLeft == undefined) {
        localStorage.setItem("UpdatedDaysLeft", daysLeft);
        let square = document.getElementById(`squre0`);
        squaresToUpdate.push(square);
        updateSquareWithDelay(0);
    } else {
        const loopLimit = daysLeft - UpdatedDaysLeft;
        for (let i = 0; i <= loopLimit; i++) {
            let square = document.getElementById(`squre${i}`);
            if (square) {
                squaresToUpdate.push(square);
            }
        }
        localStorage.setItem("UpdatedDaysLeft", daysLeft);
        updateSquareWithDelay(0);
    }
}

function changeTripDate() {
    localStorage.removeItem("tripdate");
    localStorage.removeItem("UpdatedDaysLeft");
    localStorage.removeItem("initalDaysLeft");

    window.location.reload();
}

function Info() {
    const flightDate = new Date(localStorage.getItem("tripdate"));
    const currentDate = new Date();
    const daysLeft = Math.ceil((flightDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

    return (
        <>
        <div className="info" id="info">
            <h1>Desperation table</h1>
            <button className="button" onClick={changeTripDate}>Change trip date</button>
            <h2> You have {daysLeft} days left until your trip </h2>
            <button className="button" onClick={update}>Update days left</button>
        </div>
        </>
    ); 
}

function CreateTable() {
    let squres = [] 
    const initalDaysLeft = localStorage.getItem("initalDaysLeft");
    parseInt(initalDaysLeft, 10)
    const UpdatedDaysLeft = localStorage.getItem("UpdatedDaysLeft");
    console.log(UpdatedDaysLeft)
    const daysLeft = Math.ceil((flightDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
    const loopLimit = daysLeft - UpdatedDaysLeft;
    
    if (UpdatedDaysLeft !== null || UpdatedDaysLeft !== undefined) {
            for (let i=0; i <= initalDaysLeft; i++) {
                if (i==initalDaysLeft) {
                    squres.push(<div className="endflight" key={i} id={`squre${i}`}>
                        Flight
                    </div>)  
                }
                else if (i<=loopLimit) {
                    const randomIndex = Math.floor(Math.random() * imgArray.length);
                    squres.push(<div className="squreX" key={i} id={`squre${i}`}>
                    <img className="imglogo" src={imgArray[randomIndex]} />
                    </div>)  
                } else {
                    squres.push(<div className="squre" key={i} id={`squre${i}`}>
                    {initalDaysLeft-i}
                    </div>)  
                }
            }
        } else {
                for (let i = 0; i <= initalDaysLeft; i++) {
                    if (i==initalDaysLeft) {
                        squres.push(<div className="endflight" key={i} id={`squre${i}`}>
                        Flight
                        </div>)  
                    } else {
                        squres.push(<div className="squre" key={i} id={`squre${i}`}>{initalDaysLeft-i}</div>);

                    }
            }
        }


    return (
        <>
            <div className="table" id="table">
            {squres}
            </div>
        </>
    );

}


function Inputs() {
    function saveInputs() {

        const tripdate = document.getElementById("dateInput").value;
        const selectedDate = new Date(tripdate);
        const currentDate = new Date();
        const InitialdDaysLeft = Math.ceil((selectedDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

        if (selectedDate < currentDate) {
                alert("Please select a future date")
        } else {
            localStorage.setItem("tripdate", tripdate);
            localStorage.setItem("initalDaysLeft", InitialdDaysLeft);

            main.render(<Main/>);
        }
    }

    return (
        <>
        <div className="other" id="info">
            <h1>Desperation table</h1>
            <h2>Select your trip date: </h2>
            <input type="date" id="dateInput" />
            <button onClick={saveInputs} className="button">Submit</button>
        </div>
        </>
    ); 
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


function Main() {
    return(
        <div>
            <Info/>
            <CreateTable/>
        </div>
    )
}

const main = ReactDOM.createRoot(document.getElementById("main"));

if (flightDate.toISOString().split('T')[0] !== "1970-01-01") {
    main.render(<Main/>);
} else {
    main.render(<Inputs />);
}
