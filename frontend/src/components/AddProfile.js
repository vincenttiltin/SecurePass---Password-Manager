import { fabClasses } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * adds a profile to the db
 * @returns a react form
 */
function AddProfile()
{
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [age, setAge] = useState(null);
    const defaultVisited = "unspecified";
    const defaultRiskySites = ["clicnews.com", "Amazonaws.com" , "dfwdiesel.net"];
    const defaultScamSites = ["purplehoodie.com", "qsng. cn" , "sportsmansclub. net"];
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const profileRequestOptions = {
        method: "POST",
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          age: age,
          mostVisited: defaultVisited,
          leastVisited: defaultVisited,
          riskySites: defaultRiskySites,
          scamSites: defaultScamSites,
        }),
        credentials: "include",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
      };
      const profileResponse = await fetch("http://localhost:1339/profiles", profileRequestOptions);
      const result = await profileResponse.json();
      if (profileResponse.status === 400) {
          navigate("/", { state: { errorMessage: result.errorMessage } });
      }
     else if (profileResponse.status === 500) {
          navigate("/usererror", { state: { errorMessage: result.errorMessage } });
      }
      else{
        alert("Profile Created");
        navigate("/");
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          <span>First Name</span>
          <input
            type="text"
            placeholder="FirstName..."
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <br />
  
        <label>
          <span>Last Name</span>
          <input
            type="text"
            placeholder="LastName..."
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <br />
        
        <label>
          <span>Age</span>
          <input
            type="text"
            placeholder="Age..."
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
  
        <br />
        <br />
       {firstName && lastName && age  && <button type="submit">Create Profile</button>}
      </form>
    );
}

export {AddProfile};