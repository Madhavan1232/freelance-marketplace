import "./Bar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faMicrosoft, faAirbnb, faShopify, faLinkedin } from '@fortawesome/free-brands-svg-icons';
function SearchBar() {
    return (
        <div className="parent-container">
            <div className="logo-container">
                <div className="title-container"><h1 className="title">Find the Right Freelancer</h1></div>
                <p className="subtitle">Search by skills, roles, or keywords to get started</p>
            </div>
            <div>

            </div>
            <div className="search-container">
                <div className="input-container">
                    <input type="text" placeholder="Search..." className="search-input" />
                </div>
                <div className="search-button">
                    <span className="search-text">Search</span>
                    <FontAwesomeIcon icon={faSearch} style={{ color: "#19d23e", paddingLeft: '12px' }} className="search-icon" />
                </div>
                <div className="trusted-by">
                    <ul className="company-list">
                        <li className="company-item">
                            <FontAwesomeIcon icon={faGoogle} className="company-icon" />
                            <span>Google</span>
                        </li>
                        <li className="company-item">
                            <FontAwesomeIcon icon={faMicrosoft} className="company-icon" />
                            <span>Microsoft</span>
                        </li>
                        <li className="company-item">
                            <FontAwesomeIcon icon={faAirbnb} className="company-icon" />
                            <span>Airbnb</span>
                        </li>
                        <li className="company-item">
                            <FontAwesomeIcon icon={faShopify} className="company-icon" />
                            <span>Shopify</span>
                        </li>
                        <li className="company-item">
                            <FontAwesomeIcon icon={faLinkedin} className="company-icon" />
                            <span>LinkedIn</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;
