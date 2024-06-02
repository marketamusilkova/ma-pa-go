import { Heading } from "@chakra-ui/react"
import "./style.css"

export const Header = () => {
  return(
    <div className="header">
      <Heading className="header__text">My secret plan how to rule the world</Heading>
      {/* <h1 className="header__text"></h1> */}
    </div>
  )
}
