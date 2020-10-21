const siteUrl = "http://13.234.145.105:1510/v1/api/"; //staging

export default function graphQLRequest(variables, method, apiMethod, token, ) {

    var init = apiMethod == "GET" ? {
        method: "GET",
        headers: {
            'Content-Type': "application/json",
            "Authorization": token ? token : '',

        }
    } :
        {
            method: apiMethod,
            headers: {
                'Content-Type': "application/json",
                "Authorization": token ? token : '',

            },
            body: JSON.stringify(variables)
        }

    return fetch(siteUrl + method, init)
        .then(res => res.json()
            .then(data => {
                var apiData = {
                    status: res.status, 
                    data: data
                }
                console.log("apiData",apiData)

                return apiData;
            }))
        .catch(err => {

            var apiData = {
                status: 900,
                data: "Please check your internet connection."
            }
            return apiData
        });
};
