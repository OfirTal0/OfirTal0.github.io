const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();
const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();

const flightDate = new Date('2024-05-22');

const timeDifference = flightDate.getTime() - currentDate.getTime();
const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
const imgArray = ["greece.png","vacations.png","kebab.png"];

function update() {
    const squaresToUpdate = [];
    const storedUpdatedDay = localStorage.getItem("UpdatedDay");

    if (!storedUpdatedDay) {
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
        }
    }
    
    if (storedUpdatedDay) {
        updateSquareWithDelay(parseInt(storedUpdatedDay, 10));
    } else {
        updateSquareWithDelay(0);
    }
}
function Info() {
    return (
        <>
        <div className="info" id="info">
            <h1>Desperation table</h1>
            <h2> You have {daysLeft} days left until your trip </h2>
            <h3> We are now at {currentMonth} month</h3>
            <button className="button" onClick={update}>Update days left</button>
        </div>
        </>
    ); 
}

function CreateTable() {
    let squres = [] 
    const storedUpdatedDay = localStorage.getItem("UpdatedDay");
    parseInt(storedUpdatedDay, 10)
    if (storedUpdatedDay) {
        for (let i=1; i <= lastDayOfMonth; i++) {
            if (i<=parseInt(storedUpdatedDay, 10)) {
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
