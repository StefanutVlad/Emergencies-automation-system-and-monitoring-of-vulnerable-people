import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  DirectionsService,
} from "@react-google-maps/api";
import useGeoLocation from "../useGeoLocation";

//import {formatRelative} from "date-fns";

const mapContainerStyle = {
  //map container props to avoid rerenders
  width: "75vw",
  height: "30vh",
};
const centerr = {
  //default romania
  lat: 45.9433,
  lng: 24.9662,
};

const hospitalCoordinates = {
  lat: 46.765651,
  lng: 23.583325,
};
const options = {
  //disable map controls
  disableDefaultUI: true,
  zoomControl: true,
};

function Map(props) {
  //hooks
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    //librarii google places search??
  });
  const [mapRef, setMapRef] = useState(null);
  const [id, setId] = useState(0);
  const [markers, setMarkers] = useState({});

  const location = useGeoLocation();
  const [bound, setBound] = useState({}); //NUUUUU

  let [dir, setDir] = useState();

  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);

  const [toggle, setToggle] = useState(false);

  const [infoOpen, setInfoOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [zoom, setZoom] = useState(8);

  const places = [
    {
      id: "loc1",
      pos: {
        lat: hospitalCoordinates.lat + 0.0002,
        lng: hospitalCoordinates.lng + 0.000075,
      },
      url: "http://maps.google.com/mapfiles/ms/micons/blue.png",
    }, //ambulanta
    {
      id: "loc2",
      pos: {
        lat: hospitalCoordinates.lat + 0.0000495,
        lng: hospitalCoordinates.lng + 0.000164,
      },

      url: "/hospitalMarker.png",
    },
    {
      id: "loc3",
      pos: {
        lat: location.coordinates.lat,
        lng: location.coordinates.lng,
      },
      url: "http://maps.google.com/mapfiles/ms/micons/green.png",
    },
  ];
  // Iterate myPlaces to size, center, and zoom map to contain all markers
  const fitBounds = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    places.map((place) => {
      bounds.extend(place.pos);
      return place.id;
    });
    map.fitBounds(bounds);
  };
  const loadHandler = (map) => {
    // Store a reference to the google map instance in state
    setMapRef(map);
    // Fit map bounds to contain all markers
    fitBounds(map);
  };
  // We have to create a mapping of our places to actual Marker objects
  const markerLoadHandler = (marker, place) => {
    return setMarkers((prevState) => {
      return { ...prevState, [place.id]: marker };
    });
  };

  const markerClickHandler = (event, place) => {
    // Remember which place was clicked
    setSelectedPlace(place);

    // Required so clicking a 2nd marker works as expected
    if (infoOpen) {
      setInfoOpen(false);
    }

    setInfoOpen(true);

    // If you want to zoom in a little on marker click
    if (zoom < 13) {
      setZoom(13);
    }

    // if you want to center the selected Marker
    //setCenter(place.pos)
  };

  useEffect(() => {
    if (distance && duration) {
      console.log("Distance & Duration have updated", distance, duration);
    }
  }, [distance, duration]);

  const onDirClick = useCallback(
    function callback(map) {
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRequest = {
        origin: new window.google.maps.LatLng(
          hospitalCoordinates.lat + 0.00025,
          hospitalCoordinates.lng + 0.00025
        ),
        destination: new window.google.maps.LatLng(
          hospitalCoordinates.lat,
          hospitalCoordinates.lng
        ),
        waypoints: [
          {
            location: new window.google.maps.LatLng(
              location.coordinates.lat,
              location.coordinates.lng
            ),
          },
        ],
        travelMode: window.google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true,
      };

      directionsRenderer.setMap(null);
      //
      directionsService.route(directionsRequest, (response, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(response);

          var leg = response.routes[0].legs[0];
          setDir(response);

          // save the path to state
          setDistance(leg.distance.value);
          setDuration(leg.duration.value);
          console.log("coords: " + status + " setdirections: " + response);
        } else {
          console.log(
            "Directions request failed. Status: " +
              status +
              " Response: " +
              response
          );

          //delete route from map
          directionsRenderer.setDirections({ routes: [] });
        }
      });
    },
    [location.coordinates.lat, location.coordinates.lng]
  );

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps...";

  return (
    <div>
      <GoogleMap
        onLoad={loadHandler}
        mapContainerStyle={mapContainerStyle}
        zoom={zoom}
        center={{
          lat: location.coordinates.lat,
          lng: location.coordinates.lng,
        }}
        events={{ onBoundsChangerd: (arg) => setBound(arg) }}
        //onCenterChanged={() => setCenter(mapRef.getCenter().toJSON())}
        options={options}
      >
        {toggle &&
          places.map((place) => (
            <Marker
              key={place.id}
              position={place.pos}
              onLoad={(marker) => markerLoadHandler(marker, place)}
              onClick={(event) => markerClickHandler(event, place)}
              icon={{
                url: place.url,
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />
          ))}

        <DirectionsRenderer
          directions={dir}
          geodesic={true}
          options={{
            strokeColor: "#ff2343",
            strokeOpacity: 0.8,
            strokeWeight: 5,
            clickable: true,
            draggable: false,
            suppressInfoWindows: false,
            suppressMarkers: true,
          }}
        />
        {infoOpen && selectedPlace && (
          <InfoWindow
            anchor={markers[selectedPlace.id]}
            onCloseClick={() => setInfoOpen(false)}
          >
            <div>
              <h3>{selectedPlace.id}</h3>
              <div>This is your info window content</div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      <button
        className="btn"
        style={{ backgroundColor: markers ? "green" : null }}
        onClick={(event) => {
          setToggle(true);
          onDirClick();

          for (let i = 0; i < 3; i++) {
            setMarkers(() => [
              {
                time: new Date(),
                id: setId((id) => id + 1),
              },
            ]);
          }
        }}
      >
        Fall
      </button>
      <button
        type="button"
        onClick={() => {
          setToggle(!toggle);
          setMarkers({});
          setId((id) => (id = 0));
          setDir({ routes: [] });
          setDistance((distance) => (distance = 0));
          setDuration((duration) => (duration = 0));
        }}
      >
        CLEAR MAP
      </button>
      <br />
      Current place id: {id}
      <br />
      <div>Distance: {distance}</div>
      <div>Duration: {duration}</div>
    </div>
  );
}

export default Map;
