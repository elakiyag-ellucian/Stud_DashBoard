import React from 'react'
import { HiMenu } from "react-icons/hi";
import { BiSolidReport } from "react-icons/bi";
import { TiHome } from "react-icons/ti";
import { PiStudentFill  } from "react-icons/pi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { MdInsights  , MdOutlineGroups} from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const navbar=[
  
  {
    nav:"Home",
    icon:<TiHome />,
    link: "/home"
  },
  {
    nav:"Insights",
    icon:<MdInsights />,
    link: "/insights"
  },
  {
    nav:"Trends",
    icon:<FaArrowTrendUp />,
    link: "/trends"
  },
  {
    nav:"Reports",
    icon:<BiSolidReport />,
    link: "/reports"
  },
  {
    nav:"Enroll",
    icon:<PiStudentFill />,
    link: "/enroll"
  },
  {
    nav:"Bulk",
    icon:<MdOutlineGroups />,
    link: "/bulk"
  }
]

const NavBar = ({user}) => {
    const navigate = useNavigate();
    const handleNavigate = (link) => {
      console.log(link)
      if(link !== '/bulk' && link !== '/enroll'){
        navigate(link)
      }else if(link === "/enroll"){
        window.location.href = 'https://m042067.ellucian.com:8443/applicationNavigator/seamless'
      }
    }
    return (
      <>
          <div className='pt-10 h-full ' style={{backgroundColor:"rgba(255,255,255,0.5)"}} >
              <ul className='w-1/4 px-3 p-5 h-96 '>
                {
                  navbar.map((data , index) => (
                    <li key={index} className=' cursor-pointer p-3' onClick={() => handleNavigate(data.link)}>
                      <div className='flex justify-start gap-3 items-center'>
                        <div>
                            {data.icon}  
                        </div>
                        <div>
                            {data.nav}  
                        </div>
                      </div>
                    
                    </li>
                  ))
                }
                
              </ul>
              <div className='flex justify-center items-center flex-col p-5'>
                <button className='border-2 border-black text-xl p-3 rounded-full cursor-pointer text-white justify-items-end mt-50' style={{backgroundColor:"#3b4453", width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {user ? user.charAt(0) : 'U'}
                </button>
                <h3>------</h3>
              </div>
          </div>
      </>
    )
}

export default NavBar