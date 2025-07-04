import AnimatedText from "@/components/animation/animation-bouncy-text"
import Silk from "@/components/background/background-aurora"
import BorderedButton from "@/components/bordered-button"
import CardsProjects from "@/components/card/cards-project"
import NavigationBar from "@/components/navigation-bar"
import LoadNews from "@/lib/loader/LoadNews"

export const metadata = {
  title: 'About Us - My Website',
  description: 'Learn more about us.',
};

const page = () => {
  
  return (
    <div className="w-full bg-white dark:bg-black overflow-x-hidden min-h-screen" >
      <NavigationBar className="absolute top-0 left-0 px-0 z-50" />
      <div className="md:w-full w-screen relative h-80" id="about">
        <div className="absolute top-0 max-w-full left-0 z-30 px-4 md:px-40 xl:px-80 text-center flex h-full justify-between items-end w-full pb-5">
          <div className="flex flex-col items-start w-full">
            <AnimatedText splitType="words" ease="power3.out" duration={0.9} text={"SofostRobotic News"} className="md:text-5xl text-3xl mb-4" />
            <p>wanna find something cool inside us?</p>
          </div>
          <div className="flex gap-2 w-full justify-end">
            <input type="text" className="p-4 border border-black w-1/2 dark:border-white active:ring-0 focus:outline-none" placeholder="Search" />
            <BorderedButton text={""} swap={true} className="dark:bg-black bg-white "/>
          </div>
        </div>
        <div className="w-full h-full bg-gradient-to-b from-white/0 to-white dark:from-black/0 from-70% dark:to-black z-20 absolute top-0 left-0"></div>
        <Silk
          speed={5}
          scale={1}
          color="#7B7481"
          noiseIntensity={1.5}
          rotation={0}
          className="opacity-40"
        />
      </div>
      <div className="w-full" id="projects">
        <div className="md:px-40 xl:px-80 px-4 text-end flex flex-col h-full items-end w-full justify-start">
          {/* <div className="grid gap-4 overflow-x-auto mt-20 w-full grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <CardsProjects key={i} className="mb-10"/>
            ))}
          </div> */}
          <LoadNews />
        </div>
      </div>
      <div className="w-full mt-20" id="projects">
        <div className="md:px-40 xl:px-80 px-4 flex justify-center gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-10 aspect-square border border-black dark:border-white flex items-center justify-center hover:scale-125 duration-300 cursor-pointer">{i+1}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
