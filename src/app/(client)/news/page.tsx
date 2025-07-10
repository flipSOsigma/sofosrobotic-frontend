import AnimatedText from "@/components/animation/animation-bouncy-text";
import Particles from "@/components/background/background-particles";
import BorderedButton from "@/components/bordered-button";
import NavigationBar from "@/components/navigation-bar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import LoadNews from "@/lib/loader/load-news";

export const metadata = {
  title: "About Us - My Website",
  description: "Learn more about us.",
};

const page = () => {
  return (
    <div className="w-full bg-white dark:bg-black overflow-x-hidden min-h-screen">
      <NavigationBar className="absolute top-0 left-0 px-0 z-50 bg-transparent" />
      <div className="md:w-full w-screen flex justify-center relative h-96" id="about">
        <div className="absolute top-0 max-w-7xl mx-auto z-30 px-4 text-center flex h-full justify-end items-center w-full pb-5 flex-col">
          <div className="flex flex-col items-center">
            <AnimatedText splitType="words" ease="power3.out" duration={0.9} text={"SofostRobotic News"} className="md:text-5xl text-3xl mb-4 text-start" />
            <p className="max-w-xl">wanna find something cool inside us? heres a bunch of news we server for u guys, please read it all hehe:)</p>
          </div>
          <div className="flex gap-2 w-full justify-center">
            <Dialog>
              <DialogTrigger>
                <div>
                  <BorderedButton text={"search news"} swap={true} className="dark:bg-black bg-white mt-10 uppercase" />
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="hidden">Search</DialogTitle>
                  <input type="text" className=" pt-4 border-b border-b-border focus:ring-0 focus:outline-none pb-4" placeholder="Search"/>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="w-full h-full bg-gradient-to-b from-white/0 to-white dark:from-black/80 from-70% dark:to-black z-20 absolute top-0 left-0"></div>
        <Particles />
      </div>
      <div className="w-full" id="projects">
        <div className="max-w-7xl mx-auto px-4 text-end flex flex-col h-full items-end w-full justify-start">
          <LoadNews pagination={6} />
        </div>
      </div>
      <div className="w-full mt-20" id="projects"></div>
    </div>
  );
};

export default page;
