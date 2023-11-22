import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DisplayProfile } from "./DisplayProfile";
import "./Profile.css";

/**
 * shows the profile of the user
 * @returns the data inside a profile is displayed in a react component
 */
 function Profile()
{
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
          
            const requestOptions = {
              method: 'GET',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json; charset=UTF-8',
              },
            };
    
            const response = await fetch('http://localhost:1339/profile', requestOptions);
            const result = await response.json();
            console.log('Profile response:', result); // Log the response for debugging
            if (response.status === 400) {
                navigate("/", { state: { errorMessage: result.errorMessage } });
            }
            else if (response.status === 500) {
                navigate("/usererror", { state: { errorMessage: result.errorMessage } });
            }
            else {
                setProfile(result);
            }
        };
    
        fetchProfile();
      }, []);
    
   

   return (<div className="profile-container">
    {profile ? (
        <div>
        <h3> Hello {profile.firstName}, </h3>
        <br></br>
        <br></br>
        <h5><b>First Name : </b> {profile.firstName} </h5>
        <br></br>
        <h5><b>Last Name : </b> {profile.lastName} </h5>
        <br></br>
        <h5><b>Age : </b> {profile.age} </h5>
        <br></br>
        <h5><b>Most Visited Website : </b> {profile.mostVisited} </h5>
        <br></br>
        <h5><b>Least Visited Website : </b> {profile.leastVisited} </h5>
        <br></br>
        <h5><b>Risky wesbites connected to your account : </b> {profile.riskySites.map(site => <h5>{site}</h5>)} </h5>
        <br></br>
        <h5><b>Scam wesbites connected to your account : </b> {profile.scamSites.map(site => <h5>{site}</h5>)} </h5>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
   </div>);


}

export {Profile};

