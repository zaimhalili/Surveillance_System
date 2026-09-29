import TransparentCamera from '../../assets/TransparentCamera.png';

const Hero = () => {
  return (
    <main className='bg-(--light) relative max-h-svh h-full min-h-svh md:overflow-hidden max-w-360 mx-auto'>
        <h1 className='text-[9rem] text-(--black) absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 drop-shadow-2xl shadow-(--black)w-full font-extrabold flex text-center min-w-screen justify-center gap-30'>
            <span className='w-1/2 flex justify-end pr-30'>CCTV</span>
            <img src={TransparentCamera} alt="CCTV Camera" loading='lazy' className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 drop-shadow-2xl shadow-(--black) z-10 transition-all duration-500 ease-in-out focus:outline-none'/> 
            <span className='w-1/2 flex justify-start pl-20'>System</span>
        </h1>
    </main>
  )
}

export default Hero