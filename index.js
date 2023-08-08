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

let d1;
let d2;
let get_country_code_name;
let get_state_code_name;
let getid;

fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
    .then(response => response.json())
    .then((result) => {
        for (let x in result) {
            let opt = document.createElement("option");
            opt.innerHTML = result[x].name;
            country.append(opt);
        }
        function data() {
            return result;
        }
        d1 = data()
    });

country.onchange = () => {
    state.innerHTML = '<option value="" disabled selected>Select State</option>';
    city.innerHTML = '<option value="" disabled selected>Select City</option>';

    let chosen = country.value;
    for (let i = 0; i < Object.keys(d1).length; i++) {
        if (d1[i].name == chosen) {
            getid = d1[i].id;
        }
    }
    state.onclick = () => {
        fetch("https://api.countrystatecity.in/v1/states", requestOptions)
            .then(response2 => response2.json())
            .then((result1) => {
                function data2() {
                    return result1;
                }
                d2 = data2()
                for (let x in result1) {
                    let get_stateid = result1[x].country_id;
                    if (get_stateid == getid) {
                        let opt = document.createElement("option");
                        opt.innerHTML = result1[x].name;
                        state.append(opt);
                    }
                }
            });
    }
};

state.onchange = () => {
    city.innerHTML = '<option value="" disabled selected>Select City</option>';
    let chosen_state = state.value;
    for (let y = 0; y < Object.keys(d2).length; y++) {
        if (d2[y].name == chosen_state) {
            get_country_code_name = d2[y].country_code;
            get_state_code_name = d2[y].iso2;
        }
    }
    city.onclick = () => {
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
};