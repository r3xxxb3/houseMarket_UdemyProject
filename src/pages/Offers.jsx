import { useEffect, useState } from "react"
import { parsePath, useParams } from "react-router-dom"
import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import ListingItem from "../components/ListingItem"

function Offers() {
    const [listings, setListings] = useState(null)
    const [loading, setLoading] =useState(true)

    const params = useParams()

    useEffect(() => {
        const fetchListings = async () => {
            try {
                // get reference
                const listingsRef = collection(db, 'listings')

                // create a query
                const q = query(listingsRef, where('offer', '==', true), orderBy('timestamp', 'desc'), limit(10))

                // execute query
                const qSnap = await getDocs(q)

                const listings = []
                // console.log(qSnap)
                
                qSnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })

                setListings(listings)
                setLoading(false)
            } catch (error) {
                toast.error('Could not fetch listings at the moment !')
            }
        }
        fetchListings()
    }, [])

    return (
        <div className="offers">
            <header>
                <p className="pageHeader">
                    Offers
                </p>
            </header>
            {loading ? (
                <Spinner />
            ) : listings && listings.length > 0 ? (
                <>
                    <main>
                        <ul className="categoryListings">
                            {listings.map((listing)=> 
                                <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
                            )}
                        </ul>
                    </main>
                </>
            ) : (
                <p>No Current Offers</p>
            )}
        </div>
    )
}

export default Offers