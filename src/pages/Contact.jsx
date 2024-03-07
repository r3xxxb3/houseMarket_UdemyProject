import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"

function Contact() {
    const [message, setMessage] = useState('')
    const [owner, setOwner] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()

    const params = useParams()

    const onChange = (e) => {
        setMessage(e.target.value)
    }

    useEffect( () => {
        const getOwner = async () => {
            const docRef = doc(db, "users", params.ownerId)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                setOwner(docSnap.data())
            }else{
                toast.error("Could not get owner data !")
            }
        }

        getOwner()
        console.log("text")
    }, [params.ownerId])

    return (
        <div className="pageContainer">
            <header>
                <p className="pageHeader">Contact Owner</p>
            </header>

            {owner !== null && (
                <main>
                    <div className="contactLandlord">
                        <p className="landlordName">Contact {owner?.name}</p>
                    </div>
                </main>
            )}

            <form className="messageForm">
                <div className="messageDiv">
                    <label htmlFor="message" className="messageLabel">Message</label>
                    <textarea name="message" id="message" value={message} className="textarea" onChange={onChange}></textarea>
                </div>

                <a href={`mailto:${owner?.email}?Subject=${searchParams.get('listingName')}&body=${message}`}>
                    <button type="button" className="primaryButton">Send Message</button>
                </a>
            </form>
        </div>
    )
}

export default Contact