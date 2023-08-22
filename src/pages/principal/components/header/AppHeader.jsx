import { Layout} from 'antd'
import Logo from '../../../../assets/MessiLogo.avif'
import { useNavigate } from 'react-router-dom' 
import './appHeader.scss'

const { Header } = Layout

function AppHeader(){
    const navigate = useNavigate()

    return(
    <Header className='app-header'>   
        <div className='header-logo'
        >
            <img
                src={Logo}
                className='logo'
                alt='Logo'
            />
        </div>
    </Header>
    )
}
export default AppHeader