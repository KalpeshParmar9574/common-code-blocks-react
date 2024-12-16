import React, { use } from 'react'
import ControllBoard from './ControllBoard'
import { useQuery } from '@apollo/client'
// import { GET_USER } from './graphql/queries'
import { Get_User } from '../GraphQLQueries/getUser'

export default function KanabaBoard() {
const {loading, error, data} = useQuery(Get_User)
if(loading){
  return <div>Loading...</div>
}
if(error){
  return <div>{error.message}</div>
}
  return (
    <div>
      
        <h1>
            Kanaba Board {data.name}
        </h1>
        <ControllBoard></ControllBoard>

    </div>
  )
}
