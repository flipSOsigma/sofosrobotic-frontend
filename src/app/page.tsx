import AnimatedText from "@/components/animation/animation-bouncy-text";
import Silk from "@/components/background/background-aurora";
import BGLiquidChrome from "@/components/background/background-glitch";
import Particles from "@/components/background/background-particles";
import BorderedButton from "@/components/bordered-button";
import CardsProjects from "@/components/card/cards-project";
import NavigationBar from "@/components/navigation-bar";
import SpanText from "@/components/span-text";
import { ChevronDown, Instagram, Mail, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full bg-white dark:bg-black overflow-x-hidden" >
      <NavigationBar className="fixed top-0 left-0 px-0 z-50" />
      <div className="flex md:px-40 xl:px-80 px-4 w-full min-h-screen justify-center items-center" id="home">
        <div className="w-full">
          <SpanText text={"sofostrobotic"} className="text-sm mb-2 uppercase italic font-bold" />
          <AnimatedText splitType="words" ease="power3.out" duration={0.9} text={"Build your Robotic carrer future with Us"} className="text-5xl mb-10" />
          <AnimatedText splitType="lines" ease="power3.out" duration={0.9} text={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio minima facilis quas in cumque est nostrum consectetur ab odio velit porro laudantium necessitatibus harum sed,"} className="text-start "/> 
          <Link rel="stylesheet" href="#about" >
            <BorderedButton text={'LEARN MORE'} className="mt-8"/>
          </Link>
        </div>
        <div className="w-full aspect-square p-32 pl-64 overflow-hidden pr-0 hidden md:grid grid-cols-3 grid-rows-3 gap-2">
          <div className="w-full h-full border dark:border-white border-black overflow-hidden col-span-2" >
            <BGLiquidChrome baseColor={[0.1, 0.1, 0.1]} speed={1} amplitude={0.6} interactive={true} />
          </div>
          <div className="w-full h-full border dark:border-white border-black overflow-hidden " >
            <BGLiquidChrome baseColor={[0.1, 0.1, 0.1]} speed={1} amplitude={0.6} interactive={true} />
          </div>
          <div className="w-full h-full border dark:border-white border-black overflow-hidden row-span-2" >
            <BGLiquidChrome baseColor={[0.1, 0.1, 0.1]} speed={1} amplitude={0.6} interactive={true} />
          </div>
          <div className="w-full h-full border dark:border-white border-black overflow-hidden " >
            <BGLiquidChrome baseColor={[0.1, 0.1, 0.1]} speed={1} amplitude={0.6} interactive={true} />
          </div>
          <div className="w-full h-full border dark:border-white border-black overflow-hidden " >
            <BGLiquidChrome baseColor={[0.1, 0.1, 0.1]} speed={1} amplitude={0.6} interactive={true} />
          </div>
          <div className="w-full h-full border dark:border-white border-black overflow-hidden col-span-2" >
            <BGLiquidChrome baseColor={[0.1, 0.1, 0.1]} speed={1} amplitude={0.6} interactive={true} />
          </div>
        </div>
      </div>
      <div className="md:w-full w-screen relative h-screen" id="about">
        <div className="absolute top-0 max-w-full left-0 z-30 px-4 md:px-40 xl:px-80 text-center flex flex-col gap-10 md:gap-20 h-full justify-center items-center w-full">
          <AnimatedText splitType="words" ease="power3.out" duration={0.9} text={"About SofostRobotic"} className="md:text-5xl text-3xl" />
          <p className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ornare ante et pharetra dictum. In risus turpis, egestas eget scelerisque lobortis, pretium vel ipsum. Nulla laoreet eget neque non hendrerit. Aenean pulvinar at metus ut placerat. Morbi pulvinar sed velit quis finibus. Maecenas semper ut lacus at dapibus. Suspendisse a ligula in orci elementum ullamcorper ac facilisis mauris. Praesent aliquam in velit et dapibus. Ut sagittis, est ut sollicitudin consectetur, massa ante semper leo, vitae porttitor elit massa vitae magna. Nulla placerat metus et ex aliquam commodo. Nam ac imperdiet velit. Nunc non lectus purus. Phasellus vel ex purus. Praesent viverra a urna eu viverra. Praesent dignissim, dolor vitae tristique ullamcorper, lorem nibh tincidunt lacus, eu faucibus purus libero at felis.</p>
          <BorderedButton text={"MORE ABOUT SOFOSTROBOTIC"} swap={true} />
          <div className="flex md:justify-around w-full flex-wrap md:gap-0 gap-4 justify-center">
            <div className="flex gap-2">
              <Twitter /> <p>@SofostRobotic</p>
            </div>
            <div className="flex gap-2">
              <Instagram /> <p>@SofostRobotic</p>
            </div>
            <div className="flex gap-2">
              <Youtube /> <p>@SofostRobotic</p>
            </div>
            <div className="flex gap-2">
              <Mail /> <p>@SofostRobotic</p>
            </div>
          </div>
        </div>
        <div className="w-full h-full bg-gradient-to-b from-white/0 to-white dark:from-black/0 from-70% dark:to-black z-20 absolute top-0 left-0">

        </div>
        <Silk
          speed={5}
          scale={1}
          color="#7B7481"
          noiseIntensity={1.5}
          rotation={0}
          className="opacity-40"
        />
      </div>
      <div className="w-full py-20" id="projects">
        <div className="md:px-40 xl:px-80 px-4 text-end flex flex-col h-full items-end w-full justify-start">
          <AnimatedText splitType="words" ease="power3.out" duration={0.9} text={"Projects Showcase"} className="text-5xl " />
          <p className="mt-2">some showcase of our art of doing robotics</p>
          <div className="flex gap-4 overflow-x-auto mt-20 w-full justify-start md:flex-nowrap flex-wrap">
            {[...Array(3)].map((_, i) => (
              <CardsProjects key={i}/>
            ))}
          </div>
          <div className="w-full mt-20 flex justify-start">
            <Link href={'/projects'}>
              <BorderedButton text="MORE ABOUT SOFOSTROBOTIC PROJECT" swap={true} />
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full py-20" id="news">
        <div className="md:px-40 xl:px-80 px-4 text-end grid grid-cols-1 gap-4 md:grid-cols-3 h-full items-start w-full justify-start">
          <div className="w-full flex flex-col items-start col-span-1 md:col-span-2 justify-end h-full pb-20">
            <AnimatedText splitType="words" ease="power3.out" duration={0.9} text={"SofostRobotic News"} className="text-5xl " />
            <p className="mt-2 md:text-start text-end w-full">some news in sofostrobotic</p>
          </div>
          {[...Array(4)].map((_, i) => (
              <CardsProjects key={i} className="mt-4" />
            ))}
          <div className="w-full mt-20 flex justify-start col-span-1 md:col-span-3">
            <Link href={'/news'}>
              <BorderedButton text="MORE ABOUT SOFOSTROBOTIC NEWS" swap={true} />
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full py-20 relative h-screen " id="internship">
        <div className="md:px-40 xl:px-80 px-4 text-end z-20 flex absolute left-0 top-0 flex-col h-full items-center w-full justify-center">
          <AnimatedText splitType="words" ease="power3.out" duration={0.9} text={"Need Internship"} className="text-5xl " />
          <p className="mt-2">apply your applications into our system</p>
          <p className="mt-20 max-w-5xl text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ornare ante et pharetra dictum. In risus turpis, egestas eget scelerisque lobortis, pretium vel ipsum. Nulla laoreet eget neque non hendrerit. Aenean pulvina</p>
          <div className="gap-10 mt-10 flex justify-center">
            <BorderedButton text="APPLY AN INTERNSHIP" swap={true} />
            <BorderedButton text="CONTACT OUR ADMIN" swap={true} />
          </div>
        </div>
        <div className="w-full h-full border-t border-b border-black dark:border-white">
          <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
      </div>
      <div className="w-full py-20" id="contact">
        <div className="md:px-40 xl:px-80 px-4 text-end flex flex-col h-full items-start w-full justify-start">
          <AnimatedText splitType="words" ease="power3.out" duration={0.9} text={"Connect with SofostRobotic"} className="text-5xl " />
          <p className="mt-2 md:text-start w-full text-end">lets make our connection by sending us a message</p>
          <div className="grid grid-cols-4 mt-40 w-full gap-2">
            <div className="flex w-full col-span-2 border-2 dark:border-white border-black items-center gap-4 p-4">
              <Instagram className="text-5xl"/>
              <div className="flex flex-col items-start text-sm">
                <p>Instagram</p>
                <h1 className="font-bold -mt-1 text-xl">@sofostrobotic</h1>
              </div>
            </div>
            <div className="flex w-full col-span-2 border-2 dark:border-white border-black items-center gap-4 p-4">
              <Twitter className="text-5xl"/>
              <div className="flex flex-col items-start text-sm">
                <p>Twitter</p>
                <h1 className="font-bold -mt-1 text-xl">@sofostrobotic</h1>
              </div>
            </div>
            <div className="flex w-full col-span-3 border-2 dark:border-white border-black items-center gap-4 p-4">
              <Mail className="text-5xl"/>
              <div className="flex flex-col items-start text-sm">
                <p>Email</p>
                <h1 className="font-bold -mt-1 text-xl">@sofostrobotic</h1>
              </div>
            </div>
            <div className="flex w-full border-2 dark:border-white border-black items-center p-4 justify-center group">
              <ChevronDown className="text-5xl -rotate-90 -mr-1 group-hover:translate-x-5 delay-0 duration-500"/>
              <ChevronDown className="text-5xl -rotate-90 -mr-1 group-hover:translate-x-5 delay-100 duration-500"/>
              <ChevronDown className="text-5xl -rotate-90 -mr-1 group-hover:translate-x-5 delay-200 duration-500"/>
            </div>
            <div className="flex w-full col-span-2 border-2 dark:border-white border-black items-center gap-4 p-4">
              <Youtube className="text-5xl"/>
              <div className="flex flex-col items-start text-sm">
                <p>Youtube</p>
                <h1 className="font-bold -mt-1 text-xl">@sofostrobotic</h1>
              </div>
            </div>
            <div className="flex w-full col-span-2 border-2 dark:border-white border-black items-center gap-4 p-4">
              <Instagram className="text-5xl"/>
              <div className="flex flex-col items-start text-sm">
                <p>Instagram</p>
                <h1 className="font-bold -mt-1 text-xl">@sofostrobotic</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mb-2 py-1 bg-black dark:bg-gray-100/10"></div>
      <div className="w-full md:px-40 xl:px-80 px-4 flex items-center justify-between bg-black dark:bg-gray-100/10 py-5">
        {[...Array(3)].map((_, i) => (
          <h1 key={i} className="text-base font-bold italic"><SpanText className="dark:opacity-25" text="SOFOSTROBOTIC" /></h1>
        ))}
      </div>
      <footer className="w-full py-10" id="footer">
        <div className="md:px-40 xl:px-80 px-4 flex items-start w-full">
          <div>
            <SpanText text="SofostRobotic" className="text-3xl" />
            <div className="mt-2 whitespace-nowrap flex gap-1">made by <SpanText text="Fakultas Teknik Universitas Dian Nuswantoro " className="italic font-bold" /></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
