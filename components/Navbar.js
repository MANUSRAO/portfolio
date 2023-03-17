import { useEffect, useState } from 'react';
import Image from 'next/image'
import profile from '../public/profile.png'
import verify from '../public/verify.png';
const Navbar = () =>{
    const [darkTheme, setDarkTheme] = useState(undefined);

    const handleToggle = (event) => {
      setDarkTheme(event.target.checked);
    };
  
    useEffect(() => {
      if (darkTheme !== undefined) {
        if (darkTheme) {
          // Set value of  darkmode to dark
          document.documentElement.setAttribute('data-theme', 'dark');
          window.localStorage.setItem('theme', 'dark');
        } else {
          // Set value of  darkmode to light
          document.documentElement.removeAttribute('data-theme');
          window.localStorage.setItem('theme', 'light');
        }
      }
    }, [darkTheme]);
  
    useEffect(() => {
      const root = window.document.documentElement;
      const initialColorValue = root.style.getPropertyValue(
        '--initial-color-mode'
      );
      // Set initial darkmode to light
      setDarkTheme(initialColorValue === 'dark');
    }, []);
    return (
        <header>
        <nav className='navbar'>
        <a href="http://localhost:3000/" className="logo">
            <Image
            src={profile}
            alt="Picture of the author"
            width="0px"
            height="0px"
            className='header_avatar'
            />
            <span className='header_name'>
                <span>Manu S Rao</span>
                <span className='header_verification'>
                    <Image
                    src={verify}
                    alt='Verification logo'
                    aria-hidden='true'
                    width="10px"
                    height="10px"
                    className='header_verification'
                    />
                </span>
            </span>
        </a>
        <ul className='links'>
            <li><a className='hover-underline-animation' href='/'><b>01 </b>  Home</a></li>
            <li><a className='hover-underline-animation' href='/projects'><b>02</b> Projects</a></li>
            <li><a className='hover-underline-animation' href='/blogs'><b>03</b> Blog</a></li>
            <li>
                <div className='action_btn'>
                    {darkTheme !== undefined && (
                        <form action="#">
                        <label className="switch">
                            <input
                            type="checkbox"
                            checked={darkTheme}
                            onChange={handleToggle}
                            />
                            <span className="slider"></span>
                        </label>
                        </form>
                    )}
                </div>
            </li>
        </ul>
        <div className='toggle_btn'>
            <i className='fa-solid fa-bars'></i>
        </div>
      </nav>
      <div className='drop_down'>
            <ul className='links'>
                <li><a className='hover-underline-animation' href='/'><b>01</b> Home</a></li>
                <li><a className='hover-underline-animation' href='/projects'><b>02</b> Projects</a></li>
                <li><a className='hover-underline-animation' href='/blogs'><b>03</b> Blog</a></li>
                <li>
                <div>
            {darkTheme !== undefined && (
                <form action="#">
                <label className="switch"> 
                    <input
                    type="checkbox"
                    checked={darkTheme}
                    onChange={handleToggle}
                    />
                    <span className="slider"></span>
                </label>
                </form>
            )}
            </div>
                </li>
            </ul>
        </div>
      </header>
    );
}

export default Navbar;