import { useState, useEffect } from "react";
import "./App.css";

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [catData, setCatData] = useState(null);
  const [banList, setBanList] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);

  const fetchCatData = async () => {
    try {
      const response = await fetch(
      "https://api.thecatapi.com/v1/breeds?api_key=live_b0Sf8JAyB9aZ6WpBkwVQqJbuOAK8CILXSNCiGZaVHIFd5WajnTUi82wme1GyHBaw",
      {
        headers: {
          "x-api-key": "live_b0Sf8JAyB9aZ6WpBkwVQqJbuOAK8CILXSNCiGZaVHIFd5WajnTUi82wme1GyHBaw"
        },
      });

      const data = await response.json();
      console.log(response);

      while (true) {
        const randIndex = Math.floor(Math.random() * data.length);
        const { reference_image_id, name, origin, lifespan, weight} = data[randIndex];

        const attributes = [name, origin, lifespan, weight.imperial]
        if (attributes.some((attribute) => banList.includes(attribute))) {
          continue;
        }
      
      const image = new Image();
      image.src = 'https://cdn2.thecatapi.com/images/${reference_image_id}.jpg'
      image.onload = () => {
        const catInformation = {
          reference_image_id,
          name,
          origin,
          lifespan,
          weight: weight.imperial,
          randName: randCatName,
        };
        setCatData(catInformation);
      };
      break;
    }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }; 

  const handleBanList = (attribute) => {
    if (!banList.includes(attribute)) {
      setBanList([...banList, attribute]);
    }
  };

  const handleUnnecessaryBanList = (attribute) => {
    const updatedBanList = banList.filter((attr) => attr !== attribute);
    setBanList(updatedBanList);
  };

  useEffect(() => {
    fetchCatData();
  }, []);

  const catNames = [
    "Buddy",
    "Max",
    "Bailey",
    "Charlie",
    "Lucy",
    "Cooper",
    "Lola",
    "Daisy",
    "Rocky",
    "Molly",
    "Stella",
    "Coco",
    "Ruby",
    "Bear",
    "Lily",
    "Zoe",
    "Milo",
    "Leo",
    "Oliver",
    "Luna",
  ];

  const randCatName = catNames[Math.floor(Math.random() * catNames.length)];

  return (
    <>
      <div className='main'>
        <h1>Veni Vici!</h1>
        <h3>Find out facts about some amazing cats</h3>
        
        <div className='discover'>
          {buttonClicked && catData !== null && (
            <div>
              <h2>{catData.randName}</h2>
              <div className="nuttons">
                <button type="attribute" className="individual_buttons" onClick={() => handleBanList(catData.name)}>
                  {catData.name}
                </button>
                <button type="attribute" className="individual_buttons" onClick={() => handleBanList(catData.origin)}>
                  {catData.origin}
                </button>
                <button type="attribute" className="individual_buttons" onClick={() => handleBanList(catData.lifespan)}>
                  {catData.lifespan}
                </button>
                <button type="attribute" className="individual_buttons" onClick={() => handleBanList(catData.weight)}>
                  {catData.weight}
                </button>
              </div>

              <img src={`https://cdn2.thecatapi.com/images/${catData.reference_image_id}.jpg`} alt=""/>
            </div>
          )}
          <button type="discover" className="discover" onClick={() => {
            fetchCatData();
            setButtonClicked(true)
          }}>
            Discover
          </button>
        </div>
      </div>
      <div className="banned-list">
        <h3>Banned CATegories</h3>
        <div className="banned-items">
          {banList.map((attribute) => (
            <button key={attribute} className="banned-button" onClick={() => handleUnnecessaryBanList(attribute)}>
              {attribute}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;