import 'animate.css';
import "../App.css";

export default function WelcomeText(){
    return(
        <div className="welcomeText hover: cursor-pointer">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 aos-init aos-animate text-white/80 animate__animated animate__fadeInDown select-none"><img src='/logo-larger.png' className='inline' width={80} height={80}/>JDecentral</h1>
            <h3 className="text-xl mb-8 aos-init aos-animate text-white my-10 animate__animated animate__fadeInLeft text-white/80 select-none ">Experience the real freedom like never before!</h3>
        </div>
    )
}