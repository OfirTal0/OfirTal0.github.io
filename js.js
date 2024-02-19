const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();
const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();
const monthDate = new Date(currentDate.getFullYear(), currentMonth - 1, 1);
const monthName = monthDate.toLocaleString('default', { month: 'long' });

const flightDate = new Date(localStorage.getItem("tripdate"));
const flightMonth = flightDate.getMonth() + 1;
const flightday = flightDate.getDate();

const imgArray = ["greece.png","vacations.png","kebab.png"];

function update() {
    const squaresToUpdate = [];
    const storedUpdatedDay = localStorage.getItem("UpdatedDay");

    if (storedUpdatedDay !== currentDay) {
        localStorage.setItem("UpdatedDay", currentDay);
    }

    if (storedUpdatedDay == currentDay ) {
        alert("No more days to update. Wait patiently for tomorrow")
    }
    for (let i=1; i<=currentDay; i++) {
        let squre = document.getElementById(`squre${i}`);
        if (squre) {
            squaresToUpdate.push(squre);
        }
    }

    function updateSquareWithDelay(index) {
        const flightDate = new Date(localStorage.getItem("tripdate"));
        const currentDate = new Date();
        const daysLeft = Math.ceil((flightDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

        if (index < squaresToUpdate.length) {
            const square = squaresToUpdate[index];
            square.innerHTML = "";
            const imgElement = document.createElement("img");
            const randomIndex = Math.floor(Math.random() * imgArray.length);
            imgElement.src = imgArray[randomIndex];
            imgElement.className = "imglogo"
            square.appendChild(imgElement);
            square.className = "squreX";
    
            setTimeout(() => {
                updateSquareWithDelay(index + 1);
            }, 300);

        } else {
            if (daysLeft == 0) {
                main.render(<FlightArrived/>);
            }
        }
    }
    
    if (storedUpdatedDay) {
        updateSquareWithDelay(parseInt(storedUpdatedDay, 10));
    } else {
        updateSquareWithDelay(0);
    }

}

function changeTripDate() {
    localStorage.removeItem("tripdate");
    localStorage.removeItem("UpdatedDay");
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

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();
    const monthDate = new Date(currentDate.getFullYear(), currentMonth - 1, 1);
    const monthName = monthDate.toLocaleString('default', { month: 'long' });

    const flightDate = new Date(localStorage.getItem("tripdate"));
    const flightMonth = flightDate.getMonth() + 1;
    const flightday = flightDate.getDate();


    const storedUpdatedDay = localStorage.getItem("UpdatedDay");
    const loopLimit = currentMonth !== flightMonth ? lastDayOfMonth : flightday;
    parseInt(storedUpdatedDay, 10)
        
    if (storedUpdatedDay) {
            for (let i=1; i <= loopLimit; i++) {
                if (i==flightday && loopLimit==flightday) {
                    squres.push(<div className="endflight" key={i} id={`squre${i}`}>
                        {i} <br/>Flight

                    </div>)  
                }
                else if (i<=parseInt(storedUpdatedDay, 10)) {
                    const randomIndex = Math.floor(Math.random() * imgArray.length);
                    squres.push(<div className="squreX" key={i} id={`squre${i}`}>
                    <img className="imglogo" src={imgArray[randomIndex]} />
                    </div>)  
                } else {
                    squres.push(<div className="squre" key={i} id={`squre${i}`}>
                    {i}
                    </div>)  
                }
            }
        } else {
                for (let i = 1; i <= loopLimit; i++) {
                    if (i==flightday && loopLimit==flightday) {
                        squres.push(<div className="endflight" key={i} id={`squre${i}`}>
                        {i} <br/>Flight
                        </div>)  
                    } else {
                        squres.push(<div className="squre" key={i} id={`squre${i}`}>{i}</div>);

                    }
            }
        }


    return (
        <>
            <h3> We are now at {monthName} </h3>
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

        if (selectedDate < currentDate) {
                alert("Please select a future date.")
        } else {
            localStorage.setItem("tripdate", tripdate);
            main.render(<Main/>);
        }
    }

    return (
        <>
        <div className="info" id="info">
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
        <div className="info" id="info">
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
