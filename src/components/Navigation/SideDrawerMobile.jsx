import './SideDrawerMobile.css';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';




const SideDrawer = ({children,show,closeDrawerHandler}) => {

    const content = (
        <CSSTransition 
            in={show}
            timeout={200} 
            classNames="slide-in-left" 
            mountOnEnter 
            unmountOnExit
            >
            <aside className='side-drawer' onClick={closeDrawerHandler} >{children}</aside>
        </CSSTransition>
    )


  return (
    ReactDOM.createPortal(content, document.getElementById('drawer-hook'))
  );
}

export default SideDrawer;