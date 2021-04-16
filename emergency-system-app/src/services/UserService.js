//Data service -> metode pentru preluarea datelor de la server.
//in caz ca accesam resurse protejate , requestul http are nevoie de Authorization header

//helper function -> checks Local Storage for user item. if there is a logged user
//with accessToken(JWT), return HTTP Authorization header, otherwise: empty object.
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    //return { Authorization: "Bearer " + user.accessToken };
    return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
}
