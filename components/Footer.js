const Footer = () => {
    return (
        <footer className="footer">
            <hr/>
            <div className='footer-container'>
                <div className="footer-left">
                    <div>
                        <p><b>© 2022-2023</b></p>
                        <p>Manu S Rao</p>
                    </div>
                    <div>
                        <p><b>Social</b></p>
                        <p><a href="https://twitter.com/manusrao25/" target="_blank">Twitter</a> / <a href="https://github.com/MANUSRAO/" target="_blank">Github</a></p>
                    </div>
                    <div>
                        <p><b>Contact Me</b></p>
                        <p><a href="mailto:manusrao01@gmail.com">Email</a></p>
                    </div>
                    <div>
                        <p><b>My Blog</b></p>
                        <p><a href="/blogs">Blog</a></p>
                    </div>
                </div>
                <div className="footer-right">
                    <div>
                    <p><a href="https://github.com/MANUSRAO/portfolio" target="_blank"><i className="fa-brands fa-github"></i></a></p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;
