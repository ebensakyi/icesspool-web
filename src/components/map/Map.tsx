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
import moment from "moment";
import Link from 'next/link'




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



  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchLngLat, setSearchLngLat] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const autocompleteRef = useRef(null);
  const [address, setAddress] = useState("");

  const [modalIsOpen, setIsOpen] = useState(false);

  const [imagePath1, setImagePath1] = useState("");
  const [imagePath2, setImagePath2] = useState("");
  const [imagePath3, setImagePath3] = useState("");
  const [imagePath4, setImagePath4] = useState("");

  const [submissionDate, setSubmissionDate] = useState(null);
  const [officer, setOfficer] = useState("");
  const [electoralArea, setElectoralArea] = useState("");
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [community, setCommunity] = useState("");
  const [rating, setRating] = useState(0);

  const [inspectionId, setInspectionId] = useState("");
  const [inspectionFormId, setInspectionFormId] = useState("");
  const [published, setPublished] = useState(0);



  // const [eaterySelected, setEaterySelected] = useState(false);
  // const [residentialSelected, setResidentialSelected] = useState(false);
  // const [healthSelected, setHealthSelected] = useState(false);
  // const [hospitalitySelected, setHospitalitySelected] = useState(false);
  // const [sanitarySelected, setSanitarySelected] = useState(false);
  // const [marketSelected, setMarketSelected] = useState(false);
  // const [industrySelected, setIndustrySelected] = useState(false);
  // const [institutionSelected, setInstitutionSelected] = useState(false);


  // laod script for google map
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading....</div>;

  // static lat and lng
  const center = { lat: 7.967, lng: -1.505 };

  let formId = searchParams.get("formId")
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


  // const handleSelection=()=>{
  //   if (form == 1) {
  //     return '/assets/img/rating_img/eatery_green.png'
  //   }
  // }

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

  const handleRating = (rating: number) => {
    try {
      if (rating >= 4) {
        return <span className="badge bg-success">Good</span>;
      } else if (rating >= 3 && rating < 4) {
        return <span className="badge bg-warning">Average</span>;
      } else if (rating < 3) {
        return <span className="badge bg-danger">Poor</span>;
      } else {
        return <span className="badge bg-primary">Default</span>;
      }
    } catch (error) { }
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

  const getMarkersByForm = (formId: any) => {
    // let formId: any = formId?.current?.value



    router.push(
      `${pathname}?formId=${formId}`

    );

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

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }
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


          <div className="col-lg-10">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title"> Details </h5>
                <div className=" mb-3">

                  <div className="col-sm-12">

                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Value</th>

                        </tr>
                      </thead>
                      <tbody>
                        <tr>

                          <td>Officer</td>
                          <td>{officer}</td>

                        </tr>
                        <tr>

                          <td>Community</td>
                          <td>{community}</td>

                        </tr>
                        <tr>

                          <td>Electoral Area</td>
                          <td>{electoralArea}</td>

                        </tr>
                        <tr>
                          <td>District</td>
                          <td>{district}</td>

                        </tr>
                        <tr>
                          <td>Region</td>
                          <td>{region}</td>

                        </tr>
                        <tr>
                          <td>Date submitted</td>
                          <td>{submissionDate}</td>

                        </tr>
                        <tr>
                          <td>Rating</td>
                          <td>{rating}</td>

                        </tr>
                        <tr>
                          <td>View more</td>
                          <td> <Link
                            href={{
                              pathname: `/submitted-data/data-view`,
                              query: {
                                id: inspectionId,
                                formId: inspectionFormId,
                                published: published,
                              },
                            }}
                          >
                            {/* <a className="dropdown-item"> */}
                          View details  <i className="ri-external-link-line align-bottom me-2 text-success" />
                            {/* </a> */}
                          </Link></td>

                        </tr>
                      </tbody>
                    </table>

                  </div>
                </div>






              </div>
            </div>
          </div>
          <div className="row">
            {
              imagePath1 ? <div className="col-lg-3">
                {/* <div className="card">
              <div className="card-body"> */}
                <Image
                  className="gallery-img img-fluid mx-auto"
                  src={`https://esicapps-images.s3.eu-west-2.amazonaws.com/${imagePath1}`}
                  alt=""
                  height="128"
                  width="128"
                />
                {/* </div>
            </div> */}
              </div> : <></>
            }

            {
              imagePath2 ? <div className="col-lg-3">
                {/* <div className="card">
              <div className="card-body"> */}
                <Image
                  className="gallery-img img-fluid mx-auto"
                  src={`https://esicapps-images.s3.eu-west-2.amazonaws.com/${imagePath2}`}
                  alt=""
                  height="128"
                  width="128"
                />
                {/* </div>
            </div> */}
              </div> : <></>
            }

            {
              imagePath3 ? <div className="col-lg-3">
                {/* <div className="card">
              <div className="card-body"> */}
                <Image
                  className="gallery-img img-fluid mx-auto"
                  src={`https://esicapps-images.s3.eu-west-2.amazonaws.com/${imagePath3}`}
                  alt=""
                  height="128"
                  width="128"
                />
                {/* </div>
            </div> */}
              </div> : <></>
            }

            {
              imagePath4 ? <div className="col-lg-3">
                {/* <div className="card">
              <div className="card-body"> */}
                <Image
                  className="gallery-img img-fluid mx-auto"
                  src={`https://esicapps-images.s3.eu-west-2.amazonaws.com/${imagePath4}`}
                  alt=""
                  height="128"
                  width="128"
                />
                {/* </div>
            </div> */}
              </div> : <></>
            }


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
          <button type="button" className={formId == "undefined" ? "btn btn-outline-primary active" : "btn btn-outline-primary"} onClick={(e) => { getMarkersByForm() }}>All</button>

          <button type="button" className={formId == 1 ? "btn btn-outline-primary active" : "btn btn-outline-primary"} onClick={(e) => { getMarkersByForm(1) }}>Residential</button>
          <button type="button" className={formId == 2 ? "btn btn-outline-primary active" : "btn btn-outline-primary"} onClick={(e) => { getMarkersByForm(2) }}>Eating & Drinking</button>
          <button type="button" className={formId == 3 ? "btn btn-outline-primary active" : "btn btn-outline-primary"} onClick={(e) => { getMarkersByForm(3) }}>Health</button>

          <button type="button" className={formId == 4 ? "btn btn-outline-primary active" : "btn btn-outline-primary"} onClick={(e) => { getMarkersByForm(4) }}>Hospitality</button>
          <button type="button" className={formId == 5 ? "btn btn-outline-primary active" : "btn btn-outline-primary"} onClick={(e) => { getMarkersByForm(5) }}>Institution</button>
          <button type="button" className={formId == 6 ? "btn btn-outline-primary active" : "btn btn-outline-primary"} onClick={(e) => { getMarkersByForm(6) }}>Industry</button>
          <button type="button" className={formId == 7 ? "btn btn-outline-primary active" : "btn btn-outline-primary"} onClick={(e) => { getMarkersByForm(7) }}>Market</button>
          <button type="button" className={formId == 8 ? "btn btn-outline-primary active" : "btn btn-outline-primary"} onClick={(e) => { getMarkersByForm(8) }}>Sanitary</button>

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
              position={{ lat: Number(pos?.BasicInfoSection?.latitude), lng: Number(pos?.BasicInfoSection?.longitude) }}
              title={pos?.community}
              //label={pos?.community}
              icon={definePointIcon(pos?.totalRating, pos?.inspectionFormId)}
              onClick={() => {

                setInspectionId(pos?.id)
                setInspectionFormId(pos?.inspectionFormId)

                setImagePath1(pos?.InspectionPictures[0]?.imagePath)
                setImagePath2(pos?.InspectionPictures[1]?.imagePath)
                setImagePath3(pos?.InspectionPictures[2]?.imagePath)
                setImagePath4(pos?.InspectionPictures[3]?.imagePath)

                setCommunity(pos?.BasicInfoSection?.community)
                setDistrict(pos?.District.name)
                setRegion(pos?.Region?.name)
                setElectoralArea(pos?.Community?.ElectoralArea.name)
                setOfficer(pos?.User?.otherNames + " " + pos?.User?.surname)
                setSubmissionDate(moment(pos?.createdAt).format("MMM Do YYYY, h:mm:ss a"))
                setRating(handleRating(pos?.totalRating))

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


function definePointIcon(score: number, form: number) {
  if (scoreCalculation(score) == 'Good' && form == 2) {
    return '/assets/img/rating_img/eatery_green.png'
  }
  else if (scoreCalculation(score) == 'Average' && form == 2) {
    return '/assets/img/rating_img/eatery_yellow.png'
  }
  else if (scoreCalculation(score) == 'Poor' && form == 2) {
    return '/assets/img/rating_img/eatery_red.png'
  }
  else if (scoreCalculation(score) == 'Good' && form == 1) {
    return '/assets/img/rating_img/residential_green.png'
  }
  else if (scoreCalculation(score) == 'Average' && form == 1) {
    return '/assets/img/rating_img/residential_yellow.png'
  }
  else if (scoreCalculation(score) == 'Poor' && form == 1) {
    return '/assets/img/rating_img/residential_red.png'
  }
  else if (scoreCalculation(score) == 'Good' && form == 7) {
    return '/assets/img/rating_img/market_green.png'
  }
  else if (scoreCalculation(score) == 'Average' && form == 7) {
    return '/assets/img/rating_img/market_yellow.png'
  }
  else if (scoreCalculation(score) == 'Poor' && form == 7) {
    return '/assets/img/rating_img/market_red.png'
  }
  else if (scoreCalculation(score) == 'Good' && form == 5) {
    return '/assets/img/rating_img/school_green.png'
  }
  else if (scoreCalculation(score) == 'Average' && form == 5) {
    return '/assets/img/rating_img/school_yellow.png'
  }
  else if (scoreCalculation(score) == 'Poor' && form == 5) {
    return '/assets/img/rating_img/school_red.png'
  }
  else if (scoreCalculation(score) == 'Good' && form == 3) {
    return '/assets/img/rating_img/health_green.png'
  }
  else if (scoreCalculation(score) == 'Average' && form == 3) {
    return '/assets/img/rating_img/health_yellow.png'
  }
  else if (scoreCalculation(score) == 'Poor' && form == 3) {
    return '/assets/img/rating_img/health_red.png'
  }
  else if (scoreCalculation(score) == 'Good' && form == 6) {
    return '/assets/img/rating_img/industry_green.png'
  }
  else if (scoreCalculation(score) == 'Average' && form == 6) {
    return '/assets/img/rating_img/industry_yellow.png'
  }
  else if (scoreCalculation(score) == 'Poor' && form == 6) {
    return '/assets/img/rating_img/industry_red.png'
  }
  else if (scoreCalculation(score) == 'Good' && form == 4) {
    return '/assets/img/rating_img/hospitality_green.png'
  }
  else if (scoreCalculation(score) == 'Average' && form == 4) {
    return '/assets/img/rating_img/hospitality_yellow.png'
  }
  else if (scoreCalculation(score) == 'Poor' && form == 4) {
    return '/assets/img/rating_img/hospitality_red.png'
  } else if (scoreCalculation(score) == 'Good' && form == 8) {
    return '/assets/img/rating_img/sanitation_green.png'
  }
  else if (scoreCalculation(score) == 'Average' && form == 8) {
    return '/assets/img/rating_img/sanitation_yellow.png'
  }
  else if (scoreCalculation(score) == 'Poor' && form == 8) {
    return '/assets/img/rating_img/sanitation_red.png'
  }
  // else {
  //   return '/img/poor.png'
  // }
}


const scoreCalculation = (rating: number) => {
  try {
    if (rating >= 4) {
      return "Good"
    } else if (rating >= 3 && rating < 4) {
      return "Average"
    } else if (rating < 3) {
      return "Poor"
    } else {
      return ""
    }
  } catch (error) { }
};






export default Map;








