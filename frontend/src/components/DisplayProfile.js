
/**
 * displays a profile of the user
 * @param {*} props passed in profile object
 * @returns a react component
 */
function DisplayProfile(props)
{
    return(<div>
    <h3> Hello {props.profile.firstName} </h3>
    <h4>Profile: </h4>
    <h5><b>First Name : </b> {props.profile.firstName} </h5>
    <h5><b>Last Name : </b> {props.profile.lastName} </h5>
    <h5><b>Age : </b> {props.profile.age} </h5>
    <h5><b>Most Visited Website : </b> {props.profile.mostVisited} </h5>
    <h5><b>Least Visited Website : </b> {props.profile.leastVisited} </h5>
    <h5><b>Risky wesbites connected to your account : </b> {props.profile.riskySites.map(site => <h5>{site}</h5>)} </h5>
    <h5><b>Scam wesbites connected to your account : </b> {props.profile.scamSites.map(site => <h5>{site}</h5>)} </h5>
    </div>);

}

export {DisplayProfile};