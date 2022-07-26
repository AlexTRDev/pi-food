import { HomeComponent, RecipesComponent, DietsComponent, AboutComponent, ContactComponent } from "components/sections"
import FooterComponent from "components/footer/FooterComponent"

function HomePage() {
  return (
    <>
        <HomeComponent/>
        <RecipesComponent />
        <DietsComponent />
        <AboutComponent />
        <ContactComponent />
        <FooterComponent />
    </>
  )
}


export default HomePage