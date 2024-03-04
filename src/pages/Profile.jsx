import { getAuth, updateProfile, verifyBeforeUpdateEmail } from "firebase/auth"
import { useNavigate, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { db } from '../firebase.config'
import { doc, updateDoc } from "firebase/firestore"
import { toast } from "react-toastify"

function Profile() {
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] =useState(auth.currentUser ? {
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  } : null)
  
  const { name, email } = formData

  const navigate = useNavigate()
  
  const logOut = () => {
    auth.signOut()
    navigate('/')
  }

  const onSubmit = async () => {
    try {
      // user reference for firestore
      const userRef = doc(db, 'users' ,auth.currentUser.uid)
      
      if (auth.currentUser.displayName !== name) {
        // update in authentication
        await updateProfile(auth.currentUser, {
          displayName: name
        })
        
        // update in firestore
        await updateDoc(userRef, {
          name
        })
        toast.success('Update success !')
      }

      // if (auth.currentUser.email !== email) {
      //   // update email in authentication
      //   await verifyBeforeUpdateEmail(auth.currentUser, email).then(
      //     toast.warn("Please verify the new email ! ( Check new email Inbox )")
      //   )

      //   // update email in firestore
      //   await updateDoc(userRef, {
      //     email
      //   })
      // }
      
    } catch (error) {
      console.log(error)
      toast.error('Problem on updating user data !')
    }
  }

  const onChange = (e) => {
    setFormData( (prevState) => ({
      ...prevState,
      [e.target.id] : e.target.value
    }))
  }

  // useEffect(() => {
  //   if (formData === null){
  //     navigate('/sign-in')
  //   }
  // }, [auth.currentUser])

  return formData ? 
  <div className="profile">
    <header className="profileHeader">
      <p className="pageHeader">My Profile</p>
      <button type="button" className="logOut" onClick={logOut}>Log Out</button>
    </header>
    <main>
      <div className="profileDetailsHeader">
        <p className="profileDetailsText">Personal Details</p>
        <p className="changePersonalDetails" onClick={() => {
          changeDetails && onSubmit()
          setChangeDetails((prevState) => !prevState)
          }}>
          {changeDetails ? 'done' : 'change'}
        </p>
      </div>

      <div className="profileCard">
        <form>
          <input type="text" id="name" className={!changeDetails ? 'profileName' : 'profileNameActive'} value={name} disabled={!changeDetails} onChange={onChange}/>
          <input type="email" id="email" className='profileEmail' value={email} disabled/>
        </form>
      </div>
    </main>
  </div>
  : "Not Logged In"
}

export default Profile