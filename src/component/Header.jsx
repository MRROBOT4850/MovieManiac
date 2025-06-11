import React, { useState ,useEffect} from 'react'
import "./Header.css"
import { Link} from 'react-router-dom'
import { BsSearch } from "react-icons/bs";
import { useNavigate, useLocation } from 'react-router-dom';
 
const Header = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [changedValue, setChangedValue] = useState("");
    const changeHandler = (e) => {
        setChangedValue(e.target.value);
    };
    const clickHandler=()=>{
        navigate(`/search/${changedValue}`)
     }
    useEffect(() => {
        setChangedValue("");
    }, [location]);
    const onKeyDown = (e) => {
        if (e.key === "Enter") {
            navigate(`/search/${changedValue}`)
        }
     
    };
    return (
        <div className='Header'>
            <div className="headerLeft">
                <Link to="/"> <img className='header__icon' src="https://th.bing.com/th/id/OIP.HJwWVJS9jdEnLKxbiHrlAAHaLH?w=115&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt='logo' /></Link>
                <Link to="movies/28"><span>Action</span></Link>
                <Link to="movies/12"><span>Adventure</span></Link>
                <Link to="movies/35"><span>Comedy</span></Link>
                <Link to="movies/27"><span>Horror</span></Link>
                <Link to="movies/16"><span>Animated</span></Link>
            </div>
            <div className='headerRight'>
                <input
                    placeholder="Search.."
                    type="search"
                    onKeyDown={(e) => onKeyDown(e)}
                    value={changedValue}
                    onChange={(e) => changeHandler(e)}
                />
                <BsSearch onClick={clickHandler} className="_searchIcon" />
            </div>
        </div>
    )
}

export default Header
