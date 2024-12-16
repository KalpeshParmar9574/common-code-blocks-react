import { gql } from "@apollo/client";
export const Get_User = gql`
    query GetUsers{
    users{
        id,
        name
    }}
`