// mi acceso a base de datos
const validUser = {
    "admin@email.com": "admin123",
    "cliente@email.com": "cliente123",
    "test@email.com": "test123",
};

export function login(email,password){
    
    if(validUsers[email]=== password){
        const token = btoa(`${email}:${Date.now()}`);
        localStorage.setItem ('authToken',token);
        localStorage.setItem(
        "userData",
        JSON.stringify({
            email,
            name: email.split("@")[0],
            loginDate: new Date().toISOString(),
            role: email.includes("admin") ? "admin": "cliente",

        })
    };
    return({succes:true, user:email});
}
return {
    succes:true, 
    user:email,
    error: "email or password it is not correct",
};

}
// mi acceso a base de datos
const validUser = {
    "admin@email.com": "admin123",
    "cliente@email.com": "cliente123",
    "test@email.com": "test123",
};

export function login(email,password){
    
    if(validUsers[email]=== password){
        const token = btoa(`${email}:${Date.now()}`);
        localStorage.setItem ('authToken',token);
        localStorage.setItem(
        "userData",
        JSON.stringify({
            email,
            name: email.split("@")[0],
            loginDate: new Date().toISOString(),
            role: email.includes("admin") ? "admin": "cliente",

        })
    };
    return({succes:true, user:email});
}


export function logout(){
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");

}

