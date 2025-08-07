import {Link} from 'react-router-dom';
const Footer = () => {
    return(
        <footer
  className="d-flex flex-column align-items-center text-center py-2"
    style={{ backgroundColor: '#ff6ac6', marginBottom: '10px' }}>


  <Link className="nav-link text-white pt-1" to="/nosotros">Nosotros</Link>

  <a
    className="nav-link text-white pt-1"
    href="https://www.instagram.com/enails_madison?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
    target="_blank" rel="noopener noreferrer"
  >
    <i className="bi bi-instagram me-2"></i>Instagram
  </a>

</footer>
    )
}

export default Footer;