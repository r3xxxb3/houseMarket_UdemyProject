import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore"

function Category() {
  return (
    <div>Category</div>
  )
}

export default Category