import { useState, useContext } from "react"
import { Link ,useNavigate} from "react-router-dom"
import PhotographerWebsite from "../components/PhotographerWebsite"



function WelcomePage() {
  const [photographersArray, setPhotographersArray] = useState([]);


  const getAllPhotographers = async () => {
    const data = await fetch(`http://localhost:3000/welcomePage`);
    const photographers = await data.json();
    setPhotographersArray(photographers);
  }
  
  useEffect(() => {
    console.log("useEffect");
    getAllPhotographers();
  }, [])

  return (
    <div>
      
  <h1>בשם ה נעשה ונצליח!!!!</h1>
  <div id="photographers">
                {photographersArray.map(()=> <PhotographerWebsite />) }
            </div>
    
    </div>
  )
}

export default WelcomePage
