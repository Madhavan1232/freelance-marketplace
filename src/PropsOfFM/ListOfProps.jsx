import "./listProps.css";
import { FaLaptopCode, FaPalette, FaPen, FaChartLine, FaPaintBrush, FaHeadset, FaChartBar, FaGlobe, FaMobile, FaMoneyBillWave} from 'react-icons/fa';

function ListOfProps({ props }) {
    return (
        <div className="list-container">
            <div className="header-container">
                <h4>Explore Skills & Services</h4>
            </div>
            <ul className="category-list">
                <li className="category-item">
                    <a href="">
                        <div className="icon-container">
                            <FaLaptopCode size={40} />
                            <span>Development & IT</span>
                        </div>
                    </a>
                </li>
                <li className="category-item">
                    <a href="">
                        <div className="icon-container">
                            <FaPalette size={40} />
                            <span>Design & Creative</span>
                        </div>
                    </a>
                </li>
                <li className="category-item">
                    <a href="">
                        <div className="icon-container">
                            <FaPen size={40} />
                            <span>Writing & Translation</span>
                        </div>
                    </a>
                </li>
                <li className="category-item">
                    <a href="">
                        <div className="icon-container">
                            <FaChartLine size={40} />
                            <span>Marketing & Sales</span>
                        </div>
                    </a>
                </li>
                <li className="category-item">
                    <a href="">
                        <div className="icon-container">
                            <FaPaintBrush size={40} />
                            <span>Artistic</span>
                        </div>
                    </a>
                </li>
                <li className="category-item">
                    <a href="">
                        <div className="icon-container">
                            <FaHeadset size={40} />
                            <span>Customer Service</span>
                        </div>
                    </a>
                </li>
                <li className="category-item">
                    <a href="">
                        <div className="icon-container">
                            <FaChartBar size={40} style={{marginTop: "20px"}} />
                            <span>Data Science & Analytics</span>
                        </div>
                    </a>
                </li>
                <li className="category-item">
                    <a href="">
                        <div className="icon-container">
                            <FaGlobe size={40} />
                            <span>Web Development</span>
                        </div>
                    </a>
                </li>
                <li className="category-item">
                    <a href="">
                        <div className="icon-container">
                            <FaMobile size={40} />
                            <span>Mobile Development</span>
                        </div>
                    </a>
                </li>
                <li className="category-item">
                    <a href="">
                        <div className="icon-container">
                            <FaMoneyBillWave size={40} />
                            <span>Business & Finance</span>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default ListOfProps; 