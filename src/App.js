import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import {AppMenu} from './AppMenu';
import EmptyPage from './components/EmptyPage';
import pages from './components/pages';
import {Route, Switch, useParams, withRouter} from 'react-router-dom'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import './layout/layout.scss';
import './App.scss';
import {menuClicks, mobileModeChanged} from "./util/MenuEventSubject";
import {delayResponse, isDesktop, isLoggedin} from "./util/util";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';




export const ForwardToLogin = withRouter((props) => {
    console.log('ForwardToLogin render');
    const {requestedUrl} = useParams();
    props.history.push('/login?returnUrl=' + requestedUrl)
    return <></>;

});

const App = (props) => {


    console.log('App render', 'isLoggedin', isLoggedin());


    const [state, setState] = useState({
        layoutMode: 'static',
        layoutColorMode: 'dark',
        staticMenuInactive: false,
        overlayMenuActive: false,
        mobileMenuActive: false,
    });


    let menu = [];
    let sidebar = null;




    const anonymousPaths = ['/login', '/forgot-password', '/signup'];
    if (!isLoggedin() && !anonymousPaths.includes(props.history.location.pathname)) {
        window.location.href = anonymousPaths.includes(props.history.location.pathname) ? props.history.location.pathname : '/login';
    }
    useEffect(() => {

        const menuSub = menuClicks.subscribe(x => onToggleMenu());
        const mobileModeSub = mobileModeChanged.subscribe(x => {
            console.log('mobile mode changed', x);
            setState({
                ...state,
                mobileMenuActive: true,
                overlayMenuActive: !x
            })
        });

        return () => {
            menuSub.unsubscribe();
            mobileModeSub.unsubscribe();
        }
    });


    const onSidebarClick = () => {
    };

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            /*  setState({
                  ...state,
                  overlayMenuActive: false
              })*/
        }
    };
    const onToggleMenu = () => {

        if (isDesktop()) {
            if (state.layoutMode === 'overlay') {
                setState({
                    ...state,
                    overlayMenuActive: !state.overlayMenuActive
                });
            } else if (state.layoutMode === 'static') {
                setState({
                    ...state,
                    staticMenuInactive: !state.staticMenuInactive
                });
            }
        } else {
            console.log('mobileMenuActive', state.mobileMenuActive);
            const newState = {
                ...state,
                mobileMenuActive: !state.mobileMenuActive

            };
            setState(newState);
        }
    };


    const createMenu = () => {
        menu = [
            {
                label: 'Dashboard', icon: 'pi pi-fw pi-home', command: () => {
                    window.location = '/'
                },
                iconComponent: <span><DashboardIcon style={{fontSize: 15}}/></span>,
            },
            {
                label: 'Logout',
                icon: 'pi pi-fw pi-ticket',
                iconComponent: <span><ExitToAppIcon style={{fontSize: 15}}/></span>,
                command: () => {
                    localStorage.removeItem('isLoggedIn');
                    window.location.href = '/'
                }
            }
        ];
    };
    createMenu();


    const logo = state.layoutColorMode === 'dark' ? '/assets/layout/images/cb-logo2.png' : '/assets/layout/images/cb-logo2.png';

    let wrapperClass = () => {
        return classNames('layout-wrapper', {
            'layout-overlay': state.layoutMode === 'overlay',
            'layout-static': state.layoutMode === 'static',
            'layout-static-sidebar-inactive': state.staticMenuInactive && state.layoutMode === 'static',
            'layout-overlay-sidebar-active': state.overlayMenuActive && state.layoutMode === 'overlay',
            'layout-mobile-sidebar-active': state.mobileMenuActive
        });
    };

    const sidebarClassName = classNames("layout-sidebar", {
        'layout-sidebar-dark': state.layoutColorMode === 'dark',
        'layout-sidebar-light': state.layoutColorMode === 'light'
    });


    console.log('App render');
    const onLoginAttempt = (model) => {
        console.log('onLoginAttempt', model);

        if (model.email === 'admin@coronabuster.com' && model.password === "123") {
            localStorage.isLoggedIn = true;

            setTimeout(() => {
                props.history.push('/');
            }, 300)


            return delayResponse(true, 500)
        } else {
            return delayResponse(false, 500)
        }

    };


    return (
        isLoggedin() ?

            <div className={wrapperClass()}>
                <div ref={(el) => sidebar = el} className={sidebarClassName} onClick={onSidebarClick}>
                    <div className="layout-logo">
                        <img alt="Logo" src={logo} width={100} height={100}/>
                    </div>


                    <AppMenu model={menu} onMenuItemClick={onMenuItemClick}/>
                </div>

                <div className="layout-main">

                    <Switch>
                        <Route path="/" exact component={EmptyPage}/>

                        <Route path="/login" component={() => <pages.LoginPage/>}/>

                    </Switch>

                </div>
                <div className="layout-mask"/>
            </div> : <Switch>
                <Route path="/login" component={() => <pages.LoginPage onLoginAttempt={onLoginAttempt}/>}/>
                <Route path="/forgot-password" component={() => <pages.ResetPassword/>}/>
                <Route path="/signup" component={() => <pages.SignUp/>}/>
                <Route component={<ForwardToLogin/>}/>


            </Switch>


    );
};

export default withRouter(App);


