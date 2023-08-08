let country = document.querySelector("#country");
let state = document.querySelector("#state");
let city = document.querySelector("#city");

var headers = new Headers();
headers.append("X-CSCAPI-KEY", "TjZNU1M4VDR1UUlVeVNDdFlXMVdBWFIzUGs0Q016eXhPY0F0cUZydA==");

var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
};

fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
    .then(response => response.json())
    .then((result) => {
        for (let x in result) {
            let opt = document.createElement("option");
            opt.innerHTML = result[x].name;
            country.append(opt);
        }
        
        country.onchange = () => {
            state.innerHTML = '<option value="" disabled selected>Select State</option>';
            city.innerHTML = '<option value="" disabled selected>Select City</option>';
            
            let chosen = country.value;
            let getid;
            for (let i = 0; i < Object.keys(result).length; i++) {
                if (result[i].name == chosen) {
                    getid = result[i].id;
                }
            }
            
            fetch("https://api.countrystatecity.in/v1/states", requestOptions)
                .then(response2 => response2.json())
                .then((result1) => {
                    for (let x in result1) {
                        let get_stateid = result1[x].country_id;
                        if (get_stateid == getid) {
                            let opt = document.createElement("option");
                            opt.innerHTML = result1[x].name;
                            state.append(opt);
                        }
                    }
                    
                    state.onchange = () => {
                        city.innerHTML = '<option value="" disabled selected>Select City</option>';
                        
                        let get_country_code_name;
                        let get_state_code_name;
                        let chosen_state = state.value;
                        for (let y = 0; y < Object.keys(result1).length; y++) {
                            if (result1[y].name == chosen_state) {
                                get_country_code_name = result1[y].country_code;
                                get_state_code_name = result1[y].iso2;
                            }
                        }
                        
                        fetch(`https://api.countrystatecity.in/v1/countries/${get_country_code_name}/states/${get_state_code_name}/cities`, requestOptions)
                            .then(response => response.json())
                            .then((result3) => {
                                for (let x in result3) {
                                    let opt = document.createElement("option");
                                    opt.innerHTML = result3[x].name;
                                    city.append(opt);
                                }
                            });
                    }
                });
        }
    });