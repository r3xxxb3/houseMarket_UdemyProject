import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import SwiperCore, {Navigation, Pagination, Scrollbar, Ally} from 'swiper'
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/swiper-bundle.css'
import 'swiper/css'
import { doc, getDoc } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import  { db } from '../firebase.config'
import Spinner from "../components/Spinner"
import shareIcon from "../assets/svg/shareIcon.svg"

function Listing() {
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [shareLinkCopied, setShareLinkCopied] = useState(false)

    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()

    useEffect(()=> {
        const fetchListing = async () => {
            const docRef = doc(db, "listings", params.listingId)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()) {
                setListing(docSnap.data())
                setLoading(false)
            }
        }

        fetchListing()
    }, [navigate, params.listingId])

    if (loading) {
        return <Spinner />
    }


    return (
        <main>
            <Swiper slidesPerView={1} centeredSlides={true} pagination={{ clickable: true }}>
                {/* {listing.imageUrls.map((image) => {console.log(image)})} */}
                {listing.imageUrls.map((url, index) => (
                    <SwiperSlide key={index}>
                        <div key={index} style={{ width: "100%", height: "300px", backgroundSize: "cover"}}>
                            <img src={url} alt={listing.name} style={{width: "100%", height: "100%"}}/>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="shareIconDiv" onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                setShareLinkCopied(true)
                setTimeout(() => {
                    setShareLinkCopied(false)
                }, 2000)

            }}>
                <img src={shareIcon} alt="share" />
            </div>

            {shareLinkCopied && <p className="linkCopied">Link Copied !</p> }

            <div className="listingDetails">
                <p className="listingName">
                    {listing.name} - ${listing.offer ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </p>
                <p className="listinLocation">{listing.location}</p>
                <p className="listingType">{listing.type === "rent" ? "rent" : "sale"}</p>
                {listing.offer && (
                    <p className="discountPrice">
                        ${listing.regularPrice - listing.discountedPrice} Discount
                    </p>
                )}
                <ul className="listingDetailsList">
                    <li>
                        {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : '1 Bedroom'}
                    </li>
                    <li>
                        {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : '1 Bathrooms'}
                    </li>
                    <li>
                        {listing.parkings && `Parking Spot`}
                    </li>
                    <li>
                        {listing.furnished && `Furnished`}
                    </li>
                </ul>

                <p className="listingLocationTitle">Location</p>
                <div className="leafletContainer">
                    <MapContainer style={{height:'100%', width:'100%'}} center={[listing.geoLocation.lat, listing.geoLocation.lng]} zoom={13} scrollWheelZoom={false}>
                        <TileLayer attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png" />
                        <Marker position={[listing.geoLocation.lat, listing.geoLocation.lng]}>
                            <Popup>{listing.location}</Popup>
                        </Marker>
                    </MapContainer>
                </div>

                {auth.currentUser?.uid !== listing.userRef && (
                    <Link to={`/contact/${listing.userRef}?listingName=${listing.name}`} className="primaryButton">Contact Owner</Link>
                )}
            </div>
        </main>
    )
}

export default Listing