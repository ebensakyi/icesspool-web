// @ts-nocheck
'use client'
import { useState, useRef, Key } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  Autocomplete,
  MarkerClusterer,
} from "@react-google-maps/api";
import { useSession } from "next-auth/react";
import { redirect, usePathname, useRouter, useSearchParams } from "next/navigation";
import { LOGIN_URL } from "@/config";
import Modal from "react-modal";
import Image from 'next/image'


const Map = ({ data }: any) => {

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(LOGIN_URL);
    }
  })
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [modalIsOpen, setIsOpen] = useState(false);

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchLngLat, setSearchLngLat] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const autocompleteRef = useRef(null);
  const [imagePath, setImagePath] = useState("");
  const [reportId, setReportId] = useState(null);
  const [description, setDescription] = useState("");
  const [reportStatus, setReportStatus] = useState("");

  const [statusMessage, setStatusMessage] = useState("");


  // laod script for google map
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });



  if (!isLoaded) return <div>Loading....</div>;

  let status = searchParams.get("status")


  // static lat and lng
  const center = { lat: 7.967, lng: -1.505 };

  // handle place change on search
  const handlePlaceChanged = () => {
    const place: any = autocompleteRef.current.getPlace();
    setSelectedPlace(place);
    setSearchLngLat({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
    setCurrentLocation(null);
  };

  // get current location
  const handleGetLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedPlace(null);
          setSearchLngLat(null);
          setCurrentLocation({ lat: latitude, lng: longitude });


        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  // on map load
  const onMapLoad = (map: { controls: HTMLDivElement[][]; }) => {
    const controlDiv = document.createElement("div");
    const controlUI = document.createElement("div");
    controlUI.innerHTML = "Get Location";
    controlUI.style.backgroundColor = "white";
    controlUI.style.color = "black";
    controlUI.style.border = "2px solid #ccc";
    controlUI.style.borderRadius = "3px";
    controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlUI.style.cursor = "pointer";
    controlUI.style.marginBottom = "22px";
    controlUI.style.textAlign = "center";
    controlUI.style.width = "100%";
    controlUI.style.padding = "8px 0";
    controlUI.addEventListener("click", handleGetLocationClick);
    controlDiv.appendChild(controlUI);

    // const centerControl = new window.google.maps.ControlPosition(
    //   window.google.maps.ControlPosition.TOP_CENTER,
    //   0,
    //   10
    // );

    map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(
      controlDiv
    );
  };

  const getMarkersByForm = (status: any) => {
    // let status: any = status?.current?.value

    router.push(
      `${pathname}?status=${status}`

    );

  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }



  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };



  return (
    <main id="main" className="main">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Report info"
      >

        <div className="row">
          <div className="col-lg-3">
            <div className="card">
              <div className="card-body">
                <Image
                  className="gallery-img img-fluid mx-auto"
                  src={`https://esicapps-images.s3.eu-west-2.amazonaws.com/${imagePath}`}
                  alt=""
                  height="256"
                  width="256"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Report</h5>
                <div className=" mb-3">

                  <div className="col-sm-12">

                    <div className="alert alert-warning  fade show" role="alert">
                      <h4 className="alert-heading">Description</h4>
                      <p> {description}</p>

                    </div>

                  </div>
                </div>
                <div className=" mb-3">
                  <label htmlFor="inputText" className="col-sm-12 col-form-label">
                    Status *
                  </label>
                  {reportStatus == 0 ? <span className="badge bg-danger">Pending</span> : reportStatus == 1 ? <span className="badge bg-success">Completd</span> : <span className="badge bg-warning">In progress</span>}
                </div>






              </div>
            </div>
          </div>
        </div>


      </Modal>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* search component  */}


        {/* <div class="card">
          <div class="card-body"> */}
        {/* <h5 class="card-title">  */}


        {/* </h5> */}

        <div className="btn-group" role="group" aria-label="Basic example" >
          <Autocomplete
            onLoad={(autocomplete) => {
              //console.log("Autocomplete loaded:", autocomplete);
              autocompleteRef.current = autocomplete;
            }}
            onPlaceChanged={handlePlaceChanged}
            options={{ fields: ["address_components", "geometry", "name"] }}
          >
            <input type="text" className="form-control" placeholder="Search for a location" />
          </Autocomplete>
          <button type="button" className={status == "undefined" ? "btn btn-outline-primary active" : "btn btn-outline-primary"} onClick={(e) => { getMarkersByForm(undefined) }}>All</button>
          <button type="button" className={status == 0 ? "btn btn-outline-danger active" : "btn btn-outline-danger"} onClick={(e) => { getMarkersByForm(0) }}>Pending</button>
          <button type="button" className={status == 2 ? "btn btn-outline-warning active" : "btn btn-outline-warning"} onClick={(e) => { getMarkersByForm(2) }}>In progress</button>
          <button type="button" className={status == 1 ? "btn btn-outline-success active" : "btn btn-outline-success"} onClick={(e) => { getMarkersByForm(1) }}>Completed</button>


          {/* </div> 



          </div> */}
        </div>

        <GoogleMap
          zoom={currentLocation || selectedPlace ? 18 : 7.4}
          center={currentLocation || searchLngLat || center}
          mapContainerClassName="map"
          mapContainerStyle={{ height: '80vh', width: '100%', margin: "auto" }}

        //onLoad={onMapLoad}
        >

          {/* <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map(marker => (
        <Marker
          key={marker.photo_id}
          position={{ lat: marker.latitude, lng: marker.longitude }}
        />
      ))}

    </MarkerClusterer> */}



          {data?.mapData?.map((pos: any) => (

            <MarkerF
              key={pos.id}
              position={{ lat: Number(pos?.latitude), lng: Number(pos?.longitude) }}
              title={pos?.community}
              //label={pos?.community}
              icon={definePointIcon(pos?.status)}
              onClick={() => {
                setImagePath(pos?.image)
                setDescription(pos?.description)
                setReportStatus(pos?.status)
                openModal()
              }}
            />
          ))}
          {/* <Marker position={{lat: -0.009313, lng:9.445632}}/> */}



          {/* {selectedPlace && <Marker position={searchLngLat} />} */}
          {/* {currentLocation && <Marker position={currentLocation} />} */}
        </GoogleMap>
      </div>
    </main>
  );
};


function definePointIcon(status: number) {
  if (status == 0) {
    return '/assets/img/bin-red.png'
  }
  else if (status == 1) {
    return '/assets/img/bin-green.png'
  }
  else if (status == 2) {
    return '/assets/img/bin-yellow.png'
  }

}








export default Map;








