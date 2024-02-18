const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();
const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();

const flightDate = new Date('2024-05-22');

const timeDifference = flightDate.getTime() - currentDate.getTime();
const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

function update() {
    const squaresToUpdate = [];
    localStorage.setItem("update",JSON.stringify({ currentDay }))
    for (let i=1; i<=currentDay; i++) {
        let squre = document.getElementById(`squre${i}`);
        if (squre) {
            squaresToUpdate.push(squre);
        }
    }

    function updateSquareWithDelay(index) {
            if (index < squaresToUpdate.length) {
                const square = squaresToUpdate[index];
                square.innerHTML = "X";
                square.className = "squreX";

                // Set a delay of 500 milliseconds (adjust as needed)
                setTimeout(() => {
                    updateSquareWithDelay(index + 1);
                }, 200);
            }
        }
    updateSquareWithDelay(0);

} 

function Info() {
    return (
        <>
        <div className="info" id="info">
            <h1>Desperation table</h1>
            <h2> You have {daysLeft} days left until your trip </h2>
            <h3> We are now at {currentMonth} month</h3>
            <button onClick={update}>Update days left</button>
        </div>
        </>
    ); 
}

function CreateTable() {
    let squres = [] 
    var updateDate= localStorage.getItem("update")
    if (updateDate) {
        updateDate = JSON.parse(updateDate);
        for (let i=1; i <= lastDayOfMonth; i++) {
            if (i<=updateDate.currentDay) {
                squres.push(<div className="squreX" key={i} id={`squre${i}`}>X</div>)  
            } else {
                squres.push(<div className="squre" key={i} id={`squre${i}`}>{i}</div>)  
            }
        }
    } else {
        for (let i = 1; i <= lastDayOfMonth; i++) {
            squres.push(<div className="squre" key={i} id={`squre${i}`}>{i}</div>);
        }
    }
    return (
        <>
            <div className="table" id="table">
            {squres}
            </div>
        </>
    );

update()  
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
main.render(<Main/>);
