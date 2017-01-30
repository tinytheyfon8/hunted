const isAuth = () => document.cookie.includes('loggedIn=true');

export { isAuth };
