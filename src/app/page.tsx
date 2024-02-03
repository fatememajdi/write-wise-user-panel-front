'use client';
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { StartLoader, StopLoader } from "@/components/Untitled";
import ReactLoading from 'react-loading';

//-------------------------------------------components
const Section1 = dynamic(() => import('./landing/section1'), {
  ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-screen"><ReactLoading type={'spin'} color={'#929391'} height={50} width={50} /></div>
});
const Section2 = dynamic(() => import("./landing/section2"), {
  ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-screen"><ReactLoading type={'spin'} color={'#929391'} height={50} width={50} /></div>
});
const Section3 = dynamic(() => import("./landing/section3"), {
  ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-screen"><ReactLoading type={'spin'} color={'#929391'} height={50} width={50} /></div>
});
const Section4 = dynamic(() => import("./landing/section4"), {
  ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-screen"><ReactLoading type={'spin'} color={'#929391'} height={50} width={50} /></div>
});
// const Section5 = dynamic(() => import("./landing/section5"));
const Section6 = dynamic(() => import("./landing/section6"), {
  ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-screen"><ReactLoading type={'spin'} color={'#929391'} height={50} width={50} /></div>
});
const Section7 = dynamic(() => import("./landing/section7"), {
  ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-screen"><ReactLoading type={'spin'} color={'#929391'} height={50} width={50} /></div>
});
const Section8 = dynamic(() => import("./landing/section8"), {
  ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-screen"><ReactLoading type={'spin'} color={'#929391'} height={50} width={50} /></div>
});
const Footer = dynamic(() => import("@/components/footer/footer"), {
  ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-screen"><ReactLoading type={'spin'} color={'#929391'} height={50} width={50} /></div>
});
const Loading = dynamic(() => import("@/components/loading/loading"), { ssr: false, loading: () => <div>loading...</div> });

const Home: React.FC = () => {

  const [showButton, setShowButton] = React.useState<boolean>(false);
  const { data: session, status } = useSession({
    required: true, onUnauthenticated() {
      return
    }
  });

  //------------------------------------------------------------------check user loged in
  React.useEffect(() => {
    StopLoader();
    if (!localStorage.getItem('user')) {
      if (status != "loading") {
        if (status === 'authenticated') {
          localStorage.setItem('user', session.user.token as string);
        }
      }
    }

    if (typeof document != 'undefined')
      window.addEventListener("scroll", function (e: any) {
        if (!showButton && document.documentElement.scrollTop >= 100)
          setShowButton(true);
        else if (showButton && document.documentElement.scrollTop <= 100)
          setShowButton(false);
      });
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return isLoading ?
    <Loading />
    :
    <div className='col-12 overflow-x-hidden relative p-0 max-w-[1920px] '>

      <Suspense fallback={<Loading />}><Section1 /></Suspense>
      <Suspense fallback={<Loading />}><Section2 /></Suspense>
      <Suspense fallback={<Loading />}><Section3 /></Suspense>
      <Suspense fallback={<Loading />}><Section6 /></Suspense>
      <Suspense fallback={<Loading />}><Section7 /></Suspense>
      <Suspense fallback={<Loading />}><Section4 /></Suspense>
      <Suspense fallback={<Loading />}><Section8 /></Suspense>
      <Suspense fallback={<Loading />}><Footer /></Suspense>
      {/* <Section5 /> */}
      {showButton &&
        <button
          onClick={() => {
            StartLoader();
            router.push('/signIn');
          }}
          className="z-[500] shadow-[-5px_15px_22px_-5px_rgba(0,0,0,0.19)] fixed left-[45%] right-[45%] bottom-[68px] mac:bottom-[90px] rounded-[32px] bg-background flex w-[175px] mac:w-[142px] h-[72px] justify-center items-center text-red text-[24px] mac:text-[19px] font-bold leading-[40px] sm:w-[130px] sm:text-[16px] sm:h-[44px] sm:font-extrabold sm:bottom-[40px] sm:left-[30%] sm:right-[30%] ">
          Start Now
        </button>
      }
    </div>
};

export default Home;
