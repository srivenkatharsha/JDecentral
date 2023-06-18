import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { checkJournalist, clearSession } from '../utils/management';
import { useEffect, useState } from 'react';

const Navbar = ({ posting=false }) => {
  const [isJournalist, setIsJournalist] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function updateJournalist() {
      setIsJournalist(await checkJournalist());
    }
    updateJournalist();
  }, [])
  const handleLogout = () => {
    clearSession();
    navigate('/login');
  }
  return (
    <div className="w-full h-20 px-8 fixed flex flex-row justify-between z-10 backdrop-blur-xl border-b-2 border-slate-100 bg-white/50">
      <Link to="/"><h1 className="text-4xl md:text-4xl font-bold text-black/80 my-auto mt-4"><img src='/logo-larger.png' className='inline' width={48} height={48}/>   JDecentral</h1></Link>
      <div className="float-right flex flex-row" >
          {(posting||!isJournalist) ? <></> : <Button><Link to="/posting">POST ARTICLE</Link></Button>}
          <Button onClick={handleLogout}>LOGOUT</Button>
        </div>
      </div>
    
  )
}

export default Navbar;